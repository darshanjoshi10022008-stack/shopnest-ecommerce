import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products = [],
  columns = 4,
  onQuickView,
  emptyMessage = "No products found."
}) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-neutral-50 rounded-md border border-neutral-200">
        <p className="text-sm font-medium text-neutral-800">{emptyMessage}</p>
        <p className="text-xs text-neutral-500 mt-1">Try adjusting your filters or search keywords.</p>
      </div>
    );
  }

  let colClass = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  if (columns === 3) {
    colClass = "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3";
  }

  return (
    <div className={`grid ${colClass} gap-4 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
