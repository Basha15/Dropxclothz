import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useQuickView } from '../context/QuickViewContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85';

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, selectedColor, defaultSize, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const primaryImage = product.images[0] || FALLBACK_IMAGE;
  const secondaryImage = product.images[1] || product.images[0] || FALLBACK_IMAGE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative flex flex-col font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0ECE1] rounded-sm shadow-sm group-hover:shadow-md transition-shadow">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Primary image */}
          <img
            src={primaryImage}
            alt={product.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Secondary image on hover */}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.tags.includes('new') && (
            <span className="bg-[#171719] text-[#FAF8F5] text-[10px] tracking-[0.2em] font-medium uppercase px-2.5 py-1">
              NEW ARRIVAL
            </span>
          )}
          {product.tags.includes('bestseller') && (
            <span className="bg-[#C5A880] text-[#171719] text-[10px] tracking-[0.2em] font-semibold uppercase px-2.5 py-1">
              BEST SELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#8E2828] text-white text-[10px] tracking-[0.15em] font-medium uppercase px-2 py-0.5">
              -{discountPercent}% OFF
            </span>
          )}
          {product.tags.includes('exclusive') && (
            <span className="bg-[#0D0D0E]/80 backdrop-blur-sm text-[#E5DEC8] text-[9px] tracking-[0.2em] font-medium uppercase px-2 py-0.5 border border-[#C5A880]/40">
              EXCLUSIVE
            </span>
          )}
        </div>

        {/* Wishlist Button (Always visible on mobile, hover on desktop) */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-all duration-300 backdrop-blur-md ${
            isWishlisted
              ? 'bg-[#171719] text-[#C5A880] shadow-md'
              : 'bg-white/80 md:bg-white/60 md:opacity-0 md:group-hover:opacity-100 text-[#171719] hover:bg-white hover:text-red-600 shadow-sm'
          }`}
        >
          <motion.div whileTap={{ scale: 0.75 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
          </motion.div>
        </button>

        {/* Action Bar (Slide up on hover) */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-3 px-3 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0D0D0E] text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>

          <button
            onClick={handleQuickViewClick}
            aria-label="Quick view"
            className="p-3 bg-white hover:bg-[#FAF8F5] text-[#171719] transition-colors duration-200 shadow-lg flex items-center justify-center"
            title="Quick Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3.5 pb-2 flex flex-col flex-1">
        {/* Colors Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'border-[#171719] scale-110 ring-1 ring-[#171719]'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Color ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#8C8880] ml-1">
              +{product.colors.length} colors
            </span>
          </div>
        )}

        {/* Category / Subtitle */}
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C8880] font-medium">
          {product.gender} • {product.subCategory.replace('-', ' ')}
        </span>

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="font-serif text-[15px] sm:text-base text-[#171719] hover:text-[#C5A880] transition-colors mt-1 line-clamp-1 font-normal tracking-wide"
        >
          {product.name}
        </Link>

        {/* Price & Discounts */}
        <div className="mt-1.5 flex items-center gap-2 text-sm">
          <span className="font-semibold text-[#171719] tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-xs text-[#8C8880] line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-[10px] font-semibold text-[#8E2828] uppercase tracking-wider">
                SAVE {discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
