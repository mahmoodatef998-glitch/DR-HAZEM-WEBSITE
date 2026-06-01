export type ProductCategory =
  | "All"
  | "Health Packages"
  | "Specialist Care"
  | "Diagnostics"
  | "Chronic Care"
  | "Wellness";

export interface Product {
  id: number;
  name: string;
  category: Exclude<ProductCategory, "All">;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  badge?: string;
  badgeColor?: "sky" | "teal" | "violet" | "rose" | "amber" | "emerald";
  rating: number;
  reviews: number;
  duration: string;
  icon: string; // emoji or SVG key
  gradient: string;
  popular?: boolean;
  discount?: number;
}

export const CATEGORIES: ProductCategory[] = [
  "All",
  "Health Packages",
  "Specialist Care",
  "Diagnostics",
  "Chronic Care",
  "Wellness",
];

export const products: Product[] = [
  /* ─── Health Packages ─────────────────────────────── */
  {
    id: 1,
    name: "Essential Health Check",
    category: "Health Packages",
    price: "AED 499",
    description:
      "A complete foundational health screening covering all vital indicators for a full picture of your current health status.",
    features: [
      "Full blood count (CBC)",
      "Kidney & liver function",
      "Blood glucose & HbA1c",
      "Lipid profile",
      "Doctor consultation included",
    ],
    badge: "Best Value",
    badgeColor: "sky",
    rating: 4.9,
    reviews: 284,
    duration: "2–3 hours",
    icon: "🩺",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: 2,
    name: "Premium Full Body Checkup",
    category: "Health Packages",
    price: "AED 1,299",
    originalPrice: "AED 1,799",
    description:
      "Our most comprehensive health assessment — 60+ tests covering every major organ system with full specialist review.",
    features: [
      "60+ lab tests",
      "Cardiac stress test",
      "Ultrasound scan",
      "Chest X-ray",
      "Specialist consultation & report",
    ],
    badge: "Most Popular",
    badgeColor: "violet",
    rating: 5.0,
    reviews: 512,
    duration: "Full day",
    icon: "⭐",
    gradient: "from-violet-500 to-purple-600",
    popular: true,
    discount: 28,
  },
  {
    id: 3,
    name: "Executive VIP Package",
    category: "Health Packages",
    price: "AED 2,899",
    originalPrice: "AED 3,500",
    description:
      "Designed for senior executives — a private, discreet, luxury health screening experience with concierge service.",
    features: [
      "100+ comprehensive tests",
      "Private consultation suite",
      "Cardiac & oncology markers",
      "Full nutritional assessment",
      "Priority results & follow-up",
    ],
    badge: "VIP",
    badgeColor: "amber",
    rating: 5.0,
    reviews: 98,
    duration: "Full day",
    icon: "👑",
    gradient: "from-amber-500 to-orange-600",
    discount: 17,
  },
  {
    id: 4,
    name: "Women's Wellness Package",
    category: "Health Packages",
    price: "AED 899",
    description:
      "A specially curated health package for women covering hormonal, reproductive, and general health markers.",
    features: [
      "Hormonal panel (FSH, LH, estrogen)",
      "Thyroid function (TSH, T3, T4)",
      "Bone density screening",
      "Mammogram referral",
      "Gynecology consultation",
    ],
    badge: "For Women",
    badgeColor: "rose",
    rating: 4.9,
    reviews: 321,
    duration: "3–4 hours",
    icon: "🌸",
    gradient: "from-rose-500 to-pink-600",
  },

  /* ─── Specialist Care ──────────────────────────────── */
  {
    id: 5,
    name: "Initial Specialist Consultation",
    category: "Specialist Care",
    price: "AED 450",
    description:
      "Your first appointment with Dr. Hazem — a thorough 60-minute consultation to understand your health history and concerns.",
    features: [
      "60-minute consultation",
      "Full medical history review",
      "Diagnostic planning",
      "Prescription if required",
      "Written summary report",
    ],
    badge: "Start Here",
    badgeColor: "sky",
    rating: 4.9,
    reviews: 630,
    duration: "60 minutes",
    icon: "🤝",
    gradient: "from-sky-400 to-cyan-600",
  },
  {
    id: 6,
    name: "Follow-up Consultation",
    category: "Specialist Care",
    price: "AED 250",
    description:
      "Structured follow-up session to monitor treatment progress, adjust medications, and evaluate outcomes.",
    features: [
      "30-minute session",
      "Treatment review & adjustment",
      "Lab result interpretation",
      "Medication management",
      "Next-step planning",
    ],
    rating: 4.8,
    reviews: 418,
    duration: "30 minutes",
    icon: "🔄",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    id: 7,
    name: "Second Opinion Consultation",
    category: "Specialist Care",
    price: "AED 600",
    description:
      "Get an expert second opinion on your diagnosis or treatment plan from Dr. Hazem with full documentation review.",
    features: [
      "Full case review",
      "Diagnostic report analysis",
      "Independent assessment",
      "Alternative plan options",
      "Detailed written opinion",
    ],
    badge: "High Demand",
    badgeColor: "violet",
    rating: 4.9,
    reviews: 187,
    duration: "75 minutes",
    icon: "🔍",
    gradient: "from-indigo-500 to-blue-700",
  },
  {
    id: 8,
    name: "Teleconsultation",
    category: "Specialist Care",
    price: "AED 300",
    description:
      "Secure video consultation with Dr. Hazem from anywhere in the world — same expert care, no travel required.",
    features: [
      "Secure video call",
      "Digital prescription",
      "Lab order (where applicable)",
      "Follow-up messaging",
      "Available UAE-wide",
    ],
    badge: "Online",
    badgeColor: "teal",
    rating: 4.7,
    reviews: 256,
    duration: "30–45 minutes",
    icon: "💻",
    gradient: "from-cyan-500 to-teal-600",
  },

  /* ─── Diagnostics ─────────────────────────────────── */
  {
    id: 9,
    name: "Advanced Cardiac Panel",
    category: "Diagnostics",
    price: "AED 699",
    description:
      "In-depth cardiovascular risk assessment using advanced biomarkers, ECG, and echocardiographic evaluation.",
    features: [
      "ECG & echocardiogram",
      "Troponin & BNP markers",
      "Lipid particle sizing",
      "ABI (arterial assessment)",
      "Cardiologist report",
    ],
    badge: "Precision",
    badgeColor: "rose",
    rating: 4.9,
    reviews: 203,
    duration: "2–3 hours",
    icon: "❤️",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: 10,
    name: "Diabetes & Metabolic Screen",
    category: "Diagnostics",
    price: "AED 399",
    description:
      "Comprehensive metabolic assessment for early detection and management of diabetes and insulin resistance.",
    features: [
      "Fasting glucose & HbA1c",
      "C-peptide & insulin levels",
      "Oral glucose tolerance test",
      "Full lipid & thyroid panel",
      "Nutritional counselling",
    ],
    rating: 4.8,
    reviews: 345,
    duration: "3–4 hours",
    icon: "🩸",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    id: 11,
    name: "Thyroid Comprehensive Test",
    category: "Diagnostics",
    price: "AED 349",
    description:
      "A thorough thyroid function workup to detect hypothyroidism, hyperthyroidism, and thyroid autoimmune disorders.",
    features: [
      "TSH, Free T3, Free T4",
      "Anti-TPO & Anti-TG antibodies",
      "Thyroid ultrasound",
      "Symptom correlation report",
      "Endocrinology guidance",
    ],
    badge: "Specialized",
    badgeColor: "teal",
    rating: 4.9,
    reviews: 178,
    duration: "1–2 hours",
    icon: "🔬",
    gradient: "from-teal-500 to-green-600",
  },
  {
    id: 12,
    name: "Oncology Tumour Markers",
    category: "Diagnostics",
    price: "AED 799",
    description:
      "Early cancer screening through a targeted panel of tumour markers with detailed specialist interpretation.",
    features: [
      "PSA (prostate)",
      "CA-125 (ovarian)",
      "CEA & CA 19-9 (GI)",
      "AFP (liver)",
      "Complete oncology report",
    ],
    badge: "Early Detection",
    badgeColor: "amber",
    rating: 4.9,
    reviews: 142,
    duration: "1 hour",
    icon: "🏥",
    gradient: "from-violet-600 to-indigo-700",
  },

  /* ─── Chronic Care ─────────────────────────────────── */
  {
    id: 13,
    name: "Diabetes Management Program",
    category: "Chronic Care",
    price: "AED 1,499 / 3 mo",
    description:
      "A structured 3-month program for optimal diabetes control with regular monitoring, medication review, and lifestyle coaching.",
    features: [
      "Monthly consultations (x3)",
      "CGM device guidance",
      "HbA1c & glucose tracking",
      "Dietitian integration",
      "24/7 messaging support",
    ],
    badge: "3-Month Plan",
    badgeColor: "sky",
    rating: 4.9,
    reviews: 224,
    duration: "3 months",
    icon: "💊",
    gradient: "from-blue-500 to-sky-600",
    popular: true,
  },
  {
    id: 14,
    name: "Hypertension Control Plan",
    category: "Chronic Care",
    price: "AED 1,299 / 3 mo",
    description:
      "Evidence-based hypertension management combining lifestyle optimization, medication titration, and close monitoring.",
    features: [
      "Bi-monthly consultations",
      "24-hour BP monitoring",
      "DASH diet planning",
      "Medication management",
      "Target organ protection review",
    ],
    rating: 4.8,
    reviews: 189,
    duration: "3 months",
    icon: "📊",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 15,
    name: "Thyroid Monitoring Program",
    category: "Chronic Care",
    price: "AED 999 / 6 mo",
    description:
      "Ongoing thyroid disease management with regular testing and medication adjustments for stable, optimal thyroid function.",
    features: [
      "Quarterly thyroid panels",
      "Medication dose optimization",
      "Symptom tracking",
      "Ultrasound follow-up",
      "Patient education sessions",
    ],
    badge: "6-Month Plan",
    badgeColor: "violet",
    rating: 4.7,
    reviews: 134,
    duration: "6 months",
    icon: "⚕️",
    gradient: "from-purple-500 to-violet-700",
  },
  {
    id: 16,
    name: "Metabolic Syndrome Program",
    category: "Chronic Care",
    price: "AED 1,799 / 3 mo",
    description:
      "Holistic 3-month program targeting obesity, insulin resistance, and cardiovascular risk with multi-disciplinary support.",
    features: [
      "Weekly progress check-ins",
      "Body composition analysis",
      "Nutritional plan included",
      "Exercise prescription",
      "Comprehensive lab monitoring",
    ],
    badge: "Holistic",
    badgeColor: "emerald",
    rating: 4.9,
    reviews: 97,
    duration: "3 months",
    icon: "🎯",
    gradient: "from-green-500 to-emerald-700",
  },

  /* ─── Wellness ─────────────────────────────────────── */
  {
    id: 17,
    name: "IV Nutritional Therapy",
    category: "Wellness",
    price: "AED 650",
    description:
      "Customized intravenous vitamin and mineral infusion to boost energy, immunity, and overall vitality.",
    features: [
      "Tailored vitamin cocktail",
      "Vitamin C, B-complex, zinc",
      "NAD+ add-on available",
      "45-minute session",
      "Pre-session lab check",
    ],
    badge: "Energy Boost",
    badgeColor: "amber",
    rating: 4.8,
    reviews: 312,
    duration: "45–60 min",
    icon: "💉",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: 18,
    name: "Weight Management Program",
    category: "Wellness",
    price: "AED 1,999 / 3 mo",
    description:
      "Science-backed, medically supervised weight loss program with personalized targets and continuous expert support.",
    features: [
      "Metabolic rate testing",
      "Personalized meal plan",
      "Weekly weigh-ins",
      "Medication (if needed)",
      "Body fat composition tracking",
    ],
    badge: "Most Booked",
    badgeColor: "rose",
    rating: 4.9,
    reviews: 405,
    duration: "3 months",
    icon: "🏃",
    gradient: "from-pink-500 to-rose-700",
    popular: true,
  },
  {
    id: 19,
    name: "Stress & Burnout Assessment",
    category: "Wellness",
    price: "AED 550",
    description:
      "Comprehensive evaluation of stress hormones, mental wellness, and sleep quality with targeted recovery planning.",
    features: [
      "Cortisol & DHEA panel",
      "Sleep quality analysis",
      "Burnout scoring tool",
      "Mindfulness referral",
      "Supplement recommendations",
    ],
    rating: 4.7,
    reviews: 168,
    duration: "90 minutes",
    icon: "🧠",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    id: 20,
    name: "Anti-Aging Longevity Panel",
    category: "Wellness",
    price: "AED 1,599",
    originalPrice: "AED 1,999",
    description:
      "A cutting-edge panel of biomarkers for cellular health, inflammation, and longevity — optimized for those 35 and above.",
    features: [
      "Telomere length assessment",
      "Inflammatory markers (CRP, IL-6)",
      "Hormonal balance panel",
      "Oxidative stress markers",
      "Longevity strategy consultation",
    ],
    badge: "Premium",
    badgeColor: "violet",
    rating: 5.0,
    reviews: 76,
    duration: "2–3 hours",
    icon: "✨",
    gradient: "from-violet-600 to-pink-600",
    discount: 20,
  },
];
