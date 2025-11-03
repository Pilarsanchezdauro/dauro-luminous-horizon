-- Create table to track cover generation usage
CREATE TABLE public.cover_generation_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT,
  ip_address TEXT,
  generations_count INTEGER NOT NULL DEFAULT 0,
  last_generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT check_email_or_ip CHECK (email IS NOT NULL OR ip_address IS NOT NULL)
);

-- Create table to store purchased credits
CREATE TABLE public.cover_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  credits_remaining INTEGER NOT NULL DEFAULT 0,
  total_credits_purchased INTEGER NOT NULL DEFAULT 0,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT
);

-- Create indexes for faster lookups
CREATE INDEX idx_cover_usage_email ON public.cover_generation_usage(email);
CREATE INDEX idx_cover_usage_ip ON public.cover_generation_usage(ip_address);
CREATE INDEX idx_cover_credits_email ON public.cover_credits(email);
CREATE INDEX idx_cover_credits_stripe_payment ON public.cover_credits(stripe_payment_intent_id);

-- Enable Row Level Security
ALTER TABLE public.cover_generation_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cover_credits ENABLE ROW LEVEL SECURITY;

-- Policies for cover_generation_usage (public read for checking limits)
CREATE POLICY "Anyone can check usage limits"
ON public.cover_generation_usage
FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert usage records"
ON public.cover_generation_usage
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update usage records"
ON public.cover_generation_usage
FOR UPDATE
USING (true);

-- Policies for cover_credits
CREATE POLICY "Anyone can check their credits"
ON public.cover_credits
FOR SELECT
USING (true);

CREATE POLICY "System can insert credits"
ON public.cover_credits
FOR INSERT
WITH CHECK (true);

CREATE POLICY "System can update credits"
ON public.cover_credits
FOR UPDATE
USING (true);

CREATE POLICY "Admins can view all credits"
ON public.cover_credits
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));