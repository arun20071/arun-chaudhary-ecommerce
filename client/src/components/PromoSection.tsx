import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PromoSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }
    
    // Simulate subscription success
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter",
    });
    
    setEmail("");
  };

  return (
    <section className="py-12 md:py-16 bg-blue-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-primary dark:text-blue-400 font-semibold mb-3">SPECIAL OFFER</span>
              <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4">Get 25% Off On Your First Purchase</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sign up for our newsletter and receive a special discount code instantly. Limited time offer for new customers only.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 mb-4" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="bg-primary hover:bg-blue-600 text-white px-6 py-3 whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By subscribing you agree to our <a href="#" className="text-primary dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-primary dark:text-blue-400 hover:underline">Privacy Policy</a>.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
                alt="Special offer promotion"
                className="w-full h-72 md:h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
