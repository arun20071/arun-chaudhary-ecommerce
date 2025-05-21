import { Link } from "wouter";
import { FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-6 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold font-sans text-primary dark:text-blue-400 mb-4">Arun Chaudhary</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your premier destination for high-quality products and exceptional shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/new" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/category/featured" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Featured Items
                </Link>
              </li>
              <li>
                <Link href="/category/sale" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Discounted Items
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" id="about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Arun Chaudhary. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
