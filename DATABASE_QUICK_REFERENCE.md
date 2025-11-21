# Database Quick Reference - Oath Platform

## 🚀 Quick Start Commands

```bash
# 1. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# 2. Run migrations
npx prisma migrate dev --name init

# 3. Open Prisma Studio (database GUI)
npx prisma studio

# 4. Start your Next.js app
npm run dev
```

## 📦 Common Server Actions

### Friends

```typescript
import { 
  addFriendByEmail, 
  acceptFriendRequest, 
  getFriends,
  getPendingFriendRequests,
  removeFriend 
} from '@/actions/friends';

// Add friend
await addFriendByEmail(userId, 'friend@email.com');

// Get friends list
const { data: friends } = await getFriends(userId);

// Get pending requests
const { data: requests } = await getPendingFriendRequests(userId);

// Accept request
await acceptFriendRequest(userId, friendshipId);

// Remove friend
await removeFriend(userId, friendshipId);
```

### Oaths

```typescript
import { 
  createOath, 
  getUserOaths, 
  acceptOathInvitation,
  getOathById 
} from '@/actions/oaths';

// Create oath
await createOath(userId, {
  title: 'Daily LeetCode',
  description: 'Solve 1 problem per day',
  type: 'DAILY',
  startDate: new Date(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  stakeAmount: 50,
  verificationPrompt: 'Verify LeetCode submission link',
  participantUserIds: [userId, friendId],
});

// Get user's active oaths
const { data: oaths } = await getUserOaths(userId, 'ACTIVE');

// Accept invitation
await acceptOathInvitation(userId, oathId);

// Get specific oath
const { data: oath } = await getOathById(oathId);
```

### Check-ins

```typescript
import { 
  submitCheckIn, 
  createDispute, 
  resolveDispute,
  getOathCheckIns 
} from '@/actions/checkins';

// Submit proof
await submitCheckIn({
  oathId,
  userId,
  dueDate: new Date(),
  proofUrl: 'https://leetcode.com/...',
  proofText: 'Solved Two Sum',
});

// Create dispute
await createDispute(checkInId, userId, 'I completed this!');

// Resolve dispute (rival)
await resolveDispute(disputeId, judgeId, true, 'Approved');

// Get all check-ins for an oath
const { data: checkIns } = await getOathCheckIns(oathId);
```

## 🗄️ Database Schema Cheat Sheet

### Enums

```typescript
// Friendship Status
'PENDING' | 'ACCEPTED' | 'REJECTED' | 'BLOCKED'

// Oath Status
'DRAFT' | 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'

// Oath Type
'DAILY' | 'WEEKLY' | 'CUSTOM'

// Participant Status
'INVITED' | 'ACCEPTED' | 'DECLINED' | 'FORFEITED'

// Check-in Status
'PENDING_SUBMISSION' | 'PENDING_VERIFICATION' | 
'VERIFIED_COMPLETE' | 'VERIFIED_INCOMPLETE' | 
'DISPUTED' | 'RESOLVED_COMPLETE' | 'RESOLVED_INCOMPLETE'

// Dispute Status
'PENDING' | 'RESOLVED' | 'EXPIRED'

// Dispute Outcome
'COMPLETE' | 'INCOMPLETE'

// Notification Type
'FRIEND_REQUEST' | 'FRIEND_ACCEPTED' | 'OATH_INVITE' | 
'OATH_ACCEPTED' | 'OATH_STARTING_SOON' | 'CHECKIN_REMINDER' | 
'CHECKIN_MISSED' | 'DISPUTE_RAISED' | 'DISPUTE_REQUIRES_JUDGMENT' | 
'DISPUTE_RESOLVED' | 'OATH_COMPLETED' | 'STAKE_SETTLED'
```

### Key Relationships

```
User
├── friendshipsInitiated → Friendship
├── friendshipsReceived → Friendship
├── oathsParticipating → OathParticipant
├── checkIns → CheckIn
└── disputes → Dispute

Oath
├── participants → OathParticipant
└── checkIns → CheckIn

CheckIn
└── dispute → Dispute
```

## 🔧 Helper Functions

```typescript
import {
  getOrCreateUserFromFirebase,
  getUserByEmail,
  getUserById,
  areFriends,
  getUserFriends,
  updateUserCredits,
} from '@/lib/db-helpers';

// Sync Firebase user with DB
const dbUser = await getOrCreateUserFromFirebase(firebaseUser);

// Find user by email
const user = await getUserByEmail('user@email.com');

// Check friendship
const friends = await areFriends(userId1, userId2);

// Get all friends
const friendsList = await getUserFriends(userId);

// Update credits
await updateUserCredits(userId, 100); // add 100 credits
await updateUserCredits(userId, -50); // subtract 50 credits
```

## 🎣 React Hook

```typescript
import { useDbUser } from '@/hooks/useDbUser';

function MyComponent() {
  const { dbUser, loading, error } = useDbUser();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dbUser) return <div>Not logged in</div>;
  
  return (
    <div>
      <p>Welcome {dbUser.displayName}!</p>
      <p>Credits: {dbUser.credits}</p>
    </div>
  );
}
```

## 📊 Direct Prisma Queries (if needed)

```typescript
import prisma from '@/lib/prisma';

// Find user
const user = await prisma.user.findUnique({
  where: { email: 'user@email.com' },
});

// Create friendship
const friendship = await prisma.friendship.create({
  data: {
    initiatorId: userId1,
    receiverId: userId2,
    status: 'PENDING',
  },
});

// Query with relations
const oath = await prisma.oath.findUnique({
  where: { id: oathId },
  include: {
    participants: {
      include: {
        user: true,
      },
    },
    checkIns: true,
  },
});

// Aggregate queries
const stats = await prisma.oathParticipant.aggregate({
  where: { userId },
  _sum: {
    successCount: true,
    failureCount: true,
  },
});
```

## 🔍 Useful Prisma Commands

```bash
# Database management
npx prisma migrate dev       # Create and apply migration
npx prisma migrate deploy    # Apply migrations (production)
npx prisma db push          # Push schema without migration
npx prisma db pull          # Pull schema from database

# Code generation
npx prisma generate         # Generate Prisma Client

# Development tools
npx prisma studio          # Open database GUI
npx prisma format          # Format schema file
npx prisma validate        # Validate schema

# Reset (WARNING: deletes data)
npx prisma migrate reset   # Reset database
```

## 🚨 Common Errors & Solutions

### "Prisma Client not found"
```bash
npx prisma generate
```

### "DATABASE_URL not found"
Check `.env.local` file exists and contains `DATABASE_URL`

### "Can't reach database"
- Check Supabase project status
- Verify password in DATABASE_URL
- Use DIRECT_DATABASE_URL for migrations

### "Unique constraint failed"
- User already exists (use getOrCreate helper)
- Friendship already exists (check first)
- Duplicate check-in submission

## 💡 Pro Tips

1. **Always use server actions** - Don't expose Prisma client to client-side code
2. **Check result.success** - All server actions return `{ success, data?, error? }`
3. **Use transactions** - For operations that must succeed together
4. **Index your queries** - Schema already includes common indexes
5. **Batch operations** - Use `createMany`, `updateMany` for performance

## 📈 Example: Complete Oath Flow

```typescript
// 1. User creates oath
const oathResult = await createOath(creatorId, {
  title: 'Morning Workout',
  description: '30 min workout every morning',
  type: 'DAILY',
  startDate: tomorrow,
  endDate: in30Days,
  stakeAmount: 100,
  verificationPrompt: 'Check workout photo/video',
  participantUserIds: [creatorId, friendId],
});

// 2. Friend accepts invitation
await acceptOathInvitation(friendId, oathResult.data.id);

// 3. Daily: User submits check-in
await submitCheckIn({
  oathId: oathResult.data.id,
  userId: creatorId,
  dueDate: today,
  proofImageUrl: uploadedPhotoUrl,
  proofText: '30 min HIIT workout',
});

// 4. AI verifies (or manual for now)
await verifyCheckIn(checkInId, true, 'Valid workout proof');

// 5. If AI says incomplete, user can dispute
if (aiSaysIncomplete) {
  await createDispute(checkInId, userId, 'This was definitely a workout!');
}

// 6. Rival resolves dispute
await resolveDispute(disputeId, rivalId, true, 'I see the proof, approved');
```

---

**Quick Tip**: Use Prisma Studio (`npx prisma studio`) to visually explore your data while developing!

