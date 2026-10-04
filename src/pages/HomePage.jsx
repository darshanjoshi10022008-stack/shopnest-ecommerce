import React, { useState } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Products from '../components/Products';
import PromoBanner from '../components/PromoBanner';
import TrendingProducts from '../components/TrendingProducts';
import Reviews from '../components/Reviews';
import Newsletter from '../components/Newsletter';
import QuickViewModal from '../components/QuickViewModal';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Shop by Category */}
      <Categories />

      {/* 3. Featured Products */}
      <Products onQuickView={(p) => setQuickViewProduct(p)} limit={8} />

      {/* 4. Promotional Banner */}
      <PromoBanner />

      {/* 5. Trending / Best Sellers */}
      <TrendingProducts onQuickView={(p) => setQuickViewProduct(p)} />

      {/* 6. Customer Reviews */}
      <Reviews />

      {/* 7. Newsletter */}
      <Newsletter />

      {/* Quick View Popup Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
