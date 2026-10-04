import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6 mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Categories
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Shop by curated department across all available products.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="border border-neutral-200 rounded overflow-hidden flex flex-col justify-between bg-white hover:border-neutral-300 transition group"
            >
              <div className="aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition duration-300"
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-600 transition">
                      {cat.name}
                    </h2>
                    <span className="text-xs text-neutral-500 font-medium">
                      {cat.itemCount} items
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 group-hover:underline"
                  >
                    <span>View {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
