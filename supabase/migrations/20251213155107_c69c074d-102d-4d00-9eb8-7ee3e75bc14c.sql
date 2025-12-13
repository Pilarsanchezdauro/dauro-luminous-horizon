-- Make editorial-submissions bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'editorial-submissions';

-- Make artist-submissions bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'artist-submissions';

-- Create storage policies for admin access to private buckets
-- Allow admins/staff to read files from editorial-submissions
CREATE POLICY "Admins can read editorial submissions files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'editorial-submissions' 
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) 
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);

-- Allow admins/staff to read files from artist-submissions
CREATE POLICY "Admins can read artist submissions files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'artist-submissions' 
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) 
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);

-- Allow anyone to upload to editorial-submissions (for public form submissions)
CREATE POLICY "Anyone can upload to editorial submissions"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'editorial-submissions');

-- Allow anyone to upload to artist-submissions (for public form submissions)
CREATE POLICY "Anyone can upload to artist submissions"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'artist-submissions');