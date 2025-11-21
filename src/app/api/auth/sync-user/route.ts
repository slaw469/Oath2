// API Route to sync Firebase user with database
// This ensures every authenticated user has a corresponding DB record

import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUserFromFirebase } from '@/lib/db-helpers';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, email, displayName, photoURL } = body;

    if (!firebaseUid || !email) {
      return NextResponse.json(
        { error: 'Firebase UID and email are required' },
        { status: 400 }
      );
    }

    // Create a minimal Firebase User object for the helper function
    const firebaseUser = {
      uid: firebaseUid,
      email,
      displayName: displayName || null,
      photoURL: photoURL || null,
    } as any;

    // Get or create user in database
    const user = await getOrCreateUserFromFirebase(firebaseUser);

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user with database' },
      { status: 500 }
    );
  }
}

