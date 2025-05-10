import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Portfolio schema
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  thumbnail: text("thumbnail").notNull(),
  featureImage: text("feature_image").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  client: text("client").notNull(),
  role: text("role").notNull(),
  year: text("year").notNull(),
  location: text("location").notNull(),
  videoUrl: text("video_url").notNull(),
  behindTheScenes: text("behind_the_scenes").array(),
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true
});

export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type Portfolio = typeof portfolioItems.$inferSelect;

// Filmmaker schema
export const filmmaker = pgTable("filmmaker", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  brief: text("brief").notNull(),
  bio: text("bio").notNull(),
  expertise: text("expertise").array().notNull(),
  awards: text("awards").array().notNull(),
  image: text("image").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  phone: text("phone").notNull(),
  socials: json("socials").$type<{
    instagram: string;
    vimeo: string;
    youtube: string;
    linkedin: string;
  }>().notNull(),
  experience: text("experience").notNull(),
});

export const insertFilmmakerSchema = createInsertSchema(filmmaker).omit({
  id: true
});

export type InsertFilmmaker = z.infer<typeof insertFilmmakerSchema>;
export type Filmmaker = typeof filmmaker.$inferSelect;

// Contact Messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// User schema (keeping the existing one as required by the template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
