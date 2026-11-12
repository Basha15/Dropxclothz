import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { COLLECTIONS_DATA, PRODUCTS } from '../data/products';
import { COLLECTIONS_LIST } from '../data/categories';
import { ProductCard } from '../components/ProductCard';

export const CollectionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get('type') || 'all';
  const [selectedFilter, setSelectedFilter] = useState<string>(urlType);

  const filteredEditions = selectedFilter === 'all'
    ? COLLECTIONS_DATA
    : COLLECTIONS_DATA.filter((e) => e.id === selectedFilter || e.categoryTarget === selectedFilter);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold">
            EDITORIAL LOOKBOOKS & ARCHIVES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#171719] mt-3 font-normal">
            Signature Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7670] mt-3 font-light leading-relaxed">
            Each DROPX capsule emerges from an architectural premise—exploring gravity, volume, and the tactile dialogue between natural fibers and the human form.
          </p>

          {/* Quick Collection Badges Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors rounded-sm ${
                selectedFilter === 'all'
                  ? 'bg-[#171719] text-white font-semibold'
                  : 'bg-[#F0ECE1] text-[#7A7670] hover:text-[#171719]'
              }`}
            >
              All Lookbooks
            </button>
            {COLLECTIONS_LIST.map((col) => (
              <button
                key={col.id}
                onClick={() => setSelectedFilter(col.slug)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors rounded-sm ${
                  selectedFilter === col.slug
                    ? 'bg-[#171719] text-white font-semibold'
                    : 'bg-[#F0ECE1] text-[#7A7670] hover:text-[#171719]'
                }`}
              >
                {col.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Grid of Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {COLLECTIONS_LIST.slice(0, 3).map((col) => (
            <div key={col.id} className="relative aspect-[4/5] overflow-hidden group bg-[#E8E4DC] shadow-md">
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  {col.badge}
                </span>
                <h3 className="font-serif text-2xl mt-1">{col.name}</h3>
                <p className="text-xs text-[#D8D2C7] mt-1 line-clamp-2">{col.description}</p>
                <Link
                  to={`/shop?collection=${col.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Editions In-Depth */}
        <div className="space-y-28">
          {filteredEditions.map((edition, idx) => {
            const editionProducts = PRODUCTS.filter((p) => p.collection === edition.id);
            const isReversed = idx % 2 === 1;

            return (
              <section
                key={edition.id}
                className="pt-12 border-t border-[#E8E3DA] first:border-t-0 first:pt-0"
              >
                {/* Hero Editorial Card */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Side */}
                  <div
                    className={`relative overflow-hidden bg-[#E8E3DA] aspect-[4/5] lg:aspect-[16/11] ${
                      isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'
                    }`}
                  >
                    <img
                      src={edition.heroImage}
                      alt={edition.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-3.5 py-1 text-[10px] uppercase tracking-widest text-[#E8DEC8]">
                      {edition.year} • RUNWAY ARCHIVE
                    </div>
                  </div>

                  {/* Copy Side */}
                  <div
                    className={`space-y-6 ${
                      isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
                      CAPSULE {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>

                    <h2 className="font-serif text-3xl sm:text-5xl text-[#171719] font-light leading-tight">
                      {edition.name}
                    </h2>

                    <p className="text-xs uppercase tracking-widest text-[#7A7670] font-medium">
                      {edition.subtitle}
                    </p>

                    <blockquote className="font-serif italic text-lg text-[#171719] border-l-2 border-[#C5A880] pl-4 py-1 leading-snug">
                      {edition.quote}
                    </blockquote>

                    <p className="text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed">
                      {edition.description}
                    </p>

                    <div className="pt-2">
                      <Link
                        to={`/shop?collection=${edition.id}`}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0D0D0E] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                      >
                        <span>Shop This Capsule</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Product Previews from this Edition */}
                {editionProducts.length > 0 && (
                  <div className="mt-14">
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E8E3DA]">
                      <span className="text-xs uppercase tracking-widest text-[#171719] font-medium">
                        Garments from {edition.name}
                      </span>
                      <Link
                        to={`/shop?collection=${edition.id}`}
                        className="text-xs text-[#C5A880] hover:text-[#171719] uppercase tracking-wider flex items-center gap-1"
                      >
                        <span>View All ({editionProducts.length})</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {editionProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
