-- Create booktrailer requests table
CREATE TABLE public.booktrailer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  titulo_libro TEXT NOT NULL,
  autor TEXT NOT NULL,
  genero TEXT,
  sinopsis TEXT NOT NULL,
  tono TEXT,
  elementos_visuales TEXT,
  referencias TEXT,
  presupuesto TEXT,
  plazo TEXT,
  imagen_portada_path TEXT,
  material_adicional_paths TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booktrailer_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a booktrailer request
CREATE POLICY "Anyone can submit booktrailer request"
ON public.booktrailer_requests
FOR INSERT
WITH CHECK (true);

-- Policy: Admins can view all booktrailer requests
CREATE POLICY "Admins can view booktrailer requests"
ON public.booktrailer_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Policy: Admins can update booktrailer requests
CREATE POLICY "Admins can update booktrailer requests"
ON public.booktrailer_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Policy: Admins can delete booktrailer requests
CREATE POLICY "Admins can delete booktrailer requests"
ON public.booktrailer_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Create storage bucket for booktrailer files
INSERT INTO storage.buckets (id, name, public)
VALUES ('booktrailer-files', 'booktrailer-files', false);

-- Storage policies for booktrailer files
CREATE POLICY "Anyone can upload booktrailer files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'booktrailer-files');

CREATE POLICY "Admins can view booktrailer files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'booktrailer-files' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));

CREATE POLICY "Admins can delete booktrailer files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'booktrailer-files' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));