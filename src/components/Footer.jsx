import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (Col span 2 on large screens) */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="inline-block text-lg font-bold text-white tracking-tight">
              ShopNest
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Modern everyday essentials across apparel, footwear, accessories, electronics, and beauty. Built for comfort and long-term durability.
            </p>
            <div className="pt-2 text-xs text-neutral-500 space-y-1">
              <p>Email: support@shopnest-store.com</p>
              <p>Hours: Mon – Fri, 9am – 6pm EST</p>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Shop
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shop" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Men%27s+Fashion" className="hover:text-white transition">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Women%27s+Fashion" className="hover:text-white transition">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Footwear" className="hover:text-white transition">
                  Footwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-white transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About ShopNest
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} ShopNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-neutral-400 transition">Privacy</Link>
            <Link to="/about" className="hover:text-neutral-400 transition">Terms</Link>
            <Link to="/about" className="hover:text-neutral-400 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
