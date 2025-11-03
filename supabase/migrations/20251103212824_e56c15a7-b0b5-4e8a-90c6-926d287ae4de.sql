-- Primero eliminamos la restricción existente
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_check;

-- Luego agregamos la nueva restricción con la categoría 'portadas-libros'
ALTER TABLE projects ADD CONSTRAINT projects_category_check 
CHECK (category = ANY (ARRAY['webs'::text, 'booktrailers'::text, 'pintura'::text, 'imagen-corporativa'::text, 'cine'::text, 'musica'::text, 'avatares'::text, 'portadas-libros'::text]));