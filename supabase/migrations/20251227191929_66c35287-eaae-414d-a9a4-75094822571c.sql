-- Create storage bucket for ebooks
INSERT INTO storage.buckets (id, name, public)
VALUES ('ebooks', 'ebooks', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Admins can upload ebooks
CREATE POLICY "Admins can upload ebooks"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'ebooks' 
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) 
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);

-- Policy: Admins can update ebooks
CREATE POLICY "Admins can update ebooks"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'ebooks' 
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) 
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);

-- Policy: Admins can delete ebooks
CREATE POLICY "Admins can delete ebooks"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'ebooks' 
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role) 
    OR public.has_role(auth.uid(), 'staff'::public.app_role)
  )
);

-- Policy: Service role can read ebooks (for download links)
CREATE POLICY "Service role can read ebooks"
ON storage.objects FOR SELECT
USING (bucket_id = 'ebooks');