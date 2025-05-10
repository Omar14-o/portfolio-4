import { useQuery } from "@tanstack/react-query";
import { Filmmaker } from "@/lib/types";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const { data: filmmaker, isLoading } = useQuery<Filmmaker>({
    queryKey: ['/api/filmmaker'],
  });

  if (isLoading || !filmmaker) {
    return <div className="h-screen bg-primary flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <section id="home" className="page-section h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary"></div>
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="md:w-2/3">
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-4 text-foreground">
            {filmmaker.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/90">
            {filmmaker.tagline}
          </p>
          <p className="text-lg mb-10 text-foreground/80 max-w-2xl">
            {filmmaker.brief}
          </p>
          <div className="flex space-x-4">
            <a 
              href="#portfolio" 
              className="bg-accent text-primary-foreground px-8 py-3 rounded font-heading font-medium hover:bg-accent/90 transition duration-300"
            >
              View Work
            </a>
            <a 
              href="#contact" 
              className="border border-foreground text-foreground px-8 py-3 rounded font-heading font-medium hover:bg-foreground/10 transition duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <a href="#portfolio" className="text-foreground/70 hover:text-accent transition duration-300">
          <ArrowDown className="h-6 w-6 mx-auto animate-bounce" />
          <span className="block mt-2 text-sm font-medium">Explore Portfolio</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
