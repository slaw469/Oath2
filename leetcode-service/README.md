# LeetCode Poller Service

This is a small **Node.js 20 + TypeScript** service that periodically polls the
[alfa-leetcode-api](https://github.com/alfaarghya/alfa-leetcode-api) for a user's
latest **accepted LeetCode submission**, stores it in SQLite, and exposes a tiny
HTTP API for your app to consume.

It is designed to back a "Daily LeetCode" style oath where a new accepted submission
marks the day as complete.

## Features

- Polls `https://alfa-leetcode-api.onrender.com/:username/acSubmission?limit=1`
  on a cron schedule (default: every 5 minutes).
- Tracks the **last seen** accepted submission id and only records **new** ones.
- Stores solutions in a local **SQLite** database.
- Exposes:
  - `GET /health` – basic status and last seen submission id.
  - `GET /solutions` – latest solutions from the DB.
  - `POST /api/leetcode-solved` – main internal endpoint for recording a solution.
- Optional outbound webhook via `NOTIFY_WEBHOOK_URL`.

## Tech Stack

- Node.js 20
- TypeScript
- Express
- SQLite via `better-sqlite3`
- `node-cron` for scheduling
- `dotenv` for configuration

## Setup

```bash
cd leetcode-service
npm install

cp .env.example .env
# Edit .env with your values
```

### Environment variables

From `.env.example`:

- **`LEETCODE_USERNAME`** – LeetCode username to track (required)
- **`LEETCODE_API_BASE`** – base URL for alfa-leetcode-api  
  Default: `https://alfa-leetcode-api.onrender.com`
- **`POLL_INTERVAL_CRON`** – cron expression for polling  
  Default: `*/5 * * * *` (every 5 minutes)
- **`PORT`** – HTTP server port  
  Default: `3001`
- **`SELF_BASE_URL`** – base URL for this service  
  Default: `http://localhost:3001`
- **`NOTIFY_WEBHOOK_URL`** – optional external webhook URL to notify on new solutions
- **`DB_PATH`** – optional path to the SQLite DB file (default: `leetcode.db`)

## Running

Development (with auto-reload):

```bash
npm run dev
```

Build & run:

```bash
npm run build
npm start
```

On startup the service will:

1. Initialize the SQLite database.
2. Start the Express server on `PORT`.
3. Run `pollLeetCode()` once.
4. Schedule `pollLeetCode()` using `POLL_INTERVAL_CRON`.

## HTTP API

### `GET /health`

```bash
curl http://localhost:3001/health
```

Response:

```json
{
  "status": "ok",
  "username": "your-username",
  "lastSeenSubmissionId": "1234567890" // or null
}
```

### `GET /solutions?limit=20`

```bash
curl "http://localhost:3001/solutions?limit=10"
```

Response:

```json
{
  "solutions": [
    {
      "id": "1234567890",
      "title": "Two Sum",
      "titleSlug": "two-sum",
      "solvedAt": 1717096274,
      "username": "your-username"
    }
  ]
}
```

### `POST /api/leetcode-solved`

This is the main internal endpoint used to record a solution. The poller also
uses a shared handler so you can call this from other systems if needed.

```bash
curl -X POST http://localhost:3001/api/leetcode-solved \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1234567890",
    "title": "Two Sum",
    "titleSlug": "two-sum",
    "solvedAt": 1717096274,
    "username": "your-username"
  }'
```

Response:

```json
{
  "success": true,
  "solution": {
    "id": "1234567890",
    "title": "Two Sum",
    "titleSlug": "two-sum",
    "solvedAt": 1717096274,
    "username": "your-username"
  }
}
```

## alfa-leetcode-api Notes

The poller hits:

```text
GET /:username/acSubmission?limit=1
Base: https://alfa-leetcode-api.onrender.com
```

The exact response shape may evolve, so `src/types.ts` and `src/leetcodePoller.ts`
parse the response defensively:

- Look for a list under `data` or `submissions`.
- Derive the solution `id` from `id`, `submissionId`, or `timestamp`.
- Map `title`, `titleSlug`, and `timestamp` into `LeetCodeSolution`.

If the API response format changes, you only need to update those types/mappers.


