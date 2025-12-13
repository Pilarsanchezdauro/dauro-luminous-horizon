-- Drop the existing category check constraint
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_category_check;

-- Add new constraint with 'obras-arte' category included
ALTER TABLE public.projects ADD CONSTRAINT projects_category_check CHECK (
  category IN (
    'webs',
    'booktrailers', 
    'pintura',
    'imagen-corporativa',
    'cine',
    'musica',
    'avatares',
    'portadas-libros',
    'artistas-cantantes',
    'artistas-pintores',
    'obras-arte'
  )
);