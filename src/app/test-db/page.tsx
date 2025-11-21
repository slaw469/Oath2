'use client';

import { useEffect, useState } from 'react';
import { useDbUser } from '@/hooks/useDbUser';

export default function TestDatabasePage() {
  const { dbUser, loading, error } = useDbUser();
  const [testResults, setTestResults] = useState<any>(null);

  async function runTests() {
    try {
      // Test 1: Check if user is synced
      console.log('DB User:', dbUser);

      // Test 2: Try to get friends (should return empty array)
      const response = await fetch('/api/test-db-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: dbUser?.id })
      });

      const data = await response.json();
      setTestResults(data);
    } catch (err: any) {
      setTestResults({ error: err.message });
    }
  }

  if (loading) return <div className="p-8">Loading user...</div>;

  if (!dbUser) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Test</h1>
        <p className="text-red-500">❌ Not logged in. Please log in first.</p>
        <a href="/auth/signin" className="text-blue-500 underline">Go to Sign In</a>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">🧪 Database Test</h1>

      {/* Test 1: User Sync */}
      <div className="border rounded-lg p-4 mb-4 bg-green-50">
        <h2 className="text-xl font-semibold mb-2">✅ Test 1: User Sync</h2>
        <p className="text-sm text-gray-600 mb-2">Your Firebase user is synced to the database!</p>
        <div className="bg-white p-3 rounded text-xs font-mono">
          <div><strong>ID:</strong> {dbUser.id}</div>
          <div><strong>Email:</strong> {dbUser.email}</div>
          <div><strong>Display Name:</strong> {dbUser.displayName || 'N/A'}</div>
          <div><strong>Credits:</strong> {dbUser.credits}</div>
          <div><strong>Created:</strong> {new Date(dbUser.createdAt).toLocaleString()}</div>
        </div>
      </div>

      {/* Test 2: Database Query */}
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Test 2: Database Query</h2>
        <button
          onClick={runTests}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-3"
        >
          Run Database Query Test
        </button>
        
        {testResults && (
          <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-auto">
            <pre>{JSON.stringify(testResults, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
        <div className="space-y-2">
          <a href="/friends" className="block text-blue-500 underline">
            → Go to Friends Page (add friends to test)
          </a>
          <a href="/create-oath" className="block text-blue-500 underline">
            → Go to Create Oath Page
          </a>
          <a href="http://localhost:5555" target="_blank" className="block text-blue-500 underline">
            → Open Prisma Studio (view database)
          </a>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}
    </div>
  );
}

