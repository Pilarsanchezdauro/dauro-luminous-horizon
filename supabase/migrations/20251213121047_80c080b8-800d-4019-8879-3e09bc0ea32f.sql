-- Create table for artist submissions
CREATE TABLE public.artist_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  categoria_artistica TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  experiencia_profesional TEXT,
  redes_sociales JSONB DEFAULT '{}',
  web_personal TEXT,
  referencias TEXT,
  portfolio_file_path TEXT,
  curriculum_file_path TEXT
);

-- Enable RLS
ALTER TABLE public.artist_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit
CREATE POLICY "Anyone can submit artist application"
ON public.artist_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view artist submissions"
ON public.artist_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Only admins can update
CREATE POLICY "Admins can update artist submissions"
ON public.artist_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete artist submissions"
ON public.artist_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Create storage bucket for artist files
INSERT INTO storage.buckets (id, name, public) VALUES ('artist-submissions', 'artist-submissions', true);

-- Storage policies
CREATE POLICY "Anyone can upload artist files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'artist-submissions');

CREATE POLICY "Anyone can view artist files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'artist-submissions');

CREATE POLICY "Admins can delete artist files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'artist-submissions' AND (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'staff'))
));