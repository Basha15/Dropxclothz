import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#0D0D0E] text-[#FAF8F5] pt-16 pb-12 border-t border-[#232326]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#232326] text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1F1F23] flex items-center justify-center text-[#C5A880]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white tracking-wider uppercase text-[11px]">Worldwide Express Delivery</p>
              <p className="text-[#8C8880] text-[11px]">Insured and trackable premium door-to-door courier.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1F1F23] flex items-center justify-center text-[#C5A880]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white tracking-wider uppercase text-[11px]">30-Day Effortless Returns</p>
              <p className="text-[#8C8880] text-[11px]">Complimentary pickup and full refund guarantee.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1F1F23] flex items-center justify-center text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white tracking-wider uppercase text-[11px]">Certified Organic Fibers</p>
              <p className="text-[#8C8880] text-[11px]">Traceable cashmere, mulberry silk, and Supima cotton.</p>
            </div>
          </div>
        </div>

        {/* Newsletter & Editorial Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#232326]">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              NEWSLETTER SUBSCRIPTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light leading-snug">
              Receive private drop invitations, seasonal sales & runway previews.
            </h2>
            <p className="text-xs text-[#8E8A83] max-w-md leading-relaxed font-light">
              Join the DROPX community. We send select editorial capsules and exclusive subscriber perks.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {isSubscribed ? (
              <div className="p-4 bg-[#1A1A1D] border border-[#C5A880]/50 rounded-sm flex items-center gap-3 text-xs text-[#E8DEC8]">
                <Check className="w-5 h-5 text-[#C5A880]" />
                <span>You have been registered for exclusive fashion dispatches. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex border-b border-[#404044] focus-within:border-[#C5A880] transition-colors pb-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent text-sm py-2 text-[#FAF8F5] placeholder:text-[#6A6966] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#6A6966] font-light">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Multi-column navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-14 border-b border-[#232326] text-xs">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.25em] font-light uppercase text-[#FAF8F5]">
                DROP<span className="font-sans font-bold text-[#C5A880]">X</span>
              </span>
              <span className="block text-[8px] tracking-[0.4em] uppercase text-[#C5A880] -mt-1 font-semibold">
                ATELIER RETAIL
              </span>
            </Link>
            <p className="text-[#8E8A83] text-xs leading-relaxed max-w-xs font-light">
              International luxury clothing retail store. Designed for modern living with architectural silhouettes and uncompromising fabrics.
            </p>
          </div>

          {/* Men's categories */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8DEC8]">
              Men's Clothing
            </h4>
            <ul className="space-y-2 text-[#8E8A83]">
              <li><Link to="/men?category=t-shirts" className="hover:text-white transition-colors">T-Shirts & Tops</Link></li>
              <li><Link to="/men?category=shirts" className="hover:text-white transition-colors">Shirts & Overshirts</Link></li>
              <li><Link to="/men?category=polo-shirts" className="hover:text-white transition-colors">Polo Shirts</Link></li>
              <li><Link to="/men?category=jeans" className="hover:text-white transition-colors">Jeans & Denim</Link></li>
              <li><Link to="/men?category=trousers" className="hover:text-white transition-colors">Trousers & Chinos</Link></li>
              <li><Link to="/men?category=hoodies" className="hover:text-white transition-colors">Hoodies & Sweatshirts</Link></li>
              <li><Link to="/men?category=jackets" className="hover:text-white transition-colors">Jackets & Coats</Link></li>
              <li><Link to="/men?category=shorts" className="hover:text-white transition-colors">Shorts</Link></li>
            </ul>
          </div>

          {/* Women's categories */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8DEC8]">
              Women's Clothing
            </h4>
            <ul className="space-y-2 text-[#8E8A83]">
              <li><Link to="/women?category=dresses" className="hover:text-white transition-colors">Dresses & Gowns</Link></li>
              <li><Link to="/women?category=tops" className="hover:text-white transition-colors">Tops & Camisoles</Link></li>
              <li><Link to="/women?category=t-shirts" className="hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link to="/women?category=shirts" className="hover:text-white transition-colors">Shirts & Blouses</Link></li>
              <li><Link to="/women?category=jeans" className="hover:text-white transition-colors">Jeans & Denim</Link></li>
              <li><Link to="/women?category=trousers" className="hover:text-white transition-colors">Trousers</Link></li>
              <li><Link to="/women?category=skirts" className="hover:text-white transition-colors">Skirts</Link></li>
              <li><Link to="/women?category=jackets" className="hover:text-white transition-colors">Jackets & Blazers</Link></li>
              <li><Link to="/women?category=ethnic-wear" className="hover:text-white transition-colors">Ethnic Wear</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8DEC8]">
              Collections
            </h4>
            <ul className="space-y-2 text-[#8E8A83]">
              <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections?type=best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/collections?type=trending" className="hover:text-white transition-colors">Trending Now</Link></li>
              <li><Link to="/collections?type=summer-collection" className="hover:text-white transition-colors">Summer Collection</Link></li>
              <li><Link to="/collections?type=winter-collection" className="hover:text-white transition-colors">Winter Collection</Link></li>
              <li><Link to="/sale" className="text-[#C5A880] hover:text-white transition-colors font-medium">Curated Sale</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8DEC8]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-[#8E8A83]">
              <li><Link to="/about" className="hover:text-white transition-colors">About DROPX</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link to="/contact#shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact#faq" className="hover:text-white transition-colors">FAQ & Sizing</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Bag</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6A6966]">
          <p>© 2026 DROPX CLOTHES. ALL RIGHTS RESERVED. INTERNATIONAL FASHION RETAIL.</p>

          <div className="flex items-center space-x-6 text-[11px]">
            <Link to="/about" className="hover:text-[#A69F91] transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#A69F91] transition-colors">Terms of Sale</Link>
            <Link to="/about" className="hover:text-[#A69F91] transition-colors">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
