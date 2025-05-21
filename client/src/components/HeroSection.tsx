import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans mb-4 leading-tight">
              Discover Quality Products
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-lg">
              Shop the latest trends with confidence. Premium selection, unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#products">
                <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg px-6">
                  Shop Now
                </Button>
              </Link>
              <Link href="#trending">
                <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white hover:text-blue-600 px-6">
                  View Trending
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
              alt="Premium Electronics Collection" 
              className="rounded-lg shadow-2xl max-w-full h-auto" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
