// Quick API endpoint to test friends functionality
// This is for testing only - you'd normally use the UI

import { NextRequest, NextResponse } from 'next/server';
import { addFriendByEmail, acceptFriendRequest, getFriends, getPendingFriendRequests } from '@/actions/friends';
import { getUserByEmail } from '@/lib/db-helpers';

export async function POST(request: NextRequest) {
  try {
    const { action, email, friendshipId } = await request.json();

    // Get current user ID from email (in production, use auth session)
    const userEmail = 'stelaw469@gmail.com'; // Change this to test different users
    const currentUser = await getUserByEmail(userEmail);

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    switch (action) {
      case 'add':
        const addResult = await addFriendByEmail(currentUser.id, email);
        return NextResponse.json(addResult);

      case 'accept':
        const acceptResult = await acceptFriendRequest(currentUser.id, friendshipId);
        return NextResponse.json(acceptResult);

      case 'list':
        const friends = await getFriends(currentUser.id);
        return NextResponse.json(friends);

      case 'pending':
        const pending = await getPendingFriendRequests(currentUser.id);
        return NextResponse.json(pending);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Test friends error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

