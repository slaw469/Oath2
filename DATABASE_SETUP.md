# Database Setup Guide - Oath Platform

This guide covers the complete setup of the Supabase PostgreSQL database with Prisma ORM for the Oath platform.

## 📋 Prerequisites

- Node.js and npm installed
- Supabase account and project created
- Firebase Auth already configured

## 🔧 Step 1: Environment Variables

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase database credentials in `.env.local`:

```bash
# Supabase Connection (for application runtime)
DATABASE_URL="postgresql://postgres:p4z5jF158iTicEyW@db.bnmnwhegwoqrclocqqdn.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# Direct Connection (for migrations - bypasses connection pooler)
DIRECT_DATABASE_URL="postgresql://postgres:p4z5jF158iTicEyW@db.bnmnwhegwoqrclocqqdn.supabase.co:5432/postgres"
```

**Important Notes:**
- `DATABASE_URL` uses pgbouncer for connection pooling (recommended for serverless)
- `DIRECT_DATABASE_URL` is required for running migrations
- Replace `YOUR_PASSWORD` and `YOUR_PROJECT_REF` with your actual Supabase credentials

## 📦 Step 2: Install Dependencies

All necessary dependencies are already installed:
- ✅ `@prisma/client` - Prisma client for database queries
- ✅ `prisma` - Prisma CLI for migrations and schema management
- ✅ `@prisma/adapter-pg` - PostgreSQL adapter for Prisma
- ✅ `pg` - PostgreSQL driver

## 🗄️ Step 3: Run Database Migrations

Create the database schema by running migrations:

```bash
npx prisma migrate dev --name init
```

This will:
1. Create all tables in your Supabase database
2. Generate the Prisma client
3. Create a migration history in `prisma/migrations/`

**Alternative: For production deployment without creating migration files:**
```bash
npx prisma db push
```

## 🔄 Step 4: Regenerate Prisma Client (if needed)

If you make changes to the schema later:

```bash
npx prisma generate
```

## 🗺️ Database Schema Overview

### Core Tables

#### 1. **users**
Stores user information synced from Firebase Auth
- `id` - Internal user ID (CUID)
- `firebaseUid` - Links to Firebase Auth (unique)
- `email` - User email
- `displayName` - User's display name
- `photoURL` - Profile photo URL
- `credits` - Internal currency for stakes

#### 2. **friendships**
Manages friend relationships
- Status: `PENDING`, `ACCEPTED`, `REJECTED`, `BLOCKED`
- Bidirectional relationships (initiator/receiver)
- Prevents duplicates and self-friending

#### 3. **oaths**
Core contracts/commitments
- `title`, `description` - Oath details
- `type` - DAILY, WEEKLY, or CUSTOM
- `status` - DRAFT, PENDING, ACTIVE, COMPLETED, CANCELLED
- `startDate`, `endDate` - Duration
- `stakeAmount` - Credits at stake
- `verificationPrompt` - Instructions for AI verification

#### 4. **oath_participants**
Links users to oaths with their performance tracking
- `status` - INVITED, ACCEPTED, DECLINED, FORFEITED
- `successCount`, `failureCount` - Performance metrics
- `disputesWon`, `disputesLost` - Dispute history

#### 5. **check_ins**
Daily proof submissions
- `proofUrl`, `proofText`, `proofImageUrl` - Proof evidence
- `status` - Tracks verification state
- `aiVerificationResult` - AI's reasoning

#### 6. **disputes**
Contest AI verification decisions
- Rival makes final judgment
- Updates check-in status and participant stats

#### 7. **notifications**
In-app notifications for all events

## 🚀 Step 5: Integration with Your App

### A. Sync Firebase Users with Database

In your app layout or auth provider, use the `useDbUser` hook:

```typescript
// src/app/layout.tsx or your auth provider
'use client';

import { useDbUser } from '@/hooks/useDbUser';

function YourComponent() {
  const { dbUser, loading, error } = useDbUser();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  // dbUser contains the database user record with internal ID and credits
  console.log('DB User:', dbUser);
}
```

This hook automatically:
- Calls the `/api/auth/sync-user` endpoint
- Creates or updates the user in the database
- Returns the database user record

### B. Use Server Actions

All database operations are handled through server actions in `src/actions/`:

#### Friends Actions (`src/actions/friends.ts`)
```typescript
import { addFriendByEmail, getFriends, acceptFriendRequest } from '@/actions/friends';

// Add a friend
const result = await addFriendByEmail(currentUserId, 'friend@example.com');

// Get all friends
const friends = await getFriends(currentUserId);

// Accept friend request
await acceptFriendRequest(currentUserId, friendshipId);
```

#### Oath Actions (`src/actions/oaths.ts`)
```typescript
import { createOath, getUserOaths, acceptOathInvitation } from '@/actions/oaths';

// Create a new oath
const oath = await createOath(userId, {
  title: 'Daily LeetCode',
  description: 'Solve 1 LeetCode problem per day',
  type: 'DAILY',
  startDate: new Date(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  stakeAmount: 50,
  verificationPrompt: 'Check if the user submitted a LeetCode solution link',
  participantUserIds: [userId, friendUserId],
});

// Get user's oaths
const oaths = await getUserOaths(userId, 'ACTIVE');

// Accept an oath invitation
await acceptOathInvitation(userId, oathId);
```

#### Check-in Actions (`src/actions/checkins.ts`)
```typescript
import { submitCheckIn, createDispute, resolveDispute } from '@/actions/checkins';

// Submit daily proof
await submitCheckIn({
  oathId,
  userId,
  dueDate: new Date(),
  proofUrl: 'https://leetcode.com/submissions/...',
  proofText: 'Solved Two Sum problem',
});

// Dispute AI verification
await createDispute(checkInId, userId, 'I definitely completed this');

// Rival resolves dispute
await resolveDispute(disputeId, judgeId, true, 'Looks good to me');
```

## 🔍 Prisma Studio (Database GUI)

View and edit your database visually:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- Browse all tables
- View/edit records
- Test queries

## 📊 Useful Prisma Commands

```bash
# View current database schema
npx prisma db pull

# Format your schema file
npx prisma format

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Create a new migration after schema changes
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# Validate schema
npx prisma validate
```

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use Supabase Row Level Security (RLS)** - For additional protection
3. **Validate all inputs** - Server actions include validation
4. **Rate limit API routes** - Prevent abuse
5. **Use connection pooling** - Already configured with pgbouncer

## 🧪 Testing the Setup

Create a test script to verify everything works:

```typescript
// test-db.ts
import prisma from '@/lib/prisma';

async function testConnection() {
  try {
    const count = await prisma.user.count();
    console.log('✅ Database connection successful!');
    console.log(`📊 User count: ${count}`);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
```

Run with:
```bash
npx tsx test-db.ts
```

## 🎯 Next Steps

1. **Set up environment variables** in `.env.local`
2. **Run migrations** with `npx prisma migrate dev`
3. **Test the sync** by logging in with Firebase Auth
4. **Implement friends UI** using the friends server actions
5. **Build oath creation flow** using the oath server actions
6. **Add AI verification integration** (OpenAI, Anthropic, etc.)

## 🆘 Troubleshooting

### "Environment variable not found: DATABASE_URL"
- Ensure `.env.local` exists with `DATABASE_URL` set
- Restart your Next.js dev server after adding environment variables

### "Can't reach database server"
- Check your Supabase project is not paused
- Verify the database password is correct
- Ensure your IP is allowed in Supabase (should be by default)

### "Prisma Client not generated"
- Run `npx prisma generate`
- Restart your IDE/editor

### Migration errors
- Use `DIRECT_DATABASE_URL` without pgbouncer for migrations
- Ensure no active connections when running migrations

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Firebase Auth](https://firebase.google.com/docs/auth)

---

**Need help?** Check the server action implementations in `src/actions/` for usage examples.

