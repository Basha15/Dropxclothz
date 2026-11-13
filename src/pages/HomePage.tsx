import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Flame, 
  ArrowUpRight, 
  ShoppingBag, 
  Eye, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { PRODUCTS, COLLECTIONS_DATA, PRESS_QUOTES, BRAND_STORY } from '../data/products';
import { MEN_CATEGORIES, WOMEN_CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useQuickView } from '../context/QuickViewContext';

// 9 garments on the interactive rail matching the reference clothes rack demo
// Complete collection across Hoodies, T-Shirts, Shirts, Trousers/Pants, and Winter Clothes
interface RailGarment {
  id: string;
  name: string;
  type: 'hoodie' | 'tee' | 'shirt' | 'pants' | 'winter' | 'trousers';
  categoryLabel: string;
  colorName: string;
  colorHex: string;
  price: number;
  originalPrice?: number;
  gsm: string;
  description: string;
  features: string[];
  sizes: string[];
  image: string;
  isHoodie?: boolean;
}

const RAIL_GARMENTS: RailGarment[] = [
  {
    id: 'dx-rail-hoodie-01',
    name: 'Forest Green Heavyweight Hoodie',
    type: 'hoodie',
    categoryLabel: 'Hoodie',
    colorName: 'Forest Pine Green',
    colorHex: '#1B4736',
    price: 9900,
    originalPrice: 12500,
    gsm: '480 GSM',
    isHoodie: true,
    description: 'Sculptural heavyweight hoodie in custom 480 GSM French Terry loopback cotton. Architectural crossover hood that stands upright without drawstrings.',
    features: ['480 GSM French Terry Cotton', 'Cordless standing crossover hood', 'Concealed side seam pockets', 'Heavy 2x2 ribbed cuffs & hem'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-hoodie-02',
    name: 'Obsidian 480 GSM French Terry Hoodie',
    type: 'hoodie',
    categoryLabel: 'Hoodie',
    colorName: 'Obsidian Black',
    colorHex: '#1A1A1D',
    price: 10200,
    originalPrice: 13000,
    gsm: '480 GSM',
    isHoodie: true,
    description: 'The definitive luxury black hoodie. High-density 480 GSM combed cotton with sculptural silhouette, double-ply hood, and matte black detailing.',
    features: ['480 GSM Dense French Terry', 'Double-ply structured hood', 'Seamless hidden pocket entry', 'Pre-shrunk anti-pill finish'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-tee-01',
    name: 'Pure White Boxy Supima T-Shirt',
    type: 'tee',
    categoryLabel: 'T-Shirt',
    colorName: 'Chalk White',
    colorHex: '#F6F5F2',
    price: 4800,
    gsm: '260 GSM',
    description: 'Double-combed Supima cotton jersey with a relaxed drop-shoulder cut, wide sleeves, and reinforced ribbed crew collar.',
    features: ['260 GSM Supima Cotton Jersey', 'Boxy drop-shoulder cut', 'Reinforced collar band', 'Pre-washed anti-shrink finish'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-tee-02',
    name: 'Washed Slate Navy Heavy Boxy Tee',
    type: 'tee',
    categoryLabel: 'T-Shirt',
    colorName: 'Washed Slate Navy',
    colorHex: '#2E384D',
    price: 5400,
    originalPrice: 6800,
    gsm: '320 GSM',
    description: 'Heavyweight vintage washed cotton tee with wide elbow-length sleeves and blind hem stitching as seen on the runway.',
    features: ['320 GSM Heavy Combed Cotton', 'Vintage pigment wash patina', 'Blind hem construction'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-shirt-01',
    name: 'Crisp Oxford Cotton Button-Down Shirt',
    type: 'shirt',
    categoryLabel: 'Shirt',
    colorName: 'Sky Blue Oxford',
    colorHex: '#C5D6E8',
    price: 8200,
    originalPrice: 10500,
    gsm: '180 GSM',
    description: 'Long-staple Giza cotton with a structured relaxed silhouette, mother-of-pearl buttons, and tailored single-needle stitching.',
    features: ['100% Long-Staple Giza Cotton', 'Genuine mother-of-pearl buttons', 'Curved hem with gussets'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-shirt-02',
    name: 'Sand-Washed Minimalist Linen Shirt',
    type: 'shirt',
    categoryLabel: 'Shirt',
    colorName: 'Natural Ecru',
    colorHex: '#D8CFBC',
    price: 8800,
    gsm: '210 GSM',
    description: 'Pure Normandy flax linen, sand-washed for exceptional drape and breathability. Relaxed camp collar and French seams.',
    features: ['100% Normandy Linen', 'Sand-washed soft handle', 'Clean French seam construction'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-pants-01',
    name: 'Double-Pleated Tailored Wool Trousers',
    type: 'pants',
    categoryLabel: 'Trousers & Pants',
    colorName: 'Charcoal Biella',
    colorHex: '#38393D',
    price: 14500,
    originalPrice: 18000,
    gsm: '340 GSM',
    description: 'Tailored from virgin Biella wool. Features forward double pleats, high-rise cut, gentle taper, and brass side adjusters.',
    features: ['100% Virgin Biella Wool', 'Double forward pleats', 'Side buckled adjusters', 'Unfinished hems for custom tailoring'],
    sizes: ['30', '32', '34', '36'],
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-pants-02',
    name: '14oz Japanese Selvedge Raw Denim',
    type: 'pants',
    categoryLabel: 'Trousers & Pants',
    colorName: 'Deep Indigo Selvedge',
    colorHex: '#1D2536',
    price: 16800,
    gsm: '14 oz',
    description: 'Okayama vintage shuttle-loom selvedge denim. Pink selvedge ID, solid copper hardware, and natural indigo dye.',
    features: ['14oz Okayama Shuttle-Loom Denim', 'Solid brass & copper rivets', 'Red-line selvedge tick detail'],
    sizes: ['30', '32', '34', '36'],
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-winter-01',
    name: 'Shearling-Lined Aviation Bomber Jacket',
    type: 'winter',
    categoryLabel: 'Winter Clothes',
    colorName: 'Espresso Brown & Cream',
    colorHex: '#4A3528',
    price: 49500,
    originalPrice: 58000,
    gsm: 'Heavyweight',
    description: 'Spanish Merino shearling with antiqued brass hardware, buckled storm collar, and heavy shearling wool interior.',
    features: ['100% Spanish Merino Shearling', 'Antiqued brass custom buckles', 'Heavy fleece wind-resistant cuffs'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'dx-rail-winter-02',
    name: 'Double-Breasted Wool Overcoat',
    type: 'winter',
    categoryLabel: 'Winter Clothes',
    colorName: 'Camel Melange',
    colorHex: '#B59677',
    price: 38500,
    gsm: '560 GSM',
    description: 'Italian double-faced virgin wool and cashmere blend overcoat with structured shoulders and horn button closure.',
    features: ['Virgin Wool & Cashmere Blend', 'Double-breasted peaked lapel', 'Real horn buttons', 'Satin cupro full lining'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85'
  }
];

// Realistic Garment & Hanger Renderer directly matching the Reference Clothes Rack Demo
const RealGarmentSilhouette: React.FC<{
  garment: RailGarment;
  isOpen: boolean;
}> = ({ garment, isOpen }) => {
  const isPants = garment.type === 'pants';
  const isHoodie = garment.isHoodie || garment.type === 'hoodie';
  const isShirt = garment.type === 'shirt';
  const isWinter = garment.type === 'winter';
  const isTee = garment.type === 'tee';

  // Responsive dimensions for rail garments
  const closedW = isPants ? 38 : isWinter ? 52 : isHoodie ? 48 : 42;
  const closedH = isPants ? 290 : isWinter ? 285 : isHoodie ? 280 : 265;
  const openW = isPants ? 185 : 210;
  const openH = isPants ? 310 : 295;

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* ============================================================== */}
      {/* 1. REALISTIC WOODEN HANGER (Exact physical hook & timber neck)  */}
      {/* ============================================================== */}
      <div className="flex flex-col items-center z-30 -mb-1 relative">
        {/* Slender Metallic Wire Hook hooked over the rail tube */}
        <svg className="w-5 h-7 overflow-visible -mb-0.5" viewBox="0 0 20 28" fill="none">
          <defs>
            <linearGradient id={`hookGrad-${garment.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#E2E8F0" />
              <stop offset="70%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <path
            d="M 10 2 C 15 2 17 5 14 9 C 11.5 12.5 10 14.5 10 26"
            stroke={`url(#hookGrad-${garment.id})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Brass Swivel Grommet connecting Hook to Wood */}
        <div className="w-2.5 h-1 rounded-xs bg-gradient-to-r from-[#D4AF37] via-[#FEF08A] to-[#854D0E] shadow-xs z-10" />

        {/* Natural Wooden Hanger Head / Shoulder Arms */}
        <div
          className={`transition-all duration-300 relative shadow-md flex items-center justify-center ${
            isOpen ? 'w-28 h-4 rounded-t-full' : 'w-4 h-5.5 rounded-t-xs'
          }`}
          style={{
            background: 'linear-gradient(135deg, #784A33 0%, #A06A4E 45%, #683E2A 80%, #4A2718 100%)'
          }}
        >
          {/* Subtle natural woodgrain reflection highlight */}
          <div className="absolute inset-x-1.5 top-0.5 h-[1px] bg-white/35 rounded-full" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. REAL GARMENT (3D Swivel between Closed Drape and Open Front) */}
      {/* ============================================================== */}
      <motion.div
        layout
        initial={false}
        animate={{
          width: isOpen ? openW : closedW,
          height: isOpen ? openH : closedH,
          rotateY: isOpen ? 0 : -22,
          scale: isOpen ? 1.12 : 0.98,
          y: isOpen ? -8 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 320,
          damping: 24
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
        className="relative transition-shadow duration-300 drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
      >
        {/* Soft Ambient Spotlight behind active open garment */}
        {isOpen && (
          <div
            className="absolute -inset-8 rounded-full blur-2xl opacity-60 pointer-events-none -z-10"
            style={{
              background: `radial-gradient(circle, ${garment.colorHex}99 0%, transparent 70%)`
            }}
          />
        )}

        {/* ------------------------------------------------------------ */}
        {/* UNHOVERED VIEW: REAL CLOTHES IN CLOSED SIDE-PROFILE DRAPE     */}
        {/* Matches Molimao: natural sleeve folds, hood fold & fabric hem*/}
        {/* ------------------------------------------------------------ */}
        {!isOpen && (
          <div
            className="w-full h-full relative overflow-hidden rounded-b-md shadow-md flex flex-col justify-between border border-black/20"
            style={{
              backgroundColor: garment.colorHex
            }}
          >
            {/* Real Clothing Photographic Texture Overlay */}
            <img
              src={garment.image}
              alt={garment.name}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-60 mix-blend-luminosity filter contrast-[1.15] brightness-[0.92]"
            />

            {/* Realistic Cloth Lighting & Fold Gradient (Molimao 3D depth) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.03) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.55) 100%)'
              }}
            />

            {/* Top Collar Opening wrapping around the wooden hanger neck */}
            <div className="relative z-10 w-full pt-1 px-1 flex flex-col items-center">
              <div className="w-5 h-2 rounded-b-full bg-black/45 border-b border-black/60 shadow-inner" />
              {/* If Hoodie: distinct folded hood curve arching at the back */}
              {isHoodie && (
                <div className="absolute -top-1.5 right-0.5 w-4 h-7 rounded-tl-full border-t border-l border-white/30 bg-black/35 pointer-events-none" />
              )}
            </div>

            {/* Sleeve Drape & Seam Accents */}
            <div className="relative z-10 flex-1 w-full flex flex-col justify-center px-1">
              {isPants ? (
                // Sharp vertical crease for trousers
                <div className="w-[1px] h-48 mx-auto bg-gradient-to-b from-white/20 via-black/30 to-black/50" />
              ) : (
                // Natural sleeve fold for tops
                <div className="w-3/4 h-24 border-r border-black/30 rounded-r-md mx-auto opacity-70" />
              )}
            </div>

            {/* Bottom Hem & Category Tag */}
            <div className="relative z-10 w-full bg-black/85 backdrop-blur-xs text-center py-1 border-t border-white/10">
              <span className="block text-[7px] font-bold text-white uppercase tracking-widest truncate px-1">
                {garment.categoryLabel}
              </span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* HOVERED VIEW: REAL CLOTHES SWIVELED OPEN FACING FORWARD      */}
        {/* Front silhouette, interior collar label, specs & price pill  */}
        {/* ------------------------------------------------------------ */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full relative overflow-hidden rounded-b-lg border-2 border-[#C5A880] ring-4 ring-[#C5A880]/20 shadow-2xl flex flex-col justify-between"
            style={{
              backgroundColor: garment.colorHex
            }}
          >
            {/* Real Clothing High-Resolution Photographic Drape */}
            <img
              src={garment.image}
              alt={garment.name}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-85 filter brightness-[0.98] contrast-[1.08]"
            />

            {/* Ambient Vignette & Shadow Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

            {/* Interior Collar Neck Tag / Label */}
            <div className="relative z-10 pt-2.5 text-center">
              <div className="bg-black/85 backdrop-blur-md border border-[#C5A880]/70 px-3 py-1 mx-auto text-center rounded-sm max-w-[135px] shadow-lg">
                <span className="block text-[8px] tracking-[0.25em] font-serif uppercase text-[#C5A880]">
                  DROPX • {garment.gsm}
                </span>
                <span className="block text-[6.5px] uppercase tracking-wider text-gray-300">
                  {isHoodie ? 'PURE COMBED FLEECE' : isPants ? 'TAILORED CUT' : isShirt ? 'GIZA COTTON' : isWinter ? 'LUXURY OUTERWEAR' : 'SUPIMA JERSEY'}
                </span>
              </div>
            </div>

            {/* Garment Title & Weave Badge */}
            <div className="my-auto relative z-10 text-center px-3">
              <span className="inline-block px-2.5 py-0.5 text-[8.5px] font-bold tracking-wider uppercase bg-[#C5A880] text-black rounded-full mb-1 shadow-sm">
                {garment.categoryLabel}
              </span>
              <p className="text-xs sm:text-sm font-medium text-white truncate drop-shadow-md">
                {garment.name}
              </p>
              <p className="text-[10px] text-gray-300 truncate mt-0.5 font-light">
                {garment.colorName}
              </p>
            </div>

            {/* Bottom Bar: Price & OPEN Status */}
            <div className="relative z-10 flex items-center justify-between text-xs px-3 py-2 bg-black/75 backdrop-blur-xs border-t border-white/20">
              <span className="font-bold text-white drop-shadow-sm">
                {formatPrice(garment.price)}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                OPEN
              </span>
            </div>

            {/* Floating Price Pill directly below the garment */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#171719] text-[#FAF8F5] text-[11px] font-semibold px-3 py-1 rounded-full shadow-2xl border border-[#C5A880]/60 flex items-center gap-1.5 z-40"
            >
              <span className="text-[#C5A880]">✦</span>
              <span>{formatPrice(garment.price)}</span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men'>('all');

  // Cart & QuickView hooks
  const { addToCart, openCart } = useCart();
  const { openQuickView } = useQuickView();

  // Rail Clothes Rack Interactive States
  const [activeRailId, setActiveRailId] = useState<string>('dx-rail-hoodie-01'); // Default active: Forest Green Hoodie
  const [hoveredRailId, setHoveredRailId] = useState<string | null>(null);
  const [railCategoryFilter, setRailCategoryFilter] = useState<'all' | 'hoodie' | 'tee' | 'shirt' | 'pants' | 'winter'>('all');
  const [selectedRailSize, setSelectedRailSize] = useState<string>('M');
  const [railAddedSuccess, setRailAddedSuccess] = useState<boolean>(false);
  const railContainerRef = useRef<HTMLDivElement>(null);

  const filteredGarments = railCategoryFilter === 'all'
    ? RAIL_GARMENTS
    : RAIL_GARMENTS.filter((g) => g.type === railCategoryFilter);

  const displayedGarment = RAIL_GARMENTS.find(
    (g) => g.id === (hoveredRailId || activeRailId)
  ) || filteredGarments[0] || RAIL_GARMENTS[0];

  const handleAddRailToCart = (garment: RailGarment) => {
    const fallbackProduct = PRODUCTS.find((p) => p.subCategory === 'hoodies') || PRODUCTS[0];
    const itemToCart = {
      ...fallbackProduct,
      id: garment.id,
      name: garment.name,
      price: garment.price,
      originalPrice: garment.originalPrice,
      images: [garment.image, ...fallbackProduct.images]
    };
    addToCart(
      itemToCart,
      { name: garment.colorName, hex: garment.colorHex },
      selectedRailSize,
      1
    );
    setRailAddedSuccess(true);
    setTimeout(() => setRailAddedSuccess(false), 2400);
    openCart();
  };

  const handleOpenRailQuickView = (garment: RailGarment) => {
    const fallbackProduct = PRODUCTS.find((p) => p.subCategory === 'hoodies') || PRODUCTS[0];
    openQuickView({
      ...fallbackProduct,
      id: garment.id,
      name: garment.name,
      price: garment.price,
      originalPrice: garment.originalPrice,
      description: garment.description,
      details: garment.features,
      composition: `${garment.gsm} Pure Natural Fibers`,
      images: [garment.image, ...fallbackProduct.images]
    });
  };

  const scrollRail = (direction: 'left' | 'right') => {
    if (railContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      railContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter products for curated showcase
  const newArrivals = PRODUCTS.filter((p) => p.tags.includes('new')).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.tags.includes('bestseller')).slice(0, 8);
  const saleProducts = PRODUCTS.filter((p) => p.tags.includes('sale') || p.originalPrice).slice(0, 4);

  const tabProducts = PRODUCTS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.gender === activeTab || item.category === activeTab;
  }).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* 1. HERO: REAL CLOTHES RAIL SHOWCASE ("ON THE RAIL | DROPX CATALOG") */}
      <section className="relative pt-8 pb-16 sm:pb-24 bg-[#FAF8F5] border-b border-[#E8E2D5] overflow-hidden select-none">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-[#C5A880]/12 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Bar matching Reference Demo */}
          <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-5 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#171719] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#7A7670]">
                Interactive Showroom
              </span>
            </div>

            <div className="text-center">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.3em] font-normal text-[#171719]">
                ✦ DROPX
              </span>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold mt-1">
                ON THE RAIL | READY-TO-WEAR ARCHIVE
              </p>
            </div>

            <button
              onClick={openCart}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#171719] hover:text-[#C5A880] transition-colors"
            >
              <span>Bag</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Department Filter Tabs across all requested clothing types */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8">
            {[
              { id: 'all', label: 'All Garments' },
              { id: 'hoodie', label: 'Hoodies' },
              { id: 'tee', label: 'T-Shirts' },
              { id: 'shirt', label: 'Shirts' },
              { id: 'pants', label: 'Pants & Trousers' },
              { id: 'winter', label: 'Winter Clothes' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setRailCategoryFilter(cat.id as any)}
                className={`px-3.5 sm:px-5 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-200 border rounded-sm ${
                  railCategoryFilter === cat.id
                    ? 'bg-[#171719] text-white border-[#171719] shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#7A7670] hover:text-[#171719] border-[#E2DBD0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* User Hint */}
          <p className="text-center text-xs text-[#7A7670] mb-8 font-light max-w-md mx-auto">
            Hover cursor or tap on any garment to swivel and open its full silhouette, fabric weave, and live pricing.
          </p>

          {/* Horizontal Rail Assembly Container */}
          <div className="relative pt-6 pb-10 sm:pb-14 px-2 sm:px-8">
            {/* Scroll Navigation Chevrons */}
            <button
              onClick={() => scrollRail('left')}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/95 hover:bg-[#171719] hover:text-white text-[#171719] shadow-xl border border-[#E2DBD0] rounded-full flex items-center justify-center transition-all duration-200"
              aria-label="Scroll rail left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollRail('right')}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/95 hover:bg-[#171719] hover:text-white text-[#171719] shadow-xl border border-[#E2DBD0] rounded-full flex items-center justify-center transition-all duration-200"
              aria-label="Scroll rail right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Realistic Brushed Steel Clothes Rail Bar */}
            <div className="relative w-full max-w-5xl mx-auto mb-3">
              {/* Left End Wall Bracket */}
              <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-8 sm:h-9 bg-gradient-to-r from-[#2A2B2E] via-[#4A4C52] to-[#1E1F22] rounded-sm border border-[#6B7280] shadow-md z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B0B3BA] shadow-inner" />
              </div>

              {/* Main Metallic Rail Tube with highlight reflection */}
              <div className="h-3 sm:h-3.5 w-full bg-gradient-to-b from-[#E5E7EB] via-[#9CA3AF] to-[#374151] rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.22)] relative z-10">
                <div className="absolute inset-x-0 top-[1.5px] h-[1px] bg-white/90" />
              </div>

              {/* Right End Wall Bracket */}
              <div className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-8 sm:h-9 bg-gradient-to-l from-[#2A2B2E] via-[#4A4C52] to-[#1E1F22] rounded-sm border border-[#6B7280] shadow-md z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B0B3BA] shadow-inner" />
              </div>
            </div>

            {/* Scrollable Hangers & REAL CLOTHES Rail Track */}
            <div
              ref={railContainerRef}
              className="overflow-x-auto no-scrollbar scroll-smooth flex items-start justify-center gap-3 sm:gap-6 min-h-[390px] sm:min-h-[460px] pt-1 px-4 sm:px-12"
              style={{ scrollSnapType: 'x proximity' }}
            >
              {filteredGarments.map((garment) => {
                const isHovered = hoveredRailId === garment.id;

                return (
                  <div
                    key={garment.id}
                    onMouseEnter={() => setHoveredRailId(garment.id)}
                    onMouseLeave={() => setHoveredRailId(null)}
                    onClick={() => setActiveRailId(garment.id)}
                    className="flex flex-col items-center cursor-pointer transition-all duration-300 relative group flex-shrink-0"
                    style={{
                      zIndex: isHovered ? 40 : 10,
                      scrollSnapAlign: 'center'
                    }}
                  >
                    <RealGarmentSilhouette garment={garment} isOpen={isHovered} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC SHOWCASE DETAILS DISPLAY (Under the Rail) */}
          <div className="max-w-3xl mx-auto mt-6 bg-white border border-[#E2DBD0] p-6 sm:p-8 shadow-2xl relative rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayedGarment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="text-center space-y-4"
              >
                {/* Category & Material Pill */}
                <div className="flex items-center justify-center gap-3">
                  <span className="px-3 py-1 bg-[#171719] text-white text-[10px] uppercase tracking-[0.25em] font-semibold rounded-full">
                    {displayedGarment.categoryLabel} • {displayedGarment.gsm}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#7A7670]">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 inline-block"
                      style={{ backgroundColor: displayedGarment.colorHex }}
                    />
                    <span className="font-medium text-[#171719]">{displayedGarment.colorName}</span>
                  </div>
                  {displayedGarment.originalPrice && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold uppercase rounded-sm">
                      Special Drop
                    </span>
                  )}
                </div>

                {/* Garment Title */}
                <h3 className="font-serif text-2xl sm:text-4xl text-[#171719] font-normal tracking-tight">
                  {displayedGarment.name}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-sm text-[#7A7670] max-w-xl mx-auto font-light leading-relaxed">
                  {displayedGarment.description}
                </p>

                {/* Price Display */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-serif text-[#171719] font-medium">
                    {formatPrice(displayedGarment.price)}
                  </span>
                  {displayedGarment.originalPrice && (
                    <span className="text-sm sm:text-base text-[#9C988F] line-through">
                      {formatPrice(displayedGarment.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Size Selector Pills */}
                <div className="pt-1">
                  <span className="block text-[10px] uppercase tracking-widest text-[#7A7670] mb-2 font-semibold">
                    Select Garment Size
                  </span>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {displayedGarment.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedRailSize(sz)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 text-xs font-semibold uppercase transition-all duration-200 border rounded-sm ${
                          selectedRailSize === sz
                            ? 'bg-[#171719] text-white border-[#171719] shadow-md scale-105'
                            : 'bg-white text-[#171719] border-[#D8D2C7] hover:border-[#171719]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Add to Bag & Quick View */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <button
                    onClick={() => handleAddRailToCart(displayedGarment)}
                    className="w-full sm:flex-1 py-4 bg-[#171719] hover:bg-[#C5A880] text-white hover:text-[#171719] text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
                  >
                    {railAddedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added To Shopping Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag • {formatPrice(displayedGarment.price)}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenRailQuickView(displayedGarment)}
                    className="w-full sm:w-auto px-6 py-4 border border-[#171719] text-[#171719] hover:bg-[#171719] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM ORANGE/TERRACOTTA MARQUEE TICKER (Matching Reference Image) */}
        <div className="mt-14 sm:mt-20 bg-[#EA580C] text-white py-3.5 border-y border-[#C2410C] overflow-hidden whitespace-nowrap shadow-inner">
          <div className="flex space-x-12 text-[11px] uppercase tracking-[0.28em] font-semibold">
            <span>• 100% ETHICAL NATURAL FIBERS</span>
            <span>• COMPLIMENTARY INSURED GLOBAL COURIER DELIVERY</span>
            <span>• ARCHITECTURAL CUTS & STRUCTURAL HOODS</span>
            <span>• JAPANESE SELVEDGE DENIM & BIELLA WOOL</span>
            <span>• PRE-SHRUNK 480 GSM FRENCH TERRY LOOPBACK</span>
            <span>• DROPX READY-TO-WEAR ARCHIVE</span>
            <span>• 100% ETHICAL NATURAL FIBERS</span>
            <span>• COMPLIMENTARY INSURED GLOBAL COURIER DELIVERY</span>
            <span>• ARCHITECTURAL CUTS & STRUCTURAL HOODS</span>
            <span>• PRE-SHRUNK 480 GSM FRENCH TERRY LOOPBACK</span>
          </div>
        </div>
      </section>

      {/* 2. Marquee Ticker */}
      <div className="bg-[#171719] text-[#E8DEC8] py-3.5 border-y border-[#2E2E33] overflow-hidden whitespace-nowrap">
        <div className="flex space-x-12 text-[11px] uppercase tracking-[0.3em] font-medium">
          <span>WORLDWIDE READY-TO-WEAR</span>
          <span>•</span>
          <span>BIELLA VIRGIN WOOL</span>
          <span>•</span>
          <span>SUSTAINABLE MONGOLIAN CASHMERE</span>
          <span>•</span>
          <span>JAPANESE SELVEDGE DENIM</span>
          <span>•</span>
          <span>COMPLIMENTARY INSURED COURIER</span>
          <span>•</span>
          <span>WORLDWIDE READY-TO-WEAR</span>
          <span>•</span>
          <span>BIELLA VIRGIN WOOL</span>
          <span>•</span>
          <span>SUSTAINABLE MONGOLIAN CASHMERE</span>
        </div>
      </div>

      {/* 3. Trending Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            DEPARTMENT SHOWCASE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171719] mt-2 font-normal">
            Shop By Department
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7670] mt-3 font-light leading-relaxed">
            Architectural cuts engineered for modern living. Explore distinct clothing departments designed to elevate everyday rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Women */}
          <Link
            to="/women"
            className="group relative aspect-[3/4] overflow-hidden bg-[#F0ECE1] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
              alt="Women's Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-[#FAF8F5]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                DRESSES • TOPS • SKIRTS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">Women's Retail</h3>
              <p className="text-xs text-[#D8D2C7] mt-1 font-light">Fluid silk dresses, tailored blazers, and organic denim.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                Explore Women <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link
            to="/men"
            className="group relative aspect-[3/4] overflow-hidden bg-[#F0ECE1] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85"
              alt="Men's Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-[#FAF8F5]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                SHIRTS • TROUSERS • JACKETS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">Men's Retail</h3>
              <p className="text-xs text-[#D8D2C7] mt-1 font-light">Double-pleated trousers, Supima tees, and shearling aviators.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                Explore Men <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Seasonal / New In */}
          <Link
            to="/new-arrivals"
            className="group relative aspect-[3/4] overflow-hidden bg-[#F0ECE1] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85"
              alt="New Arrivals"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-[#FAF8F5]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                CURATED CAPSULES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">New Arrivals</h3>
              <p className="text-xs text-[#D8D2C7] mt-1 font-light">Fresh seasonal silhouettes and limited-production garments.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                Shop New Arrivals <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. New Arrivals Showcase */}
      <section className="py-16 bg-[#F4EFE6]/50 border-y border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                JUST ARRIVED
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-1 font-normal">
                New Arrivals
              </h2>
              <p className="text-xs text-[#7A7670] mt-1.5 font-light">
                Discover the latest runway arrivals and seasonal statement garments.
              </p>
            </div>

            <Link
              to="/new-arrivals"
              className="text-xs uppercase tracking-[0.2em] text-[#171719] hover:text-[#C5A880] font-medium flex items-center gap-2 group self-start md:self-auto"
            >
              <span>View All New In ({newArrivals.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section with Filter Tabs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>MOST COVETED CREATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171719] font-normal">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7670] mt-2 font-light">
            Iconic staples revered by customers worldwide for their drape, fit, and tactile presence.
          </p>

          {/* Interactive filter tabs */}
          <div className="flex justify-center gap-3 mt-8">
            {[
              { id: 'all', label: 'All Garments' },
              { id: 'women', label: "Women's" },
              { id: 'men', label: "Men's" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#171719] text-[#FAF8F5] shadow-md'
                    : 'bg-[#F0ECE1] text-[#7A7670] hover:text-[#171719]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tabProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Seasonal Fashion Collection Banner */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0D0D0E] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="Runway Collection"
            className="w-full h-full object-cover object-center opacity-40 filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0E] via-[#0D0D0E]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">
              SEASONAL EDITORIAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-tight">
              Pure Mulberry Silk & Asymmetric Drapes
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-[#D8D2C7] font-light leading-relaxed">
              "In every fluid crease lies an unspoken dialogue between body and fabric." Explore bias-cut silk skirts, pleated trench dresses, and minimalist wrap silhouettes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#C5A880] text-[#0D0D0E] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Discover Lookbook
              </Link>
              <Link
                to="/women?category=dresses"
                className="px-8 py-3.5 border border-white/50 text-white hover:bg-white/10 text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Shop Silk Dresses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Special Offers Section (Curated Sale) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B43D3D] font-bold">
              LIMITED PRIVILEGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-1 font-normal">
              Special Offers & Archive Sale
            </h2>
            <p className="text-xs text-[#7A7670] mt-1.5 font-light">
              Select runway and seasonal garments available at preferential pricing.
            </p>
          </div>

          <Link
            to="/sale"
            className="text-xs uppercase tracking-[0.2em] text-[#B43D3D] hover:text-[#8E2828] font-semibold flex items-center gap-2 group self-start md:self-auto"
          >
            <span>Explore All Sale Items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Brand Promotional Editorial Section */}
      <section className="py-20 bg-[#171719] text-[#FAF8F5] border-t border-[#2A2A2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                {BRAND_STORY.title}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF8F5] leading-tight">
                {BRAND_STORY.headline}
              </h2>
              <div className="space-y-4 text-xs text-[#B8B4AC] font-light leading-relaxed">
                {BRAND_STORY.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] hover:text-white transition-colors"
                >
                  <span>Read Full Brand Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden bg-[#2A2A2E]">
                <img
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85"
                  alt="Tailored Trousers"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden bg-[#2A2A2E] mt-8">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Sculpted Blazer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Press Quotes Carousel / Grid */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#E8E4DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              CRITICAL ACCLAIM
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-1 font-normal">
              Press & Editorial Recognition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRESS_QUOTES.map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#F5F1EB] border border-[#E8E4DC] flex flex-col justify-between"
              >
                <p className="font-serif text-base sm:text-lg text-[#171719] italic leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-[#E0D8CB]">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171719]">
                    {item.publication}
                  </p>
                  <p className="text-[11px] text-[#7A7670]">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
