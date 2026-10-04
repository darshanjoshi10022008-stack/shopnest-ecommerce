import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  RotateCcw
} from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          if (!matchName && !matchCat) return false;
        }

        // Category filter
        if (selectedCategory !== 'All') {
          if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Price filter
        if (product.price > maxPrice) return false;

        // Rating filter
        if (minRating > 0 && product.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default order
      });
  }, [searchQuery, selectedCategory, maxPrice, minRating, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(250);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    if (catName === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            All Products
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Browse our full catalog of apparel, footwear, and accessories.
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-8 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Mobile filter trigger */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded border border-neutral-300 text-xs font-medium text-neutral-800 bg-neutral-50 hover:bg-neutral-100"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-neutral-500">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort products"
                  className="appearance-none bg-white border border-neutral-300 text-xs font-medium text-neutral-800 py-2 pl-3 pr-8 rounded focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-neutral-300 rounded bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-l text-neutral-600 ${viewMode === 'grid' ? 'bg-neutral-100 text-neutral-950 font-bold' : 'hover:bg-neutral-50'}`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-r text-neutral-600 ${viewMode === 'list' ? 'bg-neutral-100 text-neutral-950 font-bold' : 'hover:bg-neutral-50'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Chips */}
        {(selectedCategory !== 'All' || searchQuery || maxPrice < 250 || minRating > 0) && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Filtered by:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-neutral-800">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategorySelect('All')} />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-neutral-800">
                "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {maxPrice < 250 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-neutral-800">
                Under ${maxPrice}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(250)} />
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded text-neutral-800">
                {minRating}★ & above
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-neutral-500 hover:text-neutral-900 underline ml-2 cursor-pointer"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Layout: Desktop Sidebar + Product Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="p-5 border border-neutral-200 rounded-md bg-neutral-50/50 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Filters
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-800 mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategorySelect('All')}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition cursor-pointer ${
                      selectedCategory === 'All'
                        ? 'bg-neutral-900 text-white font-medium'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition cursor-pointer ${
                        selectedCategory === cat.name
                          ? 'bg-neutral-900 text-white font-medium'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-neutral-800">Max Price</span>
                  <span className="font-bold text-neutral-900">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                  <span>$20</span>
                  <span>$250</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-xs font-semibold text-neutral-800 mb-2">Rating</h4>
                <div className="space-y-1">
                  {[
                    { stars: 4.8, label: '4.8 stars & above' },
                    { stars: 4.5, label: '4.5 stars & above' },
                    { stars: 0, label: 'All ratings' }
                  ].map((r) => (
                    <button
                      key={r.stars}
                      onClick={() => setMinRating(r.stars)}
                      className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs transition cursor-pointer ${
                        minRating === r.stars
                          ? 'bg-neutral-900 text-white font-medium'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${minRating === r.stars ? 'fill-amber-300 text-amber-300' : 'fill-amber-400 text-amber-400'}`} />
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Product Results Column */}
          <main className="lg:col-span-3">
            <div className="text-xs text-neutral-500 mb-4 font-medium">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 px-4 border border-neutral-200 rounded-md bg-neutral-50">
                <p className="text-sm font-semibold text-neutral-800">No products found</p>
                <p className="text-xs text-neutral-500 mt-1 mb-4">No items match your active filter criteria.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded hover:bg-neutral-800 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border border-neutral-200 rounded-md bg-white flex flex-col sm:flex-row items-center gap-4 hover:border-neutral-300 transition"
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-28 h-28 rounded object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <p className="text-xs text-neutral-500">{product.category}</p>
                      <h3 className="text-sm font-semibold text-neutral-900">{product.name}</h3>
                      <p className="text-xs text-neutral-600 line-clamp-2">{product.description}</p>
                      <div className="flex items-baseline gap-2 pt-1 justify-center sm:justify-start">
                        <span className="text-base font-bold text-neutral-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="px-4 py-2 border border-neutral-300 rounded text-xs font-medium hover:bg-neutral-900 hover:text-white transition whitespace-nowrap cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 lg:hidden">
          <div className="fixed inset-0" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative w-full max-w-xs bg-white h-full p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h3 className="text-sm font-bold text-neutral-900">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-neutral-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-xs font-semibold text-neutral-800 mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => { handleCategorySelect('All'); setIsMobileFilterOpen(false); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs ${selectedCategory === 'All' ? 'bg-neutral-900 text-white' : 'text-neutral-700'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { handleCategorySelect(cat.name); setIsMobileFilterOpen(false); }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs ${selectedCategory === cat.name ? 'bg-neutral-900 text-white' : 'text-neutral-700'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Max Price</span>
                  <span>${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-neutral-900"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2 border border-neutral-300 rounded text-xs font-medium text-neutral-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 bg-neutral-900 text-white rounded text-xs font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
