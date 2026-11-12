import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import { Tag, Sparkles } from 'lucide-react';

export const SalePage: React.FC = () => {
  const saleProducts = PRODUCTS.filter((p) => p.tags.includes('sale') || p.originalPrice);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="relative py-16 sm:py-24 bg-[#0D0D0E] text-[#FAF8F5] overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=2000&q=85"
            alt="Sale & Archive"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.35em] text-[#B43D3D] font-bold mb-2 bg-[#B43D3D]/20 px-3.5 py-1 border border-[#B43D3D]/40 rounded-full">
            <Tag className="w-3.5 h-3.5" />
            <span>SEASONAL ARCHIVE • UP TO 30% PRIVILEGE</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] font-light tracking-tight">
            Curated Sale & Archive
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#D8D2C7] font-light max-w-xl mx-auto leading-relaxed">
            Select runway editions and foundational pieces available at privileged pricing for a limited duration. Use code <strong>DROPX10</strong> at checkout for additional 10% off.
          </p>
        </div>
      </div>

      <ProductGrid products={saleProducts} />
    </div>
  );
};
