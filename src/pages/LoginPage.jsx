import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your email and password', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/');
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('demo.customer@shopnest.com');
    setPassword('ShopNest123');
    showToast('Demo credentials filled', 'info');
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
            Sign In
          </h2>
          <p className="text-xs text-neutral-500">
            Access your orders, saved addresses, and wishlist.
          </p>
        </div>

        {/* Demo filler */}
        <div className="bg-neutral-50 border border-neutral-200 p-2.5 rounded text-xs flex items-center justify-between text-neutral-700">
          <span>Testing account?</span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-semibold text-neutral-900 hover:underline cursor-pointer"
          >
            Auto-fill demo credentials
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-neutral-700">Password</label>
              <Link to="/forgot-password" className="text-neutral-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-9 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
                title={showPassword ? "Hide" : "Show"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 text-neutral-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-neutral-900"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 rounded text-sm transition cursor-pointer"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-neutral-100 text-xs text-neutral-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-neutral-900 hover:underline">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}
