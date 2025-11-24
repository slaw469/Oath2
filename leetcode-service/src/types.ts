export interface LeetCodeSolution {
  id: string;
  title: string;
  titleSlug: string;
  solvedAt: number; // unix timestamp in seconds
  username: string;
}

// These interfaces approximate the alfa-leetcode-api acSubmission response
// See: https://github.com/alfaarghya/alfa-leetcode-api

export interface AcSubmissionItem {
  id?: string;
  submissionId?: string;
  title: string;
  titleSlug: string;
  timestamp: number | string;
  statusDisplay?: string;
  lang?: string;
  [key: string]: unknown;
}

export interface AcSubmissionResponse {
  status?: number;
  message?: string;
  total?: number;
  matchedCount?: number;
  submissions?: AcSubmissionItem[]; // some APIs use this key
  data?: AcSubmissionItem[]; // others use "data"
  [key: string]: unknown;
}


