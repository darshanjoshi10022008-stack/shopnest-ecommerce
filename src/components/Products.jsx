import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function Products({ onQuickView, limit = 8 }) {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, limit);

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
              Featured Products
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Handpicked customer favorites for this season
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={featuredProducts}
          columns={4}
          onQuickView={onQuickView}
        />

        {/* Mobile View All button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 underline"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
