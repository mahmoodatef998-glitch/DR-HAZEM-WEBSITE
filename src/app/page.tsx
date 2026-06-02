import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import TrustBarSection from "@/sections/TrustBarSection";
import ProductsSection from "@/sections/ProductsSection";
import HowToOrderSection from "@/sections/HowToOrderSection";
import AboutSection from "@/sections/AboutSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import WhatsAppCTASection from "@/sections/WhatsAppCTASection";
import FooterSection from "@/sections/FooterSection";
import FloatingCTA from "@/components/FloatingCTA";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <TrustBarSection />
      <ProductsSection />
      <HowToOrderSection />
      <AboutSection />
      <TestimonialsSection />
      <WhatsAppCTASection />
      <FooterSection />
      <FloatingCTA />
    </main>
  );
}
