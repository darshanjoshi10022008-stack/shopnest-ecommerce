import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import CheckoutModal from '../components/CheckoutModal';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'specs', 'reviews'
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Michael B.',
      rating: 5,
      date: '1 week ago',
      comment: 'Very pleased with the quality. True to size and matches the photos accurately.'
    },
    {
      id: 2,
      author: 'Claire D.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Arrived promptly and packaged well. The material feels durable and comfortable.'
    }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Product Not Found</h2>
        <Link to="/shop" className="text-sm text-neutral-900 underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const images = product.images || [product.image];
  const activeSize = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
  const activeColor = selectedColor || (product.colors ? product.colors[0]?.name : 'Default');

  const handleAddToCart = () => {
    addToCart(product, quantity, activeSize, activeColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, activeSize, activeColor);
    setIsCheckoutModalOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      showToast('Please provide your name and review', 'error');
      return;
    }
    const item = {
      id: Date.now(),
      author: newReview.name,
      rating: Number(newReview.rating),
      date: 'Just now',
      comment: newReview.comment
    };
    setReviewsList([item, ...reviewsList]);
    setNewReview({ name: '', rating: 5, comment: '' });
    showToast('Review submitted. Thank you!', 'success');
  };

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6">
          <Link to="/" className="hover:text-neutral-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link to="/shop" className="hover:text-neutral-900">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-neutral-900">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left: Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="aspect-square w-full rounded-md overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded overflow-hidden border transition cursor-pointer ${
                      activeImageIndex === idx ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Controls (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">{product.rating}</span>
                  <span className="text-xs text-neutral-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-2 border-t border-neutral-100">
                <span className="text-2xl font-bold text-neutral-950">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded">
                    {product.discount}% off
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-2">
                  <span className="block text-xs font-semibold text-neutral-800 mb-2">
                    Color: <span className="font-normal text-neutral-600">{activeColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border transition cursor-pointer ${c.class} ${
                          activeColor === c.name ? 'ring-2 ring-offset-1 ring-neutral-900' : 'border-neutral-300'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="pt-2">
                  <span className="block text-xs font-semibold text-neutral-800 mb-2">
                    Size: <span className="font-normal text-neutral-600">{activeSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded border transition cursor-pointer ${
                          activeSize === s
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-800">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-neutral-600 hover:text-neutral-900 font-medium"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-neutral-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock || 20, q + 1))}
                    className="px-3 py-1 text-neutral-600 hover:text-neutral-900 font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3 px-6 rounded text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded border transition cursor-pointer ${
                      inWishlist
                        ? 'border-red-300 bg-red-50 text-red-600'
                        : 'border-neutral-300 hover:bg-neutral-50 text-neutral-700'
                    }`}
                    title={inWishlist ? "Saved in wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-600' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded text-sm transition cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

            </div>

            {/* Practical Service Highlights */}
            <div className="pt-6 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>Standard shipping: 3–5 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>30-day hassle-free return policy</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>Secure payment checkout</span>
              </div>
            </div>

          </div>

        </div>

        {/* Product Information Tabs */}
        <div className="border-t border-neutral-200 pt-8 mb-16">
          <div className="flex gap-6 border-b border-neutral-200 mb-6 pb-2">
            {[
              { id: 'details', label: 'Product Details' },
              { id: 'specs', label: 'Specifications' },
              { id: 'reviews', label: `Reviews (${reviewsList.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-semibold pb-2 border-b-2 transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-neutral-950 border-neutral-950'
                    : 'text-neutral-500 border-transparent hover:text-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-2xl text-sm text-neutral-700 leading-relaxed">
                <p>{product.description}</p>
                {product.features && (
                  <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 text-xs sm:text-sm">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-xl">
                <div className="divide-y divide-neutral-200 border border-neutral-200 rounded text-xs sm:text-sm">
                  {product.specs ? (
                    Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="flex py-2.5 px-3.5 bg-white">
                        <span className="w-1/3 font-semibold text-neutral-800">{k}</span>
                        <span className="w-2/3 text-neutral-600">{v}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-neutral-500">Standard specifications apply.</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-2xl">
                {/* Submit review */}
                <form onSubmit={handleReviewSubmit} className="p-4 border border-neutral-200 rounded bg-neutral-50 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Write a Review
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="px-3 py-1.5 rounded border border-neutral-300 text-xs bg-white focus:outline-none focus:border-neutral-900"
                    />
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                      aria-label="Rating score"
                      className="px-3 py-1.5 rounded border border-neutral-300 text-xs bg-white focus:outline-none focus:border-neutral-900"
                    >
                      <option value={5}>5 Stars - Excellent</option>
                      <option value={4}>4 Stars - Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Below Average</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Share your thoughts on the product fit, material, and quality..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-xs bg-white focus:outline-none focus:border-neutral-900"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded hover:bg-neutral-800"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Review items */}
                <div className="space-y-3">
                  {reviewsList.map((r) => (
                    <div key={r.id} className="p-3.5 border border-neutral-200 rounded bg-white text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-neutral-900">{r.author}</span>
                        <span className="text-neutral-400">{r.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: r.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-neutral-600 mt-1">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-neutral-200 pt-10">
            <h3 className="text-lg font-bold text-neutral-950 mb-6">
              Similar Products
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  );
}
