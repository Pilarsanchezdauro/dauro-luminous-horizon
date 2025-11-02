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

  let postId: string | undefined;

  try {
    // Initialize Supabase client with service role for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Publish attempt without authorization header');
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    // Create client with user's JWT to verify authentication
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Verify the user's session and get user ID
    const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid authentication' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    console.log('Authenticated user attempting to publish:', user.id);

    // Check if user has admin or staff role using the security definer function
    const { data: hasAdminRole, error: adminCheckError } = await supabaseAdmin
      .rpc('has_role', { _user_id: user.id, _role: 'admin' });

    const { data: hasStaffRole, error: staffCheckError } = await supabaseAdmin
      .rpc('has_role', { _user_id: user.id, _role: 'staff' });

    if (adminCheckError && staffCheckError) {
      console.error('Failed to check user roles:', { adminCheckError, staffCheckError });
      return new Response(
        JSON.stringify({ success: false, error: 'Permission verification failed' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    const isAuthorized = hasAdminRole || hasStaffRole;

    if (!isAuthorized) {
      console.warn('Unauthorized publish attempt by user:', user.id);
      return new Response(
        JSON.stringify({ success: false, error: 'Insufficient permissions. Admin or staff role required.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      );
    }

    console.log('User authorized to publish posts:', user.id);

    const requestData: PublishRequest = await req.json();
    postId = requestData.postId;
    const zapierWebhookUrl = requestData.zapierWebhookUrl;

    if (!postId) {
      throw new Error('Post ID is required');
    }

    // Get post details using admin client
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      console.error('Failed to fetch post:', postId, fetchError?.message);
      throw new Error(`Post not found or invalid: ${fetchError?.message}`);
    }

    // Validate post is in publishable state
    if (!post.status || post.status === 'draft') {
      console.warn('Attempt to publish draft post:', postId);
      throw new Error('Cannot publish draft posts');
    }

    console.log('Post validated for publishing:', {
      postId: post.id,
      title: post.title,
      status: post.status,
    });

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

    // Update post to mark as published to social (using admin client)
    const { error: updateError } = await supabaseAdmin
      .from('blog_posts')
      .update({
        published_to_social: true,
        social_publish_error: null,
      })
      .eq('id', postId);

    if (updateError) {
      console.error('Failed to update post status:', updateError);
    }

    // Audit log: Record successful publish
    console.log('AUDIT: Post published to social media', {
      postId: post.id,
      userId: user.id,
      timestamp: new Date().toISOString(),
    });

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
    if (postId) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
        
        await supabaseAdmin
          .from('blog_posts')
          .update({
            social_publish_error: error.message,
          })
          .eq('id', postId);
      } catch (updateError) {
        console.error('Failed to update error status:', updateError);
      }
    }

    // Audit log: Record failed publish attempt
    console.error('AUDIT: Failed social media publish attempt', {
      postId,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

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
