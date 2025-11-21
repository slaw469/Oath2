'use server';

// Server Actions for Oath Management
// Handles oath creation, participation, and management

import prisma from '@/lib/prisma';
import { OathStatus, OathType, ParticipantStatus, CurrencyType } from '@prisma/client';

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CreateOathInput {
  title: string;
  description: string;
  type: OathType;
  startDate: Date;
  endDate: Date;
  stakeAmount: number;
  currencyType: CurrencyType;
  verificationPrompt: string;
  participantUserIds: string[]; // Array of user IDs to invite
}

export interface CreateSoloOathInput {
  title: string;
  description: string;
  category: string;
  type: 'DAILY' | 'WEEKLY' | 'CUSTOM';
  startDate: Date;
  endDate: Date;
  stakeAmount: number;
  currencyType: 'GEMS' | 'REAL_MONEY';
  privacy: string;
}

/**
 * Create a solo oath (no opponents)
 */
export async function createSoloOath(
  userId: string,
  input: CreateSoloOathInput
): Promise<ActionResult> {
  try {
    // Validate inputs
    if (!input.title || !input.description) {
      return {
        success: false,
        error: 'Title and description are required',
      };
    }

    if (input.stakeAmount < 0) {
      return {
        success: false,
        error: 'Stake amount must be positive',
      };
    }

    if (new Date(input.startDate) >= new Date(input.endDate)) {
      return {
        success: false,
        error: 'End date must be after start date',
      };
    }

    // Get user to check balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Check if user has enough balance for the currency type
    if (input.currencyType === 'GEMS' && user.gems < input.stakeAmount) {
      return {
        success: false,
        error: `Insufficient gems. You need 💎 ${input.stakeAmount} but only have 💎 ${user.gems}`,
      };
    }

    if (input.currencyType === 'REAL_MONEY' && user.credits < input.stakeAmount) {
      return {
        success: false,
        error: `Insufficient credits. You need $${input.stakeAmount} but only have $${user.credits}`,
      };
    }

    // Create verification prompt based on category
    const verificationPrompt = `Verify that the user completed their daily commitment for: ${input.title}. ${input.description}`;

    // Create the oath with the user as the only participant
    const oath = await prisma.oath.create({
      data: {
        title: input.title,
        description: input.description,
        type: input.type as OathType,
        status: 'ACTIVE', // Solo oaths start immediately
        startDate: input.startDate,
        endDate: input.endDate,
        stakeAmount: input.stakeAmount,
        currencyType: input.currencyType as CurrencyType,
        verificationPrompt,
        participants: {
          create: {
            userId,
            status: 'ACCEPTED',
            stakeAmount: input.stakeAmount,
            stakePaid: true, // Mark as paid for solo oaths
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                displayName: true,
                photoURL: true,
              },
            },
          },
        },
      },
    });

    // Deduct the stake from user's balance
    if (input.currencyType === 'GEMS') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          gems: {
            decrement: input.stakeAmount,
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: {
            decrement: input.stakeAmount,
          },
        },
      });
    }

    return {
      success: true,
      data: oath,
    };
  } catch (error) {
    console.error('Error creating solo oath:', error);
    return {
      success: false,
      error: 'Failed to create oath. Please try again.',
    };
  }
}

/**
 * Create a new Oath and invite participants
 */
export async function createOath(
  creatorUserId: string,
  input: CreateOathInput
): Promise<ActionResult> {
  try {
    // Validate inputs
    if (!input.title || !input.description) {
      return {
        success: false,
        error: 'Title and description are required',
      };
    }

    if (!input.participantUserIds || input.participantUserIds.length === 0) {
      return {
        success: false,
        error: 'At least one participant is required',
      };
    }

    if (!input.participantUserIds.includes(creatorUserId)) {
      // Add creator if not already included
      input.participantUserIds.push(creatorUserId);
    }

    if (input.participantUserIds.length < 2) {
      return {
        success: false,
        error: 'An oath requires at least 2 participants',
      };
    }

    if (input.stakeAmount < 0) {
      return {
        success: false,
        error: 'Stake amount must be positive',
      };
    }

    if (new Date(input.startDate) >= new Date(input.endDate)) {
      return {
        success: false,
        error: 'End date must be after start date',
      };
    }

    // Check if all participants are friends with creator (warm leads requirement)
    for (const participantId of input.participantUserIds) {
      if (participantId === creatorUserId) continue;

      const friendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { initiatorId: creatorUserId, receiverId: participantId, status: 'ACCEPTED' },
            { initiatorId: participantId, receiverId: creatorUserId, status: 'ACCEPTED' },
          ],
        },
      });

      if (!friendship) {
        return {
          success: false,
          error: 'You can only create oaths with your friends',
        };
      }
    }

    // Check if creator has enough balance for the currency type
    const creator = await prisma.user.findUnique({
      where: { id: creatorUserId },
    });

    if (!creator) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    if (input.currencyType === 'GEMS' && creator.gems < input.stakeAmount) {
      return {
        success: false,
        error: `Insufficient gems. You need 💎 ${input.stakeAmount} but only have 💎 ${creator.gems}`,
      };
    }

    if (input.currencyType === 'REAL_MONEY' && creator.credits < input.stakeAmount) {
      return {
        success: false,
        error: `Insufficient credits. You need $${input.stakeAmount} but only have $${creator.credits}`,
      };
    }

    // Create the oath with participants
    const oath = await prisma.oath.create({
      data: {
        title: input.title,
        description: input.description,
        type: input.type,
        status: 'PENDING',
        startDate: input.startDate,
        endDate: input.endDate,
        stakeAmount: input.stakeAmount,
        currencyType: input.currencyType,
        verificationPrompt: input.verificationPrompt,
        participants: {
          create: input.participantUserIds.map((userId) => ({
            userId,
            status: userId === creatorUserId ? 'ACCEPTED' : 'INVITED',
            stakeAmount: input.stakeAmount,
          })),
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                displayName: true,
                photoURL: true,
              },
            },
          },
        },
      },
    });

    // Deduct stake from creator's balance
    if (input.currencyType === 'GEMS') {
      await prisma.user.update({
        where: { id: creatorUserId },
        data: {
          gems: {
            decrement: input.stakeAmount,
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: creatorUserId },
        data: {
          credits: {
            decrement: input.stakeAmount,
          },
        },
      });
    }

    // Create notifications for invited participants
    for (const participantId of input.participantUserIds) {
      if (participantId !== creatorUserId) {
        await prisma.notification.create({
          data: {
            type: 'OATH_INVITE',
            senderId: creatorUserId,
            receiverId: participantId,
            title: 'New Oath Invitation',
            message: `${creator?.displayName || creator?.email} invited you to "${input.title}"`,
            actionUrl: `/oath/${oath.id}`,
          },
        });
      }
    }

    return {
      success: true,
      data: oath,
    };
  } catch (error) {
    console.error('Error creating oath:', error);
    return {
      success: false,
      error: 'Failed to create oath. Please try again.',
    };
  }
}

/**
 * Accept an oath invitation
 */
export async function acceptOathInvitation(
  userId: string,
  oathId: string
): Promise<ActionResult> {
  try {
    // Find the participant record
    const participant = await prisma.oathParticipant.findUnique({
      where: {
        oathId_userId: {
          oathId,
          userId,
        },
      },
      include: {
        oath: true,
        user: true,
      },
    });

    if (!participant) {
      return {
        success: false,
        error: 'Oath invitation not found',
      };
    }

    if (participant.status === 'ACCEPTED') {
      return {
        success: false,
        error: 'You have already accepted this oath',
      };
    }

    if (participant.status !== 'INVITED') {
      return {
        success: false,
        error: 'This invitation is no longer valid',
      };
    }

    // Check if user has enough balance for the currency type
    if (participant.oath.currencyType === 'GEMS' && participant.user.gems < participant.stakeAmount) {
      return {
        success: false,
        error: `Insufficient gems. You need 💎 ${participant.stakeAmount} but only have 💎 ${participant.user.gems}`,
      };
    }

    if (participant.oath.currencyType === 'REAL_MONEY' && participant.user.credits < participant.stakeAmount) {
      return {
        success: false,
        error: `Insufficient credits. You need $${participant.stakeAmount} but only have $${participant.user.credits}`,
      };
    }

    // Update participant status and mark stake as paid
    await prisma.oathParticipant.update({
      where: {
        oathId_userId: {
          oathId,
          userId,
        },
      },
      data: {
        status: 'ACCEPTED',
        stakePaid: true,
      },
    });

    // Deduct stake from user's balance
    if (participant.oath.currencyType === 'GEMS') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          gems: {
            decrement: participant.stakeAmount,
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: {
            decrement: participant.stakeAmount,
          },
        },
      });
    }

    // Check if all participants have accepted
    const allParticipants = await prisma.oathParticipant.findMany({
      where: { oathId },
    });

    const allAccepted = allParticipants.every((p) => p.status === 'ACCEPTED');

    // If all accepted and oath hasn't started yet, mark as ACTIVE if start date is today or earlier
    if (allAccepted) {
      const oath = participant.oath;
      if (new Date(oath.startDate) <= new Date()) {
        await prisma.oath.update({
          where: { id: oathId },
          data: { status: 'ACTIVE' },
        });
      }
    }

    return {
      success: true,
      data: { allAccepted },
    };
  } catch (error) {
    console.error('Error accepting oath invitation:', error);
    return {
      success: false,
      error: 'Failed to accept oath invitation. Please try again.',
    };
  }
}

/**
 * Decline an oath invitation
 */
export async function declineOathInvitation(
  userId: string,
  oathId: string
): Promise<ActionResult> {
  try {
    const participant = await prisma.oathParticipant.findUnique({
      where: {
        oathId_userId: {
          oathId,
          userId,
        },
      },
    });

    if (!participant) {
      return {
        success: false,
        error: 'Oath invitation not found',
      };
    }

    if (participant.status !== 'INVITED') {
      return {
        success: false,
        error: 'This invitation cannot be declined',
      };
    }

    // Update participant status
    await prisma.oathParticipant.update({
      where: {
        oathId_userId: {
          oathId,
          userId,
        },
      },
      data: {
        status: 'DECLINED',
      },
    });

    // Cancel the oath if any participant declines
    await prisma.oath.update({
      where: { id: oathId },
      data: { status: 'CANCELLED' },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error declining oath invitation:', error);
    return {
      success: false,
      error: 'Failed to decline oath invitation. Please try again.',
    };
  }
}

/**
 * Get all oaths for a user
 */
export async function getUserOaths(
  userId: string,
  status?: OathStatus
): Promise<ActionResult> {
  try {
    const where: any = {
      participants: {
        some: {
          userId,
          status: 'ACCEPTED',
        },
      },
    };

    if (status) {
      where.status = status;
    }

    const oaths = await prisma.oath.findMany({
      where,
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                displayName: true,
                photoURL: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      data: oaths,
    };
  } catch (error) {
    console.error('Error fetching user oaths:', error);
    return {
      success: false,
      error: 'Failed to fetch oaths. Please try again.',
    };
  }
}

/**
 * Get oath invitations for a user
 */
export async function getUserOathInvitations(userId: string): Promise<ActionResult> {
  try {
    const participants = await prisma.oathParticipant.findMany({
      where: {
        userId,
        status: 'INVITED',
      },
      include: {
        oath: {
          include: {
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    displayName: true,
                    photoURL: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: 'desc',
      },
    });

    const invitations = participants.map((p) => p.oath);

    return {
      success: true,
      data: invitations,
    };
  } catch (error) {
    console.error('Error fetching oath invitations:', error);
    return {
      success: false,
      error: 'Failed to fetch invitations. Please try again.',
    };
  }
}

/**
 * Get a specific oath by ID
 */
export async function getOathById(oathId: string): Promise<ActionResult> {
  try {
    const oath = await prisma.oath.findUnique({
      where: { id: oathId },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                displayName: true,
                photoURL: true,
                credits: true,
              },
            },
          },
        },
        checkIns: {
          orderBy: {
            dueDate: 'desc',
          },
          take: 10, // Get last 10 check-ins
        },
      },
    });

    if (!oath) {
      return {
        success: false,
        error: 'Oath not found',
      };
    }

    return {
      success: true,
      data: oath,
    };
  } catch (error) {
    console.error('Error fetching oath:', error);
    return {
      success: false,
      error: 'Failed to fetch oath. Please try again.',
    };
  }
}

