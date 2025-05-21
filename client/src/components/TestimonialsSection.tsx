import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "The quality of the products is exceptional. Fast shipping and excellent customer service. Will definitely be a repeat customer!",
    author: "Sarah J.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
  },
  {
    id: 2,
    content: "I've been shopping here for years now and have never been disappointed. The website is easy to navigate and the product selection is amazing.",
    author: "David M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4.5,
  },
  {
    id: 3,
    content: "The customer service is outstanding. Had an issue with my order and it was resolved immediately. Will recommend to all my friends!",
    author: "Emma L.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-sans text-center mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Don't just take our word for it. Here's what our satisfied customers have to say about their shopping experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex text-amber-400 mb-4">
                {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
                {testimonial.rating % 1 !== 0 && (
                  <div className="relative">
                    <Star className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                    <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                      <Star className="h-5 w-5 fill-current text-amber-400" />
                    </div>
                  </div>
                )}
                {Array.from({ length: 5 - Math.ceil(testimonial.rating) }).map((_, i) => (
                  <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-200 italic mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden mr-4">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Verified Buyer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
