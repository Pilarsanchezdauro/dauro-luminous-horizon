-- Drop existing check constraint and add new one with produccion-musical category
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_check;

ALTER TABLE projects ADD CONSTRAINT projects_category_check CHECK (
  category IN (
    'artistas-cantantes',
    'artistas-pintores',
    'avatares',
    'booktrailers',
    'cine',
    'imagen-corporativa',
    'pintura',
    'portadas-libros',
    'webs',
    'produccion-musical'
  )
);