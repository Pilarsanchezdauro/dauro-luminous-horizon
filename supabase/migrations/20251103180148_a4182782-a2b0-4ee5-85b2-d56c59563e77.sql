
-- Eliminar el constraint existente
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_check;

-- Agregar nuevo constraint con la categoría "avatares"
ALTER TABLE projects ADD CONSTRAINT projects_category_check 
CHECK (category IN ('webs', 'cine', 'booktrailers', 'avatares'));
