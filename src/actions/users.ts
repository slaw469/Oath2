'use server';

import prisma from '@/lib/prisma';

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function updateLeetCodeUsername(
  userId: string,
  leetcodeUsername: string,
): Promise<ActionResult> {
  try {
    const normalized = leetcodeUsername.trim();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        leetcodeUsername: normalized || null,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        leetcodeUsername: true,
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error('Error updating LeetCode username:', error);
    return {
      success: false,
      error: 'Failed to update LeetCode username. Please try again.',
    };
  }
}


