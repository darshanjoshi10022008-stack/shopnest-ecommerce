import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Truck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, total, subtotal, discountAmount, shipping, tax, clearCart, promoCode } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    phone: '+1 (555) 382-9910',
    paymentMethod: 'card'
  });

  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = "SN-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 1000);
  };

  const handleFinish = () => {
    onClose();
    setStep(1);
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="fixed inset-0" onClick={step === 3 ? handleFinish : onClose} />

      <div className="relative bg-white rounded-lg shadow-xl border border-neutral-200 max-w-xl w-full overflow-hidden z-10 my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              {step === 3 ? "Order Confirmation" : "Checkout"}
            </h3>
            <p className="text-xs text-neutral-500">
              {step === 1 ? "Step 1 of 2: Shipping Address" : step === 2 ? "Step 2 of 2: Payment" : "Thank you for your order"}
            </p>
          </div>

          <button
            onClick={step === 3 ? handleFinish : onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-6 rounded text-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Order Summary box */}
              <div className="bg-neutral-50 p-3.5 rounded border border-neutral-200 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount ({promoCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="font-medium text-neutral-900">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tax</span>
                  <span className="font-medium text-neutral-900">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-900">
                  <span>Total Due</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-2">
                  Select Payment Option
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-3 rounded border text-left flex items-center gap-2.5 transition cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'border-neutral-900 bg-neutral-50 font-medium'
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs">Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'cod' }))}
                    className={`p-3 rounded border text-left flex items-center gap-2.5 transition cursor-pointer ${
                      formData.paymentMethod === 'cod'
                        ? 'border-neutral-900 bg-neutral-50 font-medium'
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>
                </div>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-2.5 bg-neutral-50 p-3.5 rounded border border-neutral-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-1.5 rounded border border-neutral-300 text-xs bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3 py-1.5 rounded border border-neutral-300 text-xs bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 mb-1">CVC</label>
                      <input
                        type="text"
                        defaultValue="389"
                        className="w-full px-3 py-1.5 rounded border border-neutral-300 text-xs bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-6 rounded text-sm cursor-pointer"
                >
                  {isProcessing ? "Processing..." : `Place Order ($${total.toFixed(2)})`}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  Order Received
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  A confirmation has been sent to <strong>{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded border border-neutral-200 text-xs text-left max-w-sm mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Order ID:</span>
                  <span className="font-mono font-bold text-neutral-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping to:</span>
                  <span className="font-medium text-neutral-800">{formData.city}, {formData.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Delivery:</span>
                  <span className="font-medium text-green-700">3–5 business days</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-6 rounded text-xs transition cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
