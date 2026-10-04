import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small Label */}
            <span className="inline-block text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              NEW COLLECTION
            </span>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.15]">
              Discover Your Perfect Style
            </h1>

            {/* Natural Supporting Text */}
            <p className="text-base text-neutral-600 max-w-lg leading-relaxed font-normal">
              Thoughtfully designed everyday essentials. From comfortable organic cotton staples to durable footwear and minimalist accessories.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium transition cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white hover:bg-neutral-100 text-neutral-900 text-sm font-medium border border-neutral-300 transition cursor-pointer"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Right Campaign Image Column */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
                alt="ShopNest New Collection"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
