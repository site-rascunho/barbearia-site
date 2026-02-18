import { AuthProvider } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { GallerySection } from "@/components/GallerySection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <GallerySection />
          <LocationSection />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Index;
