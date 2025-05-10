import { useQuery } from "@tanstack/react-query";
import { Filmmaker } from "@/lib/types";

const Footer = () => {
  const { data: filmmaker } = useQuery<Filmmaker>({
    queryKey: ['/api/filmmaker'],
  });

  return (
    <footer className="bg-secondary py-10 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="font-heading font-bold text-2xl text-accent">FILMMAKER</a>
            <p className="text-muted-foreground mt-2">Crafting cinematic stories since 2010</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#portfolio" className="text-foreground hover:text-accent transition duration-300">Portfolio</a>
            <a href="#about" className="text-foreground hover:text-accent transition duration-300">About</a>
            <a href="#contact" className="text-foreground hover:text-accent transition duration-300">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-primary/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {filmmaker?.name || 'Filmmaker'}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-accent transition duration-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition duration-300 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
