-- Drop the old check constraint
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_check;

-- Add new check constraint with all categories including booktrailers
ALTER TABLE projects ADD CONSTRAINT projects_category_check 
CHECK (category IN ('webs', 'personajes', 'booktrailers', 'pintura', 'imagen-corporativa', 'cine', 'musica'));