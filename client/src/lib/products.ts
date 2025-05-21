export interface Product {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  category: string;
  model?: string;
  weight?: string;
  dimensions?: string;
}

export const products: Product[] = [
  {
    id: "smartphone-premium",
    name: "Premium Smartphone",
    description: "Cutting-edge technology with a stunning display and powerful camera system.",
    longDescription: "Experience the future of mobile technology with our Premium Smartphone. Featuring a vibrant high-resolution display, lightning-fast processor, and a revolutionary camera system that captures stunning photos even in low light. With all-day battery life and the latest security features, this smartphone is designed for those who demand the best.",
    price: 899,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.5,
    reviewCount: 42,
    badge: "NEW",
    category: "electronics",
    model: "PS-2023",
    weight: "180g",
    dimensions: "146 x 72 x 7.4 mm"
  },
  {
    id: "smartwatch",
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this stylish smartwatch.",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.0,
    reviewCount: 29,
    badge: "-15%",
    category: "electronics",
    weight: "42g",
    dimensions: "44 x 38 x 10.7 mm"
  },
  {
    id: "wireless-earbuds",
    name: "Wireless Earbuds",
    description: "Immersive sound with noise cancellation and long battery life.",
    price: 129,
    image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.5,
    reviewCount: 98,
    category: "electronics",
    weight: "5.4g per bud",
    dimensions: "24 x 16 x 17 mm per bud"
  },
  {
    id: "digital-camera",
    name: "Digital Camera",
    description: "Capture life's moments with stunning clarity and professional quality.",
    price: 549,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.0,
    reviewCount: 56,
    badge: "POPULAR",
    category: "electronics",
    model: "DC-Pro2",
    weight: "390g",
    dimensions: "120 x 70 x 40 mm"
  },
  {
    id: "premium-sneakers",
    name: "Premium Sneakers",
    description: "Stylish and comfortable sneakers for everyday wear.",
    price: 129,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 3.5,
    reviewCount: 37,
    badge: "LIMITED",
    category: "fashion",
    weight: "310g per shoe",
    dimensions: "Available in sizes 7-13 US"
  },
  {
    id: "bluetooth-speaker",
    name: "Bluetooth Speaker",
    description: "Powerful sound in a portable design with 20 hours of battery life.",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 5.0,
    reviewCount: 84,
    badge: "-20%",
    category: "electronics",
    model: "BS-X1",
    weight: "720g",
    dimensions: "180 x 80 x 80 mm"
  },
  {
    id: "coffee-maker",
    name: "Smart Coffee Maker",
    description: "Brew the perfect cup of coffee with customizable settings and app control.",
    price: 149,
    image: "https://images.unsplash.com/photo-1570286424717-e9113b6ff6a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.7,
    reviewCount: 113,
    category: "home",
    model: "CM-300",
    weight: "2.3kg",
    dimensions: "240 x 170 x 350 mm"
  },
  {
    id: "designer-bag",
    name: "Designer Handbag",
    description: "Elegant and spacious handbag made from premium materials.",
    price: 299,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.3,
    reviewCount: 28,
    category: "fashion",
    dimensions: "380 x 140 x 300 mm"
  },
  {
    id: "skincare-set",
    name: "Luxury Skincare Set",
    description: "Complete skincare routine with natural ingredients for radiant skin.",
    price: 189,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.8,
    reviewCount: 65,
    category: "beauty",
    weight: "780g total"
  },
  {
    id: "smart-thermostat",
    name: "Smart Thermostat",
    description: "Control your home temperature from anywhere and save on energy costs.",
    price: 129,
    image: "https://images.unsplash.com/photo-1621319332247-ce85f09b10ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.6,
    reviewCount: 73,
    category: "home",
    model: "ST-100",
    dimensions: "100 x 100 x 25 mm"
  },
  {
    id: "fitness-tracker",
    name: "Fitness Activity Tracker",
    description: "Monitor your workouts, heart rate, and sleep patterns for better health.",
    price: 69,
    originalPrice: 89,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e97fd29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.4,
    reviewCount: 128,
    badge: "-22%",
    category: "electronics",
    weight: "28g",
    dimensions: "38 x 18 x 11 mm"
  },
  {
    id: "wireless-headphones",
    name: "Premium Headphones",
    description: "Over-ear headphones with noise cancellation and studio-quality sound.",
    price: 249,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    rating: 4.9,
    reviewCount: 207,
    category: "electronics",
    model: "PH-X3",
    weight: "310g",
    dimensions: "165 x 190 x 80 mm"
  }
];
