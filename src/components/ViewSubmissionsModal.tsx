'use client';

import React, { useState } from 'react';

interface ViewSubmissionsModalProps {
  oath: any;
  checkIns: any[];
  onClose: () => void;
}

export default function ViewSubmissionsModal({ oath, checkIns, onClose }: ViewSubmissionsModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const verifiedCheckIns = checkIns.filter(
    (checkIn) =>
      checkIn.status === 'VERIFIED_COMPLETE' ||
      checkIn.status === 'RESOLVED_COMPLETE' ||
      checkIn.status === 'PENDING_VERIFICATION'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 bg-surface p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between sticky top-0 bg-surface pb-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-white">Submission History</h2>
            <p className="text-sm text-white/60">
              {oath.title} - {verifiedCheckIns.length} submission{verifiedCheckIns.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* Submissions Grid */}
        {verifiedCheckIns.length === 0 ? (
          <div className="py-16 text-center">
            <span className="material-symbols-outlined mb-4 text-6xl text-white/20">
              image_not_supported
            </span>
            <p className="text-lg text-white/60">No submissions yet</p>
            <p className="text-sm text-white/40">Upload your first proof to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {verifiedCheckIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="overflow-hidden rounded-lg border border-white/10 bg-background-dark transition-all hover:border-white/20"
              >
                {/* Image */}
                {checkIn.proofUrl && (
                  <div
                    onClick={() => setSelectedImage(checkIn.proofUrl)}
                    className="relative aspect-video w-full cursor-pointer overflow-hidden bg-black"
                  >
                    <img
                      src={checkIn.proofUrl}
                      alt={`Submission from ${new Date(checkIn.createdAt).toLocaleDateString()}`}
                      className="h-full w-full object-contain transition-transform hover:scale-105"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-8 rounded-full bg-cover bg-center bg-primary/20 flex items-center justify-center text-sm font-bold text-primary"
                        style={
                          checkIn.user.photoURL
                            ? { backgroundImage: `url('${checkIn.user.photoURL}')` }
                            : {}
                        }
                      >
                        {!checkIn.user.photoURL &&
                          (checkIn.user.displayName?.[0] || checkIn.user.email[0])}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {checkIn.user.displayName || checkIn.user.email.split('@')[0]}
                      </span>
                    </div>
                    <div
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        checkIn.status === 'VERIFIED_COMPLETE' || checkIn.status === 'RESOLVED_COMPLETE'
                          ? 'bg-success/20 text-success'
                          : 'bg-warning/20 text-warning'
                      }`}
                    >
                      {checkIn.status === 'VERIFIED_COMPLETE' || checkIn.status === 'RESOLVED_COMPLETE'
                        ? 'Verified'
                        : 'Pending'}
                    </div>
                  </div>

                  <p className="mb-2 text-xs text-white/60">
                    {new Date(checkIn.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>

                  {checkIn.notes && (
                    <p className="text-sm text-white/80">{checkIn.notes}</p>
                  )}

                  {checkIn.aiVerificationResult && (
                    <div className="mt-2 rounded bg-primary/10 p-2">
                      <p className="text-xs text-primary">
                        <strong>AI Verification:</strong> {checkIn.aiVerificationResult}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Image Viewer */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 p-4"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 text-white/60 transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

