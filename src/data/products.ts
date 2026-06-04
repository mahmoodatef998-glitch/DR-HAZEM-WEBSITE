export type ProductOrigin = "ES" | "IT";

export type ProductCategory =
  | "All"
  | "Cardiology"
  | "Dermatology"
  | "Supplements"
  | "Orthopedics"
  | "Immunology"
  | "Pediatrics";

export interface Product {
  id: number;
  name: string;
  brand: string;
  origin: ProductOrigin;
  category: Exclude<ProductCategory, "All">;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  badge?: string;
  badgeColor?: "sky" | "teal" | "violet" | "rose" | "amber" | "emerald";
  // legacy fields (kept for FlipBook/VelocityShowcase compatibility)
  duration?: string;
  reviews?: number;
  rating: number;
  icon: string;
  gradient: string;
  popular?: boolean;
  discount?: number;
  image_url?: string; // Cloudinary / external image (overrides emoji icon when set)
}

export const CATEGORIES: ProductCategory[] = [
  "All",
  "Cardiology",
  "Dermatology",
  "Supplements",
  "Orthopedics",
  "Immunology",
  "Pediatrics",
];

export const ORIGIN_LABEL: Record<ProductOrigin, string> = {
  ES: "🇪🇸 Spain",
  IT: "🇮🇹 Italy",
};

export const products: Product[] = [

  /* ─── 🇪🇸 Spain ─────────────────────────────── */
  {
    id: 1,
    name: "OmegaCore Forte 1000mg",
    brand: "Ferrer Internacional",
    origin: "ES",
    category: "Cardiology",
    price: "AED 189",
    description:
      "Ultra-pure Omega-3 fatty acids from deep-sea fish, supporting cardiovascular health and cholesterol balance.",
    features: [
      "1000mg EPA/DHA per capsule",
      "Molecularly distilled — zero contaminants",
      "Cardiovascular & triglyceride support",
      "90 softgels per pack",
      "Clinically tested formula",
    ],
    badge: "Best Seller",
    rating: 4.9,
    reviews: 312,
    icon: "🫀",
    gradient: "from-rose-500 to-red-600",
    popular: true,
  },
  {
    id: 2,
    name: "CalciVit D3 Plus",
    brand: "Faes Farma",
    origin: "ES",
    category: "Orthopedics",
    price: "AED 145",
    description:
      "High-absorption calcium carbonate combined with Vitamin D3, designed for bone density maintenance and osteoporosis prevention.",
    features: [
      "1200mg calcium per dose",
      "800 IU Vitamin D3",
      "Bone density support",
      "Chewable tablet — fast absorption",
      "60 tablets per pack",
    ],
    rating: 4.8,
    reviews: 248,
    icon: "🦴",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: 3,
    name: "DermActiv Repair Complex",
    brand: "Cantabria Labs",
    origin: "ES",
    category: "Dermatology",
    price: "AED 220",
    originalPrice: "AED 270",
    description:
      "Medical-grade topical formula combining retinol, hyaluronic acid, and ceramides for deep skin restoration and barrier repair.",
    features: [
      "0.3% encapsulated retinol",
      "3 types of hyaluronic acid",
      "Ceramide barrier complex",
      "Dermatologist tested",
      "50ml / 3-month supply",
    ],
    badge: "New Arrival",
    rating: 4.9,
    reviews: 185,
    icon: "✨",
    gradient: "from-pink-400 to-rose-500",
    discount: 19,
  },
  {
    id: 4,
    name: "VitaForte B-Complex Max",
    brand: "Laboratorios Almirall",
    origin: "ES",
    category: "Supplements",
    price: "AED 115",
    description:
      "Complete B-vitamin complex providing all 8 B vitamins in their active bioavailable forms for energy metabolism and nervous system health.",
    features: [
      "All 8 B vitamins (B1–B12)",
      "Methylcobalamin B12 (active form)",
      "Energy & nervous system support",
      "30 capsules per pack",
      "No artificial additives",
    ],
    rating: 4.7,
    reviews: 196,
    icon: "⚡",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    id: 5,
    name: "ImmunoShield Pro",
    brand: "Rovi Pharmaceuticals",
    origin: "ES",
    category: "Immunology",
    price: "AED 175",
    description:
      "Advanced immune system support formula combining Vitamin C, Zinc, Elderberry extract, and Beta-glucans for year-round immune defence.",
    features: [
      "1000mg Vitamin C",
      "15mg Zinc bisglycinate",
      "Elderberry extract 400mg",
      "Beta-1,3/1,6-glucans",
      "60 capsules — 2 months supply",
    ],
    badge: "Top Rated",
    rating: 4.9,
    reviews: 274,
    icon: "🛡️",
    gradient: "from-sky-500 to-blue-600",
    popular: true,
  },
  {
    id: 6,
    name: "NeuroCalm Magnesium",
    brand: "Esteve Pharmaceuticals",
    origin: "ES",
    category: "Supplements",
    price: "AED 135",
    description:
      "Highly bioavailable magnesium bisglycinate for stress relief, improved sleep quality, and muscle relaxation.",
    features: [
      "400mg magnesium bisglycinate",
      "Maximum bioavailability form",
      "Stress & anxiety reduction",
      "Sleep quality improvement",
      "90 capsules per pack",
    ],
    rating: 4.8,
    reviews: 321,
    icon: "🧘",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 7,
    name: "PediaVit Complete",
    brand: "Laboratorios Cinfa",
    origin: "ES",
    category: "Pediatrics",
    price: "AED 98",
    description:
      "Complete multivitamin and mineral formula specially designed for children aged 4–12 to support healthy growth and development.",
    features: [
      "13 essential vitamins",
      "7 key minerals",
      "Immune system support",
      "Sugar-free chewable gummies",
      "30-day supply",
    ],
    badge: "For Children",
    rating: 4.9,
    reviews: 408,
    icon: "👶",
    gradient: "from-teal-400 to-green-500",
    popular: true,
  },
  {
    id: 8,
    name: "ArthroFlex Joint Support",
    brand: "Bama-Geve",
    origin: "ES",
    category: "Orthopedics",
    price: "AED 210",
    originalPrice: "AED 255",
    description:
      "Premium glucosamine-chondroitin complex with MSM and collagen peptides for comprehensive joint health, flexibility, and cartilage repair.",
    features: [
      "Glucosamine 1500mg",
      "Chondroitin 1200mg",
      "MSM 500mg",
      "Type-II Collagen 40mg",
      "60 tablets — 1-month supply",
    ],
    rating: 4.7,
    reviews: 163,
    icon: "🦿",
    gradient: "from-cyan-500 to-sky-600",
    discount: 18,
  },

  /* ─── 🇮🇹 Italy ───────────────────────────────── */
  {
    id: 9,
    name: "CardioRil Premium",
    brand: "Recordati S.p.A.",
    origin: "IT",
    category: "Cardiology",
    price: "AED 245",
    description:
      "Advanced cardiovascular support formula combining CoQ10, L-Carnitine, and Hawthorn extract for optimal heart function and energy production.",
    features: [
      "CoQ10 (Ubiquinol) 200mg",
      "L-Carnitine tartrate 500mg",
      "Hawthorn berry extract",
      "Blood pressure support",
      "60 softgels per pack",
    ],
    badge: "Premium",
    rating: 5.0,
    reviews: 142,
    icon: "💓",
    gradient: "from-red-500 to-rose-700",
  },
  {
    id: 10,
    name: "OsteoMax Advanced",
    brand: "Bracco Pharmaceuticals",
    origin: "IT",
    category: "Orthopedics",
    price: "AED 195",
    description:
      "Medical-grade bone health complex with hydroxyapatite, strontium, and Vitamin K2 for superior bone mineralisation and strength.",
    features: [
      "Microcrystalline hydroxyapatite",
      "Vitamin K2 (MK-7) 180mcg",
      "Strontium citrate 340mg",
      "Bone mineralisation support",
      "90 tablets — 3-month supply",
    ],
    rating: 4.8,
    reviews: 119,
    icon: "🏋️",
    gradient: "from-stone-500 to-amber-700",
  },
  {
    id: 11,
    name: "DermoItalia Brightening Serum",
    brand: "Menarini Group",
    origin: "IT",
    category: "Dermatology",
    price: "AED 285",
    originalPrice: "AED 340",
    description:
      "Intensive brightening serum with stabilised Vitamin C 20%, niacinamide, and tranexamic acid to visibly reduce hyperpigmentation and unify skin tone.",
    features: [
      "Vitamin C (ascorbyl glucoside) 20%",
      "Niacinamide 5%",
      "Tranexamic acid 2%",
      "Anti-dark spot formula",
      "30ml — 2-month supply",
    ],
    badge: "Best Seller",
    rating: 4.9,
    reviews: 287,
    icon: "💎",
    gradient: "from-amber-400 to-yellow-600",
    popular: true,
    discount: 16,
  },
  {
    id: 12,
    name: "ProBiotic Elite 50B",
    brand: "Dompé Farmaceutici",
    origin: "IT",
    category: "Immunology",
    price: "AED 160",
    description:
      "Multi-strain probiotic with 50 billion CFU across 12 clinically studied strains, supporting gut health, immunity, and microbiome balance.",
    features: [
      "50 billion CFU per capsule",
      "12 scientifically studied strains",
      "Acid-resistant capsule technology",
      "Prebiotic FOS included",
      "30 capsules per pack",
    ],
    rating: 4.8,
    reviews: 334,
    icon: "🧬",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 13,
    name: "AntiOx Complex Ultra",
    brand: "Alfasigma S.p.A.",
    origin: "IT",
    category: "Supplements",
    price: "AED 155",
    description:
      "Comprehensive antioxidant protection formula with Resveratrol, Astaxanthin, Alpha-lipoic acid, and Glutathione for cellular defence.",
    features: [
      "Trans-resveratrol 250mg",
      "Astaxanthin 12mg",
      "Alpha-lipoic acid 300mg",
      "Reduced glutathione 200mg",
      "60 capsules — 2-month supply",
    ],
    badge: "Anti-Ageing",
    rating: 4.9,
    reviews: 201,
    icon: "🌿",
    gradient: "from-green-500 to-emerald-700",
  },
  {
    id: 14,
    name: "VitaPed Iron + C",
    brand: "Chiesi Farmaceutici",
    origin: "IT",
    category: "Pediatrics",
    price: "AED 88",
    description:
      "Iron deficiency solution for children with enhanced Vitamin C absorption, formulated as a pleasant-tasting syrup for easy daily administration.",
    features: [
      "15mg iron bisglycinate per dose",
      "60mg Vitamin C for iron absorption",
      "Gentle on sensitive stomach",
      "Orange-flavoured syrup",
      "150ml bottle — 1-month supply",
    ],
    rating: 4.8,
    reviews: 176,
    icon: "🍊",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: 15,
    name: "EnergiPlex B12 Max",
    brand: "Farmaceutici Dott. Ciccarelli",
    origin: "IT",
    category: "Supplements",
    price: "AED 125",
    description:
      "High-potency methylcobalamin B12 with intrinsic factor for maximum absorption, targeting fatigue, cognitive function, and nerve health.",
    features: [
      "5000mcg methylcobalamin B12",
      "Intrinsic factor for absorption",
      "Sublingual for instant uptake",
      "Mental clarity & energy support",
      "60 sublingual tablets",
    ],
    badge: "High Potency",
    rating: 4.9,
    reviews: 289,
    icon: "⭐",
    gradient: "from-indigo-500 to-violet-600",
    popular: true,
  },
  {
    id: 16,
    name: "DermoPur Acne Control",
    brand: "Laborest Italia",
    origin: "IT",
    category: "Dermatology",
    price: "AED 175",
    description:
      "Pharmaceutical-grade acne treatment combining Azelaic acid, Zinc, and Nicotinamide to reduce breakouts, control sebum, and fade post-acne marks.",
    features: [
      "Azelaic acid 15%",
      "Zinc PCA 1%",
      "Nicotinamide 4%",
      "Reduces inflammation & marks",
      "30ml gel — 2-month supply",
    ],
    rating: 4.7,
    reviews: 143,
    icon: "🔬",
    gradient: "from-sky-400 to-cyan-600",
  },
];
