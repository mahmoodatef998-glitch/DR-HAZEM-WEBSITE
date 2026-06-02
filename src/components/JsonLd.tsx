// JSON-LD Structured Data — helps Google understand the site and show rich results.
// Update placeholder values (phone, email, DHA license) before going live.

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://drhazem.ae";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Medix Healthcare",
      "alternateName": "Dr. Hazem Medical",
      "url": BASE_URL,
      "logo": `${BASE_URL}/logo.png`,
      "image": `${BASE_URL}/og-image.jpg`,
      "description":
        "Medix Healthcare imports certified, high-quality pharmaceuticals from licensed manufacturers in Spain and the United Kingdom. GCC approved, ISO certified. Based in Dubai Healthcare City, UAE.",
      "telephone": "+971500000000", // TODO: replace with real number
      "email": "info@drhazem.ae",   // TODO: replace with real email
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dubai Healthcare City",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.2285",
        "longitude": "55.3273",
      },
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
      "priceRange": "AED 250 – AED 2,899",
      "currenciesAccepted": "AED",
      "paymentAccepted": "Cash, Credit Card",
      "areaServed": ["Dubai", "Abu Dhabi", "Sharjah", "UAE", "GCC"],
      "medicalSpecialty": ["Internal Medicine", "Preventive Medicine"],
      "availableService": [
        { "@type": "MedicalTherapy", "name": "Preventive Care" },
        { "@type": "MedicalTherapy", "name": "Specialist Consultation" },
        { "@type": "MedicalTherapy", "name": "Chronic Disease Management" },
        { "@type": "MedicalTherapy", "name": "Advanced Diagnostics" },
        { "@type": "MedicalTherapy", "name": "Follow-up & Monitoring" },
        { "@type": "MedicalTherapy", "name": "Urgent Consultations" },
      ],
      "sameAs": [
        "https://www.linkedin.com/in/drhazem",     // TODO: real profiles
        "https://www.instagram.com/drhazem",
        "https://www.facebook.com/drhazem",
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#dr-hazem`,
      "name": "Dr. Hazem",
      "jobTitle": "Founder & Medical Director",
      "worksFor": { "@id": `${BASE_URL}/#organization` },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Cairo University School of Medicine" },
        { "@type": "CollegeOrUniversity", "name": "Johns Hopkins Medical Center" },
      ],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "DHA Licensed Specialist" },
        { "@type": "EducationalOccupationalCredential", "name": "Board Certified – Arab Board of Medical Specializations" },
      ],
      "url": BASE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "Medix Healthcare",
      "description": "Premium Imported Medicines – Dubai, UAE",
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/#products`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
