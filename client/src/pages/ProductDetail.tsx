import { useRoute, Link } from "wouter";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Star, 
  StarHalf,
  MinusCircle,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({...product, quantity});
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    });
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;
  
  return (
    <>
      <Helmet>
        <title>{`${product.name} - Arun Chaudhary`}</title>
        <meta name="description" content={`${product.name} - ${product.description} Available for ${formatCurrency(product.price)}.`} />
        <meta property="og:title" content={`${product.name} - Arun Chaudhary`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-primary dark:text-blue-400 mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full rounded-lg shadow-md object-cover" 
              style={{ height: '500px' }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.badge && (
              <span className={`inline-block px-3 py-1 mb-4 text-white text-xs font-bold rounded ${getBadgeColor(product.badge)}`}>
                {product.badge}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-amber-400 mr-2">
                {[...Array(fullStars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
                {hasHalfStar && <StarHalf className="h-5 w-5 fill-current" />}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                  <Star key={`empty-${i}`} className="h-5 w-5 text-amber-400 fill-none" />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-300">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            
            <div className="mb-6">
              {product.originalPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-3">{formatCurrency(product.price)}</span>
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="ml-3 px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm font-medium">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {product.description || "Experience innovation and quality with this premium product designed for modern living. Crafted with attention to detail and using the finest materials."}
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleQuantityChange(1)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-blue-600 text-white flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Link href="/checkout" className="flex-1">
                <Button size="lg" variant="secondary" className="w-full">
                  Buy Now
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2 text-primary dark:text-blue-400" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-primary dark:text-blue-400" />
                <span className="text-sm">30-Day Returns</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-primary dark:text-blue-400" />
                <span className="text-sm">2 Year Warranty</span>
              </div>
            </div>
            
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {product.longDescription || "Experience unparalleled quality and innovation with this premium product. Meticulously crafted using the finest materials, this product combines elegant design with exceptional functionality. Perfect for everyday use, it enhances your lifestyle with its versatile features and reliable performance. Built to last, it represents our commitment to excellence and customer satisfaction."}
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="py-4">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">Brand</span>
                    <span className="text-gray-600 dark:text-gray-300">Arun Premium</span>
                  </li>
                  <Separator />
                  <li className="flex justify-between">
                    <span className="font-medium">Model</span>
                    <span className="text-gray-600 dark:text-gray-300">{product.model || "AP-" + Math.floor(Math.random() * 1000)}</span>
                  </li>
                  <Separator />
                  <li className="flex justify-between">
                    <span className="font-medium">Weight</span>
                    <span className="text-gray-600 dark:text-gray-300">{product.weight || (Math.random() * 2 + 0.1).toFixed(2) + " kg"}</span>
                  </li>
                  <Separator />
                  <li className="flex justify-between">
                    <span className="font-medium">Dimensions</span>
                    <span className="text-gray-600 dark:text-gray-300">{product.dimensions || Math.floor(Math.random() * 20 + 10) + " x " + Math.floor(Math.random() * 15 + 5) + " x " + Math.floor(Math.random() * 5 + 1) + " cm"}</span>
                  </li>
                  <Separator />
                  <li className="flex justify-between">
                    <span className="font-medium">Category</span>
                    <span className="text-gray-600 dark:text-gray-300">{product.category || "Electronics"}</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="py-4">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b dark:border-gray-700 pb-4 last:border-0">
                      <div className="flex items-center mb-2">
                        <div className="flex text-amber-400 mr-2">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`h-4 w-4 ${j < 4 + (i % 2) ? "fill-current" : "text-gray-300 dark:text-gray-600"}`} />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{["John D.", "Sarah M.", "Robert K."][i]}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                          {new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 7 + 3)).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {[
                          "Absolutely love this product! It exceeded my expectations in every way. The quality is outstanding and it works perfectly for what I needed.",
                          "Great value for the price. The design is elegant and the functionality is just what I was looking for. Shipping was also faster than expected.",
                          "Solid product that does exactly what it promises. Setup was easy and the performance has been reliable. Would recommend to others."
                        ][i]}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
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
