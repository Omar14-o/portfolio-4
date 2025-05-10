import { useEffect, useRef, useState } from "react";
import { Portfolio } from "@/lib/types";
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Share2, ExternalLink } from "lucide-react";
import ReactPlayer from "react-player/lazy";

interface VideoModalProps {
  video: Portfolio;
  isOpen: boolean;
  onClose: () => void;
}

// Function to extract YouTube video ID from URL
const getYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};

const VideoModal = ({ video, isOpen, onClose }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    // Disable scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Animation classes to add when modal is open
  const modalAnimation = isOpen 
    ? "animate-in fade-in duration-300" 
    : "animate-out fade-out duration-200";
    
  const contentAnimation = isOpen 
    ? "animate-in slide-in-from-bottom-10 duration-500" 
    : "animate-out slide-out-to-bottom-10 duration-300";

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden ${modalAnimation}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`modal-content w-11/12 max-w-7xl mx-auto relative ${contentAnimation}`}>
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-foreground hover:text-accent cursor-pointer z-10 rounded-full bg-black/40 p-2 transition-transform hover:scale-110"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="video-container bg-black rounded-lg overflow-hidden relative">
          {/* Direct YouTube Embed */}
          <div className="aspect-w-16 aspect-h-9 relative">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(video.videoUrl)}?autoplay=0&rel=0&modestbranding=1&controls=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="absolute inset-0 w-full h-full rounded-md"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Video Info Bar */}
          <div className="flex justify-between items-center bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 mt-4">
            <div className="flex items-center space-x-3">
              <span className="text-white text-sm">{video.duration}</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-white text-sm">{video.category}</span>
            </div>
            <div className="space-x-2 flex items-center">
              <a 
                href={video.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent p-1 rounded-full hover:bg-white/10"
                title="Open in YouTube"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Feature Image Section */}
        <div className="feature-image-container mt-4 overflow-hidden rounded-lg">
          {video.featureImage && (
            <img 
              src={video.featureImage}
              alt={`${video.title} - Feature`}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
        
        {/* Video Info Section */}
        <div className="video-info bg-secondary rounded-lg p-6 mt-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-2xl mb-2 text-foreground">{video.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{video.category} • {video.duration}</p>
              <p className="text-foreground/80 mb-6">{video.longDescription}</p>
              
              {/* Behind The Scenes Gallery */}
              {video.behindTheScenes && video.behindTheScenes.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-heading font-medium text-lg mb-4 text-foreground">Behind The Scenes</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {video.behindTheScenes.map((image: string, index: number) => (
                      <div key={index} className="relative overflow-hidden rounded-lg aspect-w-4 aspect-h-3 group">
                        <img 
                          src={image} 
                          alt={`Behind the scenes ${index + 1}`}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">View</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:w-1/3 bg-primary/5 p-5 rounded-lg">
              <h4 className="font-heading font-medium text-lg mb-4 text-foreground">Project Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-primary/20 pb-3">
                  <p className="text-muted-foreground text-sm">Client</p>
                  <p className="text-foreground font-medium">{video.client}</p>
                </div>
                <div className="flex justify-between border-b border-primary/20 pb-3">
                  <p className="text-muted-foreground text-sm">Role</p>
                  <p className="text-foreground font-medium">{video.role}</p>
                </div>
                <div className="flex justify-between border-b border-primary/20 pb-3">
                  <p className="text-muted-foreground text-sm">Year</p>
                  <p className="text-foreground font-medium">{video.year}</p>
                </div>
                <div className="flex justify-between border-b border-primary/20 pb-3">
                  <p className="text-muted-foreground text-sm">Location</p>
                  <p className="text-foreground font-medium">{video.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
