-- Allow Egypt (EG) as product origin — run once in Supabase SQL Editor
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_origin_check;
ALTER TABLE public.products ADD CONSTRAINT products_origin_check
  CHECK (origin IN ('ES', 'IT', 'EG'));
