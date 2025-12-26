-- Create update_updated_at_column function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create catalog_products table for internal product management
CREATE TABLE public.catalog_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE,
  titulo TEXT NOT NULL,
  isbn VARCHAR(20),
  familia VARCHAR(100),
  pvp DECIMAL(10,2),
  descripcion TEXT,
  editorial VARCHAR(100) DEFAULT 'Ediciones Dauro',
  paginas INTEGER,
  fecha_edicion DATE,
  activo BOOLEAN DEFAULT true,
  segunda_mano BOOLEAN DEFAULT false,
  imagen_url TEXT,
  shopify_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;

-- Public read access for catalog (products are public info)
CREATE POLICY "Catalog products are publicly readable" 
ON public.catalog_products 
FOR SELECT 
USING (true);

-- Only admins can modify catalog
CREATE POLICY "Admins can manage catalog products" 
ON public.catalog_products 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Create indexes for common queries
CREATE INDEX idx_catalog_products_isbn ON public.catalog_products(isbn);
CREATE INDEX idx_catalog_products_activo ON public.catalog_products(activo);
CREATE INDEX idx_catalog_products_familia ON public.catalog_products(familia);

-- Trigger for updated_at
CREATE TRIGGER update_catalog_products_updated_at
BEFORE UPDATE ON public.catalog_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();