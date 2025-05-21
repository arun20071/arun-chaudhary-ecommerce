import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { cartItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Get products by category
  app.get("/api/categories/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  // Get cart items
  app.get("/api/cart", async (req, res) => {
    try {
      const cartId = req.cookies?.cartId || null;
      const cart = await storage.getCart(cartId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });
  
  // Add item to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const cartItemData = cartItemSchema.parse(req.body);
      const cartId = req.cookies?.cartId || null;
      const cartItem = await storage.addToCart(cartId, cartItemData);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });
  
  // Update cart item quantity
  app.patch("/api/cart/:itemId", async (req, res) => {
    try {
      const { quantity } = z.object({ quantity: z.number().min(1) }).parse(req.body);
      const cartId = req.cookies?.cartId || null;
      
      if (!cartId) {
        return res.status(400).json({ message: "Cart ID is required" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(
        cartId, 
        req.params.itemId, 
        quantity
      );
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quantity", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });
  
  // Remove item from cart
  app.delete("/api/cart/:itemId", async (req, res) => {
    try {
      const cartId = req.cookies?.cartId || null;
      
      if (!cartId) {
        return res.status(400).json({ message: "Cart ID is required" });
      }
      
      const success = await storage.removeFromCart(cartId, req.params.itemId);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });
  
  // Clear cart
  app.delete("/api/cart", async (req, res) => {
    try {
      const cartId = req.cookies?.cartId || null;
      
      if (!cartId) {
        return res.status(400).json({ message: "Cart ID is required" });
      }
      
      await storage.clearCart(cartId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
