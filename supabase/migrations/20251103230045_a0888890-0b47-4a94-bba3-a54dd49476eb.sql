-- Create table for book cover requests
CREATE TABLE public.book_cover_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  titulo_libro TEXT NOT NULL,
  autor TEXT NOT NULL,
  genero TEXT,
  dimensiones TEXT,
  estilo_preferido TEXT,
  descripcion TEXT NOT NULL,
  referencia_visual_path TEXT,
  presupuesto TEXT,
  plazo TEXT
);

-- Enable Row Level Security
ALTER TABLE public.book_cover_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit book cover request"
ON public.book_cover_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view book cover requests"
ON public.book_cover_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can update book cover requests"
ON public.book_cover_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can delete book cover requests"
ON public.book_cover_requests
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));