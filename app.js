// Entry point file for the application
// This file allows starting the app with `node app.js`

// Import required modules - ES Module syntax
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import fs from 'fs';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import storage with handling for potential errors
let storage;
try {
  // We'll use dynamic import for ES modules
  const storageModule = await import('./dist/server/storage.js');
  storage = storageModule.storage;
  console.log('Successfully loaded storage module');
} catch (error) {
  console.error('Error importing storage module:', error);
  // Create a basic storage implementation if the module fails to load
  storage = {
    getAllProducts: async () => [],
    getProductById: async () => null,
    getProductsByCategory: async () => [],
    getCart: async () => ({ items: [], cart: null }),
    addToCart: async () => ({ cartItem: {}, cartId: '' }),
    updateCartItemQuantity: async () => null,
    removeFromCart: async () => false,
    clearCart: async () => false
  };
}

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/client')));

// API routes
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
    const cartId = req.cookies?.cartId || null;
    const cartItem = await storage.addToCart(cartId, req.body);
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

// Update cart item quantity
app.patch("/api/cart/:itemId", async (req, res) => {
  try {
    const { quantity } = req.body;
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

// For any other route, serve the React app (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An error occurred on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});