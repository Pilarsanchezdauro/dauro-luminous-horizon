-- Drop the policy that publicly exposes blog analytics data
DROP POLICY IF EXISTS "Anyone can view blog analytics events" ON public.analytics_events;