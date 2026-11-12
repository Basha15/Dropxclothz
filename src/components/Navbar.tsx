import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchOverlay } from './SearchOverlay';
import { getGlobalCurrency, setGlobalCurrency, CurrencyCode } from '../utils/currency';

const ANNOUNCEMENTS = [
  'COMPLIMENTARY EXPRESS WORLDWIDE COURIER DELIVERY OVER $100 / ₹5,000',
  'AUTUMN / WINTER 2026 READY-TO-WEAR RUNWAY COLLECTION AVAILABLE NOW',
  'SUMMER LINEN & SILK CAPSULE — LIMITED PRODUCTION DROP'
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode>(getGlobalCurrency());
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const { openCart, totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cycle announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOverlayOpen(false);
    setShowCurrencyDropdown(false);
  }, [location.pathname]);

  const handleCurrencyChange = (code: CurrencyCode) => {
    setGlobalCurrency(code);
    setCurrency(code);
    setShowCurrencyDropdown(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Collections', path: '/collections' },
    { name: 'Sale', path: '/sale', highlight: true },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0D0D0E] text-[#E5DEC8] text-[11px] font-medium tracking-[0.2em] uppercase py-2 px-4 border-b border-[#2A2A2D] relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-[#C5A880] font-semibold hover:text-white transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>{currency}</span>
            </button>

            {showCurrencyDropdown && (
              <div className="absolute left-0 top-full mt-2 bg-[#171719] border border-[#2A2A2E] shadow-2xl py-1 z-50 min-w-[90px] rounded-sm">
                {(['INR', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCurrencyChange(c)}
                    className={`block w-full text-left px-3 py-1.5 text-[10px] tracking-widest ${
                      currency === c ? 'text-[#C5A880] font-bold bg-white/5' : 'text-[#D8D2C7] hover:bg-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cycling announcement */}
          <div className="flex-1 text-center overflow-hidden h-4 flex items-center justify-center mx-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={announcementIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="inline-block truncate px-2 text-[10px] sm:text-[11px]"
              >
                {ANNOUNCEMENTS[announcementIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Top Right: Links */}
          <div className="hidden md:flex items-center space-x-4 text-[10px] text-[#A69F91]">
            <Link to="/about" className="hover:text-white transition-colors">ABOUT</Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">CONCIERGE</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E3DA] shadow-sm py-3.5'
            : 'bg-[#FAF8F5] border-b border-[#E8E3DA]/60 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-1.5 text-[#171719] hover:opacity-70 transition-opacity"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.18em] uppercase font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-1 transition-colors group ${
                    link.highlight
                      ? 'text-[#B43D3D] hover:text-[#8E2828] font-semibold'
                      : isActive
                      ? 'text-[#C5A880] font-semibold'
                      : 'text-[#171719] hover:text-[#C5A880]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                      isActive ? 'w-full bg-[#C5A880]' : 'w-0 bg-[#171719] group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Centered Brand Logo */}
          <div className="flex-1 text-center lg:flex-none">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.25em] text-[#0D0D0E] group-hover:text-[#C5A880] transition-colors">
                DROP<span className="font-sans font-bold text-lg sm:text-xl text-[#C5A880]">X</span>
              </span>
              <span className="block text-[8px] tracking-[0.45em] uppercase text-[#7A7670] -mt-1 font-medium">
                ATELIER
              </span>
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[#171719]">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOverlayOpen(true)}
              aria-label="Search clothing"
              className="p-1.5 hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest hidden xl:inline text-[#7A7670]">Search</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist with ${totalWishlist} items`}
              className="p-1.5 hover:text-[#C5A880] transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#0D0D0E] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              aria-label={`Open shopping cart with ${totalItems} items`}
              className="p-1.5 hover:text-[#C5A880] transition-colors relative group"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#171719] text-[#FAF8F5] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-[#C5A880] group-hover:text-[#0D0D0E] transition-colors">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
      />

      {/* Mobile Slide-out Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#0D0D0E]/60 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E8E3DA]">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-2xl tracking-[0.2em] text-[#0D0D0E]"
                  >
                    DROP<span className="text-[#C5A880] font-sans font-bold">X</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#7A7670] hover:text-[#171719]"
                    aria-label="Close navigation"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="py-6 space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2.5 text-base tracking-[0.2em] uppercase font-serif border-b border-[#E8E3DA]/40 ${
                        link.highlight ? 'text-[#B43D3D] font-bold' : 'text-[#171719]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#8C8880]" />
                    </Link>
                  ))}
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-xs tracking-[0.2em] uppercase text-[#7A7670]"
                  >
                    <span>About Atelier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-xs tracking-[0.2em] uppercase text-[#7A7670]"
                  >
                    <span>Concierge & Care</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Bottom Mobile Drawer Details */}
              <div className="pt-6 border-t border-[#E8E3DA]">
                <div className="flex items-center justify-between text-xs text-[#7A7670] mb-3">
                  <span>Selected Currency</span>
                  <div className="flex gap-2">
                    {(['INR', 'USD', 'EUR'] as CurrencyCode[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => handleCurrencyChange(c)}
                        className={`px-2 py-0.5 text-[10px] font-semibold border ${
                          currency === c ? 'bg-[#171719] text-white border-[#171719]' : 'border-[#D8D2C7]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-[#A69F91] uppercase tracking-widest text-center">
                  DROPX ATELIER • READY-TO-WEAR RETAIL
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
