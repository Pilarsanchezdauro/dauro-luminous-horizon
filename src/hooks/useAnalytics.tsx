import { supabase } from "@/integrations/supabase/client";
import { useCallback } from "react";

interface AnalyticsEvent {
  event_type: string;
  event_category: string;
  event_name: string;
  metadata?: Record<string, any>;
  page_url?: string;
  referrer?: string;
}

export const useAnalytics = () => {
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get or create session ID
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('analytics_session_id', sessionId);
      }

      await supabase.from('analytics_events').insert({
        event_type: event.event_type,
        event_category: event.event_category,
        event_name: event.event_name,
        user_id: user?.id || null,
        session_id: sessionId,
        metadata: event.metadata || null,
        page_url: event.page_url || window.location.href,
        referrer: event.referrer || document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }, []);

  // Specific tracking methods for common events
  const trackAIInteraction = useCallback((action: string, metadata?: Record<string, any>) => {
    return trackEvent({
      event_type: 'ai_interaction',
      event_category: 'assistant',
      event_name: action,
      metadata,
    });
  }, [trackEvent]);

  const trackFormSubmission = useCallback((formName: string, metadata?: Record<string, any>) => {
    return trackEvent({
      event_type: 'form_submission',
      event_category: 'form',
      event_name: formName,
      metadata,
    });
  }, [trackEvent]);

  const trackBlogEngagement = useCallback((action: string, metadata?: Record<string, any>) => {
    return trackEvent({
      event_type: 'blog_engagement',
      event_category: 'blog',
      event_name: action,
      metadata,
    });
  }, [trackEvent]);

  const trackPageView = useCallback((pageName: string, metadata?: Record<string, any>) => {
    return trackEvent({
      event_type: 'page_view',
      event_category: 'navigation',
      event_name: pageName,
      metadata,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackAIInteraction,
    trackFormSubmission,
    trackBlogEngagement,
    trackPageView,
  };
};
