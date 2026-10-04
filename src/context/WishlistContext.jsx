import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopnest_wishlist');
      return saved ? JSON.parse(saved) : [
        {
          id: "prod-4",
          name: "Wireless Noise Cancelling Headphones",
          category: "Electronics",
          categorySlug: "electronics",
          price: 199.00,
          originalPrice: 249.00,
          discount: 20,
          rating: 4.8,
          reviewsCount: 310,
          stock: 14,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopnest_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        category: product.category,
        categorySlug: product.categorySlug,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
        stock: product.stock,
        image: product.images ? product.images[0] : (product.image || '')
      };
      setWishlist((prev) => [...prev, wishlistItem]);
      showToast(`Added "${product.name}" to wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlist.find((i) => i.id === productId);
    setWishlist((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      showToast(`Removed "${item.name}" from wishlist`, 'info');
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
