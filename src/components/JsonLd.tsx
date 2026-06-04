// JSON-LD Structured Data — update TODO values before going live

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://drhazem.ae";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Medix Healthcare",
      "alternateName": ["Medix Healthcare UAE", "ميديكس هيلث كير"],
      "url": BASE_URL,
      "logo": `${BASE_URL}/logo.png`,
      "image": `${BASE_URL}/og-image.jpg`,
      "description": "Medix Healthcare imports certified, high-quality pharmaceuticals directly from licensed manufacturers in Spain and Italy. GCC approved, ISO certified. Based in Dubai, UAE.",
      "telephone": "+971585335516", // TODO: replace
      "email": "info@drhazem.ae",   // TODO: replace
      "address": { "@type": "PostalAddress", "streetAddress": "Dubai Healthcare City", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE" },
      "geo": { "@type": "GeoCoordinates", "latitude": "25.2285", "longitude": "55.3273" },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"], "opens": "09:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "14:00" },
      ],
      "priceRange": "AED 88 – AED 285",
      "currenciesAccepted": "AED",
      "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
      "knowsLanguage": ["en", "ar"],
      "importedFrom": ["Spain", "Italy"],
      "sameAs": [
        "https://www.linkedin.com/company/medixhealthcare",  // TODO
        "https://www.instagram.com/medixhealthcareae",       // TODO
        "https://www.facebook.com/medixhealthcareae",        // TODO
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#dr-hazem`,
      "name": "Dr. Hazem",
      "jobTitle": "Founder & Medical Director",
      "worksFor": { "@id": `${BASE_URL}/#organization` },
      "url": BASE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "Medix Healthcare",
      "description": "Premium Imported Medicines from Spain & Italy – Dubai, UAE",
      "inLanguage": ["en-US", "ar-AE"],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Where are your products imported from?", "acceptedAnswer": { "@type": "Answer", "text": "All products are imported directly from licensed manufacturers in Spain and Italy." } },
        { "@type": "Question", "name": "How can I order?", "acceptedAnswer": { "@type": "Answer", "text": "Simply browse our products and send your order via WhatsApp. We'll confirm price, availability, and delivery time within minutes." } },
        { "@type": "Question", "name": "Are the products GCC approved?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All imported products are fully approved and registered for the UAE and GCC market. We hold a valid DHA import license." } },
      ],
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
