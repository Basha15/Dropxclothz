import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { WOMEN_CATEGORIES } from '../data/categories';
import { ProductGrid } from '../components/ProductGrid';

export const WomenPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const subCategoryParam = searchParams.get('category') || 'all';

  // Filter women's garments
  const womenProducts = PRODUCTS.filter((p) => p.gender === 'women' || p.gender === 'unisex');

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Editorial Category Header */}
      <div className="relative py-16 sm:py-24 bg-[#0D0D0E] text-[#FAF8F5] overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="Women's Collection"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-2">
            FEMININE READY-TO-WEAR
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] font-light tracking-tight">
            Women's Clothing Collection
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#D8D2C7] font-light max-w-2xl mx-auto leading-relaxed">
            Mulberry silk gowns, sculpted hourglass blazers, bias-cut silk skirts, high-waisted palazzo trousers, and modern Chanderi ethnic ensembles.
          </p>

          {/* Subcategory Navigation Strip */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link
              to="/women"
              className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors rounded-sm ${
                subCategoryParam === 'all'
                  ? 'bg-[#C5A880] text-[#0D0D0E] font-semibold'
                  : 'bg-white/10 text-[#FAF8F5] hover:bg-white/20'
              }`}
            >
              All Women's
            </Link>
            {WOMEN_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/women?category=${cat.slug}`}
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
        products={womenProducts}
        defaultGender="women"
        defaultCategory={subCategoryParam}
        hideGenderFilter={true}
      />
    </div>
  );
};
