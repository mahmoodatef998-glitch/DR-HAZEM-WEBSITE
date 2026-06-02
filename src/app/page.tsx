import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import ProductsSection from "@/sections/ProductsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import WhyChooseSection from "@/sections/WhyChooseSection";
import AppointmentSection from "@/sections/AppointmentSection";
import FooterSection from "@/sections/FooterSection";
import FloatingCTA from "@/components/FloatingCTA";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <AppointmentSection />
      <FooterSection />
      <FloatingCTA />
    </main>
  );
}
