-- Create table for web development requests
CREATE TABLE public.web_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  empresa TEXT,
  tipo_web TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  funcionalidades TEXT,
  referencia_web TEXT,
  presupuesto TEXT,
  plazo TEXT,
  documento_file_path TEXT
);

-- Enable Row Level Security
ALTER TABLE public.web_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit web request"
  ON public.web_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view web requests"
  ON public.web_requests
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can update web requests"
  ON public.web_requests
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can delete web requests"
  ON public.web_requests
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));