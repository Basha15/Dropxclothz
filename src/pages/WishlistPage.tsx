import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach((product) => {
      const defaultColor = product.colors[0];
      const defaultSize = product.sizes[0] || 'M';
      addToCart(product, defaultColor, defaultSize, 1);
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E8E3DA] pb-8 mb-10 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              SAVED PIECES ARCHIVE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#171719] mt-2 font-normal">
              Your Saved Wardrobe ({wishlist.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7670] mt-1 font-light">
              Carefully curated pieces retained for your discerning consideration.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="text-xs uppercase tracking-wider text-[#8A2525] hover:underline"
              >
                Clear All
              </button>
              <button
                onClick={handleMoveAllToBag}
                className="px-6 py-3 bg-[#171719] hover:bg-black text-[#FAF8F5] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#E8E3DA] p-8 max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#F0ECE1] flex items-center justify-center mx-auto mb-4 text-[#7A7670]">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-[#171719]">Your wishlist is unwritten</h2>
            <p className="text-xs text-[#7A7670] mt-2 max-w-sm mx-auto leading-relaxed">
              Explore our current runway editions and click the heart icon on any piece you wish to save for your personal archive.
            </p>
            <div className="mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171719] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
              >
                <span>Discover Creations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
