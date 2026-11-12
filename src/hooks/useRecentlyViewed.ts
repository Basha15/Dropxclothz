import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { PRODUCTS } from '../data/products';

const STORAGE_KEY = 'dropx_recently_viewed';

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds));
    } catch (e) {
      console.error(e);
    }
  }, [recentIds]);

  const addRecentlyViewed = (productId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const recentProducts: Product[] = recentIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return { recentProducts, addRecentlyViewed };
};
