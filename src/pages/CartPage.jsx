import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';
import { 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  ChevronRight
} from 'lucide-react';

export default function CartPage() {
  const { 
    cart, 
    totalItems, 
    subtotal, 
    discountAmount, 
    promoCode, 
    shipping, 
    tax, 
    total, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    applyPromo, 
    removePromo 
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyPromo(inputCoupon.trim());
      setInputCoupon('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-sm text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-1">
            Your shopping cart is empty
          </h2>
          <p className="text-xs text-neutral-500 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Heading */}
        <div className="mb-6">
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
            <Link to="/" className="hover:text-neutral-900">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-900 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-baseline justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>
            <button
              onClick={clearCart}
              className="text-xs text-neutral-500 hover:text-red-600 underline cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Layout Grid: Items List + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Items Table / List (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="border border-neutral-200 rounded divide-y divide-neutral-200 overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
                  
                  {/* Image */}
                  <Link to={`/product/${item.productId}`} className="w-20 h-20 rounded overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition">
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Size: {item.size} • Color: {item.color}
                    </p>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="text-right">
                      <span className="text-sm font-bold text-neutral-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-neutral-400">
                          ${item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 text-xs font-medium"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold text-neutral-900 min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 text-xs font-medium"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/shop" className="text-xs text-neutral-600 hover:text-neutral-900 font-medium">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <div className="p-5 border border-neutral-200 rounded bg-neutral-50/70 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200">
                Order Summary
              </h3>

              {/* Promo code */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Coupon Code
                </label>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2 rounded bg-green-50 border border-green-200 text-xs text-green-800">
                    <span>{promoCode} applied</span>
                    <button onClick={removePromo} className="text-red-600 font-semibold cursor-pointer">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. SHOPNEST20"
                      className="flex-1 px-3 py-1.5 bg-white border border-neutral-300 rounded text-xs uppercase focus:outline-none focus:border-neutral-900"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium rounded cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                <p className="text-[11px] text-neutral-400 mt-1">
                  Coupon for testing: <strong>SHOPNEST20</strong>
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs pt-3 border-t border-neutral-200">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-neutral-900">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-neutral-900">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3 px-4 rounded text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-neutral-500 text-center">
                Free standard shipping on orders over $100.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
