import { motion } from "framer-motion";
import { Laptop, ShoppingBag, Home, Sparkles } from "lucide-react";
import { Link } from "wouter";

type Category = {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  iconBgClass: string;
  iconHoverClass: string;
  textClass: string;
};

const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets",
    icon: <Laptop className="h-6 w-6 text-primary dark:text-blue-400" />,
    iconBgClass: "bg-blue-100 dark:bg-blue-900",
    iconHoverClass: "group-hover:bg-blue-200 dark:group-hover:bg-blue-800",
    textClass: "text-primary dark:text-blue-400",
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Trending styles",
    icon: <ShoppingBag className="h-6 w-6 text-secondary dark:text-green-400" />,
    iconBgClass: "bg-green-100 dark:bg-green-900",
    iconHoverClass: "group-hover:bg-green-200 dark:group-hover:bg-green-800",
    textClass: "text-secondary dark:text-green-400",
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Comfort & style",
    icon: <Home className="h-6 w-6 text-accent dark:text-amber-400" />,
    iconBgClass: "bg-amber-100 dark:bg-amber-900",
    iconHoverClass: "group-hover:bg-amber-200 dark:group-hover:bg-amber-800",
    textClass: "text-accent dark:text-amber-400",
  },
  {
    id: "beauty",
    name: "Beauty",
    description: "Self-care essentials",
    icon: <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    iconBgClass: "bg-purple-100 dark:bg-purple-900",
    iconHoverClass: "group-hover:bg-purple-200 dark:group-hover:bg-purple-800",
    textClass: "text-purple-600 dark:text-purple-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function FeaturedCategories() {
  return (
    <section id="categories" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-center mb-12">
          Shop by Category
        </h2>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/category/${category.id}`}>
                <div className="group rounded-xl bg-white dark:bg-gray-700 p-4 shadow-md hover:shadow-lg transition-all text-center cursor-pointer">
                  <div className={`w-16 h-16 ${category.iconBgClass} ${category.iconHoverClass} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
