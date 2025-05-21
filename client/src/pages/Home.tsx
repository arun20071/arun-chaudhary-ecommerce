import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoSection from "@/components/PromoSection";
import TrendingProducts from "@/components/TrendingProducts";
import TestimonialsSection from "@/components/TestimonialsSection";
import SubscribeSection from "@/components/SubscribeSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Arun Chaudhary - Premium E-Commerce Store</title>
        <meta name="description" content="Shop the latest trends with Arun Chaudhary. Premium selection of electronics, fashion, home goods and more at unbeatable prices." />
        <meta property="og:title" content="Arun Chaudhary - Premium E-Commerce Store" />
        <meta property="og:description" content="Discover quality products with fast shipping and excellent customer service. Shop now for the best deals." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoSection />
      <TrendingProducts />
      <TestimonialsSection />
      <SubscribeSection />
    </>
  );
}
