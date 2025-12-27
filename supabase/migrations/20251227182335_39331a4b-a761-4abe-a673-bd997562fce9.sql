-- Create table to store ebook download links for products
CREATE TABLE public.product_ebooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  shopify_product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  ebook_url TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT DEFAULT 'pdf',
  download_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Enable RLS
ALTER TABLE public.product_ebooks ENABLE ROW LEVEL SECURITY;

-- Admins can manage ebooks
CREATE POLICY "Admins can manage product ebooks"
ON public.product_ebooks
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Public can view active ebooks (needed for download verification)
CREATE POLICY "Anyone can view active ebooks"
ON public.product_ebooks
FOR SELECT
USING (is_active = true);

-- Create table for verified purchases (to track who can download)
CREATE TABLE public.ebook_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  shopify_order_id TEXT NOT NULL,
  shopify_product_id TEXT NOT NULL,
  download_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '30 days')
);

-- Enable RLS
ALTER TABLE public.ebook_purchases ENABLE ROW LEVEL SECURITY;

-- Service role can insert purchases (from webhook)
CREATE POLICY "Service role can manage ebook purchases"
ON public.ebook_purchases
FOR ALL
USING (true)
WITH CHECK (true);

-- Create updated_at trigger for product_ebooks
CREATE TRIGGER update_product_ebooks_updated_at
BEFORE UPDATE ON public.product_ebooks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();