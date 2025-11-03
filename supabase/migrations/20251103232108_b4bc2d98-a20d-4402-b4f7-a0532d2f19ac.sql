-- Add shopify_order_id column to cover_credits table
ALTER TABLE public.cover_credits ADD COLUMN IF NOT EXISTS shopify_order_id TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cover_credits_shopify_order 
ON public.cover_credits(shopify_order_id);