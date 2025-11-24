import Database from 'better-sqlite3';
import { config } from './config';
import { LeetCodeSolution } from './types';

const db = new Database(config.dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS leetcode_state (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS leetcode_solutions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    title_slug TEXT NOT NULL,
    solved_at INTEGER NOT NULL,
    username TEXT NOT NULL
  );
`);

const getStateStmt = db.prepare('SELECT value FROM leetcode_state WHERE key = ?');
const setStateStmt = db.prepare(`
  INSERT INTO leetcode_state (key, value)
  VALUES (?, ?)
  ON CONFLICT(key) DO UPDATE SET value = excluded.value
`);

const insertSolutionStmt = db.prepare(`
  INSERT OR IGNORE INTO leetcode_solutions (id, title, title_slug, solved_at, username)
  VALUES (?, ?, ?, ?, ?)
`);

const latestSolutionsStmt = db.prepare(`
  SELECT id, title, title_slug as titleSlug, solved_at as solvedAt, username
  FROM leetcode_solutions
  ORDER BY solved_at DESC
  LIMIT ?
`);

export function getState(key: string): string | undefined {
  const row = getStateStmt.get(key) as { value: string } | undefined;
  return row?.value;
}

export function setState(key: string, value: string): void {
  setStateStmt.run(key, value);
}

export function insertSolution(solution: LeetCodeSolution): void {
  insertSolutionStmt.run(
    solution.id,
    solution.title,
    solution.titleSlug,
    solution.solvedAt,
    solution.username,
  );
}

export function getLatestSolutions(limit: number): LeetCodeSolution[] {
  const rows = latestSolutionsStmt.all(limit) as LeetCodeSolution[];
  return rows;
}


