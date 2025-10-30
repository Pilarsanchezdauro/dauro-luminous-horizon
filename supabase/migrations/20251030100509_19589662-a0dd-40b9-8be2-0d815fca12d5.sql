-- Crear tabla para propuestas editoriales
CREATE TABLE public.editorial_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  titulo_obra TEXT NOT NULL,
  tipo_obra TEXT NOT NULL,
  obra_file_path TEXT,
  curriculum_file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crear bucket de almacenamiento para documentos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'editorial-submissions', 
  'editorial-submissions', 
  false,
  10485760,
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Políticas RLS para la tabla
ALTER TABLE public.editorial_submissions ENABLE ROW LEVEL SECURITY;

-- Permitir que cualquiera pueda insertar propuestas (público)
CREATE POLICY "Anyone can submit editorial proposals"
ON public.editorial_submissions
FOR INSERT
WITH CHECK (true);

-- Políticas de almacenamiento - permitir subir archivos
CREATE POLICY "Anyone can upload submission files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'editorial-submissions');

-- Permitir que los usuarios vean sus propias subidas
CREATE POLICY "Users can view their own submission files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'editorial-submissions');