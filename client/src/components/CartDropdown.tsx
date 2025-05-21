import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

export default function CartDropdown() {
  const { cartItems, removeFromCart, subtotal } = useCart();

  return (
    <div className="divide-y dark:divide-gray-700">
      <div className="p-4">
        <h3 className="font-semibold text-lg">Your Cart ({cartItems.length})</h3>
      </div>
      
      <div className="max-h-64 overflow-y-auto py-2">
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Your cart is empty
          </div>
        ) : (
          cartItems.map((item) => (
            <motion.div
              key={item.id}
              className="cart-item p-3 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-12 h-12 object-cover rounded-md" 
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-500 transition-colors h-8 w-8"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full bg-primary hover:bg-blue-600 text-white py-2 mb-2">
              Checkout
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" className="w-full text-primary dark:text-blue-400 hover:underline">
              View Cart
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
