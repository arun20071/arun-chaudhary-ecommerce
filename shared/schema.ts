import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

// Product schema
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  longDescription: text("long_description"),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  image: text("image").notNull(),
  rating: integer("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  badge: text("badge"),
  category: text("category").notNull(),
  model: text("model"),
  weight: text("weight"),
  dimensions: text("dimensions"),
});

export const insertProductSchema = createInsertSchema(products).pick({
  id: true,
  name: true,
  description: true,
  longDescription: true,
  price: true,
  originalPrice: true,
  image: true,
  rating: true,
  reviewCount: true,
  badge: true,
  category: true,
  model: true,
  weight: true,
  dimensions: true,
});

// Cart schema
export const carts = pgTable("carts", {
  id: text("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const insertCartSchema = createInsertSchema(carts).pick({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

// Cart Item schema
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: text("cart_id").references(() => carts.id).notNull(),
  productId: text("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
  price: integer("price").notNull(),
});

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  cartId: true,
  productId: true,
  quantity: true,
  price: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertCart = z.infer<typeof insertCartSchema>;
export type Cart = typeof carts.$inferSelect;

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
