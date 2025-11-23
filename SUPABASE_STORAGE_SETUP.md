# Supabase Storage Setup Guide

This guide will help you set up the required storage bucket for Oath proof images.

## Overview

The Oath app uses Supabase Storage to store proof images uploaded by users. The bucket is configured with:
- **Max file size**: 5MB (typical screenshot size)
- **Allowed file types**: Images only (jpg, png, gif, webp, etc.)
- **Public access**: Images are publicly accessible via URL

## Setup Steps

### 1. Create the Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `Oath` (bnmnwhegwoqrclocqqdn)
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Configure the bucket:
   - **Name**: `oath-proofs`
   - **Public bucket**: ✅ Enabled (images need to be publicly accessible)
   - **File size limit**: 5242880 bytes (5MB)
   - **Allowed MIME types**: Leave empty or specify: `image/*`

6. Click **"Create bucket"**

### 2. Configure Bucket Policies (Optional)

For additional security, you can set up Row Level Security (RLS) policies:

1. In Storage > **oath-proofs** bucket
2. Click **"Policies"** tab
3. Add the following policies:

#### Policy 1: Allow Authenticated Upload
```sql
-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload their own proofs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'oath-proofs' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 2: Allow Public Read
```sql
-- Allow anyone to view proof images
CREATE POLICY "Anyone can view proof images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'oath-proofs');
```

#### Policy 3: Allow Users to Delete Their Own Images
```sql
-- Allow users to delete their own proofs
CREATE POLICY "Users can delete their own proofs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'oath-proofs' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### 3. Verify Setup

To verify your bucket is set up correctly:

1. Go to Storage > **oath-proofs**
2. Try uploading a test image
3. Verify you can access it via the public URL

The URL format should be:
```
https://bnmnwhegwoqrclocqqdn.supabase.co/storage/v1/object/public/oath-proofs/{userId}/{oathId}/{timestamp}.{ext}
```

### 4. Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL="https://bnmnwhegwoqrclocqqdn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

These are already configured in your project.

## File Organization

Images are organized in the bucket with this structure:

```
oath-proofs/
├── {userId1}/
│   ├── {oathId1}/
│   │   ├── 1700000000000.jpg
│   │   └── 1700000001000.png
│   └── {oathId2}/
│       └── 1700000002000.jpg
└── {userId2}/
    └── ...
```

This structure:
- ✅ Keeps files organized by user and oath
- ✅ Prevents filename collisions (uses timestamp)
- ✅ Makes it easy to find and manage user uploads
- ✅ Supports RLS policies based on user ID

## Usage in Code

The app automatically handles uploads via `src/lib/supabase-storage.ts`:

```typescript
import { uploadProofImage } from '@/lib/supabase-storage';

// Upload an image
const result = await uploadProofImage(file, userId, oathId);
if (result.success) {
  console.log('Image URL:', result.url);
}
```

## Troubleshooting

### Issue: "Failed to upload image"
- **Check**: Is the bucket public?
- **Check**: Is the file size under 5MB?
- **Check**: Is the file type an image?

### Issue: "Can't view uploaded images"
- **Check**: Is the bucket set to public?
- **Check**: Are the RLS policies correct?
- **Check**: Is the public URL correct?

### Issue: "Permission denied"
- **Check**: Are you using the correct `SUPABASE_ANON_KEY`?
- **Check**: Are RLS policies allowing the operation?

## Quick Setup (One-Time)

If you haven't set up the bucket yet, follow these quick steps:

1. Open Supabase Dashboard
2. Storage → New Bucket
3. Name: `oath-proofs`, Public: ✅
4. Done! 🎉

The app will automatically start using it.

## Security Notes

- ✅ File size is limited to 5MB (prevents abuse)
- ✅ Only image files are accepted
- ✅ Files are organized by user ID (supports RLS)
- ✅ Public read access (required for displaying images)
- ⚠️ Consider adding RLS policies for production
- ⚠️ Monitor storage usage in Supabase dashboard

## Monitoring

Check your storage usage:
1. Supabase Dashboard → Storage → **oath-proofs**
2. View file count and total size
3. Free tier includes: 1GB storage

---

**Created**: November 2025  
**Last Updated**: November 2025  
**Status**: Ready for Production ✅

