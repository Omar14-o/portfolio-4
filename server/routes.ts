import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/filmmaker', async (req, res) => {
    try {
      const filmmaker = await storage.getFilmmaker();
      res.json(filmmaker);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching filmmaker data' });
    }
  });

  app.get('/api/portfolio', async (req, res) => {
    try {
      const portfolioItems = await storage.getPortfolioItems();
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching portfolio items' });
    }
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, projectType, message } = req.body;
      
      if (!name || !email || !projectType || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      const contactMessage = await storage.createContactMessage({
        name,
        email,
        projectType,
        message,
      });
      
      res.status(201).json(contactMessage);
    } catch (error) {
      res.status(500).json({ message: 'Error saving contact message' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
