-- Create table for Dauro Arte contact submissions
CREATE TABLE public.dauro_arte_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  servicio TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  enlace_web TEXT,
  documento_file_path TEXT,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable Row Level Security
ALTER TABLE public.dauro_arte_contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to submit (public form)
CREATE POLICY "Anyone can submit Dauro Arte contact"
ON public.dauro_arte_contacts
FOR INSERT
WITH CHECK (true);

-- Create storage bucket for Dauro Arte documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('dauro-arte-documents', 'dauro-arte-documents', false);

-- Create storage policies for Dauro Arte documents
CREATE POLICY "Anyone can upload Dauro Arte documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'dauro-arte-documents');

CREATE POLICY "Anyone can view their uploaded documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'dauro-arte-documents');