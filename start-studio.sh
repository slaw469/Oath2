#!/bin/bash
# Script to start Prisma Studio with correct environment variables

export DATABASE_URL="postgresql://postgres.bnmnwhegwoqrclocqqdn:aD5soegDQ9BDaIOD@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

npx prisma studio

