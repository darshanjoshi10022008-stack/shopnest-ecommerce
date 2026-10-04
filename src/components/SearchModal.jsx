import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/40">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden z-10">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-neutral-200 px-4 py-3">
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full text-neutral-900 placeholder-neutral-400 bg-transparent text-sm outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-600 p-1 mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-neutral-500 hover:text-neutral-800 px-2 py-1 bg-neutral-100 rounded cursor-pointer"
          >
            ESC
          </button>
        </form>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['T-Shirt', 'Sneakers', 'Watch', 'Headphones', 'Backpack', 'Hoodie'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-1.5 rounded transition cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-10 h-10 rounded object-cover bg-neutral-100"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-neutral-900">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {product.category} • ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-100 text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs font-semibold text-neutral-900 hover:underline cursor-pointer"
                >
                  View all results for "{query}" →
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-neutral-500">
              No products found matching "{query}"
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
