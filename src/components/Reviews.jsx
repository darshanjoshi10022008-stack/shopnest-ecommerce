import React from 'react';
import { customerReviews } from '../data/reviews';
import { Star } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
            Customer Reviews
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Real feedback from verified purchasers
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-md border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-neutral-200/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-8 h-8 rounded-full object-cover bg-neutral-200"
                />
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Purchased {rev.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
