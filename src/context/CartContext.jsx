import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

const VALID_PROMOS = {
  'SHOPNEST20': { discountPercent: 20, description: '20% off' },
  'WELCOME10': { discountPercent: 10, description: '10% off' }
};

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopnest_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: "prod-1-M-White",
          productId: "prod-1",
          name: "Classic Cotton T-Shirt",
          price: 28.00,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
          category: "Men's Fashion",
          size: "M",
          color: "White",
          quantity: 1,
          stock: 45
        },
        {
          id: "prod-2-US 10-White / Off-White",
          productId: "prod-2",
          name: "Minimal Leather Sneakers",
          price: 120.00,
          originalPrice: 145.00,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
          category: "Footwear",
          size: "US 10",
          color: "White / Off-White",
          quantity: 1,
          stock: 18
        }
      ];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState(() => {
    try {
      return localStorage.getItem('shopnest_promo') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopnest_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem('shopnest_promo', promoCode);
      } else {
        localStorage.removeItem('shopnest_promo');
      }
    } catch (e) {
      console.error('Failed to save promo', e);
    }
  }, [promoCode]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stock || 50)
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images ? product.images[0] : product.image,
            category: product.category,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            stock: product.stock || 20
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    const item = cart.find(i => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showToast(`Removed "${item.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: Math.min(quantity, item.stock || 50)
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'info');
  };

  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_PROMOS[cleanCode]) {
      setPromoCode(cleanCode);
      showToast(`Coupon "${cleanCode}" applied`, 'success');
      return { success: true };
    } else {
      showToast('Invalid promo code. Try SHOPNEST20', 'error');
      return { success: false };
    }
  };

  const removePromo = () => {
    setPromoCode('');
    showToast('Coupon removed', 'info');
  };

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const activePromo = VALID_PROMOS[promoCode] || null;
  const discountPercent = activePromo?.discountPercent || 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  
  const freeShippingThreshold = 100;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 8.00);
  
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = cart.length === 0 ? 0 : taxableAmount * 0.05;
  const total = Math.max(0, taxableAmount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subtotal,
        discountAmount,
        discountPercent,
        promoCode,
        activePromo,
        shipping,
        freeShippingThreshold,
        tax,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
