export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count?: number;
}

export const MEN_CATEGORIES: CategoryItem[] = [
  {
    id: 'men-t-shirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Heavyweight Supima & organic cotton essentials with relaxed drape',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-shirts',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Crisp poplin button-downs and relaxed Italian linen overshirts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-polo-shirts',
    name: 'Polo Shirts',
    slug: 'polo-shirts',
    description: 'Fine-gauge merino knit & silk-blend open collar polos',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-jeans',
    name: 'Jeans',
    slug: 'jeans',
    description: 'Japanese selvedge and raw denim in straight and relaxed cuts',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-trousers',
    name: 'Trousers',
    slug: 'trousers',
    description: 'Double-pleated wool gabardine and refined tailored trousers',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-hoodies',
    name: 'Hoodies',
    slug: 'hoodies',
    description: 'Heavyweight French terry & cashmere-blend luxury hoodies',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-sweatshirts',
    name: 'Sweatshirts',
    slug: 'sweatshirts',
    description: 'Minimalist loopback crewnecks engineered for effortless comfort',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-jackets',
    name: 'Jackets',
    slug: 'jackets',
    description: 'Shearling aviators, selvedge chore jackets & virgin wool coats',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men-shorts',
    name: 'Shorts',
    slug: 'shorts',
    description: 'Tailored pleated linen & relaxed heavyweight cotton shorts',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
  },
];

export const WOMEN_CATEGORIES: CategoryItem[] = [
  {
    id: 'women-tops',
    name: 'Tops',
    slug: 'tops',
    description: 'Draped asymmetric camisoles, ribbed modal bodysuits & sculpt tops',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-t-shirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Sculpted mockneck & organic Peruvian Pima cotton relaxed tees',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-shirts',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Oversized structured poplin & fluid sand-washed silk button-downs',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-dresses',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Mulberry silk trench gowns, asymmetric slip dresses & column knits',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-jeans',
    name: 'Jeans',
    slug: 'jeans',
    description: 'High-rise wide-leg denim, straight raw hem & vintage washes',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-trousers',
    name: 'Trousers',
    slug: 'trousers',
    description: 'High-waisted pleated palazzo trousers & tailored wool flares',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-skirts',
    name: 'Skirts',
    slug: 'skirts',
    description: 'Bias-cut silk maxi skirts & sculptural accordion pleated midis',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-jackets',
    name: 'Jackets',
    slug: 'jackets',
    description: 'Sculpted hour-glass blazers, belted trench coats & cropped suedes',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'women-ethnic-wear',
    name: 'Ethnic Wear',
    slug: 'ethnic-wear',
    description: 'Contemporary handwoven Chanderi ensembles & modern draped silk silhouettes',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
];

export const COLLECTIONS_LIST = [
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    badge: 'JUST DROPPED',
    description: 'The latest runway-ready arrivals and seasonal statements',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'best-sellers',
    name: 'Best Sellers',
    slug: 'best-sellers',
    badge: 'MOST COVETED',
    description: 'Our most sought-after signature pieces, revered by clients worldwide',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'trending',
    name: 'Trending',
    slug: 'trending',
    badge: 'VIRAL EDITORIAL',
    description: 'Current high-fashion aesthetics taking over modern wardrobes',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'summer-collection',
    name: 'Summer Collection',
    slug: 'summer-collection',
    badge: 'LIGHTWEIGHT LUXURY',
    description: 'Airy pure linen, fluid silk habotai, and sun-washed Mediterranean tones',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'winter-collection',
    name: 'Winter Collection',
    slug: 'winter-collection',
    badge: 'THERMAL ARCHITECTURE',
    description: 'Mongolian cashmere, heavy double-faced wool, and shearling warmth',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'sale',
    name: 'Sale & Archive',
    slug: 'sale',
    badge: 'LIMITED PRIVILEGE',
    description: 'Select seasonal creations available at privileged pricing',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85',
  },
];
