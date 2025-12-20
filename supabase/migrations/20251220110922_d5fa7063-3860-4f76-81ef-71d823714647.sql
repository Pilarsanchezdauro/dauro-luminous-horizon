-- Crear tabla para registrar compras de Mirlo Key
CREATE TABLE public.mirlo_key_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('bronce', 'plata', 'oro')),
  certificate_id TEXT NOT NULL UNIQUE DEFAULT ('MK-' || upper(substr(md5(random()::text), 1, 8))),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_paid INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'refunded'))
);

-- Crear índice para búsquedas por email
CREATE INDEX idx_mirlo_key_purchases_email ON public.mirlo_key_purchases(email);

-- Crear índice para búsquedas por certificate_id
CREATE INDEX idx_mirlo_key_purchases_certificate ON public.mirlo_key_purchases(certificate_id);

-- Habilitar Row Level Security
ALTER TABLE public.mirlo_key_purchases ENABLE ROW LEVEL SECURITY;

-- Política: Solo admins pueden ver todas las compras
CREATE POLICY "Admins can view all mirlo key purchases"
ON public.mirlo_key_purchases
FOR SELECT
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Política: Solo admins pueden actualizar compras
CREATE POLICY "Admins can update mirlo key purchases"
ON public.mirlo_key_purchases
FOR UPDATE
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Política: Solo admins pueden eliminar compras
CREATE POLICY "Admins can delete mirlo key purchases"
ON public.mirlo_key_purchases
FOR DELETE
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Política: Service role puede insertar (desde edge functions)
CREATE POLICY "Service role can insert mirlo key purchases"
ON public.mirlo_key_purchases
FOR INSERT
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role');