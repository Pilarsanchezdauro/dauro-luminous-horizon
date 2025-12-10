-- Create table for AI rate limiting by IP address
CREATE TABLE IF NOT EXISTS public.ai_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  function_name text NOT NULL,
  request_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (ip_address, function_name)
);

-- Enable RLS
ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;

-- Service role can manage rate limits (for edge functions)
CREATE POLICY "Service role can manage rate limits" 
ON public.ai_rate_limits 
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_ai_rate_limits_ip_function ON public.ai_rate_limits (ip_address, function_name);
CREATE INDEX idx_ai_rate_limits_window_start ON public.ai_rate_limits (window_start);