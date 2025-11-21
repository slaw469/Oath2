// Database Helper Functions
// Integrates Firebase Auth with Prisma Database

import { User as FirebaseUser } from 'firebase/auth';
import prisma from './prisma';

/**
 * Get or create a user in the database from Firebase auth
 * This should be called after authentication to ensure the user exists in DB
 */
export async function getOrCreateUserFromFirebase(firebaseUser: FirebaseUser) {
  if (!firebaseUser) {
    throw new Error('Firebase user is required');
  }

  // Try to find existing user by Firebase UID
  let user = await prisma.user.findUnique({
    where: { firebaseUid: firebaseUser.uid },
  });

  // If user doesn't exist, create them
  if (!user) {
    user = await prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      },
    });
  } else {
    // Update user info if it changed
    const updates: any = {};
    if (firebaseUser.displayName && firebaseUser.displayName !== user.displayName) {
      updates.displayName = firebaseUser.displayName;
    }
    if (firebaseUser.photoURL && firebaseUser.photoURL !== user.photoURL) {
      updates.photoURL = firebaseUser.photoURL;
    }
    
    if (Object.keys(updates).length > 0) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: updates,
      });
    }
  }

  return user;
}

/**
 * Get user from database by Firebase UID
 */
export async function getUserByFirebaseUid(firebaseUid: string) {
  return await prisma.user.findUnique({
    where: { firebaseUid },
  });
}

/**
 * Get user from database by email
 */
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Get user from database by internal ID
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

/**
 * Update user credits
 */
export async function updateUserCredits(userId: string, amount: number) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        increment: amount,
      },
    },
  });
}

/**
 * Check if two users are friends
 */
export async function areFriends(userId1: string, userId2: string): Promise<boolean> {
  const friendship = await prisma.friendship.findFirst({
    where: {
      OR: [
        { initiatorId: userId1, receiverId: userId2, status: 'ACCEPTED' },
        { initiatorId: userId2, receiverId: userId1, status: 'ACCEPTED' },
      ],
    },
  });

  return !!friendship;
}

/**
 * Get all accepted friends for a user
 */
export async function getUserFriends(userId: string) {
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { initiatorId: userId, status: 'ACCEPTED' },
        { receiverId: userId, status: 'ACCEPTED' },
      ],
    },
    include: {
      initiator: true,
      receiver: true,
    },
  });

  // Return the friend user objects (not the current user)
  return friendships.map((friendship) => {
    return friendship.initiatorId === userId ? friendship.receiver : friendship.initiator;
  });
}

