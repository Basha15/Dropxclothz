import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Flame, ArrowUpRight } from 'lucide-react';
import { PRODUCTS, COLLECTIONS_DATA, PRESS_QUOTES, ATELIER_STORY } from '../data/products';
import { MEN_CATEGORIES, WOMEN_CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/currency';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men'>('all');

  // Filter products for curated showcase
  const newArrivals = PRODUCTS.filter((p) => p.tags.includes('new')).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.tags.includes('bestseller')).slice(0, 8);
  const saleProducts = PRODUCTS.filter((p) => p.tags.includes('sale') || p.originalPrice).slice(0, 4);

  const tabProducts = PRODUCTS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.gender === activeTab || item.category === activeTab;
  }).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* 1. Full-screen Fashion Hero Banner */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0D0D0E]">
        {/* Background Editorial Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=85"
            alt="Autumn Winter Haute Couture"
            className="w-full h-full object-cover object-center filter brightness-[0.62]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-[#0D0D0E]/35 to-black/45" />
        </div>

        {/* Hero Content with Staggered Motion */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAF8F5] py-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated promotional pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#C5A880] mb-5 bg-black/50 backdrop-blur-md px-4 py-1.5 border border-[#C5A880]/30 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUTUMN / WINTER 2026 READY-TO-WEAR</span>
            </motion.div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#FAF8F5] leading-[1.04] max-w-4xl mx-auto">
              The Architecture of Modern Silhouette
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base md:text-lg text-[#D8D2C7] font-light max-w-2xl mx-auto leading-relaxed">
              International luxury clothing crafted from virgin Biella wool, sand-washed Mulberry silk, and 7-gauge Inner Mongolian cashmere.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-9 py-4 bg-[#FAF8F5] hover:bg-[#C5A880] text-[#0D0D0E] text-xs font-medium uppercase tracking-[0.25em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/collections"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-[#FAF8F5] border border-white/50 text-xs font-medium uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>Explore Collections</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Subtle Bottom Scroll Cue */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center text-[#FAF8F5]/60 text-[10px] uppercase tracking-widest pointer-events-none">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span>Scroll to Discover</span>
            <div className="w-[1px] h-6 bg-white/40" />
          </div>
        </div>
      </section>

      {/* 2. Marquee Ticker */}
      <div className="bg-[#171719] text-[#E8DEC8] py-3.5 border-y border-[#2E2E33] overflow-hidden whitespace-nowrap">
        <div className="flex space-x-12 text-[11px] uppercase tracking-[0.3em] font-medium">
          <span>WORLDWIDE READY-TO-WEAR</span>
          <span>•</span>
          <span>BIELLA VIRGIN WOOL</span>
          <span>•</span>
          <span>SUSTAINABLE MONGOLIAN CASHMERE</span>
          <span>•</span>
          <span>JAPANESE SELVEDGE DENIM</span>
          <span>•</span>
          <span>COMPLIMENTARY INSURED COURIER</span>
          <span>•</span>
          <span>WORLDWIDE READY-TO-WEAR</span>
          <span>•</span>
          <span>BIELLA VIRGIN WOOL</span>
          <span>•</span>
          <span>SUSTAINABLE MONGOLIAN CASHMERE</span>
        </div>
      </div>

      {/* 3. Trending Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            DEPARTMENT SHOWCASE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171719] mt-2 font-normal">
            Shop By Department
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7670] mt-3 font-light leading-relaxed">
            Architectural cuts engineered for modern living. Explore distinct clothing departments designed to elevate everyday rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Women */}
          <Link
            to="/women"
            className="group relative aspect-[3/4] overflow-hidden bg-[#F0ECE1] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
              alt="Women's Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-[#FAF8F5]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                DRESSES • TOPS • SKIRTS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">Women's Retail</h3>
              <p className="text-xs text-[#D8D2C7] mt-1 font-light">Fluid silk dresses, tailored blazers, and organic denim.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                Explore Women <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link
            to="/men"
            className="group relative aspect-[3/4] overflow-hidden bg-[#F0ECE1] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85"
              alt="Men's Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-[#FAF8F5]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                SHIRTS • TROUSERS • JACKETS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">Men's Retail</h3>
              <p className="text-xs text-[#D8D2C7] mt-1 font-light">Double-pleated trousers, Supima tees, and shearling aviators.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                Explore Men <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Seasonal / New In */}
          <Link
            to="/new-arrivals"
            className="group relative aspect-[3/4] overflow-hidden bg-[#F0ECE1] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85"
              alt="New Arrivals"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-[#FAF8F5]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                CURATED CAPSULES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">New Arrivals</h3>
              <p className="text-xs text-[#D8D2C7] mt-1 font-light">Fresh seasonal silhouettes and limited-production garments.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                Shop New Arrivals <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. New Arrivals Showcase */}
      <section className="py-16 bg-[#F4EFE6]/50 border-y border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                JUST ARRIVED
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-1 font-normal">
                New Arrivals
              </h2>
              <p className="text-xs text-[#7A7670] mt-1.5 font-light">
                Discover the latest runway arrivals and seasonal statement garments.
              </p>
            </div>

            <Link
              to="/new-arrivals"
              className="text-xs uppercase tracking-[0.2em] text-[#171719] hover:text-[#C5A880] font-medium flex items-center gap-2 group self-start md:self-auto"
            >
              <span>View All New In ({newArrivals.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section with Filter Tabs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>MOST COVETED CREATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171719] font-normal">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7670] mt-2 font-light">
            Iconic staples revered by customers worldwide for their drape, fit, and tactile presence.
          </p>

          {/* Interactive filter tabs */}
          <div className="flex justify-center gap-3 mt-8">
            {[
              { id: 'all', label: 'All Garments' },
              { id: 'women', label: "Women's" },
              { id: 'men', label: "Men's" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#171719] text-[#FAF8F5] shadow-md'
                    : 'bg-[#F0ECE1] text-[#7A7670] hover:text-[#171719]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tabProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Seasonal Fashion Collection Banner */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0D0D0E] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="Runway Collection"
            className="w-full h-full object-cover object-center opacity-40 filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0E] via-[#0D0D0E]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">
              SEASONAL EDITORIAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-tight">
              Pure Mulberry Silk & Asymmetric Drapes
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-[#D8D2C7] font-light leading-relaxed">
              "In every fluid crease lies an unspoken dialogue between body and fabric." Explore bias-cut silk skirts, pleated trench dresses, and minimalist wrap silhouettes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#C5A880] text-[#0D0D0E] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Discover Lookbook
              </Link>
              <Link
                to="/women?category=dresses"
                className="px-8 py-3.5 border border-white/50 text-white hover:bg-white/10 text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Shop Silk Dresses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Special Offers Section (Curated Sale) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B43D3D] font-bold">
              LIMITED PRIVILEGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-1 font-normal">
              Special Offers & Archive Sale
            </h2>
            <p className="text-xs text-[#7A7670] mt-1.5 font-light">
              Select runway and seasonal garments available at preferential pricing.
            </p>
          </div>

          <Link
            to="/sale"
            className="text-xs uppercase tracking-[0.2em] text-[#B43D3D] hover:text-[#8E2828] font-semibold flex items-center gap-2 group self-start md:self-auto"
          >
            <span>Explore All Sale Items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Brand Promotional Editorial Section */}
      <section className="py-20 bg-[#171719] text-[#FAF8F5] border-t border-[#2A2A2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                {ATELIER_STORY.title}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF8F5] leading-tight">
                {ATELIER_STORY.headline}
              </h2>
              <div className="space-y-4 text-xs text-[#B8B4AC] font-light leading-relaxed">
                {ATELIER_STORY.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] hover:text-white transition-colors"
                >
                  <span>Read Full Brand Manifesto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden bg-[#2A2A2E]">
                <img
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85"
                  alt="Tailored Trousers"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden bg-[#2A2A2E] mt-8">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Sculpted Blazer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Press Quotes Carousel / Grid */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#E8E4DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              CRITICAL ACCLAIM
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-1 font-normal">
              Press & Editorial Recognition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRESS_QUOTES.map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#F5F1EB] border border-[#E8E4DC] flex flex-col justify-between"
              >
                <p className="font-serif text-base sm:text-lg text-[#171719] italic leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-[#E0D8CB]">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171719]">
                    {item.publication}
                  </p>
                  <p className="text-[11px] text-[#7A7670]">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
