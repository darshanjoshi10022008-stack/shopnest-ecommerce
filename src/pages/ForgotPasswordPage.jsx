import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Reset instructions sent to ' + email, 'success');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-neutral-50">
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded border border-neutral-200 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <Link to="/" className="text-xl font-bold tracking-tight text-neutral-950">
            ShopNest
          </Link>
          <h2 className="text-xl font-bold text-neutral-900 pt-1">
            Reset Password
          </h2>
          <p className="text-xs text-neutral-500">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-4 text-center py-2 text-xs">
            <p className="text-neutral-700">
              We have sent password reset instructions to <strong>{email}</strong>. Please check your inbox.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 font-semibold text-neutral-900 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 rounded text-sm transition cursor-pointer"
            >
              Send Reset Link
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
