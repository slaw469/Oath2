import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DEFAULT_LEETCODE_API_BASE = 'https://alfa-leetcode-api.onrender.com';

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

interface AcSubmissionItem {
  id?: string;
  submissionId?: string;
  title: string;
  titleSlug: string;
  timestamp: number | string;
}

interface AcSubmissionResponse {
  data?: AcSubmissionItem[];
  submissions?: AcSubmissionItem[];
  submission?: AcSubmissionItem[];
  [key: string]: unknown;
}

function extractLatestSubmission(json: AcSubmissionResponse): AcSubmissionItem | null {
  const list = (json.submission || json.data || json.submissions || []) as AcSubmissionItem[];
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[0];
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id: oathId } = await context.params;

  try {
    const oath = await prisma.oath.findUnique({
      where: { id: oathId },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!oath) {
      return NextResponse.json({ error: 'Oath not found' }, { status: 404 });
    }

    if (oath.type !== 'DAILY') {
      return NextResponse.json(
        { error: 'LeetCode check is only available for DAILY oaths' },
        { status: 400 },
      );
    }

    const apiBase = process.env.LEETCODE_API_BASE || DEFAULT_LEETCODE_API_BASE;
    const nowMs = Date.now();

    const processedUsers: Array<{ userId: string; username: string }> = [];

    for (const participant of oath.participants) {
      const user = participant.user;
      if (!user.leetcodeUsername) continue;

      const url = `${apiBase.replace(/\/$/, '')}/${encodeURIComponent(
        user.leetcodeUsername,
      )}/acSubmission?limit=1`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.error(
            `[api/oath/${oathId}/check-leetcode] Non-2xx from alfa-leetcode-api for ${user.leetcodeUsername}:`,
            res.status,
            res.statusText,
          );
          continue;
        }

        const json = (await res.json()) as AcSubmissionResponse;
        const latest = extractLatestSubmission(json);
        if (!latest) continue;

        const tsMs = normalizeTimestamp(latest.timestamp, nowMs);
        const submissionDay = toStartOfDay(tsMs);
        const completeStatuses = ['VERIFIED_COMPLETE', 'RESOLVED_COMPLETE'];

        const title = latest.title;
        const titleSlug = latest.titleSlug;
        const proofUrl = `https://leetcode.com/problems/${titleSlug}`;

        // Check if there's already a completed check-in for this submission day
        const existing = await prisma.checkIn.findUnique({
          where: {
            oathId_userId_dueDate: {
              oathId: oath.id,
              userId: user.id,
              dueDate: submissionDay,
            },
          },
        });

        const alreadyComplete = existing && completeStatuses.includes(existing.status);

        // Upsert a check-in for the day this submission was made
        await prisma.checkIn.upsert({
          where: {
            oathId_userId_dueDate: {
              oathId: oath.id,
              userId: user.id,
              dueDate: submissionDay,
            },
          },
          update: {
            proofUrl,
            proofText: `Auto-verified via LeetCode API: ${title}`,
            submittedAt: new Date(tsMs),
            status: 'VERIFIED_COMPLETE',
            aiVerificationResult: 'Auto-verified as completed via LeetCode accepted submission.',
            aiVerifiedAt: new Date(),
          },
          create: {
            oathId: oath.id,
            userId: user.id,
            dueDate: submissionDay,
            proofUrl,
            proofText: `Auto-verified via LeetCode API: ${title}`,
            submittedAt: new Date(tsMs),
            status: 'VERIFIED_COMPLETE',
            aiVerificationResult: 'Auto-verified as completed via LeetCode accepted submission.',
            aiVerifiedAt: new Date(),
          },
        });

        // Keep participant stats in sync (idempotent per day)
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

        processedUsers.push({ userId: user.id, username: user.leetcodeUsername });
      } catch (err) {
        console.error(
          `[api/oath/${oathId}/check-leetcode] Error checking LeetCode for ${user.leetcodeUsername}:`,
          err,
        );
      }
    }

    return NextResponse.json({
      success: true,
      processedUsers,
    });
  } catch (error) {
    console.error('[api/oath/[id]/check-leetcode] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


