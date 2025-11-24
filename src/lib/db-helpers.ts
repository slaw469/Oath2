// Database Helper Functions
// Integrates Firebase Auth with Prisma Database

import { User as FirebaseUser } from 'firebase/auth';
import prisma from './prisma';

// Generate a human-friendly friend code (e.g., 8 chars, no confusing letters)
function generateFriendCode(length = 8): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I/O/0/1
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * Get or create a user in the database from Firebase auth
 * This should be called after authentication to ensure the user exists in DB
 */
export async function getOrCreateUserFromFirebase(firebaseUser: FirebaseUser) {
  if (!firebaseUser) {
    throw new Error('Firebase user is required');
  }

  // Use an upsert to avoid race conditions on the unique firebaseUid constraint
  const user = await prisma.user.upsert({
    where: { firebaseUid: firebaseUser.uid },
    create: {
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      friendCode: generateFriendCode(),
      // credits and gems default to 0 via schema defaults
    },
    update: {
      // Only update fields when Firebase has a value; undefined fields are ignored by Prisma
      email: firebaseUser.email || undefined,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
    },
  });

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
 * Get user from database by friend code
 */
export async function getUserByFriendCode(friendCode: string) {
  return await prisma.user.findUnique({
    where: { friendCode },
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

