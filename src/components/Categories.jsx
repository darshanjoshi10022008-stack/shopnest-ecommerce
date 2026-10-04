import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
              Shop by Category
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Browse our departments
            </p>
          </div>
          <Link
            to="/categories"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Clean Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group block text-center"
            >
              {/* Card Image */}
              <div className="aspect-square w-full rounded-md overflow-hidden bg-neutral-100 mb-3 border border-neutral-200/80">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Title & Count */}
              <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {cat.itemCount} items
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 underline"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
