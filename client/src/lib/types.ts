// Common types used across the application

export interface Portfolio {
  id: number;
  title: string;
  thumbnail: string;
  featureImage: string;
  category: string;
  duration: string;
  description: string;
  longDescription: string;
  client: string;
  role: string;
  year: string;
  location: string;
  videoUrl: string;
  behindTheScenes?: string[];
}

export interface Filmmaker {
  id: number;
  name: string;
  tagline: string;
  brief: string;
  bio: string;
  expertise: string[];
  awards: string[];
  image: string;
  email: string;
  location: string;
  phone: string;
  socials: {
    instagram: string;
    vimeo: string;
    youtube: string;
    linkedin: string;
  };
  experience: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
}
