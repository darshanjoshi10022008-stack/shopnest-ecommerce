import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubscribed(true);
    showToast('Thank you for subscribing! Check your inbox for updates.', 'success');
    setEmail('');
  };

  return (
    <section className="py-12 sm:py-16 bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-4">
        
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
          Stay in the loop
        </h2>

        <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          Sign up to receive occasional updates on new seasonal drops, limited sales, and restocks.
        </p>

        {isSubscribed ? (
          <div className="p-3 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-800">
            ✓ You are subscribed. Thank you!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-3.5 py-2.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-md transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-neutral-500 pt-1">
          We respect your privacy. You can unsubscribe at any time.
        </p>

      </div>
    </section>
  );
}
