import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PublishRequest {
  postId: string;
  zapierWebhookUrl?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postId, zapierWebhookUrl }: PublishRequest = await req.json();

    if (!postId) {
      throw new Error('Post ID is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get post details
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      throw new Error(`Failed to fetch post: ${fetchError?.message}`);
    }

    // Use the webhook URL from the request or from the post
    const webhookUrl = zapierWebhookUrl || post.zapier_webhook_url;

    if (!webhookUrl) {
      throw new Error('Zapier webhook URL is required');
    }

    console.log('Publishing post to Zapier:', {
      postId: post.id,
      title: post.title,
      webhookUrl: webhookUrl.substring(0, 50) + '...'
    });

    // Prepare data to send to Zapier
    const zapierData = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags || [],
      image_url: post.image_url,
      published_at: post.published_at,
      url: `https://grupodauro.com/blog/${post.slug}`,
      slug: post.slug,
      
      // Social media optimized fields
      social_text: `${post.title}\n\n${post.excerpt}\n\nLeer más: https://grupodauro.com/blog/${post.slug}`,
      hashtags: post.tags?.map((tag: string) => `#${tag.replace(/\s+/g, '')}`).join(' ') || '',
    };

    // Send to Zapier webhook
    const zapierResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zapierData),
    });

    if (!zapierResponse.ok) {
      const errorText = await zapierResponse.text();
      throw new Error(`Zapier webhook failed: ${zapierResponse.status} - ${errorText}`);
    }

    console.log('Successfully sent to Zapier');

    // Update post to mark as published to social
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        published_to_social: true,
        social_publish_error: null,
      })
      .eq('id', postId);

    if (updateError) {
      console.error('Failed to update post status:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Post published to social media successfully',
        post: {
          id: post.id,
          title: post.title,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Error publishing to social media:', error);

    // Try to update the post with the error
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { postId } = await req.json();
      if (postId) {
        await supabase
          .from('blog_posts')
          .update({
            social_publish_error: error.message,
          })
          .eq('id', postId);
      }
    } catch (updateError) {
      console.error('Failed to update error status:', updateError);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
