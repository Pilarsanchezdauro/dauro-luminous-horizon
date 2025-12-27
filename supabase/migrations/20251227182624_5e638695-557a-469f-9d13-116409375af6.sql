-- Create function to increment ebook download count
CREATE OR REPLACE FUNCTION public.increment_ebook_download(p_token TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.ebook_purchases
  SET download_count = download_count + 1
  WHERE download_token = p_token
    AND download_count < max_downloads
    AND expires_at > now();
    
  -- Also increment the product_ebooks download count
  UPDATE public.product_ebooks
  SET download_count = download_count + 1
  WHERE shopify_product_id = (
    SELECT shopify_product_id 
    FROM public.ebook_purchases 
    WHERE download_token = p_token
  );
END;
$$;