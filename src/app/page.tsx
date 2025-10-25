import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import { ServicesOverview, AboutSection, TestimonialsSection, CallToAction } from "@/components/home/HomeSections";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
