import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, ProductColor } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountCode: string;
  discountPercent: number;
  discountAmount: number;
  totalOriginal: number;
  totalSavings: number;
  grandTotal: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'dropx_cart_v2';
const PROMO_KEY = 'dropx_promo_v2';

const VALID_PROMOS: Record<string, number> = {
  'DROPX10': 10,
  'LUXURY20': 20,
  'WELCOME15': 15,
  'FIRSTDROP': 15,
  'ARCHIVE25': 25,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [discountCode, setDiscountCode] = useState<string>(() => {
    return localStorage.getItem(PROMO_KEY) || '';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    if (discountCode) {
      localStorage.setItem(PROMO_KEY, discountCode);
    } else {
      localStorage.removeItem(PROMO_KEY);
    }
  }, [discountCode]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem: CartItem = {
        id: itemId,
        product,
        selectedColor: color,
        selectedSize: size,
        quantity,
      };
      setLastAddedItem(newItem);
      return [...prev, newItem];
    });
    setIsOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (VALID_PROMOS[normalized]) {
      setDiscountCode(normalized);
      return { success: true, message: `Promo code ${normalized} applied! ${VALID_PROMOS[normalized]}% discount.` };
    }
    return { success: false, message: 'Invalid promo code. Try DROPX10 or LUXURY20.' };
  };

  const removePromoCode = () => {
    setDiscountCode('');
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalOriginal = items.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const discountPercent = VALID_PROMOS[discountCode] || 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalSavings = (totalOriginal - subtotal) + discountAmount;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountCode,
        discountPercent,
        discountAmount,
        totalOriginal,
        totalSavings,
        grandTotal,
        applyPromoCode,
        removePromoCode,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
