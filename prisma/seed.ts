// Database Seed Script
// Run with: npm run db:seed
// This creates initial test data for development

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Example: Create test users
  // Note: In production, users are created via Firebase Auth sync
  
  console.log('✅ Seed completed!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Log in via Firebase Auth to create real users');
  console.log('2. Use the app to create friendships and oaths');
  console.log('3. Check Prisma Studio: npm run db:studio');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

