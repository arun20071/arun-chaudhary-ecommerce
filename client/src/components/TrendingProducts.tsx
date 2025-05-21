import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const trendingItems = [
  {
    id: "smart-home",
    title: "Ultimate Smart Home Bundle",
    description: "Transform your living space with our bestselling smart home package. Includes smart speakers, lighting, and security.",
    originalPrice: 899,
    price: 699,
    bgClass: "from-indigo-500 to-purple-600",
    badge: "Most Popular",
    buttonClass: "text-indigo-600 hover:bg-indigo-50",
    gridSpan: "lg:col-span-2",
  },
  {
    id: "fitness",
    title: "Premium Fitness Watch",
    description: "Track your fitness goals with advanced health monitoring and workout features.",
    price: 199,
    bgClass: "from-amber-400 to-orange-500",
    badge: "New Arrival",
    buttonClass: "text-orange-600 hover:bg-orange-50",
  },
  {
    id: "audio",
    title: "Wireless Noise-Canceling Headphones",
    description: "Immersive sound experience with industry-leading noise cancellation technology.",
    price: 249,
    bgClass: "from-teal-400 to-green-500",
    badge: "Bestseller",
    buttonClass: "text-teal-600 hover:bg-teal-50",
  },
  {
    id: "fashion",
    title: "Designer Collection",
    description: "Exclusive fashion items created by top designers. Available for a limited time only.",
    price: 89,
    bgClass: "from-blue-400 to-sky-500",
    badge: "Limited Edition",
    buttonClass: "text-blue-600 hover:bg-blue-50",
    pricePrefix: "From ",
  },
];

export default function TrendingProducts() {
  return (
    <section id="trending" className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-center mb-12">Trending Now</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`bg-gradient-to-br ${item.bgClass} rounded-xl shadow-xl overflow-hidden ${item.gridSpan || ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`p-8 ${item.gridSpan ? "md:p-10" : ""} text-white`}>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">{item.badge}</span>
                <h3 className={`${item.gridSpan ? "text-2xl md:text-3xl" : "text-2xl"} font-bold font-sans mb-3`}>{item.title}</h3>
                <p className="mb-6 text-white/80">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    {item.originalPrice && (
                      <span className="text-lg opacity-75 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                    <span className={`${item.gridSpan ? "text-3xl" : "text-2xl"} font-bold ${item.originalPrice ? "ml-2" : ""}`}>
                      {item.pricePrefix || ""}{`$${item.price.toFixed(2)}`}
                    </span>
                  </div>
                  <Link href={`/category/${item.id}`}>
                    <Button className={`bg-white ${item.buttonClass} ${item.gridSpan ? "px-6 py-3" : "px-5 py-2"} rounded-lg font-semibold transition-colors`}>
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
