import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              LIMITED TIME OFFER
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              Weekend Sale — Up to 50% Off
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-lg font-normal leading-relaxed">
              Enjoy seasonal discounts across select footwear, accessories, and knitwear. Prices automatically reduced at checkout.
            </p>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-neutral-100 text-neutral-950 text-sm font-semibold transition cursor-pointer"
              >
                <span>Shop Sale</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Product/Lifestyle Image */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-md overflow-hidden bg-neutral-800 border border-neutral-700">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
                alt="Weekend Sale Promotion"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
