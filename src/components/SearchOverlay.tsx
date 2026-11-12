import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/currency';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = [
  'Mulberry Silk Dress',
  'Cashmere Turtleneck',
  'Wool Blazer',
  'Selvedge Denim',
  'Double-Breasted Overcoat',
  'Linen Shorts',
  'Pleated Trousers',
  'Chanderi Silk Kurta'
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectQuery = (keyword: string) => {
    setQuery(keyword);
    navigate(`/shop?search=${encodeURIComponent(keyword)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#0D0D0E]/80 backdrop-blur-md flex flex-col justify-start pt-16 sm:pt-24 px-4 sm:px-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-10 text-[#D8D2C7] hover:text-white p-2.5 rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-4xl mx-auto">
            {/* Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative border-b-2 border-[#C5A880]/60 pb-3">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-[#C5A880]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections, fabrics, garments..."
                className="w-full pl-10 pr-12 bg-transparent text-xl sm:text-3xl text-white placeholder:text-[#8C8880] focus:outline-none font-serif tracking-wide"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8C8880] hover:text-white text-xs uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </form>

            {/* Quick Suggestions / Trending Tags */}
            {!query.trim() && (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending In Search</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {TRENDING_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelectQuery(item)}
                      className="px-3.5 py-1.5 bg-[#1F1F23]/80 hover:bg-[#C5A880] hover:text-[#0D0D0E] text-[#D8D2C7] text-xs tracking-wider border border-[#2A2A2E] hover:border-[#C5A880] transition-colors rounded-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Quick Navigation to key categories */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Link
                    to="/men"
                    onClick={onClose}
                    className="p-4 bg-[#171719] border border-[#2A2A2E] hover:border-[#C5A880] transition-colors group"
                  >
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-widest block">Department</span>
                    <span className="text-white font-serif text-lg group-hover:text-[#C5A880] transition-colors">Men's Retail</span>
                  </Link>
                  <Link
                    to="/women"
                    onClick={onClose}
                    className="p-4 bg-[#171719] border border-[#2A2A2E] hover:border-[#C5A880] transition-colors group"
                  >
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-widest block">Department</span>
                    <span className="text-white font-serif text-lg group-hover:text-[#C5A880] transition-colors">Women's Retail</span>
                  </Link>
                  <Link
                    to="/new-arrivals"
                    onClick={onClose}
                    className="p-4 bg-[#171719] border border-[#2A2A2E] hover:border-[#C5A880] transition-colors group"
                  >
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-widest block">New In</span>
                    <span className="text-white font-serif text-lg group-hover:text-[#C5A880] transition-colors">New Arrivals</span>
                  </Link>
                  <Link
                    to="/sale"
                    onClick={onClose}
                    className="p-4 bg-[#171719] border border-[#2A2A2E] hover:border-[#C5A880] transition-colors group"
                  >
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-widest block">Seasonal</span>
                    <span className="text-white font-serif text-lg group-hover:text-[#C5A880] transition-colors">Curated Sale</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {query.trim() && (
              <div className="mt-8 max-h-[60vh] overflow-y-auto pr-2">
                <div className="flex items-center justify-between text-xs text-[#8C8880] mb-4 uppercase tracking-widest">
                  <span>Found {results.length} garments</span>
                  {results.length > 0 && (
                    <button
                      onClick={handleSearchSubmit}
                      className="text-[#C5A880] hover:underline flex items-center gap-1"
                    >
                      View all in Shop <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {results.length === 0 ? (
                  <div className="py-12 text-center text-[#8C8880]">
                    <p className="font-serif text-xl text-white">No creations matching "{query}"</p>
                    <p className="text-xs mt-2">Try searching for cashmere, silk, blazer, trousers, or dresses.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 bg-[#171719] border border-[#2A2A2E] hover:border-[#C5A880] transition-colors group"
                      >
                        <div className="w-16 h-20 flex-shrink-0 bg-[#2A2A2E] overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase tracking-widest text-[#C5A880]">
                            {product.gender} • {product.subCategory}
                          </span>
                          <h4 className="text-white text-sm font-medium truncate font-serif group-hover:text-[#C5A880] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-[#D8D2C7] text-xs font-semibold mt-1">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
