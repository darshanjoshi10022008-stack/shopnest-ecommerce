import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
            About ShopNest
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            We curate well-designed, reliable goods across clothing, shoes, everyday tech, and accessories.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-neutral-200 pt-12">
          <div className="md:col-span-6">
            <div className="aspect-[4/3] rounded overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
                alt="ShopNest Workspace"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950">
              Built on simplicity and honest value
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Founded in 2022, ShopNest started with a straightforward goal: provide everyday essentials without inflated retail markups or complicated return processes.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We work directly with dependable manufacturers to source durable cottons, genuine leathers, and reliable audio components that last well beyond a single season.
            </p>
          </div>
        </div>

        {/* Mission & Why Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral-200 pt-12">
          <div className="p-6 rounded border border-neutral-200 bg-neutral-50 space-y-3">
            <h3 className="text-base font-bold text-neutral-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              To make shopping for everyday essentials straightforward and dependable. We test our products for comfort, durability, and fit so you always receive what you expect.
            </p>
          </div>

          <div className="p-6 rounded border border-neutral-200 bg-neutral-50 space-y-3">
            <h3 className="text-base font-bold text-neutral-900">Why Shop With Us</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Transparent pricing with no hidden checkout fees</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>30-day money-back guarantee on all items</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Reliable customer support Monday through Friday</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Plastic-free, recyclable delivery packaging</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Small Statistics */}
        <div className="border-t border-b border-neutral-200 py-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-neutral-950">20,000+</p>
            <p className="text-xs text-neutral-500 mt-1">Orders Shipped</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-neutral-950">4.8 / 5</p>
            <p className="text-xs text-neutral-500 mt-1">Average Customer Rating</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-neutral-950">30 Days</p>
            <p className="text-xs text-neutral-500 mt-1">Return Window</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition"
          >
            <span>Browse the Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
