import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Link } from "wouter";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, image, rating, reviewCount, originalPrice, badge } = product;
  const { addToCart } = useCart();

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    addToCart(product);
  };

  return (
    <motion.div
      className="product-card bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/product/${id}`}>
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-60 object-cover" 
          />
          {badge && (
            <span 
              className={`absolute top-2 left-2 ${getBadgeColor(badge)} text-white text-xs font-bold px-2 py-1 rounded`}
            >
              {badge}
            </span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex text-amber-400">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
              {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <Star key={`empty-${i}`} className="h-4 w-4 text-amber-400 fill-none" />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({reviewCount})</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="font-bold text-xl">{formatCurrency(price)}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function getBadgeColor(badge: string): string {
  switch (badge.toUpperCase()) {
    case 'NEW':
      return 'bg-primary';
    case '-15%':
    case '-20%':
      return 'bg-red-500';
    case 'POPULAR':
      return 'bg-green-500';
    case 'LIMITED':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
}
