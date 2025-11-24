import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export interface AppConfig {
  leetcodeUsername: string;
  leetcodeApiBase: string;
  pollIntervalCron: string;
  port: number;
  selfBaseUrl: string;
  notifyWebhookUrl?: string;
  dbPath: string;
}

const port = Number(process.env.PORT ?? 3001);

export const config: AppConfig = {
  leetcodeUsername: getEnv('LEETCODE_USERNAME'),
  leetcodeApiBase: process.env.LEETCODE_API_BASE || 'https://alfa-leetcode-api.onrender.com',
  pollIntervalCron: process.env.POLL_INTERVAL_CRON || '*/5 * * * *',
  port,
  selfBaseUrl: process.env.SELF_BASE_URL || `http://localhost:${port}`,
  notifyWebhookUrl: process.env.NOTIFY_WEBHOOK_URL || undefined,
  dbPath: process.env.DB_PATH || 'leetcode.db',
};


