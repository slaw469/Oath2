import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper to normalize a timestamp (seconds or ms) into a Date at start of that day (UTC)
function toStartOfDay(timestampMs: number): Date {
  const date = new Date(timestampMs);
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth();
  const utcDay = date.getUTCDate();
  return new Date(Date.UTC(utcYear, utcMonth, utcDay));
}

function normalizeTimestamp(value: number | string | undefined, fallbackMs: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    // If it looks like seconds, convert to ms
    return value < 1e12 ? value * 1000 : value;
  }
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    if (Number.isFinite(parsed)) {
      return parsed < 1e12 ? parsed * 1000 : parsed;
    }
  }
  return fallbackMs;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, titleSlug, solvedAt, username } = body ?? {};

    if (
      !id ||
      typeof id !== 'string' ||
      !title ||
      typeof title !== 'string' ||
      !titleSlug ||
      typeof titleSlug !== 'string' ||
      !username ||
      typeof username !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const nowMs = Date.now();
    const ts = normalizeTimestamp(solvedAt, nowMs);

    if (!Number.isFinite(ts)) {
      return NextResponse.json({ error: 'Invalid solvedAt timestamp' }, { status: 400 });
    }

    const dayStart = toStartOfDay(ts);
    const completeStatuses = ['VERIFIED_COMPLETE', 'RESOLVED_COMPLETE'];

    // Find all users who have this LeetCode username
    const users = await prisma.user.findMany({
      where: {
        leetcodeUsername: username,
      },
    });

    if (users.length === 0) {
      // No matching users; nothing to do, but not an error
      return NextResponse.json({ success: true, processedOaths: 0 });
    }

    let processedOaths = 0;

    for (const user of users) {
      // Find all ACTIVE Daily LeetCode-style oaths this user is participating in.
      // We infer these from type === DAILY.
      const oaths = await prisma.oath.findMany({
        where: {
          type: 'DAILY',
          status: 'ACTIVE',
          participants: {
            some: {
              userId: user.id,
              status: 'ACCEPTED',
            },
          },
        },
      });

      for (const oath of oaths) {
        // Check if there's already a completed check-in for this day to keep successCount idempotent
        const existing = await prisma.checkIn.findUnique({
          where: {
            oathId_userId_dueDate: {
              oathId: oath.id,
              userId: user.id,
              dueDate: dayStart,
            },
          },
        });

        const alreadyComplete = existing && completeStatuses.includes(existing.status);

        await prisma.checkIn.upsert({
          where: {
            oathId_userId_dueDate: {
              oathId: oath.id,
              userId: user.id,
              dueDate: dayStart,
            },
          },
          update: {
            proofUrl: `https://leetcode.com/problems/${titleSlug}`,
            proofText: `Auto-verified via LeetCode API: ${title}`,
            submittedAt: new Date(ts),
            status: 'VERIFIED_COMPLETE',
            aiVerificationResult: 'Auto-verified as completed via LeetCode accepted submission.',
            aiVerifiedAt: new Date(),
          },
          create: {
            oathId: oath.id,
            userId: user.id,
            dueDate: dayStart,
            proofUrl: `https://leetcode.com/problems/${titleSlug}`,
            proofText: `Auto-verified via LeetCode API: ${title}`,
            submittedAt: new Date(ts),
            status: 'VERIFIED_COMPLETE',
            aiVerificationResult: 'Auto-verified as completed via LeetCode accepted submission.',
            aiVerifiedAt: new Date(),
          },
        });

        // Only increment successCount the first time we record a completion for this day
        if (!alreadyComplete) {
          await prisma.oathParticipant.updateMany({
            where: {
              oathId: oath.id,
              userId: user.id,
            },
            data: {
              successCount: {
                increment: 1,
              },
            },
          });
        }

        processedOaths += 1;
      }
    }

    return NextResponse.json({ success: true, processedOaths });
  } catch (error) {
    console.error('[api/leetcode-solved] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


