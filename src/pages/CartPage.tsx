import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Tag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from '../components/CheckoutModal';
import { formatPrice } from '../utils/currency';

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountCode,
    discountAmount,
    grandTotal,
    applyPromoCode,
    removePromoCode,
    clearCart,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const shippingCost = subtotal > 5000 || subtotal === 0 ? 0 : 499;
  const finalPayable = grandTotal + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, success: res.success });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-[#FAF8F5]">
        <div className="w-20 h-20 rounded-full bg-[#F0ECE1] flex items-center justify-center text-[#7A7670] mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-2">
          WARDROBE BAG
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171719]">Your Shopping Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-[#7A7670] mt-3 max-w-md mx-auto leading-relaxed">
          You haven't selected any garments yet. Discover our latest collections, runway silk dresses, cashmere knitwear, and structured outerwear.
        </p>
        <Link
          to="/shop"
          className="mt-8 px-8 py-3.5 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0D0D0E] text-xs uppercase tracking-widest font-medium transition-colors shadow-lg"
        >
          Explore Ready-To-Wear
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb / Back Link */}
      <div className="mb-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A7670] hover:text-[#171719]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-[#E8E4DC] pb-6 mb-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            CHECKOUT READY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171719] mt-1">
            Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#8E2828] hover:underline uppercase tracking-wider mt-3 md:mt-0"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-[#E8E4DC]">
            {items.map((item) => (
              <div key={item.id} className="py-6 first:pt-0 flex flex-col sm:flex-row gap-6">
                <Link
                  to={`/product/${item.product.id}`}
                  className="w-full sm:w-32 aspect-[3/4] bg-[#F0ECE1] overflow-hidden rounded-sm flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-semibold">
                          {item.product.gender} • {item.product.subCategory}
                        </span>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-serif text-lg sm:text-xl text-[#171719] hover:text-[#C5A880] transition-colors block mt-0.5"
                        >
                          {item.product.name}
                        </Link>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9E9B95] hover:text-[#8E2828] p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs text-[#7A7670]">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                      <span>•</span>
                      <span>Size: <strong className="text-[#171719]">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Unit: {formatPrice(item.product.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F0ECE1]">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D8D2C7] bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-[#F5F2EB] text-[#171719] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-semibold text-[#171719]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-[#F5F2EB] text-[#171719] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-serif text-lg font-semibold text-[#171719]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#F7F4EE] border border-[#E8E4DC] p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="font-serif text-2xl text-[#171719] pb-4 border-b border-[#E8E4DC]">
              Order Summary
            </h2>

            {/* Promo code form */}
            {discountCode ? (
              <div className="flex items-center justify-between bg-white border border-[#D8D2C7] px-3.5 py-2.5 text-xs">
                <span className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Tag className="w-4 h-4" /> <strong>{discountCode}</strong> applied
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-[#8E2828] hover:underline text-xs"
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
                  placeholder="Promo Code (e.g. DROPX10)"
                  className="flex-1 bg-white border border-[#D8D2C7] px-3 py-2 text-xs uppercase tracking-wider text-[#171719] focus:outline-none focus:border-[#171719]"
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
                className={`text-xs ${
                  promoMessage.success ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {/* Financial breakdown */}
            <div className="space-y-3 text-xs text-[#7A7670]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#171719]">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promotional Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier Shipping</span>
                <span className="font-semibold text-[#171719]">
                  {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#171719] pt-4 border-t border-[#E8E4DC]">
                <span>Total Amount</span>
                <span>{formatPrice(finalPayable)}</span>
              </div>
            </div>

            {/* Checkout action */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-4 bg-[#171719] hover:bg-[#C5A880] text-white hover:text-[#0D0D0E] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-xl flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C8880] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Secure checkout. 30-day effortless returns.</span>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};
