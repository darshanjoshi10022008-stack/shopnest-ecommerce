import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 400);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const primaryImage = product.images ? product.images[0] : product.image;

  return (
    <div className="group relative flex flex-col bg-white border border-neutral-200 rounded-md overflow-hidden hover:border-neutral-300 transition-colors">
      
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Sale / Tag badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-neutral-900 text-white text-[11px] font-medium px-2 py-0.5 rounded">
            Sale
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-xs transition-colors cursor-pointer ${
            inWishlist ? 'text-red-600' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-600' : ''}`} />
        </button>

        {/* Quick View Button on desktop hover */}
        {onQuickView && (
          <div className="absolute inset-x-2 bottom-2 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-1.5 bg-white/95 hover:bg-white text-neutral-900 text-xs font-medium rounded shadow-xs border border-neutral-200 transition cursor-pointer"
            >
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-neutral-800">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`p-2 rounded border text-xs font-medium transition cursor-pointer ${
              isAdding
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 border-neutral-300'
            }`}
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
