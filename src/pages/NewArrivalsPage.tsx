import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import { Sparkles } from 'lucide-react';

export const NewArrivalsPage: React.FC = () => {
  const newArrivals = PRODUCTS.filter((p) => p.tags.includes('new'));

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="relative py-16 sm:py-24 bg-[#0D0D0E] text-[#FAF8F5] overflow-hidden text-center">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=2000&q=85"
            alt="New Arrivals"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUST DROPPED FOR AUTUMN / WINTER</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] font-light tracking-tight">
            New Arrivals
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#D8D2C7] font-light max-w-xl mx-auto leading-relaxed">
            Discover the freshest sartorial cuts, seasonal color palettes, and limited-run garments straight from our design studio.
          </p>
        </div>
      </div>

      <ProductGrid products={newArrivals} />
    </div>
  );
};
