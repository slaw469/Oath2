import cron from 'node-cron';
import { config } from './config';
import { startServer } from './server';
import { pollLeetCode } from './leetcodePoller';

async function main() {
  // Start HTTP server
  await startServer();

  // Run an initial poll once the server is ready
  try {
    await pollLeetCode();
  } catch (err) {
    console.error('[Main] Initial pollLeetCode() failed:', err);
  }

  // Schedule periodic polling
  cron.schedule(config.pollIntervalCron, async () => {
    try {
      await pollLeetCode();
    } catch (err) {
      console.error('[Cron] pollLeetCode() failed:', err);
    }
  });

  console.log(
    `[Main] LeetCode poller scheduled with cron="${config.pollIntervalCron}" for user="${config.leetcodeUsername}"`,
  );
}

main().catch((err) => {
  console.error('[Main] Fatal error during startup:', err);
  process.exit(1);
});


