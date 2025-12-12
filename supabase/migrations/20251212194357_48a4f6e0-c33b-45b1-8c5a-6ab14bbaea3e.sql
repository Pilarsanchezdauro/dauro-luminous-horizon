-- Drop the existing check constraint and add all categories including new artist ones
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_check;

ALTER TABLE projects ADD CONSTRAINT projects_category_check CHECK (
  category IN (
    'editorial', 
    'audiovisual', 
    'diseno', 
    'ia', 
    'web', 
    'branding',
    'webs',
    'pintura',
    'imagen-corporativa',
    'portadas-libros',
    'cine',
    'avatares',
    'booktrailers',
    'artistas-cantantes', 
    'artistas-pintores'
  )
);