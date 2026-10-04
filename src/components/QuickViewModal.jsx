import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const images = product.images || [product.image];
  const activeSize = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
  const activeColor = selectedColor || (product.colors ? product.colors[0]?.name : 'Default');

  const handleAddToCart = () => {
    addToCart(product, quantity, activeSize, activeColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-2xl border border-neutral-200 max-w-3xl w-full overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 bg-neutral-100 p-6 flex flex-col justify-between">
          <div className="aspect-square w-full rounded overflow-hidden bg-white mb-3">
            <img
              src={images[selectedImage] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-12 h-12 rounded overflow-hidden border transition cursor-pointer ${
                    selectedImage === idx ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-neutral-500 font-medium">{product.category}</p>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
                {product.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs font-semibold text-neutral-800">{product.rating}</span>
                <span className="text-xs text-neutral-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-neutral-950">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Color: <span className="font-normal text-neutral-600">{activeColor}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full border transition cursor-pointer ${c.class} ${
                        activeColor === c.name ? 'ring-2 ring-offset-1 ring-neutral-900' : 'border-neutral-300'
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  Size: <span className="font-normal text-neutral-600">{activeSize}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs font-medium rounded border transition cursor-pointer ${
                        activeSize === s
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-800">Qty:</span>
              <div className="flex items-center border border-neutral-300 rounded bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900"
                >
                  -
                </button>
                <span className="px-2 py-0.5 text-xs font-semibold text-neutral-900 min-w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 20, q + 1))}
                  className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-neutral-200 mt-4">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-4 rounded text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded border transition cursor-pointer ${
                  inWishlist
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-neutral-300 hover:bg-neutral-50 text-neutral-700'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="flex items-center justify-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition py-1 text-center"
            >
              Full product details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
