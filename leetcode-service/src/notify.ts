import { config } from './config';
import { insertSolution } from './db';
import { LeetCodeSolution } from './types';

/**
 * Shared handler for a newly detected solution.
 * - Inserts into local SQLite
 * - Optionally forwards to an external webhook
 *
 * This is used both by the poller and the Express route handler.
 */
export async function notifyNewSolution(solution: LeetCodeSolution): Promise<void> {
  // Persist locally (idempotent because of PRIMARY KEY on id)
  insertSolution(solution);

  // Optionally forward to external webhook
  if (config.notifyWebhookUrl) {
    try {
      const res = await fetch(config.notifyWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(solution),
      });

      if (!res.ok) {
        console.error(
          `[Notify] Webhook responded with ${res.status} ${res.statusText} to NOTIFY_WEBHOOK_URL`,
        );
      }
    } catch (err) {
      console.error('[Notify] Failed to POST to NOTIFY_WEBHOOK_URL:', err);
    }
  }
}


