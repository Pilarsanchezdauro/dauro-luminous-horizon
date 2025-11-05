-- Fix credit system RLS policies to prevent unauthorized access
-- This addresses the PUBLIC_DATA_EXPOSURE security issue

-- Drop overly permissive policies on cover_credits
DROP POLICY IF EXISTS "Anyone can check their credits" ON cover_credits;
DROP POLICY IF EXISTS "System can insert credits" ON cover_credits;
DROP POLICY IF EXISTS "System can update credits" ON cover_credits;

-- Create restricted policies for cover_credits
-- Users can only view their own credits
CREATE POLICY "Users can view own credits" 
  ON cover_credits FOR SELECT 
  USING (
    auth.email() = email OR
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'staff'::app_role)
  );

-- Only service role (edge functions) can insert/update credits
CREATE POLICY "Service role can insert credits" 
  ON cover_credits FOR INSERT 
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can update credits" 
  ON cover_credits FOR UPDATE 
  USING (auth.jwt()->>'role' = 'service_role');

-- Drop overly permissive policies on cover_generation_usage
DROP POLICY IF EXISTS "Anyone can check usage limits" ON cover_generation_usage;
DROP POLICY IF EXISTS "Anyone can insert usage records" ON cover_generation_usage;
DROP POLICY IF EXISTS "Anyone can update usage records" ON cover_generation_usage;

-- Create restricted policies for cover_generation_usage
-- Users can only view their own usage (by email or IP)
CREATE POLICY "Users can view own usage" 
  ON cover_generation_usage FOR SELECT 
  USING (
    (auth.email() IS NOT NULL AND auth.email() = email) OR
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'staff'::app_role)
  );

-- Only service role can manage usage records
CREATE POLICY "Service role can insert usage" 
  ON cover_generation_usage FOR INSERT 
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can update usage" 
  ON cover_generation_usage FOR UPDATE 
  USING (auth.jwt()->>'role' = 'service_role');