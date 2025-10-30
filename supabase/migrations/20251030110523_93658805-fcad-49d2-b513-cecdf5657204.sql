-- Create table for services contacts
CREATE TABLE public.services_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  servicio TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  enlace_web TEXT,
  documento_file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.services_contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert
CREATE POLICY "Anyone can submit service contact"
ON public.services_contacts
FOR INSERT
TO public
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_services_contacts_created_at ON public.services_contacts(created_at DESC);
CREATE INDEX idx_services_contacts_email ON public.services_contacts(email);