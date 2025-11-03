
-- Crear tabla para consultas de portafolio
CREATE TABLE public.portfolio_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  empresa TEXT,
  categoria TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  presupuesto TEXT,
  plazo TEXT
);

-- Enable RLS
ALTER TABLE public.portfolio_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit inquiry
CREATE POLICY "Anyone can submit portfolio inquiry"
  ON public.portfolio_inquiries
  FOR INSERT
  WITH CHECK (true);

-- Policy: Admins can view inquiries
CREATE POLICY "Admins can view portfolio inquiries"
  ON public.portfolio_inquiries
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Policy: Admins can update inquiries
CREATE POLICY "Admins can update portfolio inquiries"
  ON public.portfolio_inquiries
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Policy: Admins can delete inquiries
CREATE POLICY "Admins can delete portfolio inquiries"
  ON public.portfolio_inquiries
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));
