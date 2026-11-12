import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useQuickView } from '../context/QuickViewContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85';

export const QuickViewModal: React.FC = () => {
  const { activeProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (activeProduct) {
      setActiveImageIdx(0);
      setSelectedColorIdx(0);
      setSelectedSize(activeProduct.sizes[0] || 'M');
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [activeProduct]);

  if (!activeProduct) return null;

  const isWishlisted = isInWishlist(activeProduct.id);
  const selectedColor = activeProduct.colors[selectedColorIdx] || activeProduct.colors[0];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(activeProduct, selectedColor, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      closeQuickView();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0D0E]/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#FAF8F5] w-full max-w-4xl border border-[#E8E3DA] shadow-2xl overflow-hidden my-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 text-[#7A7670] hover:text-[#171719] bg-white/90 rounded-full backdrop-blur-sm transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Side */}
            <div className="relative bg-[#F0ECE1] flex flex-col justify-between">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={activeProduct.images[activeImageIdx] || activeProduct.images[0] || FALLBACK_IMAGE}
                  alt={activeProduct.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails row */}
              {activeProduct.images.length > 1 && (
                <div className="flex gap-2 p-3 bg-white/80 backdrop-blur-sm border-t border-[#E8E3DA] overflow-x-auto">
                  {activeProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`w-14 h-16 flex-shrink-0 overflow-hidden border transition-all ${
                        activeImageIdx === i ? 'border-[#171719] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block mb-1">
                  {activeProduct.gender} • {activeProduct.subCategory.replace('-', ' ')}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#171719] font-normal leading-tight">
                  {activeProduct.name}
                </h2>
                <p className="text-xs text-[#7A7670] mt-1">{activeProduct.subtitle}</p>

                {/* Price */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-serif text-2xl font-semibold text-[#171719]">
                    {formatPrice(activeProduct.price)}
                  </span>
                  {activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price && (
                    <span className="text-sm text-[#8C8880] line-through">
                      {formatPrice(activeProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5A5852] mt-4 line-clamp-3 leading-relaxed">
                  {activeProduct.description}
                </p>

                {/* Color swatches */}
                <div className="mt-6">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#171719] block mb-2">
                    Color: <strong className="text-[#171719]">{selectedColor.name}</strong>
                  </span>
                  <div className="flex gap-2">
                    {activeProduct.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          selectedColorIdx === idx
                            ? 'border-[#171719] scale-110 ring-2 ring-[#171719]'
                            : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mt-5">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#171719] block mb-2">
                    Select Size
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[40px] h-9 px-3 text-xs border font-medium transition-colors ${
                          selectedSize === size
                            ? 'bg-[#171719] text-white border-[#171719]'
                            : 'border-[#D8D2C7] hover:border-[#171719] text-[#171719]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-[#E8E3DA] mt-6 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#171719] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Wardrobe</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(activeProduct)}
                    className={`p-3.5 border transition-colors ${
                      isWishlisted
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]'
                        : 'border-[#D8D2C7] text-[#171719] hover:border-[#171719]'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${activeProduct.id}`}
                  onClick={closeQuickView}
                  className="block text-center text-xs text-[#7A7670] hover:text-[#171719] tracking-wider uppercase underline underline-offset-4"
                >
                  View Full Product Details & Specifications →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
