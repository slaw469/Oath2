'use client';

import React, { useState, useCallback } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { createCheckIn } from '@/actions/checkins';
import { uploadProofImage } from '@/lib/supabase-storage';
import toast from 'react-hot-toast';

interface UploadProofModalProps {
  oath: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadProofModal({ oath, onClose, onSuccess }: UploadProofModalProps) {
  const { dbUser } = useDbUser();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const opponent = oath.participants.find((p: any) => p.userId !== dbUser?.id);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileSelect(droppedFile);
    } else {
      toast.error('Please drop an image file');
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    // Check file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5MB (typical screenshot size)');
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !dbUser) {
      toast.error('Please select an image');
      return;
    }

    setUploading(true);

    try {
      // Upload image to Supabase Storage
      const uploadResult = await uploadProofImage(file, dbUser.id, oath.id);
      
      if (!uploadResult.success || !uploadResult.url) {
        toast.error(uploadResult.error || 'Failed to upload image');
        setUploading(false);
        return;
      }

      // Create check-in with image URL
      const checkInResult = await createCheckIn({
        oathId: oath.id,
        userId: dbUser.id,
        proofUrl: uploadResult.url,
        notes: notes || undefined,
      });

      if (checkInResult.success) {
        toast.success('✅ Proof uploaded successfully!');
        onSuccess();
      } else {
        toast.error(checkInResult.error || 'Failed to create check-in');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Unexpected error during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-surface p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-white">Upload Proof</h2>
            <p className="text-sm text-white/60">Submit evidence of your completion</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* Oath Info */}
        <div className="mb-6 rounded-lg bg-background-dark p-4">
          <h3 className="mb-1 font-bold text-white">{oath.title}</h3>
          <p className="mb-3 text-sm text-white/60">{oath.description}</p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="size-8 rounded-full bg-cover bg-center bg-primary/20 flex items-center justify-center text-sm font-bold text-primary"
                style={dbUser?.photoURL ? { backgroundImage: `url('${dbUser.photoURL}')` } : {}}
              >
                {!dbUser?.photoURL && (dbUser?.displayName?.[0] || dbUser?.email?.[0] || 'U')}
              </div>
              <span className="text-sm font-medium text-white">You</span>
            </div>

            {opponent && (
              <>
                <span className="text-white/40">vs</span>
                <div className="flex items-center gap-2">
                  <div
                    className="size-8 rounded-full bg-cover bg-center bg-primary/20 flex items-center justify-center text-sm font-bold text-primary"
                    style={opponent.user.photoURL ? { backgroundImage: `url('${opponent.user.photoURL}')` } : {}}
                  >
                    {!opponent.user.photoURL && (opponent.user.displayName?.[0] || opponent.user.email[0])}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {opponent.user.displayName || opponent.user.email.split('@')[0]}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* File Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mb-6 rounded-lg border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
          }`}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-64 rounded-lg"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="mt-4 text-sm text-white/60 underline hover:text-white"
              >
                Remove image
              </button>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined mb-4 text-6xl text-white/40">
                upload_file
              </span>
              <p className="mb-2 text-lg font-medium text-white">
                Drag and drop your proof here
              </p>
              <p className="mb-4 text-sm text-white/60">
                or click to browse files (max 5MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2 font-medium text-background-dark transition-opacity hover:opacity-90"
              >
                Choose File
              </label>
            </>
          )}
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-white">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any context or comments about your submission..."
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-background-dark px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={uploading}
            className="flex-1 rounded-full bg-white/10 py-3 font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || uploading}
            className="flex-1 rounded-full bg-primary py-3 font-bold text-background-dark transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Submit Proof'}
          </button>
        </div>
      </div>
    </div>
  );
}

