import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import CartDropdown from "./CartDropdown";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const cartDropdown = document.getElementById('cart-dropdown');
      const cartButton = document.getElementById('cart-button');
      
      if (
        cartDropdown && 
        cartButton && 
        !cartDropdown.contains(e.target as Node) && 
        !cartButton.contains(e.target as Node)
      ) {
        setCartOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-gray-800 transition-all duration-300 ${
      isScrolled ? "shadow-md" : "shadow-sm"
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-bold font-sans text-primary dark:text-blue-400 transition-colors">
          Arun Chaudhary
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/#products" label="Products" />
          <NavLink href="/#categories" label="Categories" />
          <NavLink href="/#trending" label="Deals" />
          <NavLink href="/#about" label="About" />
        </nav>
        
        <div className="flex items-center space-x-2">
          {/* Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-primary dark:hover:text-blue-400 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Cart Icon */}
          <div className="relative" id="cart-button">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary dark:hover:text-blue-400 transition-colors relative"
              aria-label="Cart"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            {/* Cart Dropdown */}
            <AnimatePresence>
              {cartOpen && (
                <motion.div
                  id="cart-dropdown"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50"
                >
                  <CartDropdown />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Account */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-primary dark:hover:text-blue-400 transition-colors"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Button>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:text-primary dark:hover:text-blue-400 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              <MobileNavLink href="/" label="Home" />
              <MobileNavLink href="/#products" label="Products" />
              <MobileNavLink href="/#categories" label="Categories" />
              <MobileNavLink href="/#trending" label="Deals" />
              <MobileNavLink href="/#about" label="About" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [location] = useLocation();
  const isActive = location === href || (href !== '/' && location.startsWith(href));
  
  return (
    <Link 
      href={href} 
      className={`nav-link font-medium hover:text-primary dark:hover:text-blue-400 transition-colors relative
        ${isActive ? 'text-primary dark:text-blue-400' : ''}
      `}
    >
      {label}
      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: ${isActive ? '100%' : '0'};
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  const [location] = useLocation();
  const isActive = location === href || (href !== '/' && location.startsWith(href));
  
  return (
    <Link 
      href={href} 
      className={`py-2 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors
        ${isActive ? 'text-primary dark:text-blue-400' : ''}
      `}
    >
      {label}
    </Link>
  );
}
