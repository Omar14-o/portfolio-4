import {
  portfolioItems, 
  filmmaker, 
  contactMessages,
  type Portfolio,
  type Filmmaker,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

// Storage interface
export interface IStorage {
  getFilmmaker(): Promise<Filmmaker>;
  getPortfolioItems(): Promise<Portfolio[]>;
  getPortfolioItem(id: number): Promise<Portfolio | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private filmmaker: Filmmaker;
  private portfolioItems: Map<number, Portfolio>;
  private contactMessages: Map<number, ContactMessage>;
  private contactMessageId: number;

  constructor() {
    // Initialize with predefined data
    this.filmmaker = {
      id: 1,
      name: "Omar Mekawy",
      tagline: "Filmmaker & Storyteller",
      brief: "Capturing stories that move, inspire, and transform through the power of cinematic storytelling. Creating visual narratives across short movies, documentaries, reportages, and poetry.",
      bio: "I'm a filmmaker and cinematographer with a passion for visual storytelling that connects on an emotional level. After graduating from the New York Film Academy, I spent several years honing my craft on independent productions before establishing my own studio in 2018.",
      expertise: [
        "Cinematography",
        "Documentary Filmmaking",
        "Script Writing",
        "Visual Storytelling"
      ],
      awards: [],
      image: "/assets/omar_mekawy.jpg",
      email: "hello@filmmaker.com",
      location: "New York, NY",
      phone: "+1 (212) 555-1234",
      socials: {
        instagram: "https://instagram.com",
        vimeo: "https://vimeo.com",
        youtube: "https://youtube.com",
        linkedin: "https://linkedin.com"
      },
      experience: "6 Years Experience"
    };

    this.portfolioItems = new Map([
      [2, {
        id: 2,
        title: "The Black Guitar",
        thumbnail: "https://img.youtube.com/vi/FJeN1yFkCHY/maxresdefault.jpg",
        featureImage: "https://img.youtube.com/vi/FJeN1yFkCHY/maxresdefault.jpg",
        category: "Film - Writer & Director",
        duration: "",
        description: "Writer, Director",
        longDescription: "I've always seen myself more as a writer than a filmmaker—that all changed when I was asked to write something I would actually have to film. That moment marked a turning point. I took a creative leap: writing and acting in English, and handling every aspect of production alongside a small, inexperienced team.\n\nIt was the most difficult project I've worked on, but ironically, also the most fun. The language barrier led to some unforgettable bloopers that still make me laugh.\n\nWhat began as a simple college assignment quickly evolved into something more meaningful. We set out to highlight the risks of untreated psychological issues and the emotional impact they can have. We also explored the often-overlooked dangers of online dating.\n\nThis short film was created entirely by students at AAST—with no outside professional support. It was raw, risky, and real—and it taught me more than I ever expected.",
        client: "",
        role: "Writer, Director",
        year: "",
        location: "",
        videoUrl: "https://youtu.be/FJeN1yFkCHY?si=SM9q0Y4YRJs7NAjB",
        behindTheScenes: []
      }],
      [3, {
        id: 3,
        title: "Untitled Reportage",
        thumbnail: "https://img.youtube.com/vi/Jib9dxvpQKY/maxresdefault.jpg",
        featureImage: "https://img.youtube.com/vi/Jib9dxvpQKY/maxresdefault.jpg",
        category: "Reportage - Writer & Director",
        duration: "",
        description: "Writer, Director",
        longDescription: "I'll add your description here once you provide it.",
        client: "",
        role: "Writer, Director",
        year: "",
        location: "",
        videoUrl: "https://youtu.be/Jib9dxvpQKY?si=WXwv9jWNYCaWrYJn",
        behindTheScenes: []
      }],
      [6, {
        id: 6,
        title: "ابواب الحياة",
        thumbnail: "https://i.ytimg.com/vi/gFlAFZK-wYQ/maxresdefault.jpg",
        featureImage: "https://i.ytimg.com/vi/gFlAFZK-wYQ/maxresdefault.jpg",
        category: "Film - Writer & Director",
        duration: "",
        description: "This was the most challenging project I've ever had to film. It was our graduation project—the culmination of everything we'd learned in college, all tested in one film.",
        longDescription: "This was the most challenging project I've ever had to film. It was our graduation project—the culmination of everything we'd learned in college, all tested in one film.\n\nFor the first time in the college's history, a student film reached this length. While it's still short compared to a feature film, it was significantly longer than any other short movies produced before us. It demanded a huge effort—from managing a cast and crew to coordinating multiple locations, building sets, and piecing it all together in post-production.\n\nThis was also the only project where our team had professional support from experts in videography, lighting, and editing. It gave us our first real glimpse into what a professional film set feels like—and what it might be like to pursue this as a career.\n\nIt was a creative and logistical challenge from start to finish. I had to develop the concept, write a full-length script in Arabic, and then help bring that vision to life on screen. The script was ambitious, and that brought its own hurdles, but given the resources we had, I think we pulled it off.\n\nThe film explores the idea of suicide and the \"what if\" behind it. There are usually a few major pressures that drive someone to that point: education, work, family, and of course, love. When someone feels they've failed in those areas, life can start to lose meaning. But what if they did get everything they wanted—would they truly be satisfied? Would their life improve, or would it be worse than the one they left behind?\nThat's the question we explored in this film.",
        client: "",
        role: "Writer, Director",
        year: "",
        location: "",
        videoUrl: "https://www.youtube.com/watch?v=gFlAFZK-wYQ",
        behindTheScenes: []
      }]
    ]);

    this.contactMessages = new Map();
    this.contactMessageId = 1;
  }

  async getFilmmaker(): Promise<Filmmaker> {
    return this.filmmaker;
  }

  async getPortfolioItems(): Promise<Portfolio[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItem(id: number): Promise<Portfolio | undefined> {
    return this.portfolioItems.get(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const now = new Date().toISOString();
    
    const contactMessage: ContactMessage = {
      id,
      ...message,
      createdAt: now
    };
    
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
