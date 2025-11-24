import { config } from './config';
import { getState, setState } from './db';
import { LeetCodeSolution, AcSubmissionResponse, AcSubmissionItem } from './types';
import { notifyNewSolution } from './notify';

const LAST_SEEN_KEY = 'lastSeenAcSubmissionId';

function extractLatestSubmission(res: AcSubmissionResponse): AcSubmissionItem | null {
  const list = (res.data || res.submissions || []) as AcSubmissionItem[];
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[0];
}

function mapSubmissionToSolution(item: AcSubmissionItem, username: string): LeetCodeSolution | null {
  if (!item) return null;

  const id = (item.id ?? item.submissionId ?? String(item.timestamp)) as string;
  if (!id) return null;

  const title = item.title;
  const titleSlug = item.titleSlug;
  if (!title || !titleSlug) return null;

  const tsNum =
    typeof item.timestamp === 'string'
      ? parseInt(item.timestamp, 10)
      : typeof item.timestamp === 'number'
      ? item.timestamp
      : Math.floor(Date.now() / 1000);

  return {
    id,
    title,
    titleSlug,
    solvedAt: tsNum,
    username,
  };
}

export async function pollLeetCode(): Promise<void> {
  const username = config.leetcodeUsername;
  const url = `${config.leetcodeApiBase.replace(/\/$/, '')}/${encodeURIComponent(
    username,
  )}/acSubmission?limit=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(
        `[LeetCodePoller] Non-2xx response from alfa-leetcode-api: ${res.status} ${res.statusText}`,
      );
      return;
    }

    const json = (await res.json()) as AcSubmissionResponse;
    const latest = extractLatestSubmission(json);
    if (!latest) {
      console.log('[LeetCodePoller] No accepted submissions found for user', username);
      return;
    }

    const solution = mapSubmissionToSolution(latest, username);
    if (!solution) {
      console.warn('[LeetCodePoller] Unable to map latest submission into solution format');
      return;
    }

    const lastSeenId = getState(LAST_SEEN_KEY);

    // First run: record current latest as baseline, but don't treat as "new"
    if (!lastSeenId) {
      setState(LAST_SEEN_KEY, solution.id);
      console.log(
        `[LeetCodePoller] Initialized lastSeen submission to id=${solution.id} (first run)`,
      );
      return;
    }

    if (lastSeenId === solution.id) {
      // Nothing new
      return;
    }

    // New solution detected
    setState(LAST_SEEN_KEY, solution.id);
    console.log('[LeetCodePoller] New accepted LeetCode submission detected:', solution);

    await notifyNewSolution(solution);
  } catch (err) {
    console.error('[LeetCodePoller] Error while polling alfa-leetcode-api:', err);
  }
}


