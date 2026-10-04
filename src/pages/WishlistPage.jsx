import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1);
    });
    clearWishlist();
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-sm text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-1">
            Your wishlist is empty
          </h2>
          <p className="text-xs text-neutral-500 mb-6">
            Save your favorite items here while browsing so you can easily find them later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
            <Link to="/" className="hover:text-neutral-900">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-900 font-medium">Wishlist</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddAllToCart}
                className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded transition cursor-pointer flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add All to Cart
              </button>
              <button
                onClick={clearWishlist}
                className="text-xs text-neutral-500 hover:text-red-600 underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border border-neutral-200 rounded overflow-hidden flex flex-col justify-between bg-white hover:border-neutral-300 transition"
            >
              <div className="relative aspect-square w-full bg-neutral-100">
                <Link to={`/product/${item.id}`} className="block w-full h-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-neutral-500 hover:text-red-600 shadow-xs transition cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                    {item.category}
                  </p>
                  <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1 mt-0.5">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <p className="text-sm font-bold text-neutral-900 mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-100">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-300 font-medium py-1.5 px-3 rounded text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
