import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { MEN_CATEGORIES } from '../data/categories';
import { ProductGrid } from '../components/ProductGrid';

export const MenPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const subCategoryParam = searchParams.get('category') || 'all';

  // Filter men's garments
  const menProducts = PRODUCTS.filter((p) => p.gender === 'men' || p.gender === 'unisex');

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Editorial Category Header */}
      <div className="relative py-16 sm:py-24 bg-[#0D0D0E] text-[#FAF8F5] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=2000&q=85"
            alt="Men's Collection"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-2">
            MASCULINE READY-TO-WEAR
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] font-light tracking-tight">
            Men's Clothing Collection
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#D8D2C7] font-light max-w-2xl mx-auto leading-relaxed">
            Double-pleated wool trousers, heavyweight Supima cotton essentials, vintage Japanese selvedge denim, and Spanish Merino shearling outerwear.
          </p>

          {/* Subcategory Navigation Strip */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link
              to="/men"
              className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors rounded-sm ${
                subCategoryParam === 'all'
                  ? 'bg-[#C5A880] text-[#0D0D0E] font-semibold'
                  : 'bg-white/10 text-[#FAF8F5] hover:bg-white/20'
              }`}
            >
              All Men's
            </Link>
            {MEN_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/men?category=${cat.slug}`}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors rounded-sm ${
                  subCategoryParam === cat.slug
                    ? 'bg-[#C5A880] text-[#0D0D0E] font-semibold'
                    : 'bg-white/10 text-[#FAF8F5] hover:bg-white/20'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={menProducts}
        defaultGender="men"
        defaultCategory={subCategoryParam}
        hideGenderFilter={true}
      />
    </div>
  );
};
