-- Aumentar el límite de tamaño de archivos en el bucket editorial-submissions a 50MB
UPDATE storage.buckets 
SET file_size_limit = 52428800 
WHERE id = 'editorial-submissions';