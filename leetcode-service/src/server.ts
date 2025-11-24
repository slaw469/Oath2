import express, { Request, Response } from 'express';
import { config } from './config';
import { getLatestSolutions } from './db';
import { notifyNewSolution } from './notify';
import { LeetCodeSolution } from './types';
import { getState } from './db';

const app = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    username: config.leetcodeUsername,
    lastSeenSubmissionId: getState('lastSeenAcSubmissionId') || null,
  });
});

app.get('/solutions', (req: Request, res: Response) => {
  const limitRaw = req.query.limit as string | undefined;
  const limit = Number(limitRaw ?? 20);
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 20;

  const solutions = getLatestSolutions(safeLimit);
  res.json({ solutions });
});

app.post('/api/leetcode-solved', async (req: Request, res: Response) => {
  const body = req.body as Partial<LeetCodeSolution>;

  if (
    !body ||
    typeof body.id !== 'string' ||
    typeof body.title !== 'string' ||
    typeof body.titleSlug !== 'string' ||
    typeof body.username !== 'string' ||
    (typeof body.solvedAt !== 'number' && typeof body.solvedAt !== 'string')
  ) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const solvedAtNum =
    typeof body.solvedAt === 'string' ? parseInt(body.solvedAt, 10) : body.solvedAt;

  if (!Number.isFinite(solvedAtNum)) {
    return res.status(400).json({ error: 'Invalid solvedAt timestamp' });
  }

  const solution: LeetCodeSolution = {
    id: body.id,
    title: body.title,
    titleSlug: body.titleSlug,
    solvedAt: solvedAtNum,
    username: body.username,
  };

  try {
    await notifyNewSolution(solution);
    res.json({ success: true, solution });
  } catch (err) {
    console.error('[Server] Error handling /api/leetcode-solved:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export function startServer(): Promise<ReturnType<typeof app.listen>> {
  return new Promise((resolve) => {
    const server = app.listen(config.port, () => {
      console.log(`[Server] Listening on port ${config.port}`);
      resolve(server);
    });
  });
}


