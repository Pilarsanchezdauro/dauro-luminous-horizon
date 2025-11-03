-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('youtube', 'web', 'imagen', 'guion')),
  client TEXT,
  year INTEGER,
  summary TEXT NOT NULL,
  description TEXT,
  services TEXT[] DEFAULT '{}',
  links JSONB DEFAULT '[]'::jsonb,
  main_image_url TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  slug TEXT NOT NULL UNIQUE
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published projects
CREATE POLICY "Anyone can view published projects"
  ON public.projects
  FOR SELECT
  USING (published = true);

-- Policy: Admins can manage all projects
CREATE POLICY "Admins can manage all projects"
  ON public.projects
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Create index for slug lookups
CREATE INDEX idx_projects_slug ON public.projects(slug);

-- Create index for filtering
CREATE INDEX idx_projects_category ON public.projects(category);
CREATE INDEX idx_projects_year ON public.projects(year);
CREATE INDEX idx_projects_published ON public.projects(published);

-- Create trigger to update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_post_updated_at();

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for project images
CREATE POLICY "Anyone can view project images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));

CREATE POLICY "Admins can update project images"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'project-images' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));

CREATE POLICY "Admins can delete project images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'project-images' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role)));