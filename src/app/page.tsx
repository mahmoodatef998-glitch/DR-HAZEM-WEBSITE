import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import TrustBarSection from "@/sections/TrustBarSection";
import ProductsSection from "@/sections/ProductsSection";
import HowToOrderSection from "@/sections/HowToOrderSection";
import AboutSection from "@/sections/AboutSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import WhyChooseSection from "@/sections/WhyChooseSection";
import WhatsAppCTASection from "@/sections/WhatsAppCTASection";
import FooterSection from "@/sections/FooterSection";
import FloatingCTA from "@/components/FloatingCTA";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Skip navigation for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-lg focus:font-semibold">
        Skip to main content
      </a>
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <TrustBarSection />
      <ProductsSection />
      <HowToOrderSection />
      <AboutSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <WhatsAppCTASection />
      <FooterSection />
      <FloatingCTA />
    </main>
  );
}
