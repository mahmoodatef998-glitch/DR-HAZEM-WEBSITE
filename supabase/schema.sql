-- ═══════════════════════════════════════════════════
--  Medix Healthcare — Supabase Schema
--  Run this ONCE in Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- ── Products table ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          text        NOT NULL,
  name_ar       text,
  brand         text        NOT NULL,
  origin        text        NOT NULL CHECK (origin IN ('ES','IT')),
  category      text        NOT NULL,
  price         text        NOT NULL,
  original_price text,
  description   text,
  description_ar text,
  features      text[]      NOT NULL DEFAULT '{}',
  features_ar   text[]      NOT NULL DEFAULT '{}',
  badge         text,
  badge_color   text,
  rating        numeric(3,1) NOT NULL DEFAULT 4.9,
  reviews       integer     NOT NULL DEFAULT 0,
  icon          text        NOT NULL DEFAULT '💊',
  gradient      text        NOT NULL DEFAULT 'from-sky-500 to-blue-600',
  popular       boolean     NOT NULL DEFAULT false,
  discount      integer,
  image_url     text,
  sort_order    integer     NOT NULL DEFAULT 0,
  active        boolean     NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ── Site settings (hero, about, contact, etc.) ──────
CREATE TABLE IF NOT EXISTS public.site_settings (
  section    text        PRIMARY KEY,
  content    jsonb       NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ── Row Level Security ──────────────────────────────
ALTER TABLE public.products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public: read active products
CREATE POLICY "public_read_products" ON public.products
  FOR SELECT TO anon USING (active = true);

-- Public: read site settings
CREATE POLICY "public_read_settings" ON public.site_settings
  FOR SELECT TO anon USING (true);

-- Authenticated admin: full access
CREATE POLICY "admin_all_products" ON public.products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "admin_all_settings" ON public.site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Auto-update updated_at ──────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER site_settings_set_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── Storage bucket for media ────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_media" ON storage.objects
  FOR SELECT TO anon USING (bucket_id = 'media');

CREATE POLICY "admin_upload_media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

CREATE POLICY "admin_update_media" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'media');

CREATE POLICY "admin_delete_media" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media');

-- ═══════════════════════════════════════════════════
--  Seed: Initial 16 products
-- ═══════════════════════════════════════════════════
INSERT INTO public.products
  (name, brand, origin, category, price, original_price, description, features, badge, rating, reviews, icon, gradient, popular, discount, sort_order)
VALUES
  ('OmegaCore Forte 1000mg','Ferrer Internacional','ES','Cardiology','AED 189',NULL,'Ultra-pure Omega-3 fatty acids from deep-sea fish, supporting cardiovascular health and cholesterol balance.',ARRAY['1000mg EPA/DHA per capsule','Molecularly distilled — zero contaminants','Cardiovascular & triglyceride support','90 softgels per pack','Clinically tested formula'],'Best Seller',4.9,312,'🫀','from-rose-500 to-red-600',true,NULL,1),

  ('CalciVit D3 Plus','Faes Farma','ES','Orthopedics','AED 145',NULL,'High-absorption calcium carbonate combined with Vitamin D3, designed for bone density maintenance.',ARRAY['1200mg calcium per dose','800 IU Vitamin D3','Bone density support','Chewable tablet — fast absorption','60 tablets per pack'],NULL,4.8,248,'🦴','from-amber-400 to-orange-500',false,NULL,2),

  ('DermActiv Repair Complex','Cantabria Labs','ES','Dermatology','AED 220','AED 270','Medical-grade topical formula combining retinol, hyaluronic acid, and ceramides for deep skin restoration.',ARRAY['0.3% encapsulated retinol','3 types of hyaluronic acid','Ceramide barrier complex','Dermatologist tested','50ml / 3-month supply'],'New Arrival',4.9,185,'✨','from-pink-400 to-rose-500',false,19,3),

  ('VitaForte B-Complex Max','Laboratorios Almirall','ES','Supplements','AED 115',NULL,'Complete B-vitamin complex providing all 8 B vitamins in active bioavailable forms.',ARRAY['All 8 B vitamins (B1–B12)','Methylcobalamin B12 (active form)','Energy & nervous system support','30 capsules per pack','No artificial additives'],NULL,4.7,196,'⚡','from-yellow-400 to-amber-500',false,NULL,4),

  ('ImmunoShield Pro','Rovi Pharmaceuticals','ES','Immunology','AED 175',NULL,'Advanced immune system support formula combining Vitamin C, Zinc, Elderberry extract, and Beta-glucans.',ARRAY['1000mg Vitamin C','15mg Zinc bisglycinate','Elderberry extract 400mg','Beta-1,3/1,6-glucans','60 capsules — 2 months supply'],'Top Rated',4.9,274,'🛡️','from-sky-500 to-blue-600',true,NULL,5),

  ('NeuroCalm Magnesium','Esteve Pharmaceuticals','ES','Supplements','AED 135',NULL,'Highly bioavailable magnesium bisglycinate for stress relief, improved sleep quality, and muscle relaxation.',ARRAY['400mg magnesium bisglycinate','Maximum bioavailability form','Stress & anxiety reduction','Sleep quality improvement','90 capsules per pack'],NULL,4.8,321,'🧘','from-violet-500 to-purple-600',false,NULL,6),

  ('PediaVit Complete','Laboratorios Cinfa','ES','Pediatrics','AED 98',NULL,'Complete multivitamin and mineral formula specially designed for children aged 4–12.',ARRAY['13 essential vitamins','7 key minerals','Immune system support','Sugar-free chewable gummies','30-day supply'],'For Children',4.9,408,'👶','from-teal-400 to-green-500',true,NULL,7),

  ('ArthroFlex Joint Support','Bama-Geve','ES','Orthopedics','AED 210','AED 255','Premium glucosamine-chondroitin complex with MSM and collagen peptides for comprehensive joint health.',ARRAY['Glucosamine 1500mg','Chondroitin 1200mg','MSM 500mg','Type-II Collagen 40mg','60 tablets — 1-month supply'],NULL,4.7,163,'🦿','from-cyan-500 to-sky-600',false,18,8),

  ('CardioRil Premium','Recordati S.p.A.','IT','Cardiology','AED 245',NULL,'Advanced cardiovascular support formula combining CoQ10, L-Carnitine, and Hawthorn extract.',ARRAY['CoQ10 (Ubiquinol) 200mg','L-Carnitine tartrate 500mg','Hawthorn berry extract','Blood pressure support','60 softgels per pack'],'Premium',5.0,142,'💓','from-red-500 to-rose-700',false,NULL,9),

  ('OsteoMax Advanced','Bracco Pharmaceuticals','IT','Orthopedics','AED 195',NULL,'Medical-grade bone health complex with hydroxyapatite, strontium, and Vitamin K2.',ARRAY['Microcrystalline hydroxyapatite','Vitamin K2 (MK-7) 180mcg','Strontium citrate 340mg','Bone mineralisation support','90 tablets — 3-month supply'],NULL,4.8,119,'🏋️','from-stone-500 to-amber-700',false,NULL,10),

  ('DermoItalia Brightening Serum','Menarini Group','IT','Dermatology','AED 285','AED 340','Intensive brightening serum with stabilised Vitamin C 20%, niacinamide, and tranexamic acid.',ARRAY['Vitamin C (ascorbyl glucoside) 20%','Niacinamide 5%','Tranexamic acid 2%','Anti-dark spot formula','30ml — 2-month supply'],'Best Seller',4.9,287,'💎','from-amber-400 to-yellow-600',true,16,11),

  ('ProBiotic Elite 50B','Dompé Farmaceutici','IT','Immunology','AED 160',NULL,'Multi-strain probiotic with 50 billion CFU across 12 clinically studied strains.',ARRAY['50 billion CFU per capsule','12 scientifically studied strains','Acid-resistant capsule technology','Prebiotic FOS included','30 capsules per pack'],NULL,4.8,334,'🧬','from-emerald-500 to-teal-600',false,NULL,12),

  ('AntiOx Complex Ultra','Alfasigma S.p.A.','IT','Supplements','AED 155',NULL,'Comprehensive antioxidant protection formula with Resveratrol, Astaxanthin, and Glutathione.',ARRAY['Trans-resveratrol 250mg','Astaxanthin 12mg','Alpha-lipoic acid 300mg','Reduced glutathione 200mg','60 capsules — 2-month supply'],'Anti-Ageing',4.9,201,'🌿','from-green-500 to-emerald-700',false,NULL,13),

  ('VitaPed Iron + C','Chiesi Farmaceutici','IT','Pediatrics','AED 88',NULL,'Iron deficiency solution for children with enhanced Vitamin C absorption, formulated as a syrup.',ARRAY['15mg iron bisglycinate per dose','60mg Vitamin C for iron absorption','Gentle on sensitive stomach','Orange-flavoured syrup','150ml bottle — 1-month supply'],NULL,4.8,176,'🍊','from-orange-400 to-red-500',false,NULL,14),

  ('EnergiPlex B12 Max','Farmaceutici Dott. Ciccarelli','IT','Supplements','AED 125',NULL,'High-potency methylcobalamin B12 with intrinsic factor for maximum absorption.',ARRAY['5000mcg methylcobalamin B12','Intrinsic factor for absorption','Sublingual for instant uptake','Mental clarity & energy support','60 sublingual tablets'],'High Potency',4.9,289,'⭐','from-indigo-500 to-violet-600',true,NULL,15),

  ('DermoPur Acne Control','Laborest Italia','IT','Dermatology','AED 175',NULL,'Pharmaceutical-grade acne treatment combining Azelaic acid, Zinc, and Nicotinamide.',ARRAY['Azelaic acid 15%','Zinc PCA 1%','Nicotinamide 4%','Reduces inflammation & marks','30ml gel — 2-month supply'],NULL,4.7,143,'🔬','from-sky-400 to-cyan-600',false,NULL,16)
ON CONFLICT DO NOTHING;
