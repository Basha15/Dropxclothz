import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';

export const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const collectionParam = searchParams.get('collection') || 'all';
  const searchParam = searchParams.get('search') || '';

  // If search query is in URL, filter products accordingly
  const filteredBySearch = searchParam
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(searchParam.toLowerCase()) ||
          p.category.toLowerCase().includes(searchParam.toLowerCase()) ||
          p.description.toLowerCase().includes(searchParam.toLowerCase())
      )
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Editorial Header */}
      <div className="relative py-16 sm:py-24 bg-[#0D0D0E] text-[#FAF8F5] overflow-hidden text-center">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Ready-to-wear Catalogue"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-2">
            COMPLETE ARCHIVE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] font-light tracking-tight">
            Ready-to-Wear Catalog
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#D8D2C7] font-light max-w-xl mx-auto leading-relaxed">
            {searchParam ? (
              <>Showing results for search query: <strong>"{searchParam}"</strong></>
            ) : (
              'Explore our complete ready-to-wear clothing catalog, from architectural outerwear and silk dresses to heavyweight Supima essentials and Japanese denim.'
            )}
          </p>
        </div>
      </div>

      {/* Main Grid with Filtering */}
      <ProductGrid
        products={filteredBySearch}
        defaultCategory={categoryParam}
        defaultCollection={collectionParam}
      />
    </div>
  );
};
