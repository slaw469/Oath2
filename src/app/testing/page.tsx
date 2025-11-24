'use client';

import { useState } from 'react';

const DEFAULT_ALFA_API_BASE = 'https://alfa-leetcode-api.onrender.com';

export default function TestingPage() {
  const [username, setUsername] = useState('');
  const [externalLoading, setExternalLoading] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [externalResult, setExternalResult] = useState<string | null>(null);
  const [internalResult, setInternalResult] = useState<string | null>(null);

  const [submissionPayload, setSubmissionPayload] = useState({
    id: '',
    title: '',
    titleSlug: '',
    solvedAt: '',
  });

  async function handleTestAcSubmission() {
    if (!username.trim()) {
      alert('Enter a LeetCode username first.');
      return;
    }
    setExternalLoading(true);
    setExternalResult(null);

    try {
      const url = `${DEFAULT_ALFA_API_BASE.replace(/\/$/, '')}/${encodeURIComponent(
        username.trim(),
      )}/acSubmission?limit=5`;
      const res = await fetch(url);
      const text = await res.text();
      setExternalResult(`GET ${url}\n\nStatus: ${res.status} ${res.statusText}\n\n${text}`);

      // Try to pre-fill a submission payload from the first result if possible
      try {
        const json = JSON.parse(text) as any;
        const list = (json.submission || json.data || json.submissions || []) as any[];
        if (Array.isArray(list) && list.length > 0) {
          const latest = list[0];
          setSubmissionPayload({
            id: String(latest.id ?? latest.submissionId ?? latest.timestamp ?? ''),
            title: latest.title || '',
            titleSlug: latest.titleSlug || '',
            solvedAt: String(latest.timestamp ?? ''),
          });
        }
      } catch {
        // ignore JSON parse issues here, we're already showing raw response
      }
    } catch (err: any) {
      setExternalResult(`Error calling alfa-leetcode-api:\n\n${String(err?.message || err)}`);
    } finally {
      setExternalLoading(false);
    }
  }

  async function handleTestInternal() {
    if (!username.trim()) {
      alert('Enter a LeetCode username first.');
      return;
    }
    if (!submissionPayload.id || !submissionPayload.title || !submissionPayload.titleSlug) {
      alert('Fetch an accepted submission first, or fill the submission fields manually.');
      return;
    }

    setInternalLoading(true);
    setInternalResult(null);

    try {
      const body = {
        id: submissionPayload.id,
        title: submissionPayload.title,
        titleSlug: submissionPayload.titleSlug,
        solvedAt: submissionPayload.solvedAt || Date.now(),
        username: username.trim(),
      };

      const res = await fetch('/api/leetcode-solved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      setInternalResult(
        `POST /api/leetcode-solved\n\nRequest body:\n${JSON.stringify(
          body,
          null,
          2,
        )}\n\nStatus: ${res.status} ${res.statusText}\n\n${text}`,
      );
    } catch (err: any) {
      setInternalResult(`Error calling /api/leetcode-solved:\n\n${String(err?.message || err)}`);
    } finally {
      setInternalLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Testing & Dev Tools</h1>
          <p className="mt-2 text-sm text-white/70">
            Use this page to experiment with the LeetCode integration and inspect raw API
            responses while you build.
          </p>
        </div>

        {/* LeetCode username input */}
        <section className="mb-8 rounded-xl bg-surface border border-white/10 p-6">
          <h2 className="mb-3 text-xl font-bold text-white">LeetCode API Tester</h2>
          <p className="mb-4 text-sm text-white/60">
            Enter a LeetCode username and fetch recent accepted submissions from{' '}
            <code className="rounded bg-black/40 px-1 py-0.5 text-xs text-primary">
              {DEFAULT_ALFA_API_BASE}
            </code>
            .
          </p>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-white">LeetCode username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. miguel_leetcode"
                className="w-full rounded-lg border border-white/15 bg-background-dark px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleTestAcSubmission}
              disabled={externalLoading}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60 sm:mt-6"
            >
              {externalLoading ? 'Fetching…' : 'Fetch accepted submissions'}
            </button>
          </div>

          {externalResult && (
            <div className="mt-4">
              <p className="mb-1 text-xs font-semibold uppercase text-white/50">API response</p>
              <pre className="max-h-80 overflow-auto rounded-lg bg-black/60 p-3 text-xs text-white/80">
                {externalResult}
              </pre>
            </div>
          )}
        </section>

        {/* Internal integration tester */}
        <section className="mb-8 rounded-xl bg-surface border border-white/10 p-6">
          <h2 className="mb-3 text-xl font-bold text-white">Internal /api/leetcode-solved Tester</h2>
          <p className="mb-4 text-sm text-white/60">
            Send a fake or real completion payload into your Next.js API to ensure it correctly
            creates check-ins and updates oaths.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-white">Submission ID</label>
              <input
                type="text"
                value={submissionPayload.id}
                onChange={(e) => setSubmissionPayload({ ...submissionPayload, id: e.target.value })}
                className="w-full rounded-lg border border-white/15 bg-background-dark px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white">Title</label>
              <input
                type="text"
                value={submissionPayload.title}
                onChange={(e) =>
                  setSubmissionPayload({ ...submissionPayload, title: e.target.value })
                }
                className="w-full rounded-lg border border-white/15 bg-background-dark px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white">Title Slug</label>
              <input
                type="text"
                value={submissionPayload.titleSlug}
                onChange={(e) =>
                  setSubmissionPayload({ ...submissionPayload, titleSlug: e.target.value })
                }
                className="w-full rounded-lg border border-white/15 bg-background-dark px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white">
                SolvedAt timestamp (optional)
              </label>
              <input
                type="text"
                value={submissionPayload.solvedAt}
                onChange={(e) =>
                  setSubmissionPayload({ ...submissionPayload, solvedAt: e.target.value })
                }
                placeholder="unix seconds or ms; leave blank for now()"
                className="w-full rounded-lg border border-white/15 bg-background-dark px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestInternal}
            disabled={internalLoading}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {internalLoading ? 'Sending…' : 'Send to /api/leetcode-solved'}
          </button>

          {internalResult && (
            <div className="mt-4">
              <p className="mb-1 text-xs font-semibold uppercase text-white/50">Internal response</p>
              <pre className="max-h-80 overflow-auto rounded-lg bg-black/60 p-3 text-xs text-white/80">
                {internalResult}
              </pre>
            </div>
          )}
        </section>

        {/* Helpful resources */}
        <section className="mb-8 rounded-xl bg-surface border border-white/10 p-6">
          <h2 className="mb-3 text-xl font-bold text-white">Helpful Resources</h2>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <span className="font-semibold">alfa-leetcode-api GitHub:</span>{' '}
              <a
                href="https://github.com/alfaarghya/alfa-leetcode-api"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GitHub repository
              </a>
            </li>
            <li>
              <span className="font-semibold">App endpoint for auto-check-ins:</span>{' '}
              <code className="rounded bg-black/40 px-1 py-0.5 text-xs">
                POST /api/leetcode-solved
              </code>
            </li>
            <li>
              <span className="font-semibold">Oath-level check endpoint:</span>{' '}
              <code className="rounded bg-black/40 px-1 py-0.5 text-xs">
                POST /api/oath/:id/check-leetcode
              </code>
            </li>
            <li>
              Use this page when changing the LeetCode integration to quickly validate external
              responses and your own API behavior without touching the main UI flows.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}


