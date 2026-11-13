import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, Truck, Smartphone, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, grandTotal, discountAmount, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState(() => {
    try {
      const stored = localStorage.getItem('dropx_auth_user');
      if (stored) {
        const u = JSON.parse(stored);
        const [first, ...rest] = (u.name || 'Alexandre Laurent').split(' ');
        return {
          firstName: first || 'Alexandre',
          lastName: rest.join(' ') || 'Laurent',
          email: u.email || 'customer@dropx.com',
          address: '88 Fashion Avenue, Suite 4B',
          city: 'New York',
          postalCode: '10018',
          country: 'United States',
          paymentMethod: 'card',
          cardNumber: '•••• •••• •••• 4242',
          cardExp: '12/28',
          cardCvc: '•••'
        };
      }
    } catch {}
    return {
      firstName: 'Alexandre',
      lastName: 'Laurent',
      email: 'customer@dropx.com',
      address: '88 Fashion Avenue, Suite 4B',
      city: 'New York',
      postalCode: '10018',
      country: 'United States',
      paymentMethod: 'card',
      cardNumber: '•••• •••• •••• 4242',
      cardExp: '12/28',
      cardCvc: '•••'
    };
  });
  const [orderNumber, setOrderNumber] = useState('');

  const shippingCost = subtotal > 5000 ? 0 : 499;
  const finalPayable = grandTotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const generatedOrder = 'DX-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrder);
      setStep(3);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#0D0D0E', '#FAF8F5', '#E5DEC8']
        });
      } catch (err) {
        console.error(err);
      }

      clearCart();
    }
  };

  const handleFinish = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0D0E]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#FAF8F5] w-full max-w-2xl border border-[#E8E3DA] shadow-2xl p-6 sm:p-10 my-8"
      >
        {/* Close Button */}
        <button
          onClick={step === 3 ? handleFinish : onClose}
          className="absolute top-6 right-6 p-2 text-[#7A7670] hover:text-[#171719] transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Steps */}
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            DROPX SECURE CHECKOUT
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#171719] mt-1 font-normal">
            {step === 1 && 'Shipping & Delivery Address'}
            {step === 2 && 'Payment & Final Authorization'}
            {step === 3 && 'Order Confirmed & Ready to Ship'}
          </h2>

          {/* Stepper indicators */}
          {step < 3 && (
            <div className="flex items-center gap-3 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 1 ? 'bg-[#171719] text-white' : 'bg-[#E8E3DA] text-[#7A7670]'
                }`}>1</span>
                <span className={step === 1 ? 'font-semibold text-[#171719]' : 'text-[#7A7670]'}>Delivery</span>
              </div>
              <div className="w-8 h-[1px] bg-[#E8E3DA]" />
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 2 ? 'bg-[#171719] text-white' : 'bg-[#E8E3DA] text-[#7A7670]'
                }`}>2</span>
                <span className={step === 2 ? 'font-semibold text-[#171719]' : 'text-[#7A7670]'}>Payment</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 1: Shipping Address */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-[#E8E3DA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#171719]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-[#E8E3DA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#171719]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-white border border-[#E8E3DA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#171719]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full bg-white border border-[#E8E3DA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#171719]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-[#E8E3DA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#171719]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white border border-[#E8E3DA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#171719]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#E8E3DA] px-3.5 py-2.5 text-xs text-[#171719] focus:outline-none focus:border-[#171719]"
                >
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="United Arab Emirates">UAE</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            {/* Courier Selection */}
            <div className="pt-3">
              <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-2">Courier Option</label>
              <div className="border border-[#171719] bg-white p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#171719]" />
                  <div>
                    <p className="text-xs font-semibold text-[#171719]">Express Insured Courier</p>
                    <p className="text-[11px] text-[#7A7670]">Signature required, climate-regulated wardrobe pack</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#171719]">
                  {shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}
                </span>
              </div>
            </div>

            {/* Order summary mini bar */}
            <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
              <span className="text-[#7A7670]">Payable Total:</span>
              <span className="font-serif text-lg font-bold text-[#171719]">{formatPrice(finalPayable)}</span>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0D0D0E] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment Authorization */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="space-y-2.5">
              <label
                className={`flex items-center justify-between p-3.5 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'card' ? 'border-[#171719] bg-white' : 'border-[#E8E3DA] bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="accent-[#171719]"
                  />
                  <span className="text-xs font-medium text-[#171719]">International Credit / Debit Card</span>
                </div>
                <CreditCard className="w-4 h-4 text-[#7A7670]" />
              </label>

              <label
                className={`flex items-center justify-between p-3.5 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'applepay' ? 'border-[#171719] bg-white' : 'border-[#E8E3DA] bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="applepay"
                    checked={formData.paymentMethod === 'applepay'}
                    onChange={handleInputChange}
                    className="accent-[#171719]"
                  />
                  <span className="text-xs font-medium text-[#171719]">Apple Pay / Google Pay / UPI</span>
                </div>
                <Smartphone className="w-4 h-4 text-[#7A7670]" />
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="p-4 bg-white border border-[#E8E3DA] space-y-3 mt-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    readOnly
                    className="w-full bg-[#FAF8F5] border border-[#E8E3DA] px-3.5 py-2 text-xs text-[#171719] font-mono tracking-widest"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Expiry</label>
                    <input
                      type="text"
                      value={formData.cardExp}
                      readOnly
                      className="w-full bg-[#FAF8F5] border border-[#E8E3DA] px-3.5 py-2 text-xs text-[#171719] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      value={formData.cardCvc}
                      readOnly
                      className="w-full bg-[#FAF8F5] border border-[#E8E3DA] px-3.5 py-2 text-xs text-[#171719] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-[11px] text-[#7A7670] bg-[#F3EFE8] p-3 border border-[#E8E3DA]">
              <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Simulated 256-bit SSL encrypted checkout session. No real funds are billed.</span>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3.5 px-6 border border-[#171719] text-xs uppercase tracking-widest text-[#171719] hover:bg-[#171719] hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0D0D0E] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Authorize & Place Order ({formatPrice(finalPayable)})</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block">
                ORDER CONFIRMED
              </span>
              <h3 className="font-serif text-3xl text-[#171719] mt-1">Thank you for your order</h3>
              <p className="text-xs text-[#7A7670] mt-2 max-w-md mx-auto">
                Your order has been confirmed and is being carefully prepared for express dispatch.
              </p>
            </div>

            <div className="bg-white border border-[#E8E3DA] p-4 text-xs max-w-sm mx-auto text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#7A7670]">Order Number:</span>
                <span className="font-mono font-semibold text-[#171719]">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7670]">Recipient:</span>
                <span className="font-medium text-[#171719]">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7670]">Destination:</span>
                <span className="font-medium text-[#171719]">{formData.city}, {formData.country}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 bg-[#171719] hover:bg-[#C5A880] text-white hover:text-[#171719] text-xs uppercase tracking-widest font-medium transition-colors inline-block"
            >
              Continue Exploring Collection
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
