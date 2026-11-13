import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ----------------------------------------------------
  // WOMEN - DRESSES
  // ----------------------------------------------------
  {
    id: 'dx-w-dress-01',
    name: 'Pleated Fluid Silk Trench Dress',
    subtitle: 'Grade 6A Mulberry Silk & Self-Belt',
    price: 21500,
    originalPrice: 26000,
    gender: 'women',
    category: 'women',
    subCategory: 'dresses',
    collection: 'runway-edition',
    tags: ['exclusive', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sculptural elegance meets relaxed sensuality. Made of sand-washed 22-momme Mulberry silk with gentle accordion pleating through the back yoke and an adjustable cinched sash belt.',
    details: [
      'Double storm flaps with concealed horn snap closures',
      'High side slits for fluid movement',
      'Includes detachable sash belt with brass buckle',
      'French seam construction throughout'
    ],
    composition: '100% Pure Mulberry Silk (22 Momme)',
    careInstructions: ['Specialist dry clean only', 'Do not tumble dry', 'Steam on lowest delicate setting'],
    fit: 'True to size with an elongated, column-like silhouette.',
    colors: [
      { name: 'Champagne Sand', hex: '#E5D9C5' },
      { name: 'Pitch Black', hex: '#0B0B0C' },
      { name: 'Warm Terracotta', hex: '#9E5B4B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 34,
    reviews: [
      {
        id: 'rev-01',
        author: 'Natasha V.',
        rating: 5,
        date: 'October 14, 2026',
        title: 'Breathtaking silk quality',
        comment: 'The drape and movement are extraordinary. Wore this to an art biennial dinner and received endless compliments.',
        verified: true,
        sizePurchased: 'S'
      },
      {
        id: 'rev-02',
        author: 'Camilla R.',
        rating: 5,
        date: 'September 28, 2026',
        title: 'Worth every single rupee',
        comment: 'The heavy 22 momme silk feels so rich and cool on the skin. Sizing is spot on.',
        verified: true,
        sizePurchased: 'M'
      }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'dx-w-dress-02',
    name: 'Minimalist Asymmetric Wrap Dress',
    subtitle: 'Crepe de Chine & Sculptural Ring Hardware',
    price: 19500,
    originalPrice: 23500,
    gender: 'women',
    category: 'women',
    subCategory: 'dresses',
    collection: 'summer-collection',
    tags: ['new', 'exclusive'],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An avant-garde interpretation of evening draping. Features an asymmetric high neckline, diagonal wrap front fastened with a sculptural organic silver ring, and a calf-skimming hem.',
    details: [
      'Custom handcrafted organic silver alloy buckle',
      'Hidden interior waist ties for secure fit',
      'Sleeveless cut with raw clean edge finish'
    ],
    composition: '100% Silk Crepe',
    careInstructions: ['Dry clean only', 'Do not iron directly on metal hardware'],
    fit: 'Fluid wrap drape adaptable across silhouettes.',
    colors: [
      { name: 'Obsidian Black', hex: '#121213' },
      { name: 'Warm Terracotta', hex: '#A85743' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    featured: true
  },

  // ----------------------------------------------------
  // WOMEN - JACKETS & OUTERWEAR
  // ----------------------------------------------------
  {
    id: 'dx-w-jacket-01',
    name: 'Structured Sculpted Wool Blazer',
    subtitle: 'Sharp Shoulders & Cinched Waistline',
    price: 24900,
    originalPrice: 29000,
    gender: 'women',
    category: 'women',
    subCategory: 'jackets',
    collection: 'winter-collection',
    tags: ['bestseller'],
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A masterclass in modern sartorial architecture. Featuring contoured canvas chest construction, prominent padded shoulders, and an hourglass waist sculpt.',
    details: [
      'Full floating canvas front interior',
      'Satin peak lapels with boutonnière detail',
      'Double rear vents for effortless movement',
      'Hand-stitched pick stitching along collar and lapel'
    ],
    composition: '98% Wool, 2% Elastane; Lining: 100% Bemberg Cupro',
    careInstructions: ['Dry clean only', 'Store in breathable garment bag'],
    fit: 'Slim tailored fit with defined hourglass shaping.',
    colors: [
      { name: 'Caviar Black', hex: '#141415' },
      { name: 'Alabaster Ivory', hex: '#F3EFEA' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 46,
    inStock: true,
    featured: true
  },
  {
    id: 'dx-w-jacket-02',
    name: 'Oversized Double-Breasted Wool Overcoat',
    subtitle: 'Virgin Italian Wool & Horn Buttons',
    price: 28900,
    originalPrice: 34500,
    gender: 'women',
    category: 'women',
    subCategory: 'jackets',
    collection: 'winter-collection',
    tags: ['new', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An architectural silhouette crafted from heavyweight virgin wool woven in Biella, Italy. Cut with structured drop shoulders, peak lapels, and hand-carved buffalo horn buttons for a relaxed yet commanding presence.',
    details: [
      'Tailored oversized drop-shoulder cut',
      'Deep welt front pockets & interior passport pocket',
      'Fully lined in cupro twill with interior binding',
      'Finished with hand-carved horn buttons'
    ],
    composition: '100% Virgin Wool; Lining: 100% Cupro',
    careInstructions: ['Dry clean only by luxury garment specialist', 'Store on structured cedar hanger'],
    fit: 'Designed for an oversized, tailored drape. Take your regular size for runway drape, or size down for tailored fit.',
    colors: [
      { name: 'Oatmeal Melange', hex: '#D7CEC7' },
      { name: 'Midnight Charcoal', hex: '#1C1C1E' },
      { name: 'Camel Tan', hex: '#A88458' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    featured: true
  },

  // ----------------------------------------------------
  // WOMEN - TOPS & T-SHIRTS & SHIRTS
  // ----------------------------------------------------
  {
    id: 'dx-w-top-01',
    name: 'Draped Asymmetric Silk Cami',
    subtitle: 'Bias-Cut Silk Satin with Cowl Neck',
    price: 8900,
    originalPrice: 11000,
    gender: 'women',
    category: 'women',
    subCategory: 'tops',
    collection: 'summer-collection',
    tags: ['new', 'trending'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Crafted on the bias to follow body contours without constriction. Ultra-fine micro rouleau shoulder straps and an asymmetrical draped neckline.',
    details: [
      'Bias cut for natural fluid stretch',
      'Adjustable delicate spaghetti straps',
      'Double layered front for complete opacity'
    ],
    composition: '100% Silk Satin',
    careInstructions: ['Dry clean or delicate hand wash cold', 'Steam gently'],
    fit: 'True to size fluid fit.',
    colors: [
      { name: 'Champagne Gold', hex: '#E2D4B7' },
      { name: 'Pitch Black', hex: '#0B0B0C' },
      { name: 'Pearl Cream', hex: '#F7F5F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.7,
    reviewsCount: 22,
    inStock: true
  },
  {
    id: 'dx-w-tee-01',
    name: 'Sculpted Mockneck Pima Cotton Tee',
    subtitle: 'Ultra-Fine 80s Two-Ply Peruvian Pima',
    price: 5200,
    gender: 'women',
    category: 'women',
    subCategory: 't-shirts',
    collection: 'minimalist-essentials',
    tags: ['bestseller'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An elevated basic redefined. Features a subtle raised mock collar, elongated clean-finished sleeves, and a silky compact knit that never loses shape.',
    details: [
      'Silky lustrous compact cotton weave',
      'Double-stitched seamless neckline',
      'Pre-shrunk for permanent dimensional stability'
    ],
    composition: '100% Long-Staple Peruvian Pima Cotton',
    careInstructions: ['Machine wash cold gentle', 'Dry flat', 'Iron on low'],
    fit: 'Tailored slim silhouette.',
    colors: [
      { name: 'Pristine White', hex: '#FFFFFF' },
      { name: 'Deep Black', hex: '#111112' },
      { name: 'Warm Taupe', hex: '#9E9486' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 58,
    inStock: true
  },
  {
    id: 'dx-w-shirt-01',
    name: 'Oversized Crisp Poplin Shirt',
    subtitle: 'Egyptian Giza Cotton & Mother-of-Pearl Buttons',
    price: 11500,
    originalPrice: 14000,
    gender: 'women',
    category: 'women',
    subCategory: 'shirts',
    collection: 'new-arrivals',
    tags: ['new', 'trending'],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'The definitive architectural white shirt. Features a dropped shoulder seam, elongated French cuffs, and a sculpted curved hemline designed to be worn untucked or loosely French-tucked.',
    details: [
      'High-thread count crisp Giza 87 poplin',
      'Hand-sewn Australian mother-of-pearl buttons',
      'Exaggerated spread collar with floating interlining'
    ],
    composition: '100% Egyptian Giza Cotton',
    careInstructions: ['Machine wash 30°C delicate', 'Warm steam press while slightly damp'],
    fit: 'Generously oversized architectural drape.',
    colors: [
      { name: 'Optic White', hex: '#FAF9F6' },
      { name: 'Powder Blue', hex: '#D0DBE5' },
      { name: 'Soft Sand', hex: '#EAE5D9' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 41,
    inStock: true,
    featured: true
  },

  // ----------------------------------------------------
  // WOMEN - JEANS, TROUSERS & SKIRTS
  // ----------------------------------------------------
  {
    id: 'dx-w-jean-01',
    name: 'High-Rise Wide-Leg Organic Jeans',
    subtitle: '13oz Rigid Selvedge Denim in Ecru Wash',
    price: 13800,
    originalPrice: 16500,
    gender: 'women',
    category: 'women',
    subCategory: 'jeans',
    collection: 'trending',
    tags: ['trending', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Cut with an elongated rise that sits securely at the natural waist and falls into a fluid, floor-grazing wide leg. Made from untreated organic cotton denim.',
    details: [
      'High 12-inch rise with button fly',
      'Antiqued silver hardware with DropX debossing',
      'Clean finished hem with chainstitch embroidery'
    ],
    composition: '100% Organic Cotton (Rigid)',
    careInstructions: ['Wash inside out on cold', 'Hang dry in shade to preserve color'],
    fit: 'Fitted through high waist, relaxed and wide through hips and leg.',
    colors: [
      { name: 'Raw Ecru', hex: '#E8E4DA' },
      { name: 'Vintage Stone Blue', hex: '#586A7A' },
      { name: 'Washed Black', hex: '#2A2A2D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewsCount: 36,
    inStock: true
  },
  {
    id: 'dx-w-trouser-01',
    name: 'High-Waisted Pleated Palazzo Trousers',
    subtitle: 'Fluid Wool Twill with Pressed Creases',
    price: 16500,
    originalPrice: 19800,
    gender: 'women',
    category: 'women',
    subCategory: 'trousers',
    collection: 'minimalist-essentials',
    tags: ['bestseller'],
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Impeccable volume tailored for fluid movement. Knife pleats descend from a wide structured waistband, cascading into a sweeping full-length silhouette.',
    details: [
      'Double front knife pleats with razor-sharp crease',
      'Extended waistband with concealed tab closure',
      'Side slash pockets and back welt pockets'
    ],
    composition: '98% Virgin Wool, 2% Elastane',
    careInstructions: ['Dry clean only', 'Press with protective damp cloth'],
    fit: 'High rise, dramatic wide-leg palazzo drape.',
    colors: [
      { name: 'Alabaster Ivory', hex: '#F5F2EC' },
      { name: 'Deep Midnight', hex: '#161922' },
      { name: 'Olive Drab', hex: '#4B4E3E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 27,
    inStock: true
  },
  {
    id: 'dx-w-skirt-01',
    name: 'Bias-Cut Silk Charmeuse Maxi Skirt',
    subtitle: 'Heavy 19-Momme Silk with Elastic Waist',
    price: 14200,
    originalPrice: 17500,
    gender: 'women',
    category: 'women',
    subCategory: 'skirts',
    collection: 'runway-edition',
    tags: ['exclusive', 'trending'],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A liquid-like silhouette that glides over the hips. Cut diagonally across the grain of heavy silk charmeuse, providing effortless give and a flattering fishtail hemline.',
    details: [
      'Bias cut for subtle natural stretch and fluid drape',
      'Comfortable concealed elastic waistband',
      'Floor-sweeping maxi length with clean merrow hem'
    ],
    composition: '100% Pure Mulberry Silk Charmeuse',
    careInstructions: ['Specialist dry clean only', 'Steam delicately on reverse'],
    fit: 'Fluid bias fit that skims the silhouette gracefully.',
    colors: [
      { name: 'Champagne Taupe', hex: '#CDBFA8' },
      { name: 'Liquid Bronze', hex: '#634A35' },
      { name: 'Ink Black', hex: '#0F0F10' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    featured: true
  },

  // ----------------------------------------------------
  // WOMEN - ETHNIC WEAR (MODERN LUXURY RETAIL)
  // ----------------------------------------------------
  {
    id: 'dx-w-ethnic-01',
    name: 'Contemporary Handwoven Silk Kurta Set',
    subtitle: 'Chanderi Silk Kurta & Cigarette Trousers',
    price: 24500,
    originalPrice: 29500,
    gender: 'women',
    category: 'women',
    subCategory: 'ethnic-wear',
    collection: 'runway-edition',
    tags: ['new', 'exclusive'],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A celebration of Indian heritage woven for the international stage. Features a minimalist straight silhouette with delicate Zari hand-embroidered edges, paired with tailored silk-cotton trousers and sheer organza dupatta.',
    details: [
      'Handspun Chanderi silk with subtle metallic sheen',
      'Concealed placket with hand-stitched detailing',
      'Includes coordinated high-rise cigarette trousers and dupatta'
    ],
    composition: '70% Chanderi Silk, 30% Fine Cotton; Lining: 100% Mulmul Cotton',
    careInstructions: ['Dry clean only by luxury garment specialist', 'Store in cotton bag'],
    fit: 'Modern straight silhouette with comfortable side slits.',
    colors: [
      { name: 'Ivory Gold', hex: '#EDE8D5' },
      { name: 'Midnight Navy', hex: '#161F30' },
      { name: 'Blush Rose', hex: '#DFBDB5' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    featured: true
  },

  // ----------------------------------------------------
  // MEN - T-SHIRTS & SHIRTS & POLOS
  // ----------------------------------------------------
  {
    id: 'dx-m-tee-01',
    name: 'Heavyweight Boxy Supima T-Shirt',
    subtitle: '300 GSM Combed American Supima Cotton',
    price: 4900,
    gender: 'men',
    category: 'men',
    subCategory: 't-shirts',
    collection: 'minimalist-essentials',
    tags: ['bestseller'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Engineered with an architectural boxy drape. Cut from an ultra-dense 300 GSM combed Supima jersey that holds its geometric posture all day without clinging.',
    details: [
      'Dense 300 GSM luxury jersey construction',
      'Thick 1.25" rib-knit collar with shape memory',
      'Seamless tubular side construction'
    ],
    composition: '100% Certified American Supima Cotton',
    careInstructions: ['Machine wash cold inside out', 'Tumble dry low or hang dry', 'Warm iron'],
    fit: 'Modern boxy fit with slightly dropped shoulders.',
    colors: [
      { name: 'Washed Charcoal', hex: '#262628' },
      { name: 'Pure Chalk', hex: '#F7F6F2' },
      { name: 'Sand Khaki', hex: '#C2B69D' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewsCount: 84,
    inStock: true
  },
  {
    id: 'dx-m-shirt-01',
    name: 'Crisp Poplin Relaxed Overshirt',
    subtitle: '120s Two-Ply Italian Cotton & Horn Buttons',
    price: 12900,
    originalPrice: 15500,
    gender: 'men',
    category: 'men',
    subCategory: 'shirts',
    collection: 'summer-collection',
    tags: ['new'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'The definitive transitional overshirt. Cut with a square camp collar, oversized chest patch pockets, and straight hem with side vents for seamless layering.',
    details: [
      'Italian 120s compact cotton poplin',
      'Natural horn buttons with DropX debossing',
      'Twin chest patch pockets with pen slot'
    ],
    composition: '100% Italian Compact Cotton',
    careInstructions: ['Machine wash delicate cold', 'Hang dry', 'Steam or iron while damp'],
    fit: 'Relaxed tailored overshirt cut for effortless layering.',
    colors: [
      { name: 'Sky Crisp Blue', hex: '#CBD9E6' },
      { name: 'Clean White', hex: '#FFFFFF' },
      { name: 'Olive Canvas', hex: '#4F5342' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewsCount: 39,
    inStock: true
  },
  {
    id: 'dx-m-polo-01',
    name: 'Fine Gauge Merino Knit Polo',
    subtitle: '18-Gauge Extra-Fine Zegna Baruffa Yarn',
    price: 12500,
    originalPrice: 14900,
    gender: 'men',
    category: 'men',
    subCategory: 'polo-shirts',
    collection: 'minimalist-essentials',
    tags: ['bestseller'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Ultra-refined knit polo featuring an open spread collar without buttons for a relaxed European leisure aesthetic. Knitted from breathable Australian merino wool.',
    details: [
      'Fashioned shoulder armholes with needle-drop detailing',
      'Ultra-soft handle, wearable directly on bare skin',
      'Flat-knit ribbed hem sits cleanly on trousers'
    ],
    composition: '100% Extra-Fine Merino Wool',
    careInstructions: ['Hand wash cold with wool detergent', 'Dry flat in shade'],
    fit: 'Tailored fit that contours the upper torso comfortably.',
    colors: [
      { name: 'Warm Taupe', hex: '#9E9486' },
      { name: 'Navy Midnight', hex: '#182436' },
      { name: 'Chalk Cream', hex: '#EDE8E0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    featured: true
  },

  // ----------------------------------------------------
  // MEN - JEANS, TROUSERS & SHORTS
  // ----------------------------------------------------
  {
    id: 'dx-m-jean-01',
    name: 'Raw Selvedge Straight-Leg Jeans',
    subtitle: '14.5oz Japanese Okayama Shuttle-Loom Denim',
    price: 15800,
    originalPrice: 18500,
    gender: 'men',
    category: 'men',
    subCategory: 'jeans',
    collection: 'trending',
    tags: ['new', 'trending'],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Woven on vintage shuttle looms in Kojima, Okayama. Cut straight through the leg with a classic mid-rise and red-line selvedge ID revealed when cuffed.',
    details: [
      '14.5oz unsanforized Japanese selvedge denim',
      'Custom copper punch-through rivets and donut buttons',
      'Heavy canvas pocket bags and lined rear pockets'
    ],
    composition: '100% Long-Staple Cotton Selvedge',
    careInstructions: ['Wear 6 months before initial cold soak', 'Line dry outdoors in shade'],
    fit: 'Classic straight cut with authentic room through thigh and calf.',
    colors: [
      { name: 'Deep Indigo Selvedge', hex: '#151D2A' },
      { name: 'Cast Black Selvedge', hex: '#18181A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewsCount: 63,
    inStock: true
  },
  {
    id: 'dx-m-trouser-01',
    name: 'Sartorial Double-Pleated Trousers',
    subtitle: 'High-Waist Drape in Wool Gabardine',
    price: 14500,
    originalPrice: 17000,
    gender: 'men',
    category: 'men',
    subCategory: 'trousers',
    collection: 'minimalist-essentials',
    tags: ['new', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Designed with deep forward double pleats and an extended waistband with side adjusters. Cut from high-twist English wool gabardine that drops flawlessly over boots or loafers.',
    details: [
      'Side tab adjusters with gunmetal hardware (no belt loops required)',
      'Split rear curtain waistband for custom alteration ease',
      'Pre-cuffed 2-inch hem with internal heel guards'
    ],
    composition: '100% High-Twist Wool Gabardine',
    careInstructions: ['Dry clean only', 'Press with damp press cloth'],
    fit: 'High-rise, relaxed wide-leg taper.',
    colors: [
      { name: 'Chalk White', hex: '#F2EFEB' },
      { name: 'Onyx Black', hex: '#111112' },
      { name: 'Forest Olive', hex: '#3A3F36' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    featured: true
  },
  {
    id: 'dx-m-short-01',
    name: 'Tailored Pleated Linen Shorts',
    subtitle: '100% Normandy Flax Linen with Horn Side Tabs',
    price: 8500,
    originalPrice: 10500,
    gender: 'men',
    category: 'men',
    subCategory: 'shorts',
    collection: 'summer-collection',
    tags: ['trending'],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Resort sophistication engineered for warm afternoons. Features single front pleats, an 7-inch inseam hitting right above the knee, and breathable pure Normandy linen.',
    details: [
      'Pre-washed Normandy flax for lived-in softness',
      'Adjustable side buckled tabs',
      'Cotton pocket linings and coin pouch'
    ],
    composition: '100% Normandy Linen',
    careInstructions: ['Machine wash cold gentle', 'Hang dry in shade'],
    fit: 'Relaxed tailored fit with clean above-knee drape.',
    colors: [
      { name: 'Natural Ecru', hex: '#DDD6C6' },
      { name: 'Navy Stone', hex: '#232D3B' },
      { name: 'Terracotta Clay', hex: '#9E5B4B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviewsCount: 25,
    inStock: true
  },

  // ----------------------------------------------------
  // MEN - HOODIES & SWEATSHIRTS
  // ----------------------------------------------------
  {
    id: 'dx-m-hoodie-01',
    name: 'French Terry Luxury Heavyweight Hoodie',
    subtitle: '480 GSM Loopback Cotton & Double-Lined Hood',
    price: 9900,
    originalPrice: 12000,
    gender: 'men',
    category: 'men',
    subCategory: 'hoodies',
    collection: 'winter-collection',
    tags: ['bestseller'],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Substantial, protective, and sculptural. Built without visible drawstring cords for a clean architectural silhouette, using custom 480 GSM loopback cotton.',
    details: [
      'Heavyweight 480 GSM combed cotton',
      'Double-ply crossover hood stands upright without drooping',
      'Discreet hidden side seam pockets instead of pouch'
    ],
    composition: '100% Combed Heavy Cotton Loopback',
    careInstructions: ['Machine wash cold', 'Dry flat', 'Do not tumble dry'],
    fit: 'Generous relaxed oversized cut.',
    colors: [
      { name: 'Anthracite Grey', hex: '#2C2D30' },
      { name: 'Raw Sand', hex: '#D2C8B5' },
      { name: 'Onyx Black', hex: '#121213' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewsCount: 77,
    inStock: true
  },
  {
    id: 'dx-m-sweat-01',
    name: 'Minimalist Loopback Crewneck Sweatshirt',
    subtitle: 'Raglan Sleeve Silhouette & Blind Hemming',
    price: 8200,
    originalPrice: 9900,
    gender: 'men',
    category: 'men',
    subCategory: 'sweatshirts',
    collection: 'minimalist-essentials',
    tags: ['new'],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Clean geometry meets effortless everyday luxury. Ergonomic raglan sleeve seams eliminate friction and emphasize broader shoulders, while heavy flatlock stitching guarantees longevity.',
    details: [
      'Ergonomic raglan cut',
      'Flatlock anti-chafing seams throughout',
      'Subtle tonal DropX micro-embroidery at nape'
    ],
    composition: '100% Organic French Terry Cotton',
    careInstructions: ['Machine wash 30°C', 'Hang to dry'],
    fit: 'Regular relaxed modern fit.',
    colors: [
      { name: 'Heather Oatmeal', hex: '#DCD4C7' },
      { name: 'Washed Black', hex: '#222225' },
      { name: 'Dark Moss', hex: '#3F4435' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviewsCount: 38,
    inStock: true
  },

  // ----------------------------------------------------
  // MEN - JACKETS & OUTERWEAR
  // ----------------------------------------------------
  {
    id: 'dx-m-jacket-01',
    name: 'Shearling-Lined Aviation Bomber',
    subtitle: 'Spanish Merino Shearling & Antiqued Brass',
    price: 49500,
    originalPrice: 58000,
    gender: 'men',
    category: 'men',
    subCategory: 'jackets',
    collection: 'winter-collection',
    tags: ['limited', 'exclusive', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An iconic aviator jacket reimagined for the modern collector. Sourced from plush Spanish Merino shearling with a cracked nappa exterior and substantial collar buckle straps.',
    details: [
      'Plush 20mm ironed shearling interior fleece',
      'Heavyweight 2-way RiRi zip closure',
      'Twin collar latch straps with solid antiqued brass buckles'
    ],
    composition: '100% Spanish Merino Sheepskin Shearling',
    careInstructions: ['Specialist leather and shearling cleaning only'],
    fit: 'Classic cropped bomber fit with relaxed shoulders.',
    colors: [
      { name: 'Dark Chestnut', hex: '#4A3528' },
      { name: 'Carbon Black', hex: '#1E1E20' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 5.0,
    reviewsCount: 18,
    inStock: true,
    featured: true
  },
  {
    id: 'dx-m-jacket-02',
    name: 'Raw Selvedge Denim Chore Jacket',
    subtitle: '14.5oz Japanese Kurabo Indigo Denim',
    price: 16800,
    originalPrice: 19500,
    gender: 'men',
    category: 'men',
    subCategory: 'jackets',
    collection: 'trending',
    tags: ['limited', 'new'],
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Woven on vintage shuttle looms in Okayama, Japan. Finished with selvedge edge detail exposed along the interior placket, custom cast silver rivets, and deep watch pockets.',
    details: [
      'Redline selvedge visible on interior facings',
      'Hand-hammered custom branded copper donut buttons',
      'Triple-needle chainstitching throughout stress points'
    ],
    composition: '100% Sanforized Kurabo Cotton Selvedge',
    careInstructions: ['Wash sparingly inside out with cold water', 'Line dry in shade'],
    fit: 'Boxy workwear fit with room for layering.',
    colors: [
      { name: 'Raw Deep Indigo', hex: '#1C2833' },
      { name: 'Washed Ash', hex: '#565656' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewsCount: 34,
    inStock: true
  },
  {
    id: 'dx-m-knit-01',
    name: 'Heavyweight Ribbed Cashmere Turtleneck',
    subtitle: '7-Gauge Mongolian Cashmere Knit',
    price: 18500,
    originalPrice: 22000,
    gender: 'men',
    category: 'men',
    subCategory: 'sweatshirts',
    collection: 'winter-collection',
    tags: ['sale', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Spun from the finest sustainably combed Inner Mongolian cashmere fibers. A substantial 7-gauge knit with seamless tubular construction and an enveloping ribbed rollneck.',
    details: [
      'Seamless 3D knit body for zero friction',
      'Reinforced ribbed cuffs and hem that retain shape',
      'Unsurpassed softness with natural thermoregulation'
    ],
    composition: '100% Grade-A Mongolian Cashmere',
    careInstructions: ['Hand wash cold with cashmere wash', 'Dry flat', 'Fold gently, never hang'],
    fit: 'Relaxed modern fit.',
    colors: [
      { name: 'Dark Ecru', hex: '#DBD2C4' },
      { name: 'Charcoal Slate', hex: '#2B2C2D' },
      { name: 'Espresso', hex: '#3B2F2F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 51,
    inStock: true,
    featured: true
  },

  // ----------------------------------------------------
  // ACCESSORIES / FOOTWEAR
  // ----------------------------------------------------
  {
    id: 'dx-acc-01',
    name: 'Handcrafted Calfskin Leather Tote',
    subtitle: 'Full-Grain Tuscan Vachetta Leather',
    price: 32000,
    originalPrice: 38000,
    gender: 'unisex',
    category: 'accessories',
    subCategory: 'accessories',
    collection: 'minimalist-essentials',
    tags: ['bestseller'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Handcrafted by third-generation leather artisans in Florence. Pure unadorned geometry with edge-painted seams, suede microfiber lining, and a magnetic bridge closure.',
    details: [
      'Vegetable-tanned full-grain Italian leather',
      'Removable interior zip pouch with debossed serial number',
      'Reinforced bottom panel with protective brass studs'
    ],
    composition: '100% Italian Calf Vachetta Leather',
    careInstructions: ['Wipe clean with soft microfiber cloth', 'Condition twice yearly with natural beeswax cream'],
    fit: 'Dimensions: 42cm W x 34cm H x 15cm D. Accommodates 16" laptop.',
    colors: [
      { name: 'Espresso Cognac', hex: '#543D2B' },
      { name: 'Matte Nero', hex: '#161617' }
    ],
    sizes: ['One Size'],
    rating: 5.0,
    reviewsCount: 67,
    inStock: true,
    featured: true
  },
  {
    id: 'dx-acc-02',
    name: 'Sculpted Chelsea Ankle Boot',
    subtitle: 'Polished Box Calf & Chiseled Square Toe',
    price: 23500,
    originalPrice: 27000,
    gender: 'unisex',
    category: 'accessories',
    subCategory: 'accessories',
    collection: 'winter-collection',
    tags: ['new'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A striking square-toe profile defined by clean architectural lines. Goodyear-welted leather sole with inset rubber island for wet weather traction and effortless durability.',
    details: [
      'Goodyear-welted construction (fully resoleable)',
      'Subtle 40mm stacked cuban heel',
      'Tonal elastic side gussets and pull-on tab'
    ],
    composition: 'Upper: 100% Box Calfskin; Sole: Oak-Bark Tanned Leather',
    careInstructions: ['Polish regularly with neutral cream', 'Use cedar shoe trees after wear'],
    fit: 'Fits true to size.',
    colors: [
      { name: 'Gloss Nero', hex: '#101010' },
      { name: 'Oxblood Cordovan', hex: '#4A1D24' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    rating: 4.9,
    reviewsCount: 31,
    inStock: true
  },
  {
    id: 'dx-acc-03',
    name: 'Geometric Acetate Sunframes',
    subtitle: 'Hand-Polished Japanese Mazzucchelli Acetate',
    price: 9800,
    originalPrice: 12000,
    gender: 'unisex',
    category: 'accessories',
    subCategory: 'accessories',
    collection: 'trending',
    tags: ['new', 'sale'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Thick-beveled architectural sunglasses inspired by 1970s Milanese modernism. Fitted with scratch-resistant Carl Zeiss lenses providing 100% UVA/UVB protection.',
    details: [
      'Custom 7-barrel hinges with barrel-lock screws',
      'Zeiss CR-39 anti-reflective tinted lenses',
      'Includes handcrafted leather case and silk cleaning cloth'
    ],
    composition: '100% Bio-Acetate & German Hardware',
    careInstructions: ['Rinse with lukewarm water and clean with provided cloth'],
    fit: 'Universal fit with sculpted nose bridge.',
    colors: [
      { name: 'Amber Tortoiseshell', hex: '#694125' },
      { name: 'Solid Jet Black', hex: '#111111' }
    ],
    sizes: ['One Size'],
    rating: 4.9,
    reviewsCount: 28,
    inStock: true
  }
];

export const COLLECTIONS_DATA = [
  {
    id: 'autumn-winter',
    name: 'Autumn / Winter Couture',
    subtitle: 'The Architecture of Silhouette',
    quote: '"Form without excess. Presence without shouting."',
    description: 'A study in quiet authority through sculpted outerwear, raw-edge Italian cashmeres, and deliberate monochrome tailoring built to weather any season with dignified posture.',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
    editorialImage1: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    editorialImage2: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=85',
    year: '2026 / 2027',
    categoryTarget: 'winter-collection'
  },
  {
    id: 'runway-edition',
    name: 'Runway Edition & Evening Draping',
    subtitle: 'Movement in Pure Mulberry Silk',
    quote: '"In every fluid crease lies an unspoken dialogue between body and fabric."',
    description: 'Asymmetric cuts, bias-cut silk skirts, and evening trench gowns designed to celebrate tactile intimacy and effortless cinematic motion under low evening light.',
    heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
    editorialImage1: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    editorialImage2: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    year: '2026 Collection',
    categoryTarget: 'runway-edition'
  },
  {
    id: 'minimalist-essentials',
    name: 'Minimalist Essentials',
    subtitle: 'Sartorial Foundations For The Discerning',
    quote: '"Perfection is reached not when there is nothing left to add, but nothing left to take away."',
    description: 'Foundational uniform wardrobe pieces engineered with obsessive precision. Heavy wool trousers, structured canvas-chest blazers, and unblemished Tuscan leather accessories.',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    editorialImage1: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
    editorialImage2: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
    year: 'Permanent Archive',
    categoryTarget: 'minimalist-essentials'
  }
];

export const PRESS_QUOTES = [
  {
    quote: "DROPX proves that pure restraint and uncompromising textile selection can redefine modern haute prêt-à-porter.",
    publication: "VOGUE",
    author: "International Fashion Desk"
  },
  {
    quote: "The quiet luxury phenomenon distilled into its most immaculate, wearable architectural form.",
    publication: "HARPER’S BAZAAR",
    author: "Critic's Choice"
  },
  {
    quote: "Precision cutting and fabrics so tactile that it leaves mass-market luxury in the dust.",
    publication: "GQ STYLE",
    author: "Seasonal Review"
  }
];

export const BRAND_STORY = {
  title: "The DropX Philosophy",
  headline: "Reclaiming the Dignity of Modern Ready-to-Wear Fashion",
  paragraphs: [
    "DROPX was conceived not as another seasonal conveyor belt, but as a sanctuary for deliberate, patient creation. In our partnered manufacturing facilities spanning Biella, Florence, and Okayama, clothing is treated as wearable sculpture—anchored in architectural silhouettes while stripped of superfluous ornamentation.",
    "Every seam is considered. We work exclusively with certified ethical natural fibers: unadulterated Mongolian cashmere, 22-momme Mulberry silks, Biella virgin wools, and organic Japanese selvedge denim that enriches with age and patina rather than degrading.",
    "Our garments are made for those who walk into a room and command reverence without speaking a single word."
  ]
};
