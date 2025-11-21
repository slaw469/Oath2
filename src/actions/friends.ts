'use server';

// Server Actions for Friends Functionality
// Handles friend requests, acceptance, and listing

import prisma from '@/lib/prisma';
import { FriendshipStatus } from '@prisma/client';
import { getUserByEmail } from '@/lib/db-helpers';

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Add a friend by email
 * Creates a PENDING friendship request
 */
export async function addFriendByEmail(
  currentUserId: string,
  friendEmail: string
): Promise<ActionResult> {
  try {
    // Validate inputs
    if (!currentUserId || !friendEmail) {
      return {
        success: false,
        error: 'User ID and friend email are required',
      };
    }

    // Normalize email
    const normalizedEmail = friendEmail.toLowerCase().trim();

    // Get current user to check their email
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser) {
      return {
        success: false,
        error: 'Current user not found',
      };
    }

    // Check if trying to friend themselves
    if (currentUser.email.toLowerCase() === normalizedEmail) {
      return {
        success: false,
        error: 'You cannot add yourself as a friend',
      };
    }

    // Find the user by email
    const friendUser = await getUserByEmail(normalizedEmail);

    if (!friendUser) {
      // Don't leak information about whether user exists
      return {
        success: false,
        error: 'User not found. Please check the email address.',
      };
    }

    // Check if friendship already exists (in either direction)
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { initiatorId: currentUserId, receiverId: friendUser.id },
          { initiatorId: friendUser.id, receiverId: currentUserId },
        ],
      },
    });

    if (existingFriendship) {
      if (existingFriendship.status === 'ACCEPTED') {
        return {
          success: false,
          error: 'You are already friends with this user',
        };
      } else if (existingFriendship.status === 'PENDING') {
        return {
          success: false,
          error: 'A friend request is already pending with this user',
        };
      } else if (existingFriendship.status === 'BLOCKED') {
        return {
          success: false,
          error: 'Unable to send friend request to this user',
        };
      }
    }

    // Create the friendship request
    const friendship = await prisma.friendship.create({
      data: {
        initiatorId: currentUserId,
        receiverId: friendUser.id,
        status: 'PENDING',
      },
      include: {
        receiver: {
          select: {
            id: true,
            displayName: true,
            email: true,
            photoURL: true,
          },
        },
      },
    });

    // Create notification for the receiver
    await prisma.notification.create({
      data: {
        type: 'FRIEND_REQUEST',
        senderId: currentUserId,
        receiverId: friendUser.id,
        title: 'New Friend Request',
        message: `${currentUser.displayName || currentUser.email} sent you a friend request`,
        actionUrl: '/friends',
      },
    });

    return {
      success: true,
      data: friendship,
    };
  } catch (error) {
    console.error('Error adding friend:', error);
    return {
      success: false,
      error: 'Failed to send friend request. Please try again.',
    };
  }
}

/**
 * Accept a friend request
 */
export async function acceptFriendRequest(
  currentUserId: string,
  friendshipId: string
): Promise<ActionResult> {
  try {
    // Find the friendship
    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
      include: {
        initiator: true,
        receiver: true,
      },
    });

    if (!friendship) {
      return {
        success: false,
        error: 'Friend request not found',
      };
    }

    // Verify the current user is the receiver
    if (friendship.receiverId !== currentUserId) {
      return {
        success: false,
        error: 'You are not authorized to accept this request',
      };
    }

    // Check if already accepted
    if (friendship.status === 'ACCEPTED') {
      return {
        success: false,
        error: 'This friend request has already been accepted',
      };
    }

    // Check if not pending
    if (friendship.status !== 'PENDING') {
      return {
        success: false,
        error: 'This friend request is no longer valid',
      };
    }

    // Update the friendship status
    const updatedFriendship = await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: 'ACCEPTED' },
      include: {
        initiator: {
          select: {
            id: true,
            displayName: true,
            email: true,
            photoURL: true,
          },
        },
        receiver: {
          select: {
            id: true,
            displayName: true,
            email: true,
            photoURL: true,
          },
        },
      },
    });

    // Create notification for the initiator
    await prisma.notification.create({
      data: {
        type: 'FRIEND_ACCEPTED',
        senderId: currentUserId,
        receiverId: friendship.initiatorId,
        title: 'Friend Request Accepted',
        message: `${friendship.receiver.displayName || friendship.receiver.email} accepted your friend request`,
        actionUrl: '/friends',
      },
    });

    return {
      success: true,
      data: updatedFriendship,
    };
  } catch (error) {
    console.error('Error accepting friend request:', error);
    return {
      success: false,
      error: 'Failed to accept friend request. Please try again.',
    };
  }
}

/**
 * Reject a friend request
 */
export async function rejectFriendRequest(
  currentUserId: string,
  friendshipId: string
): Promise<ActionResult> {
  try {
    // Find the friendship
    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      return {
        success: false,
        error: 'Friend request not found',
      };
    }

    // Verify the current user is the receiver
    if (friendship.receiverId !== currentUserId) {
      return {
        success: false,
        error: 'You are not authorized to reject this request',
      };
    }

    // Update the friendship status
    await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: 'REJECTED' },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    return {
      success: false,
      error: 'Failed to reject friend request. Please try again.',
    };
  }
}

/**
 * Remove a friend (delete the friendship)
 */
export async function removeFriend(
  currentUserId: string,
  friendshipId: string
): Promise<ActionResult> {
  try {
    // Find the friendship
    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) {
      return {
        success: false,
        error: 'Friendship not found',
      };
    }

    // Verify the current user is part of this friendship
    if (friendship.initiatorId !== currentUserId && friendship.receiverId !== currentUserId) {
      return {
        success: false,
        error: 'You are not authorized to remove this friendship',
      };
    }

    // Delete the friendship
    await prisma.friendship.delete({
      where: { id: friendshipId },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error removing friend:', error);
    return {
      success: false,
      error: 'Failed to remove friend. Please try again.',
    };
  }
}

/**
 * Get all friends for the current user (accepted friendships only)
 */
export async function getFriends(currentUserId: string): Promise<ActionResult> {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { initiatorId: currentUserId, status: 'ACCEPTED' },
          { receiverId: currentUserId, status: 'ACCEPTED' },
        ],
      },
      include: {
        initiator: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoURL: true,
            createdAt: true,
          },
        },
        receiver: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoURL: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Map to return friend user objects with friendship ID
    const friends = friendships.map((friendship) => {
      const friend = friendship.initiatorId === currentUserId 
        ? friendship.receiver 
        : friendship.initiator;
      
      return {
        friendshipId: friendship.id,
        ...friend,
      };
    });

    return {
      success: true,
      data: friends,
    };
  } catch (error) {
    console.error('Error fetching friends:', error);
    return {
      success: false,
      error: 'Failed to fetch friends. Please try again.',
    };
  }
}

/**
 * Get pending friend requests (received by current user)
 */
export async function getPendingFriendRequests(currentUserId: string): Promise<ActionResult> {
  try {
    const pendingRequests = await prisma.friendship.findMany({
      where: {
        receiverId: currentUserId,
        status: 'PENDING',
      },
      include: {
        initiator: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoURL: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const requests = pendingRequests.map((request) => ({
      friendshipId: request.id,
      requestCreatedAt: request.createdAt,
      ...request.initiator,
    }));

    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error('Error fetching pending friend requests:', error);
    return {
      success: false,
      error: 'Failed to fetch friend requests. Please try again.',
    };
  }
}

/**
 * Get sent friend requests (initiated by current user, still pending)
 */
export async function getSentFriendRequests(currentUserId: string): Promise<ActionResult> {
  try {
    const sentRequests = await prisma.friendship.findMany({
      where: {
        initiatorId: currentUserId,
        status: 'PENDING',
      },
      include: {
        receiver: {
          select: {
            id: true,
            email: true,
            displayName: true,
            photoURL: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const requests = sentRequests.map((request) => ({
      friendshipId: request.id,
      requestCreatedAt: request.createdAt,
      ...request.receiver,
    }));

    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error('Error fetching sent friend requests:', error);
    return {
      success: false,
      error: 'Failed to fetch sent friend requests. Please try again.',
    };
  }
}

/**
 * Search for users by email (for adding friends)
 * Only returns exact matches to avoid leaking user information
 */
export async function searchUserByEmail(
  currentUserId: string,
  email: string
): Promise<ActionResult> {
  try {
    const normalizedEmail = email.toLowerCase().trim();

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Don't allow searching for self
    if (currentUser.email.toLowerCase() === normalizedEmail) {
      return {
        success: false,
        error: 'Cannot search for yourself',
      };
    }

    // Find user by exact email match
    const user = await getUserByEmail(normalizedEmail);

    if (!user) {
      return {
        success: false,
        error: 'No user found with that email',
      };
    }

    // Check if already friends or request pending
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { initiatorId: currentUserId, receiverId: user.id },
          { initiatorId: user.id, receiverId: currentUserId },
        ],
      },
    });

    let relationshipStatus = 'none';
    if (existingFriendship) {
      relationshipStatus = existingFriendship.status.toLowerCase();
    }

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        relationshipStatus,
      },
    };
  } catch (error) {
    console.error('Error searching user:', error);
    return {
      success: false,
      error: 'Failed to search for user. Please try again.',
    };
  }
}

