import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`navbar-fixed fixed w-full z-40 px-6 py-4 flex justify-between items-center ${
          scrolled ? 'bg-primary/95 backdrop-blur-sm shadow-lg' : ''
        }`}
      >
        <div className="logo">
          <a href="#home" className="font-heading font-bold text-2xl text-accent">FILMMAKER</a>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="nav-link font-heading text-text hover:text-accent transition duration-300">Home</a>
          <a href="#portfolio" className="nav-link font-heading text-text hover:text-accent transition duration-300">Portfolio</a>
          <a href="#about" className="nav-link font-heading text-text hover:text-accent transition duration-300">About</a>
          <a href="#contact" className="nav-link font-heading text-text hover:text-accent transition duration-300">Contact</a>
        </div>

        <button 
          aria-label="Toggle mobile menu"
          className="md:hidden text-foreground focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-secondary z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button 
            aria-label="Close mobile menu"
            className="text-foreground focus:outline-none"
            onClick={closeMobileMenu}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-8">
          <a 
            href="#home" 
            className="mobile-nav-link font-heading text-foreground hover:text-accent transition duration-300"
            onClick={closeMobileMenu}
          >
            Home
          </a>
          <a 
            href="#portfolio" 
            className="mobile-nav-link font-heading text-foreground hover:text-accent transition duration-300"
            onClick={closeMobileMenu}
          >
            Portfolio
          </a>
          <a 
            href="#about" 
            className="mobile-nav-link font-heading text-foreground hover:text-accent transition duration-300"
            onClick={closeMobileMenu}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="mobile-nav-link font-heading text-foreground hover:text-accent transition duration-300"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
