import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  Globe,
  User,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  Package,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchOverlay } from './SearchOverlay';
import { getGlobalCurrency, setGlobalCurrency, CurrencyCode } from '../utils/currency';

interface AuthUser {
  name: string;
  email: string;
}

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

  // Authentication states
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('dropx_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setAuthError('');
    setAuthSuccessMsg('');
    setIsAuthOpen(true);
    setShowUserDropdown(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginEmail || !loginPassword) {
      setAuthError('Please provide both email and password.');
      return;
    }
    if (!loginEmail.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (loginPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    const userName = loginEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    const user: AuthUser = {
      name: formattedName || 'DropX VIP',
      email: loginEmail
    };

    if (rememberMe) {
      localStorage.setItem('dropx_auth_user', JSON.stringify(user));
    }
    setCurrentUser(user);
    setAuthSuccessMsg(`Welcome back, ${user.name}!`);
    setTimeout(() => {
      setIsAuthOpen(false);
      setAuthSuccessMsg('');
      setLoginPassword('');
    }, 900);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setAuthError('Please complete all required fields.');
      return;
    }
    if (!signupEmail.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }
    if (signupPassword !== signupConfirm) {
      setAuthError('Passwords do not match.');
      return;
    }

    const user: AuthUser = {
      name: signupName.trim(),
      email: signupEmail.trim()
    };
    localStorage.setItem('dropx_auth_user', JSON.stringify(user));
    setCurrentUser(user);
    setAuthSuccessMsg(`Welcome to DropX, ${user.name}!`);
    setTimeout(() => {
      setIsAuthOpen(false);
      setAuthSuccessMsg('');
      setSignupPassword('');
      setSignupConfirm('');
    }, 900);
  };

  const handleSocialLogin = (provider: string) => {
    const user: AuthUser = {
      name: 'Alexandre Laurent',
      email: 'alexandre@dropx.com'
    };
    localStorage.setItem('dropx_auth_user', JSON.stringify(user));
    setCurrentUser(user);
    setAuthSuccessMsg(`Connected via ${provider}. Welcome!`);
    setTimeout(() => {
      setIsAuthOpen(false);
      setAuthSuccessMsg('');
    }, 700);
  };

  const handleSignOut = () => {
    localStorage.removeItem('dropx_auth_user');
    setCurrentUser(null);
    setShowUserDropdown(false);
  };

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
                CLOTHING
              </span>
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-[#171719]">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOverlayOpen(true)}
              aria-label="Search clothing"
              className="p-1.5 hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
            >
              <Search className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest hidden xl:inline text-[#7A7670]">Search</span>
            </button>

            {/* User Account / Login & Signup Trigger */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-1 text-[#171719] hover:text-[#C5A880] transition-colors group"
                  aria-label="User Account Menu"
                >
                  <div className="w-7 h-7 rounded-full bg-[#171719] text-[#E8DEC8] flex items-center justify-center text-xs font-semibold uppercase group-hover:bg-[#C5A880] group-hover:text-[#0D0D0E] transition-colors">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-medium hidden md:inline max-w-[90px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="flex items-center gap-1.5 p-1.5 hover:text-[#C5A880] transition-colors group"
                  aria-label="Sign In or Create Account"
                >
                  <User className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-widest hidden md:inline text-[#7A7670] group-hover:text-[#C5A880]">
                    Sign In
                  </span>
                </button>
              )}

              {/* User Logged-in Dropdown Menu */}
              {showUserDropdown && currentUser && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-[#FAF8F5] border border-[#E8E3DA] shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-[#E8E3DA]/80">
                    <p className="text-[11px] uppercase tracking-wider text-[#C5A880] font-semibold">Signed in as</p>
                    <p className="text-xs font-medium text-[#171719] truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-[#7A7670] truncate">{currentUser.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowOrdersModal(true);
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-[#171719] hover:bg-[#F0ECE1] flex items-center gap-2.5 transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#7A7670]" />
                      <span>My Orders</span>
                    </button>
                    <Link
                      to="/wishlist"
                      onClick={() => setShowUserDropdown(false)}
                      className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-[#171719] hover:bg-[#F0ECE1] flex items-center gap-2.5 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-[#7A7670]" />
                      <span>Saved Wishlist ({totalWishlist})</span>
                    </Link>
                  </div>
                  <div className="pt-1 border-t border-[#E8E3DA]/80">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-[#B43D3D] hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                  {/* Mobile User Profile Button */}
                  <div className="p-3 bg-[#F0ECE1] border border-[#E8E3DA] mb-4">
                    {currentUser ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#171719] text-[#E8DEC8] flex items-center justify-center font-bold text-sm">
                            {currentUser.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#171719]">{currentUser.name}</p>
                            <p className="text-[10px] text-[#7A7670]">{currentUser.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="text-[10px] uppercase tracking-wider text-[#B43D3D] font-semibold hover:underline"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-[#171719] font-medium">
                          <User className="w-4 h-4 text-[#C5A880]" />
                          <span>Account Access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              handleOpenAuth('login');
                            }}
                            className="px-3 py-1 bg-[#171719] text-white text-[10px] uppercase tracking-widest font-medium"
                          >
                            Sign In
                          </button>
                          <button
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              handleOpenAuth('signup');
                            }}
                            className="px-2.5 py-1 border border-[#171719] text-[#171719] text-[10px] uppercase tracking-widest font-medium"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

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
                    <span>About DropX</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-xs tracking-[0.2em] uppercase text-[#7A7670]"
                  >
                    <span>Customer Concierge & Care</span>
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
                  DROPX • READY-TO-WEAR CLOTHING
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auth Modal (Login / Sign Up) */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0D0E]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative bg-[#FAF8F5] w-full max-w-md border border-[#E8E3DA] shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-[#7A7670] hover:text-[#171719] transition-colors"
                aria-label="Close Authentication Dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Brand Header */}
              <div className="text-center mb-6">
                <span className="font-serif text-2xl tracking-[0.25em] text-[#0D0D0E]">
                  DROP<span className="text-[#C5A880] font-sans font-bold">X</span>
                </span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A7670] mt-1 font-medium">
                  {authMode === 'login' ? 'Client Identification' : 'Member Registration'}
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="grid grid-cols-2 border-b border-[#E8E3DA] mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className={`py-2.5 text-xs uppercase tracking-widest font-semibold transition-all relative ${
                    authMode === 'login' ? 'text-[#171719]' : 'text-[#7A7670] hover:text-[#171719]'
                  }`}
                >
                  Sign In
                  {authMode === 'login' && (
                    <motion.div layoutId="authTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C5A880]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthError('');
                  }}
                  className={`py-2.5 text-xs uppercase tracking-widest font-semibold transition-all relative ${
                    authMode === 'signup' ? 'text-[#171719]' : 'text-[#7A7670] hover:text-[#171719]'
                  }`}
                >
                  Create Account
                  {authMode === 'signup' && (
                    <motion.div layoutId="authTabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C5A880]" />
                  )}
                </button>
              </div>

              {/* Status alerts */}
              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                  {authError}
                </div>
              )}
              {authSuccessMsg && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 rounded-sm">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              {/* Login Form */}
              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5A5852] font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="client@domain.com"
                      required
                      className="w-full bg-white border border-[#DCD6CA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] uppercase tracking-wider text-[#5A5852] font-semibold">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset instructions will be sent to your email address.')}
                        className="text-[10px] text-[#C5A880] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-white border border-[#DCD6CA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#C5A880] transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7670] hover:text-[#171719]"
                        aria-label="Toggle password view"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#171719] rounded cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-xs text-[#7A7670] cursor-pointer">
                      Remember this browser
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#171719] hover:bg-[#C5A880] text-white hover:text-[#171719] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>

                  {/* Social Login options */}
                  <div className="pt-4 border-t border-[#E8E3DA]">
                    <p className="text-[10px] uppercase tracking-wider text-center text-[#7A7670] mb-3">
                      Or express sign in with
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Google')}
                        className="py-2.5 px-3 bg-white border border-[#DCD6CA] hover:bg-[#F5F2EA] text-[11px] font-medium text-[#171719] flex items-center justify-center gap-2 transition-colors"
                      >
                        <span className="font-bold text-blue-600">G</span> Google
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Apple')}
                        className="py-2.5 px-3 bg-white border border-[#DCD6CA] hover:bg-[#F5F2EA] text-[11px] font-medium text-[#171719] flex items-center justify-center gap-2 transition-colors"
                      >
                        <span className="font-serif font-bold text-black"></span> Apple ID
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5A5852] font-semibold mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="e.g. Alexandre Laurent"
                      required
                      className="w-full bg-white border border-[#DCD6CA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5A5852] font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="client@domain.com"
                      required
                      className="w-full bg-white border border-[#DCD6CA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5A5852] font-semibold mb-1">
                      Create Password (min. 6 characters)
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-white border border-[#DCD6CA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#C5A880] transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7670] hover:text-[#171719]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5A5852] font-semibold mb-1">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupConfirm}
                      onChange={(e) => setSignupConfirm(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-white border border-[#DCD6CA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <p className="text-[10px] text-[#7A7670] leading-relaxed">
                    By creating an account, you agree to DropX's Terms of Service and Privileged Members Privacy Policy.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#171719] hover:bg-[#C5A880] text-white hover:text-[#171719] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span>Create DropX Account</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Orders History Modal */}
      <AnimatePresence>
        {showOrdersModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0D0E]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-[#FAF8F5] w-full max-w-xl border border-[#E8E3DA] shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setShowOrdersModal(false)}
                className="absolute top-5 right-5 p-1.5 text-[#7A7670] hover:text-[#171719]"
                aria-label="Close orders modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-[#C5A880]" />
                <h3 className="font-serif text-2xl text-[#171719]">Your Order History</h3>
              </div>
              <p className="text-xs text-[#7A7670] mb-6">
                Showing recorded orders for <span className="font-medium text-[#171719]">{currentUser?.email}</span>
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-white border border-[#E8E3DA] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#171719]">#DX-849201</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-semibold uppercase tracking-wider">
                      Delivered
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5852]">
                    French Terry Luxury Heavyweight Hoodie (Anthracite Grey, Size L)
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE1] text-[11px] text-[#7A7670]">
                    <span>Dispatched Nov 08, 2026</span>
                    <span className="font-semibold text-[#171719]">Total: ₹9,900 / $119</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-[#E8E3DA] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#171719]">#DX-739104</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold uppercase tracking-wider">
                      In Transit
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5852]">
                    Heavyweight Boxy Supima T-Shirt (Onyx Black, Size M)
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE1] text-[11px] text-[#7A7670]">
                    <span>FedEx Priority Tracking: 849102847</span>
                    <span className="font-semibold text-[#171719]">Total: ₹4,800 / $58</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex justify-end">
                <button
                  onClick={() => setShowOrdersModal(false)}
                  className="px-6 py-2.5 bg-[#171719] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#C5A880] hover:text-[#171719] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
