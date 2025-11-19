-- Allow public read access to blog analytics events (aggregated data only)
-- This enables the public blog stats dashboard

CREATE POLICY "Anyone can view blog analytics events"
ON analytics_events
FOR SELECT
TO public
USING (
  event_category = 'blog'
);