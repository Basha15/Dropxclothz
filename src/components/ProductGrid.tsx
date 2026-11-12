import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Grid2X2, 
  Grid3X3, 
  LayoutGrid, 
  Check, 
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { formatPrice } from '../utils/currency';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  defaultGender?: 'all' | 'men' | 'women';
  defaultCategory?: string;
  defaultCollection?: string;
  hideGenderFilter?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  defaultGender = 'all',
  defaultCategory = 'all',
  defaultCollection = 'all',
  hideGenderFilter = false,
}) => {
  // Filters state
  const [selectedGender, setSelectedGender] = useState<string>(defaultGender);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(defaultCollection);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available unique options
  const allSubCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.subCategory) set.add(p.subCategory);
    });
    return Array.from(set);
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setSelectedGender(defaultGender);
    setSelectedCategory(defaultCategory);
    setSelectedCollection(defaultCollection);
    setSelectedSizes([]);
    setSelectedColor('all');
    setMaxPrice(60000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') {
        return false;
      }
      if (selectedCategory !== 'all' && p.subCategory !== selectedCategory && p.category !== selectedCategory) {
        return false;
      }
      if (selectedCollection !== 'all' && p.collection !== selectedCollection) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) {
        return false;
      }
      if (selectedColor !== 'all' && !p.colors.some((c) => c.name === selectedColor)) {
        return false;
      }
      if (inStockOnly && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    products,
    selectedGender,
    selectedCategory,
    selectedCollection,
    maxPrice,
    selectedSizes,
    selectedColor,
    inStockOnly,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedGender !== 'all' && !hideGenderFilter ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedCollection !== 'all' ? 1 : 0) +
    selectedSizes.length +
    (selectedColor !== 'all' ? 1 : 0) +
    (maxPrice < 60000 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header if title provided */}
      {title && (
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-2">
            DROPX READY-TO-WEAR
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#171719] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-sm text-[#7A7670] font-light max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Top Filter & View Controls Bar */}
      <div className="sticky top-16 z-30 bg-[#FAF8F5]/95 backdrop-blur-md py-4 border-y border-[#E8E4DC] mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Mobile Filter Toggle & Count */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#171719] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#C5A880] hover:text-[#171719] transition-colors rounded-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C5A880] text-[#171719] text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-xs text-[#8C8880] tracking-wider uppercase hidden sm:inline">
            Showing <strong className="text-[#171719]">{filteredProducts.length}</strong> items
          </span>
        </div>

        {/* Right: Sort & Grid View Columns */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C8880] uppercase tracking-wider hidden md:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-transparent pl-3 pr-8 py-2 border border-[#D8D2C7] text-xs uppercase tracking-wider text-[#171719] focus:outline-none focus:border-[#171719] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C8880]" />
            </div>
          </div>

          {/* Grid column switches for desktop */}
          <div className="hidden lg:flex items-center border border-[#D8D2C7] p-0.5 rounded-sm">
            <button
              onClick={() => setGridColumns(2)}
              className={`p-1.5 transition-colors ${gridColumns === 2 ? 'bg-[#171719] text-white' : 'text-[#8C8880] hover:text-[#171719]'}`}
              title="2 Columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 transition-colors ${gridColumns === 3 ? 'bg-[#171719] text-white' : 'text-[#8C8880] hover:text-[#171719]'}`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1.5 transition-colors ${gridColumns === 4 ? 'bg-[#171719] text-white' : 'text-[#8C8880] hover:text-[#171719]'}`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Drawer + Product Grid */}
      <div className="flex gap-8">
        {/* Desktop Collapsible Filters Sidebar */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 overflow-hidden pr-6 border-r border-[#E8E4DC] hidden lg:block"
            >
              <div className="w-[260px] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
                  <h3 className="font-serif text-lg text-[#171719]">Refine By</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-[11px] text-[#C5A880] hover:text-[#171719] flex items-center gap-1 uppercase tracking-wider"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                {/* Gender filter */}
                {!hideGenderFilter && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171719] mb-2.5">
                      Gender
                    </h4>
                    <div className="flex flex-col gap-1.5">
                      {['all', 'men', 'women'].map((gender) => (
                        <label
                          key={gender}
                          className="flex items-center gap-2.5 text-xs text-[#7A7670] hover:text-[#171719] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="gender"
                            checked={selectedGender === gender}
                            onChange={() => setSelectedGender(gender)}
                            className="accent-[#171719]"
                          />
                          <span className="capitalize">{gender === 'all' ? 'All Collections' : `${gender}'s Clothing`}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subcategory Filter */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171719] mb-2.5">
                    Category
                  </h4>
                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`block w-full text-left text-xs tracking-wider py-1 px-2 rounded-sm ${
                        selectedCategory === 'all'
                          ? 'bg-[#171719] text-white'
                          : 'text-[#7A7670] hover:text-[#171719]'
                      }`}
                    >
                      All Categories
                    </button>
                    {allSubCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedCategory(sub)}
                        className={`block w-full text-left text-xs tracking-wider capitalize py-1 px-2 rounded-sm ${
                          selectedCategory === sub
                            ? 'bg-[#171719] text-white'
                            : 'text-[#7A7670] hover:text-[#171719]'
                        }`}
                      >
                        {sub.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-widest mb-2">
                    <span>Max Price</span>
                    <span className="text-[#C5A880]">{formatPrice(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="4000"
                    max="60000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#171719] cursor-pointer"
                  />
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171719] mb-2.5">
                    Sizes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => {
                      const isSelected = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`w-9 h-9 text-xs font-medium border transition-colors flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#171719] text-white border-[#171719]'
                              : 'bg-white text-[#171719] border-[#D8D2C7] hover:border-[#171719]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171719] mb-2.5">
                    Colors
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedColor('all')}
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 border ${
                        selectedColor === 'all' ? 'bg-[#171719] text-white border-[#171719]' : 'border-[#D8D2C7]'
                      }`}
                    >
                      All
                    </button>
                    {allColors.map(({ name, hex }) => (
                      <button
                        key={name}
                        onClick={() => setSelectedColor(name)}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          selectedColor === name ? 'ring-2 ring-[#171719] scale-110' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: hex }}
                        title={name}
                      />
                    ))}
                  </div>
                </div>

                {/* In Stock Toggle */}
                <div className="pt-2 border-t border-[#E8E4DC]">
                  <label className="flex items-center gap-2.5 text-xs text-[#171719] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 accent-[#171719]"
                    />
                    <span>In-Stock Only</span>
                  </label>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Filter Drawer Modal */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-sm bg-[#FAF8F5] h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC] mb-6">
                    <h3 className="font-serif text-2xl text-[#171719]">Filter Garments</h3>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-2 text-[#7A7670] hover:text-[#171719]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Gender filter */}
                  {!hideGenderFilter && (
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171719] mb-3">
                        Gender
                      </h4>
                      <div className="flex gap-2">
                        {['all', 'men', 'women'].map((gender) => (
                          <button
                            key={gender}
                            onClick={() => setSelectedGender(gender)}
                            className={`flex-1 py-2 text-xs uppercase tracking-wider border ${
                              selectedGender === gender
                                ? 'bg-[#171719] text-white border-[#171719]'
                                : 'border-[#D8D2C7] text-[#171719]'
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subcategory Filter */}
                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171719] mb-3">
                      Category
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`py-2 px-3 text-xs tracking-wider border text-left ${
                          selectedCategory === 'all' ? 'bg-[#171719] text-white border-[#171719]' : 'border-[#D8D2C7]'
                        }`}
                      >
                        All
                      </button>
                      {allSubCategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedCategory(sub)}
                          className={`py-2 px-3 text-xs tracking-wider capitalize border text-left truncate ${
                            selectedCategory === sub
                              ? 'bg-[#171719] text-white border-[#171719]'
                              : 'border-[#D8D2C7]'
                          }`}
                        >
                          {sub.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-[#171719] mb-3">
                      Sizes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`w-10 h-10 text-xs border ${
                            selectedSizes.includes(size)
                              ? 'bg-[#171719] text-white border-[#171719]'
                              : 'border-[#D8D2C7]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 border-t border-[#E8E4DC] flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-3 border border-[#171719] text-xs uppercase tracking-widest"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-3 bg-[#171719] text-white text-xs uppercase tracking-widest"
                  >
                    View ({filteredProducts.length})
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid Area */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-[#F4EFE6]/50 border border-dashed border-[#D8D2C7] p-8">
              <h3 className="font-serif text-2xl text-[#171719]">No garments match your filters</h3>
              <p className="text-xs text-[#7A7670] mt-2 mb-6">
                Try widening your price range, clearing size restrictions, or browsing all categories.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#171719] text-white text-xs uppercase tracking-widest hover:bg-[#C5A880] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-x-6 gap-y-10 ${
                gridColumns === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridColumns === 3
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
