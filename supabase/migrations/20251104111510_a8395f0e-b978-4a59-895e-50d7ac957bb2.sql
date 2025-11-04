-- Hacer públicos los buckets de storage para que los enlaces funcionen en los emails
UPDATE storage.buckets 
SET public = true 
WHERE id IN ('editorial-submissions', 'booktrailer-files', 'dauro-arte-documents');