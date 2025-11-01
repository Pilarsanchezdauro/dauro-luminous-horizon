-- Fix Storage Policies - Restrict access to admins/staff only
-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can view their uploaded documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own submission files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their submission files" ON storage.objects;

-- Create admin-only SELECT policies for storage
CREATE POLICY "Admins can view dauro arte documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'dauro-arte-documents'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

CREATE POLICY "Admins can view editorial submissions"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'editorial-submissions'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

-- Create admin-only INSERT policies for storage (for future file uploads)
CREATE POLICY "Admins can upload dauro arte documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'dauro-arte-documents'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

CREATE POLICY "Admins can upload editorial submissions"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'editorial-submissions'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

-- Create admin-only DELETE policies for storage
CREATE POLICY "Admins can delete dauro arte documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'dauro-arte-documents'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

CREATE POLICY "Admins can delete editorial submissions"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'editorial-submissions'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
);

-- Add explicit DENY policies for UPDATE and DELETE on contact tables
-- This prevents accidental misconfigurations

-- dauro_arte_contacts
CREATE POLICY "Only admins can update dauro arte contacts"
ON public.dauro_arte_contacts FOR UPDATE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Only admins can delete dauro arte contacts"
ON public.dauro_arte_contacts FOR DELETE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- services_contacts
CREATE POLICY "Only admins can update services contacts"
ON public.services_contacts FOR UPDATE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Only admins can delete services contacts"
ON public.services_contacts FOR DELETE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- editorial_submissions
CREATE POLICY "Only admins can update editorial submissions"
ON public.editorial_submissions FOR UPDATE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Only admins can delete editorial submissions"
ON public.editorial_submissions FOR DELETE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));