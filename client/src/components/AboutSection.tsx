import { useQuery } from "@tanstack/react-query";
import { Filmmaker } from "@/lib/types";
import { Circle } from "lucide-react";

const AboutSection = () => {
  const { data: filmmaker, isLoading } = useQuery<Filmmaker>({
    queryKey: ['/api/filmmaker'],
  });

  if (isLoading || !filmmaker) {
    return (
      <section id="about" className="page-section bg-secondary py-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 h-[450px] bg-muted animate-pulse rounded-lg"></div>
            <div className="lg:w-2/3 space-y-6">
              <div className="h-10 w-48 bg-muted animate-pulse rounded"></div>
              <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="page-section bg-secondary py-20 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3">
            <div className="relative">
              <img 
                src={filmmaker.image} 
                alt={`${filmmaker.name} Portrait`} 
                className="rounded-lg w-full max-w-md mx-auto object-cover h-[450px]"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent px-6 py-4 rounded-lg">
                <p className="font-heading font-bold text-primary-foreground">{filmmaker.experience}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-foreground">About Me</h2>
            
            <div className="text-foreground/90 mb-8 whitespace-pre-line">
              I'm someone who never liked staying in the box—whether it's writing, filming, or being thrown into something completely new. I started as a writer, always more comfortable behind the words than in front of a camera. But that changed when I was asked to write something I'd have to film myself. That challenge flipped the switch.

              Since then, I've been chasing stories—raw, real, and sometimes risky. From last-minute documentaries to full-scale short films, I've learned to navigate chaos with creativity. Most of what you'll find in my portfolio was made with limited resources, no professional crew, and a lot of late nights—but every project taught me something new, pushed me further, and reminded me why I love storytelling in the first place.

              I don't pretend to know it all, but I do know how to make something out of nothing—and have fun doing it. Whether it's screenwriting, directing, or jumping into something I've never tried before (like poetry, once), I give it everything I've got.

              This is just the beginning—and I'm always ready for the next challenge.
            </div>
            
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-xl mb-3 text-accent">Expertise</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filmmaker.expertise.map((skill, index) => (
                  <li key={index} className="text-foreground/80 flex items-center">
                    <Circle className="h-2 w-2 text-accent mr-2" /> 
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <a 
              href="#contact" 
              className="inline-block bg-accent text-primary-foreground px-8 py-3 rounded font-heading font-medium hover:bg-accent/90 transition duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
