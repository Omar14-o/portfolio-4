import { Suspense, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const LoadingFallback = () => (
  <div className="h-screen bg-primary flex items-center justify-center">
    <div className="animate-spin h-12 w-12 border-4 border-accent border-t-transparent rounded-full"></div>
  </div>
);

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = "Filmmaker Portfolio";
    
    // Set loaded state after a short delay to allow smooth transitions
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-background text-foreground transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <HeroSection />
          <PortfolioSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
