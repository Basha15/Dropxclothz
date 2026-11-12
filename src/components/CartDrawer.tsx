import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, Shield, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CheckoutModal } from './CheckoutModal';
import { formatPrice } from '../utils/currency';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    discountCode, 
    discountAmount, 
    grandTotal, 
    applyPromoCode, 
    removePromoCode 
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, success: res.success });
  };

  const handleCheckoutClick = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#0D0D0E]/60 backdrop-blur-sm"
              onClick={closeCart}
            />

            {/* Slide-over panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E8E3DA] shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#E8E3DA] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-5 h-5 text-[#171719]" />
                    <h2 className="font-serif text-xl sm:text-2xl text-[#171719] tracking-tight">
                      Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
                    </h2>
                  </div>
                  <button
                    onClick={closeCart}
                    aria-label="Close cart"
                    className="p-1.5 text-[#7A7670] hover:text-[#171719] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="px-6 py-3 bg-[#F3EFE8] border-b border-[#E8E3DA] text-xs">
                  {remainingForFreeShipping > 0 ? (
                    <p className="text-[#5A5852] mb-1.5">
                      Add <span className="font-semibold text-[#171719]">{formatPrice(remainingForFreeShipping)}</span> more for{' '}
                      <span className="font-semibold text-[#171719]">Complimentary Insured Courier</span>.
                    </p>
                  ) : (
                    <p className="text-[#171719] font-medium flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      You qualify for Complimentary Express Delivery.
                    </p>
                  )}
                  <div className="w-full bg-[#E0D8CB] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#171719] h-full transition-all duration-500 ease-out"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List or Empty State */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[#F0ECE1] flex items-center justify-center mb-4 text-[#7A7670]">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-xl text-[#171719]">Your bag is empty</h3>
                      <p className="text-xs text-[#7A7670] max-w-xs mt-1 mb-6">
                        Discover new arrivals, silk dresses, cashmere knitwear, and sculpted outerwear pieces.
                      </p>
                      <Link
                        to="/shop"
                        onClick={closeCart}
                        className="px-6 py-3 bg-[#171719] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#C5A880] hover:text-[#171719] transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-5 divide-y divide-[#E8E3DA]">
                      {items.map((item) => (
                        <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={closeCart}
                            className="w-20 h-26 flex-shrink-0 bg-[#F0ECE1] overflow-hidden rounded-sm"
                          >
                            <img
                              src={item.product.images[0] || FALLBACK_IMAGE}
                              alt={item.product.name}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                              }}
                              className="w-full h-full object-cover"
                            />
                          </Link>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <Link
                                  to={`/product/${item.product.id}`}
                                  onClick={closeCart}
                                  className="text-xs font-semibold text-[#171719] hover:text-[#C5A880] transition-colors line-clamp-1"
                                >
                                  {item.product.name}
                                </Link>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  aria-label="Remove item"
                                  className="text-[#9E9B95] hover:text-[#8A2525] transition-colors p-0.5"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex items-center gap-2 mt-1 text-[11px] text-[#7A7670]">
                                <span className="flex items-center gap-1">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                                    style={{ backgroundColor: item.selectedColor.hex }}
                                  />
                                  {item.selectedColor.name}
                                </span>
                                <span>•</span>
                                <span>Size: {item.selectedSize}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity buttons */}
                              <div className="flex items-center border border-[#E8E3DA] bg-white text-xs">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-1.5 hover:bg-[#F5F2EB] text-[#171719] transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-3 font-medium text-[#171719]">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-1.5 hover:bg-[#F5F2EB] text-[#171719] transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-xs font-semibold text-[#171719]">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer with Subtotal, Promo, Checkout */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-[#E8E3DA] bg-[#FAF8F5] space-y-4">
                    {/* Promo code form */}
                    {discountCode ? (
                      <div className="flex items-center justify-between bg-[#EFECE6] px-3 py-2 text-xs">
                        <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                          <Tag className="w-3.5 h-3.5" /> Code <strong>{discountCode}</strong> applied
                        </span>
                        <button
                          onClick={removePromoCode}
                          className="text-[#8A2525] hover:underline text-[11px]"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="Promo code (e.g. DROPX10)"
                          className="flex-1 bg-white border border-[#E8E3DA] px-3 py-2 text-xs uppercase tracking-wider text-[#171719] focus:outline-none focus:border-[#171719]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#171719] hover:bg-[#C5A880] text-white hover:text-[#171719] text-xs uppercase tracking-wider font-medium transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {promoMessage && (
                      <p
                        className={`text-[11px] ${
                          promoMessage.success ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {promoMessage.text}
                      </p>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-[#7A7670] pt-1">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-medium text-[#171719]">{formatPrice(subtotal)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-medium">
                          <span>Special Discount</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Courier Delivery</span>
                        <span className="font-medium text-[#171719]">
                          {subtotal >= freeShippingThreshold ? 'Complimentary' : formatPrice(499)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-[#171719] pt-2 border-t border-[#E8E3DA]">
                        <span>Estimated Total</span>
                        <span>{formatPrice(grandTotal + (subtotal >= freeShippingThreshold ? 0 : 499))}</span>
                      </div>
                    </div>

                    {/* Action buttons: Checkout + View Full Bag */}
                    <div className="space-y-2">
                      <button
                        onClick={handleCheckoutClick}
                        className="w-full py-3.5 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#171719] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
                      >
                        <span>Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <Link
                        to="/cart"
                        onClick={closeCart}
                        className="block w-full text-center py-2.5 border border-[#171719] text-[#171719] hover:bg-[#171719] hover:text-white text-xs uppercase tracking-widest font-medium transition-colors"
                      >
                        View Full Bag Details
                      </Link>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-[10px] text-[#8E8A83] pt-1 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Insured Transit
                      </span>
                      <span>•</span>
                      <span>Complimentary 30-Day Returns</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};
