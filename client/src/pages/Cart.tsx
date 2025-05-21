import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Your Cart - Arun Chaudhary</title>
          <meta name="description" content="View and manage items in your shopping cart." />
        </Helmet>
        
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-gray-400 dark:text-gray-600" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-blue-600 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Your Cart ({cartItems.length}) - Arun Chaudhary</title>
        <meta name="description" content={`You have ${cartItems.length} items in your cart. Proceed to checkout to complete your purchase.`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
          <Button
            variant="outline"
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b dark:border-gray-700">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="col-span-6 md:col-span-7">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2 md:col-span-1 text-right">Total</div>
                </div>
              </div>
              
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border-b dark:border-gray-700 last:border-0"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 md:col-span-7">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 rounded object-cover mr-4" 
                          />
                          <div>
                            <h3 className="font-medium mb-1">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 flex items-center"
                            >
                              <Trash2 className="h-3 w-3 mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span>{formatCurrency(item.price)}</span>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <MinusCircle className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 md:col-span-1 text-right font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-8">
              <Link href="/" className="inline-flex items-center text-primary dark:text-blue-400 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tax</span>
                  <span className="font-medium">{formatCurrency(subtotal * 0.08)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">{formatCurrency(subtotal * 1.08)}</span>
                </div>
              </div>
              
              <Link href="/checkout">
                <Button size="lg" className="w-full bg-primary hover:bg-blue-600 text-white">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>We accept:</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Visa</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Mastercard</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
