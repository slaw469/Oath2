// Prisma Configuration for Oath Platform
import "dotenv/config";
import { defineConfig } from "prisma/config";

// Use environment variable directly with fallback
const databaseUrl = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || "postgresql://placeholder";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
