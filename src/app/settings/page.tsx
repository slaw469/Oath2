"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDbUser } from "@/hooks/useDbUser";
import { updateLeetCodeUsername } from "@/actions/users";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { dbUser, loading: dbLoading } = useDbUser();
  const router = useRouter();
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [savingLeetcode, setSavingLeetcode] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (dbUser?.leetcodeUsername) {
      setLeetcodeUsername(dbUser.leetcodeUsername);
    } else {
      setLeetcodeUsername("");
    }
  }, [dbUser]);

  if (loading || dbLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            <span className="text-primary">Settings</span>
          </h1>
          <p className="mt-2 text-lg text-white/60">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className="rounded-lg bg-surface border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    disabled
                    value={user?.displayName || ''}
                    className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white/60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white/60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    LeetCode Username
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={leetcodeUsername}
                      onChange={(e) => setLeetcodeUsername(e.target.value)}
                      placeholder="Used for Daily LeetCode-style oaths"
                      className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={savingLeetcode || !dbUser}
                      onClick={async () => {
                        if (!dbUser) return;
                        setSavingLeetcode(true);
                        const result = await updateLeetCodeUsername(dbUser.id, leetcodeUsername);
                        setSavingLeetcode(false);
                        if (result.success) {
                          toast.success("LeetCode username saved.");
                        } else {
                          toast.error(result.error || "Failed to save LeetCode username.");
                        }
                      }}
                      className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-bold text-black disabled:opacity-60"
                    >
                      {savingLeetcode ? "Saving..." : "Save"}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-white/50">
                    This username is used to auto-verify Daily LeetCode challenges and mark your
                    oath days as complete.
                  </p>
                </div>
                {dbUser?.friendCode && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Friend Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        disabled
                        value={dbUser.friendCode}
                        className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white/80 font-mono cursor-not-allowed"
                      />
                    </div>
                    <p className="mt-1 text-xs text-white/50">
                      Share this code so friends can add you quickly.
                    </p>
                  </div>
                )}
                <p className="text-sm text-white/60">
                  Name and email are managed by your sign-in provider. Contact support if you need
                  to change them.
                </p>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="rounded-lg bg-surface border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-sm text-white/60">Receive updates about your oaths</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-white/10 bg-background-dark text-primary focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-sm text-white/60">Get notified about deadlines</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-white/10 bg-background-dark text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="space-y-6">
            <div className="rounded-lg bg-surface border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Account Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/60">Member Since</p>
                  <p className="text-white font-medium">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString()
                      : 'Today'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Account Status</p>
                  <p className="text-success font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
