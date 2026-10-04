import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white border-b transition-shadow ${
          isScrolled ? 'border-neutral-200 shadow-sm' : 'border-neutral-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* 1. Left: Brand Logo */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 -ml-1.5 text-neutral-700 hover:text-neutral-900 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link to="/" className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-neutral-950">
                  ShopNest
                </span>
              </Link>
            </div>

            {/* 2. Center: Clean Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-neutral-950 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* 3. Right: Search, Wishlist, Cart, Login */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Icon */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                aria-label="Search store"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors"
                aria-label="Wishlist"
                title="Saved Items"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors"
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Auth Button / Profile Dropdown */}
              <div className="relative ml-1 sm:ml-2">
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-md hover:bg-neutral-100 text-neutral-800 text-sm font-medium cursor-pointer"
                    >
                      <img
                        src={user?.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover bg-neutral-200"
                      />
                      <span className="hidden lg:inline text-xs font-semibold">{user?.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1.5 z-50">
                        <div className="px-3 py-2 border-b border-neutral-100">
                          <p className="text-xs font-semibold text-neutral-900">{user?.name}</p>
                          <p className="text-[11px] text-neutral-500 truncate">{user?.email}</p>
                        </div>
                        <Link
                          to="/wishlist"
                          className="block px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50"
                        >
                          Wishlist ({wishlistCount})
                        </Link>
                        <Link
                          to="/cart"
                          className="block px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50"
                        >
                          Cart ({totalItems})
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-neutral-100 mt-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-950 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {!isAuthenticated && (
              <div className="pt-3 border-t border-neutral-100 mt-2">
                <Link
                  to="/login"
                  className="block w-full text-center py-2 rounded-md bg-neutral-900 text-white text-xs font-medium"
                >
                  Sign In / Register
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}
