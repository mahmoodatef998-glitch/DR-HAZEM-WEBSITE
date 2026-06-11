import { createClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://drhazem.ae";

export default async function JsonLd() {
  // Fetch active products for ItemList schema
  let products: { name: string; description: string | null; price: string; image_url: string | null }[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("name, description, price, image_url")
      .eq("active", true)
      .order("sort_order")
      .limit(20);
    products = data ?? [];
  } catch {
    // non-critical — structured data degrades gracefully
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "MedicalBusiness"],
        "@id": `${BASE_URL}/#organization`,
        "name": "Medix Healthcare",
        "alternateName": ["Medix Healthcare UAE", "ميديكس هيلث كير"],
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/logo.png`,
          "width": 200,
          "height": 60,
        },
        "image": `${BASE_URL}/opengraph-image`,
        "description": "Medix Healthcare imports certified, high-quality pharmaceuticals directly from licensed manufacturers in Spain and Italy. GCC approved, ISO certified. Based in Dubai, UAE.",
        "telephone": "+971585335516",
        "email": "info@medixhealthcare.co",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dubai Healthcare City",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "postalCode": "505002",
          "addressCountry": "AE",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.2285",
          "longitude": "55.3273",
        },
        "hasMap": "https://maps.google.com/?q=Dubai+Healthcare+City+Dubai",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "09:00",
            "closes": "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00",
          },
        ],
        "priceRange": "AED 88 – AED 285",
        "currenciesAccepted": "AED",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "areaServed": [
          { "@type": "City", "name": "Dubai" },
          { "@type": "City", "name": "Abu Dhabi" },
          { "@type": "City", "name": "Sharjah" },
          { "@type": "Country", "name": "UAE" },
        ],
        "knowsLanguage": ["en", "ar"],
        "sameAs": [
          "https://www.linkedin.com/company/medixhealthcareae",
          "https://www.instagram.com/medixhealthcareae",
          "https://www.facebook.com/medixhealthcareae",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "Medix Healthcare",
        "description": "Premium Imported Medicines from Spain & Italy – Dubai, UAE",
        "publisher": { "@id": `${BASE_URL}/#organization` },
        "inLanguage": ["en-AE", "ar-AE"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/#products` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        "url": BASE_URL,
        "name": "Medix Healthcare | Premium Imported Medicines – Dubai, UAE",
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "about": { "@id": `${BASE_URL}/#organization` },
        "inLanguage": ["en-AE", "ar-AE"],
      },
      ...(products.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${BASE_URL}/#products-list`,
              "name": "Medix Healthcare Products",
              "description": "Imported pharmaceutical products from Spain and Italy",
              "numberOfItems": products.length,
              "itemListElement": products.map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "Product",
                  "name": p.name,
                  "description": p.description ?? undefined,
                  "image": p.image_url ?? undefined,
                  "offers": {
                    "@type": "Offer",
                    "price": p.price,
                    "priceCurrency": "AED",
                    "availability": "https://schema.org/InStock",
                    "seller": { "@id": `${BASE_URL}/#organization` },
                  },
                },
              })),
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where are your products imported from?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All products are imported directly from licensed manufacturers in Spain and Italy, meeting full UAE and GCC regulatory standards.",
            },
          },
          {
            "@type": "Question",
            "name": "How can I order from Medix Healthcare?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Browse our products and send your order via WhatsApp. We confirm price, availability, and delivery time within minutes.",
            },
          },
          {
            "@type": "Question",
            "name": "Are the products GCC approved?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All imported products are fully approved and registered for the UAE and GCC market. We hold a valid DHA pharmaceutical import license.",
            },
          },
          {
            "@type": "Question",
            "name": "Do you deliver outside Dubai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We deliver across all UAE emirates including Abu Dhabi, Sharjah, Ajman, and Ras Al Khaimah.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the minimum order quantity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "There is no minimum order quantity. You can order a single unit or in bulk quantities at wholesale pricing.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
