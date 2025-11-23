'use server';

// Server Actions for Check-In Management
// Handles daily proof submissions, AI verification, and disputes

import prisma from '@/lib/prisma';
import { CheckInStatus, DisputeStatus } from '@prisma/client';

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SubmitCheckInInput {
  oathId: string;
  userId: string;
  dueDate: Date;
  proofUrl?: string;
  proofText?: string;
  proofImageUrl?: string;
}

export interface CreateCheckInInput {
  oathId: string;
  userId: string;
  proofUrl: string;
  notes?: string;
}

/**
 * Create a new check-in with proof (simplified for upload modal)
 */
export async function createCheckIn(input: CreateCheckInInput): Promise<ActionResult> {
  try {
    // Validate that user is a participant in the oath
    const participant = await prisma.oathParticipant.findUnique({
      where: {
        oathId_userId: {
          oathId: input.oathId,
          userId: input.userId,
        },
      },
      include: {
        oath: true,
      },
    });

    if (!participant || participant.status !== 'ACCEPTED') {
      return {
        success: false,
        error: 'You are not a participant in this oath',
      };
    }

    // Check if oath is active
    if (participant.oath.status !== 'ACTIVE') {
      return {
        success: false,
        error: 'This oath is not currently active',
      };
    }

    // Create check-in with today's date as due date
    const now = new Date();
    const checkIn = await prisma.checkIn.create({
      data: {
        oathId: input.oathId,
        userId: input.userId,
        dueDate: now,
        proofUrl: input.proofUrl,
        proofText: input.notes,
        submittedAt: now,
        status: 'PENDING_VERIFICATION',
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            email: true,
            photoURL: true,
          },
        },
      },
    });

    // Increment success count for participant
    await prisma.oathParticipant.update({
      where: {
        oathId_userId: {
          oathId: input.oathId,
          userId: input.userId,
        },
      },
      data: {
        successCount: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      data: checkIn,
    };
  } catch (error) {
    console.error('Error creating check-in:', error);
    return {
      success: false,
      error: 'Failed to create check-in',
    };
  }
}

/**
 * Submit proof for a check-in
 */
export async function submitCheckIn(input: SubmitCheckInInput): Promise<ActionResult> {
  try {
    // Validate that user is a participant in the oath
    const participant = await prisma.oathParticipant.findUnique({
      where: {
        oathId_userId: {
          oathId: input.oathId,
          userId: input.userId,
        },
      },
      include: {
        oath: true,
      },
    });

    if (!participant || participant.status !== 'ACCEPTED') {
      return {
        success: false,
        error: 'You are not a participant in this oath',
      };
    }

    // Check if oath is active
    if (participant.oath.status !== 'ACTIVE') {
      return {
        success: false,
        error: 'This oath is not currently active',
      };
    }

    // Validate at least one proof type is provided
    if (!input.proofUrl && !input.proofText && !input.proofImageUrl) {
      return {
        success: false,
        error: 'Please provide at least one type of proof',
      };
    }

    // Upsert check-in (create or update)
    const checkIn = await prisma.checkIn.upsert({
      where: {
        oathId_userId_dueDate: {
          oathId: input.oathId,
          userId: input.userId,
          dueDate: input.dueDate,
        },
      },
      update: {
        proofUrl: input.proofUrl,
        proofText: input.proofText,
        proofImageUrl: input.proofImageUrl,
        submittedAt: new Date(),
        status: 'PENDING_VERIFICATION',
      },
      create: {
        oathId: input.oathId,
        userId: input.userId,
        dueDate: input.dueDate,
        proofUrl: input.proofUrl,
        proofText: input.proofText,
        proofImageUrl: input.proofImageUrl,
        submittedAt: new Date(),
        status: 'PENDING_VERIFICATION',
      },
    });

    // TODO: In production, trigger AI verification here
    // For now, we'll have a separate action to simulate AI verification

    return {
      success: true,
      data: checkIn,
    };
  } catch (error) {
    console.error('Error submitting check-in:', error);
    return {
      success: false,
      error: 'Failed to submit check-in. Please try again.',
    };
  }
}

/**
 * Simulate AI verification (in production, this would be called by an AI service)
 */
export async function verifyCheckIn(
  checkInId: string,
  isComplete: boolean,
  reasoning: string
): Promise<ActionResult> {
  try {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id: checkInId },
      include: {
        oath: true,
        user: true,
      },
    });

    if (!checkIn) {
      return {
        success: false,
        error: 'Check-in not found',
      };
    }

    if (checkIn.status !== 'PENDING_VERIFICATION') {
      return {
        success: false,
        error: 'This check-in has already been verified',
      };
    }

    // Update check-in with AI verification result
    const updatedCheckIn = await prisma.checkIn.update({
      where: { id: checkInId },
      data: {
        status: isComplete ? 'VERIFIED_COMPLETE' : 'VERIFIED_INCOMPLETE',
        aiVerificationResult: reasoning,
        aiVerifiedAt: new Date(),
      },
    });

    // Update participant stats
    const participant = await prisma.oathParticipant.findUnique({
      where: {
        oathId_userId: {
          oathId: checkIn.oathId,
          userId: checkIn.userId,
        },
      },
    });

    if (participant) {
      await prisma.oathParticipant.update({
        where: { id: participant.id },
        data: {
          successCount: isComplete ? { increment: 1 } : participant.successCount,
          failureCount: !isComplete ? { increment: 1 } : participant.failureCount,
        },
      });
    }

    return {
      success: true,
      data: updatedCheckIn,
    };
  } catch (error) {
    console.error('Error verifying check-in:', error);
    return {
      success: false,
      error: 'Failed to verify check-in. Please try again.',
    };
  }
}

/**
 * Create a dispute for a check-in
 */
export async function createDispute(
  checkInId: string,
  userId: string,
  reason: string
): Promise<ActionResult> {
  try {
    // Find the check-in
    const checkIn = await prisma.checkIn.findUnique({
      where: { id: checkInId },
      include: {
        oath: {
          include: {
            participants: true,
          },
        },
        user: true,
      },
    });

    if (!checkIn) {
      return {
        success: false,
        error: 'Check-in not found',
      };
    }

    // Verify the user owns this check-in
    if (checkIn.userId !== userId) {
      return {
        success: false,
        error: 'You can only dispute your own check-ins',
      };
    }

    // Check if check-in is verified as incomplete
    if (checkIn.status !== 'VERIFIED_INCOMPLETE') {
      return {
        success: false,
        error: 'You can only dispute check-ins that were marked incomplete',
      };
    }

    // Check if dispute already exists
    const existingDispute = await prisma.dispute.findUnique({
      where: { checkInId },
    });

    if (existingDispute) {
      return {
        success: false,
        error: 'A dispute already exists for this check-in',
      };
    }

    // Find the rival (other participant)
    // In 1v1, this is straightforward. For multiple participants, this would need more logic
    const rival = checkIn.oath.participants.find((p) => p.userId !== userId);

    if (!rival) {
      return {
        success: false,
        error: 'No rival found to judge this dispute',
      };
    }

    // Create the dispute
    const dispute = await prisma.dispute.create({
      data: {
        checkInId,
        disputerId: userId,
        judgerId: rival.userId,
        reason,
        status: 'PENDING',
      },
      include: {
        checkIn: true,
      },
    });

    // Update check-in status
    await prisma.checkIn.update({
      where: { id: checkInId },
      data: {
        status: 'DISPUTED',
      },
    });

    // Create notification for the judge
    await prisma.notification.create({
      data: {
        type: 'DISPUTE_REQUIRES_JUDGMENT',
        senderId: userId,
        receiverId: rival.userId,
        title: 'Dispute Requires Your Judgment',
        message: `${checkIn.user.displayName || checkIn.user.email} disputed an AI verification in "${checkIn.oath.title}"`,
        actionUrl: `/dispute/${dispute.id}`,
      },
    });

    return {
      success: true,
      data: dispute,
    };
  } catch (error) {
    console.error('Error creating dispute:', error);
    return {
      success: false,
      error: 'Failed to create dispute. Please try again.',
    };
  }
}

/**
 * Resolve a dispute (rival makes final decision)
 */
export async function resolveDispute(
  disputeId: string,
  judgeId: string,
  isComplete: boolean,
  judgeNotes?: string
): Promise<ActionResult> {
  try {
    // Find the dispute
    const dispute = await prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        checkIn: {
          include: {
            oath: true,
            user: true,
          },
        },
      },
    });

    if (!dispute) {
      return {
        success: false,
        error: 'Dispute not found',
      };
    }

    // Verify the judge
    if (dispute.judgerId !== judgeId) {
      return {
        success: false,
        error: 'You are not authorized to judge this dispute',
      };
    }

    // Check if already resolved
    if (dispute.status !== 'PENDING') {
      return {
        success: false,
        error: 'This dispute has already been resolved',
      };
    }

    // Update dispute
    const updatedDispute = await prisma.dispute.update({
      where: { id: disputeId },
      data: {
        status: 'RESOLVED',
        outcome: isComplete ? 'COMPLETE' : 'INCOMPLETE',
        judgeNotes,
        resolvedAt: new Date(),
      },
    });

    // Update check-in status
    await prisma.checkIn.update({
      where: { id: dispute.checkInId },
      data: {
        status: isComplete ? 'RESOLVED_COMPLETE' : 'RESOLVED_INCOMPLETE',
      },
    });

    // Update participant stats
    const participant = await prisma.oathParticipant.findUnique({
      where: {
        oathId_userId: {
          oathId: dispute.checkIn.oathId,
          userId: dispute.checkIn.userId,
        },
      },
    });

    if (participant) {
      if (isComplete) {
        // Dispute won - convert failure to success
        await prisma.oathParticipant.update({
          where: { id: participant.id },
          data: {
            successCount: { increment: 1 },
            failureCount: { decrement: 1 },
            disputesWon: { increment: 1 },
          },
        });
      } else {
        // Dispute lost
        await prisma.oathParticipant.update({
          where: { id: participant.id },
          data: {
            disputesLost: { increment: 1 },
          },
        });
      }
    }

    // Create notification for the disputer
    await prisma.notification.create({
      data: {
        type: 'DISPUTE_RESOLVED',
        senderId: judgeId,
        receiverId: dispute.disputerId,
        title: 'Dispute Resolved',
        message: `Your dispute in "${dispute.checkIn.oath.title}" has been resolved: ${isComplete ? 'Complete' : 'Incomplete'}`,
        actionUrl: `/oath/${dispute.checkIn.oathId}`,
      },
    });

    return {
      success: true,
      data: updatedDispute,
    };
  } catch (error) {
    console.error('Error resolving dispute:', error);
    return {
      success: false,
      error: 'Failed to resolve dispute. Please try again.',
    };
  }
}

/**
 * Get check-ins for an oath
 */
export async function getOathCheckIns(
  oathId: string,
  userId?: string
): Promise<ActionResult> {
  try {
    const where: any = { oathId };
    
    if (userId) {
      where.userId = userId;
    }

    const checkIns = await prisma.checkIn.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoURL: true,
          },
        },
        dispute: true,
      },
      orderBy: {
        dueDate: 'desc',
      },
    });

    return {
      success: true,
      data: checkIns,
    };
  } catch (error) {
    console.error('Error fetching check-ins:', error);
    return {
      success: false,
      error: 'Failed to fetch check-ins. Please try again.',
    };
  }
}

/**
 * Get disputes that require judgment from a user
 */
export async function getPendingDisputesForJudge(judgeId: string): Promise<ActionResult> {
  try {
    const disputes = await prisma.dispute.findMany({
      where: {
        judgerId: judgeId,
        status: 'PENDING',
      },
      include: {
        checkIn: {
          include: {
            oath: true,
            user: true,
          },
        },
        disputer: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoURL: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      data: disputes,
    };
  } catch (error) {
    console.error('Error fetching pending disputes:', error);
    return {
      success: false,
      error: 'Failed to fetch disputes. Please try again.',
    };
  }
}

