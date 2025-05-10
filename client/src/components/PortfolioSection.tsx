import { useQuery } from "@tanstack/react-query";
import { Portfolio } from "@/lib/types";
import { Play } from "lucide-react";

const PortfolioSection = () => {
  const { data: portfolioItems, isLoading } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolio'],
  });

  if (isLoading) {
    return (
      <section id="portfolio" className="page-section bg-primary py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-foreground">Featured Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A selection of my best cinematic projects spanning short movies, documentaries, reportages, and poetry.
            </p>
          </div>
          {/* Loading skeleton */}
          <div className="flex">
            <div className="hidden lg:block w-24 relative mr-8">
              <div className="absolute h-full w-px bg-accent/20 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="flex-1 flex flex-col space-y-16">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="w-full lg:w-1/2 rounded-lg bg-secondary animate-pulse h-72"></div>
                  <div className="w-full lg:w-1/2 p-4">
                    <div className="h-8 bg-secondary animate-pulse rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-secondary animate-pulse rounded mb-4 w-1/4"></div>
                    <div className="h-4 bg-secondary animate-pulse rounded mb-2 w-full"></div>
                    <div className="h-4 bg-secondary animate-pulse rounded mb-2 w-full"></div>
                    <div className="h-10 bg-secondary animate-pulse rounded-full mt-6 w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="page-section bg-primary py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-foreground">Featured Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of my best cinematic projects spanning short movies, documentaries, reportages, and poetry.
          </p>
        </div>

        <div className="flex">
          {/* Timeline Column */}
          <div className="hidden lg:block w-24 relative mr-8">
            <div className="absolute h-full w-px bg-accent/20 left-1/2 transform -translate-x-1/2">
              {portfolioItems?.map((item, index) => (
                <div 
                  key={`timeline-${item.id}`} 
                  className="absolute flex flex-col items-center"
                  style={{ top: `${index * 400 + 80}px` }}
                >
                  <div className="w-4 h-4 rounded-full bg-accent mb-2"></div>
                  <p className="text-accent text-sm font-bold rotate-0 whitespace-nowrap">{item.year}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Portfolio Items */}
          <div className="flex-1 flex flex-col space-y-16">
            {portfolioItems?.map((item, index) => (
              <div 
                key={item.id} 
                className="flex flex-col lg:flex-row gap-8 items-center"
              >
                {/* Video Thumbnail Side */}
                <a 
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card group relative rounded-lg overflow-hidden bg-secondary cursor-pointer w-full lg:w-1/2"
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden shadow-lg">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="video-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-accent rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-glow">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-white mt-4 font-medium text-lg">Watch on YouTube</p>
                      </div>
                    </div>

                  </div>
                </a>
                
                {/* Description Side */}
                <div className="w-full lg:w-1/2 p-4">
                  <h3 className="font-heading font-semibold text-2xl mb-3 text-foreground transition duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.category}</p>
                  <div className="text-foreground/80 mb-6 whitespace-pre-line">{item.longDescription}</div>
                  <a 
                    href={item.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-colors inline-block"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;