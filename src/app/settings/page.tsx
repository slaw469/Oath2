'use client';

import { useState } from 'react';
import { Upload, Trash2, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('Steven');
  const [username, setUsername] = useState('@steven');
  const [email, setEmail] = useState('steven@example.com');
  const [bio, setBio] = useState('Grinding LastDude with $20 on the line.');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveChanges = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background-dark py-8 px-4 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-sm text-primary">Manage your identity on Oath.</p>
        </div>

        {/* Basic Info */}
        <div className="mb-6 rounded-xl bg-surface p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">Basic Info</h2>
          
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Display Name */}
            <div>
              <label className="mb-2 block text-sm text-white/70">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Handle/Username */}
            <div>
              <label className="mb-2 block text-sm text-white/70">Handle / Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-white/70">Email</label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                readOnly
                className="flex-1 rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white/60"
              />
              <button className="rounded-lg border-2 border-primary/30 bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
                Change email
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            className="rounded-lg bg-primary px-8 py-3 font-bold text-black transition-opacity hover:opacity-90"
          >
            Save changes
          </button>
        </div>

        {/* Avatar */}
        <div className="mb-6 rounded-xl bg-surface p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">Avatar</h2>
          
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
              👤
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-white/20 bg-background-dark px-4 py-2 text-sm text-white transition-colors hover:bg-white/5">
                <Upload className="h-4 w-4" />
                Upload new avatar
              </button>
              <button className="rounded-lg border border-white/20 bg-background-dark px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-danger">
                Remove
              </button>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/50">
            Recommended: square image, 512×512 or larger.
          </p>
        </div>

        {/* Bio */}
        <div className="mb-6 rounded-xl bg-surface p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">Bio</h2>
          
          <div>
            <label className="mb-2 block text-sm text-white/70">Short bio or tagline</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 160))}
              rows={4}
              maxLength={160}
              className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <div className="mt-2 text-right text-xs text-white/50">
              {bio.length}/160
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mb-6 rounded-xl bg-surface p-6 border-2 border-danger/50">
          <h2 className="text-lg font-bold text-danger mb-6">Danger Zone</h2>
          
          {/* Pause Auto Payouts */}
          <div className="mb-6 flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Pause all auto payouts
              </h3>
              <p className="text-sm text-white/60">
                Temporarily stop automatic payments for missed deadlines.
              </p>
            </div>
            <button className="flex-shrink-0 rounded-lg border-2 border-primary bg-primary/10 px-6 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20">
              Pause Payouts
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                Delete account
              </h3>
              <p className="text-sm text-white/60">
                This will permanently remove your account and all data. This action cannot be undone.
              </p>
            </div>
            <button className="flex-shrink-0 rounded-lg bg-danger px-6 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Delete Account
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg animate-slide-up">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Profile updated successfully.</span>
          </div>
        )}
      </div>
    </div>
  );
}

