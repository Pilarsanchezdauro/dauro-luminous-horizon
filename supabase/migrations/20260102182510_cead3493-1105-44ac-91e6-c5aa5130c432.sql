-- Allow admins to insert and select from ebook_purchases
CREATE POLICY "Admins can insert ebook purchases" 
ON public.ebook_purchases 
FOR INSERT 
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);

CREATE POLICY "Admins can view ebook purchases" 
ON public.ebook_purchases 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);