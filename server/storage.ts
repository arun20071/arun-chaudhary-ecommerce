import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  carts, type Cart, type InsertCart,
  cartItems, type CartItem, type InsertCartItem
} from "@shared/schema";
// Import product data
import productData from "./product-data";
import { v4 as uuidv4 } from 'uuid';

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  
  // Cart methods
  getCart(cartId: string | null): Promise<{items: CartItem[], cart: Cart | null}>;
  addToCart(cartId: string | null, item: {productId: string, quantity: number, price: number}): Promise<{cartItem: CartItem, cartId: string}>;
  updateCartItemQuantity(cartId: string, itemId: string, quantity: number): Promise<CartItem | null>;
  removeFromCart(cartId: string, itemId: string): Promise<boolean>;
  clearCart(cartId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private productsData: Map<string, Product>;
  private cartsData: Map<string, Cart>;
  private cartItemsData: Map<string, CartItem[]>;
  private userIdCounter: number;
  private cartItemIdCounter: number;

  constructor() {
    this.users = new Map();
    this.productsData = new Map();
    this.cartsData = new Map();
    this.cartItemsData = new Map();
    this.userIdCounter = 1;
    this.cartItemIdCounter = 1;
    
    // Initialize with product data
    productData.forEach((product: Product) => {
      this.productsData.set(product.id, product);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      fullName: insertUser.fullName || null,
      isAdmin: false 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.productsData.values());
  }
  
  async getProductById(id: string): Promise<Product | undefined> {
    return this.productsData.get(id);
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.productsData.values())
      .filter(product => product.category === category);
  }
  
  // Cart methods
  async getCart(cartId: string | null): Promise<{items: CartItem[], cart: Cart | null}> {
    if (!cartId || !this.cartsData.has(cartId)) {
      return { items: [], cart: null };
    }
    
    return {
      items: this.cartItemsData.get(cartId) || [],
      cart: this.cartsData.get(cartId) || null
    };
  }
  
  async addToCart(
    cartId: string | null, 
    item: {productId: string, quantity: number, price: number}
  ): Promise<{cartItem: CartItem, cartId: string}> {
    let finalCartId = cartId;
    
    // Create new cart if it doesn't exist
    if (!cartId || !this.cartsData.has(cartId)) {
      finalCartId = uuidv4();
      const now = new Date().toISOString();
      
      const newCart: Cart = {
        id: finalCartId,
        userId: null,
        createdAt: now,
        updatedAt: now
      };
      
      this.cartsData.set(finalCartId, newCart);
      this.cartItemsData.set(finalCartId, []);
    }
    
    // Check if product already in cart
    const cartItems = this.cartItemsData.get(finalCartId) || [];
    const existingItemIndex = cartItems.findIndex(ci => ci.productId === item.productId);
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const existingItem = cartItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity
      };
      
      cartItems[existingItemIndex] = updatedItem;
      this.cartItemsData.set(finalCartId, cartItems);
      
      // Update cart timestamp
      const cart = this.cartsData.get(finalCartId)!;
      this.cartsData.set(finalCartId, {
        ...cart,
        updatedAt: new Date().toISOString()
      });
      
      return { cartItem: updatedItem, cartId: finalCartId };
    } else {
      // Add new item
      const newCartItem: CartItem = {
        id: this.cartItemIdCounter++,
        cartId: finalCartId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      };
      
      cartItems.push(newCartItem);
      this.cartItemsData.set(finalCartId, cartItems);
      
      // Update cart timestamp
      const cart = this.cartsData.get(finalCartId)!;
      this.cartsData.set(finalCartId, {
        ...cart,
        updatedAt: new Date().toISOString()
      });
      
      return { cartItem: newCartItem, cartId: finalCartId };
    }
  }
  
  async updateCartItemQuantity(
    cartId: string, 
    itemId: string, 
    quantity: number
  ): Promise<CartItem | null> {
    if (!this.cartsData.has(cartId)) {
      return null;
    }
    
    const cartItems = this.cartItemsData.get(cartId) || [];
    const itemIndex = cartItems.findIndex(item => item.id.toString() === itemId);
    
    if (itemIndex === -1) {
      return null;
    }
    
    // Update item quantity
    const updatedItem = {
      ...cartItems[itemIndex],
      quantity
    };
    
    cartItems[itemIndex] = updatedItem;
    this.cartItemsData.set(cartId, cartItems);
    
    // Update cart timestamp
    const cart = this.cartsData.get(cartId)!;
    this.cartsData.set(cartId, {
      ...cart,
      updatedAt: new Date().toISOString()
    });
    
    return updatedItem;
  }
  
  async removeFromCart(cartId: string, itemId: string): Promise<boolean> {
    if (!this.cartsData.has(cartId)) {
      return false;
    }
    
    const cartItems = this.cartItemsData.get(cartId) || [];
    const initialLength = cartItems.length;
    
    const updatedItems = cartItems.filter(item => item.id.toString() !== itemId);
    
    if (updatedItems.length === initialLength) {
      // Item not found
      return false;
    }
    
    this.cartItemsData.set(cartId, updatedItems);
    
    // Update cart timestamp
    const cart = this.cartsData.get(cartId)!;
    this.cartsData.set(cartId, {
      ...cart,
      updatedAt: new Date().toISOString()
    });
    
    return true;
  }
  
  async clearCart(cartId: string): Promise<boolean> {
    if (!this.cartsData.has(cartId)) {
      return false;
    }
    
    this.cartItemsData.set(cartId, []);
    
    // Update cart timestamp
    const cart = this.cartsData.get(cartId)!;
    this.cartsData.set(cartId, {
      ...cart,
      updatedAt: new Date().toISOString()
    });
    
    return true;
  }
}

export const storage = new MemStorage();
