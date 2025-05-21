import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FeaturedProducts() {
  const [category, setCategory] = useState("all");
  
  const filteredProducts = category === "all" 
    ? products.slice(0, 6) 
    : products.filter(product => product.category === category).slice(0, 6);

  return (
    <section id="products" className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-sans">Featured Products</h2>
          <div className="mt-4 md:mt-0">
            <Select defaultValue="all" onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="home">Home & Living</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Link href="/products">
            <Button 
              variant="outline" 
              className="border border-primary dark:border-blue-500 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-600"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Move import after using Link to fix error
import { Link } from "wouter";
