// Test API route to verify database queries work
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Test various database queries
    const [user, friendCount, oathCount] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.friendship.count({ 
        where: { 
          OR: [
            { initiatorId: userId },
            { receiverId: userId }
          ]
        }
      }),
      prisma.oathParticipant.count({ where: { userId } })
    ]);

    return NextResponse.json({
      success: true,
      message: '✅ Database queries working!',
      data: {
        userExists: !!user,
        friendshipsCount: friendCount,
        oathsCount: oathCount,
        userCredits: user?.credits
      }
    });
  } catch (error: any) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: '❌ Database query failed'
      },
      { status: 500 }
    );
  }
}

