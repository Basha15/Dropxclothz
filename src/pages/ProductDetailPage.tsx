import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Ruler, 
  Truck, 
  RotateCcw,
  Star,
  ShieldCheck,
  Share2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/currency';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [addedToast, setAddedToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordion states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    composition: false,
    care: false,
    shipping: false
  });

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState(product?.reviews || []);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recentProducts, addRecentlyViewed } = useRecentlyViewed();

  // Reset states on product change & register recently viewed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIndex(0);
    setSelectedColorIndex(0);
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
    if (product) {
      addRecentlyViewed(product.id);
      setLocalReviews(product.reviews || []);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
        <h2 className="font-serif text-3xl text-[#171719]">Garment Not Found</h2>
        <p className="text-xs text-[#7A7670] mt-2 mb-6">The creation you seek may have been moved or archived.</p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#171719] text-white text-xs uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#171719] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedColor, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsCheckoutOpen(true);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: 'Just now',
      title: 'Verified Buyer',
      comment: reviewComment.trim(),
      verified: true,
      sizePurchased: selectedSize
    };
    setLocalReviews([newRev, ...localReviews]);
    setReviewAuthor('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  // Related products (same gender or category, excluding current)
  const relatedProducts = PRODUCTS.filter(
    (p) => (p.category === product.category || p.gender === product.gender) && p.id !== product.id
  ).slice(0, 4);

  // Recently viewed excluding current
  const otherRecent = recentProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-[#171719] text-white px-5 py-3.5 shadow-2xl flex items-center gap-3 border border-[#C5A880]/50"
          >
            <Check className="w-4 h-4 text-[#C5A880]" />
            <span className="text-xs tracking-wider uppercase">Added to your shopping bag</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-[11px] text-[#7A7670] uppercase tracking-widest flex items-center gap-2">
        <Link to="/" className="hover:text-[#171719]">Home</Link>
        <span>/</span>
        <Link to={`/${product.gender}`} className="hover:text-[#171719]">{product.gender}'s Clothing</Link>
        <span>/</span>
        <span className="text-[#171719] font-medium truncate">{product.name}</span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          
          {/* Left Column: Image Gallery with Magnifier Zoom */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[750px] flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-26 overflow-hidden rounded-sm border transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#171719] ring-1 ring-[#171719]'
                        : 'border-[#D8D2C7] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image with Zoom */}
            <div
              className="flex-1 relative aspect-[3/4] overflow-hidden bg-[#F0ECE1] rounded-sm cursor-crosshair group shadow-sm"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImageIndex] || product.images[0] || FALLBACK_IMAGE}
                alt={product.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className={`w-full h-full object-cover object-center transition-all duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
              />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.tags.includes('new') && (
                  <span className="bg-[#171719] text-[#FAF8F5] text-[10px] tracking-[0.2em] font-medium uppercase px-3 py-1">
                    NEW ARRIVAL
                  </span>
                )}
                {product.tags.includes('bestseller') && (
                  <span className="bg-[#C5A880] text-[#171719] text-[10px] tracking-[0.2em] font-semibold uppercase px-3 py-1">
                    BEST SELLER
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-[#8E2828] text-white text-[10px] tracking-[0.15em] font-medium uppercase px-2.5 py-1">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-2.5 py-1 pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity">
                Hover to Zoom
              </div>
            </div>
          </div>

          {/* Right Column: Product Actions & Configuration */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold">
                  {product.gender} • {product.subCategory.replace('-', ' ')}
                </span>
                
                <div className="flex items-center gap-1.5 text-xs text-[#171719]">
                  <div className="flex text-[#C5A880]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-[#C5A880]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-xs">{product.rating}</span>
                  <span className="text-[#8C8880] text-[11px]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-2 font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-[#7A7670] mt-1 font-light tracking-wide">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-serif text-3xl font-semibold text-[#171719]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-[#8C8880] line-through font-light">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-[#8E2828]/10 text-[#8E2828] text-xs font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Tax & shipping note */}
              <p className="text-[11px] text-[#7A7670] mt-1">
                Prices inclusive of all applicable luxury retail taxes. Free courier delivery.
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5A5852] font-light leading-relaxed border-t border-[#E8E4DC] pt-4">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-semibold uppercase tracking-wider text-[#171719]">
                  Color: <span className="font-normal text-[#5A5852]">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      selectedColorIndex === idx
                        ? 'border-[#171719] ring-2 ring-[#171719] scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Color ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-semibold uppercase tracking-wider text-[#171719]">
                  Select Size: <strong className="text-[#171719]">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] uppercase tracking-wider text-[#C5A880] hover:text-[#171719] flex items-center gap-1 font-medium transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-semibold uppercase tracking-wider border transition-all ${
                      selectedSize === size
                        ? 'bg-[#171719] text-white border-[#171719] shadow-md'
                        : 'bg-white text-[#171719] border-[#D8D2C7] hover:border-[#171719]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D8D2C7] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-xs hover:bg-[#F5F2EB] text-[#171719]"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#171719]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-xs hover:bg-[#F5F2EB] text-[#171719]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#171719] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#0D0D0E] text-xs font-medium uppercase tracking-[0.25em] transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-colors ${
                    isWishlisted
                      ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]'
                      : 'border-[#D8D2C7] text-[#171719] hover:border-[#171719]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button (Direct to checkout) */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-transparent border-2 border-[#171719] hover:bg-[#171719] text-[#171719] hover:text-white text-xs font-medium uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Buy Now (Instant Checkout)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Perks Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#7A7670]">
              <div className="flex items-center gap-2 bg-[#F4EFE6] p-2.5 rounded-sm">
                <Truck className="w-4 h-4 text-[#C5A880]" />
                <span>Complimentary Courier</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F4EFE6] p-2.5 rounded-sm">
                <RotateCcw className="w-4 h-4 text-[#C5A880]" />
                <span>30-Day Effortless Returns</span>
              </div>
            </div>

            {/* Accordions for Details, Composition, Care, Shipping */}
            <div className="border-t border-[#E8E4DC] pt-4 divide-y divide-[#E8E4DC]">
              {/* Product Specifications & Details */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#171719]"
                >
                  <span>Product Specifications & Details</span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <div className="mt-3 text-xs text-[#5A5852] space-y-1.5 font-light">
                    <ul className="list-disc list-inside space-y-1">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[#171719]"><strong>Fit note:</strong> {product.fit}</p>
                  </div>
                )}
              </div>

              {/* Composition */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('composition')}
                  className="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#171719]"
                >
                  <span>Fabric Composition</span>
                  {openAccordions.composition ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.composition && (
                  <p className="mt-3 text-xs text-[#5A5852] font-light leading-relaxed">
                    {product.composition}
                  </p>
                )}
              </div>

              {/* Care Instructions */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#171719]"
                >
                  <span>Garment Care & Longevity</span>
                  {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.care && (
                  <ul className="mt-3 text-xs text-[#5A5852] space-y-1 list-disc list-inside font-light">
                    {product.careInstructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Delivery Information */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#171719]"
                >
                  <span>Courier Delivery & Returns</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <div className="mt-3 text-xs text-[#5A5852] space-y-2 font-light leading-relaxed">
                    <p>
                      <strong>Domestic & International Express:</strong> Dispatched in structured, climate-controlled garment boxes within 24-48 hours.
                    </p>
                    <p>
                      <strong>Complimentary Returns:</strong> Eligible for free return or exchange within 30 days of delivery with original security tag intact.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Share link button */}
            <div className="pt-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-xs text-[#7A7670] hover:text-[#171719] uppercase tracking-wider"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied to Clipboard' : 'Share This Creation'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-[#F5F1EB] border-y border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                CLIENT DIALOGUE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171719] mt-1">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A880]" />
                  ))}
                </div>
                <span className="text-sm font-semibold">{product.rating} out of 5.0</span>
                <span className="text-xs text-[#7A7670]">({localReviews.length} client assessments)</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-2.5 bg-[#171719] text-white hover:bg-[#C5A880] hover:text-[#171719] text-xs uppercase tracking-widest font-medium transition-colors self-start md:self-auto"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {/* Interactive Review Form */}
          {showReviewForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddReview}
              className="bg-white p-6 sm:p-8 border border-[#E8E4DC] mb-10 space-y-4 max-w-2xl"
            >
              <h3 className="font-serif text-xl text-[#171719]">Share Your Assessment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full border border-[#D8D2C7] p-2.5 text-xs focus:outline-none focus:border-[#171719]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full border border-[#D8D2C7] p-2.5 text-xs focus:outline-none focus:border-[#171719]"
                  >
                    <option value={5}>5 Stars - Exceptional</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Satisfactory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A7670] mb-1">Review Comments</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Comment on the fabric handle, fit, drape, and overall silhouette..."
                  className="w-full border border-[#D8D2C7] p-2.5 text-xs focus:outline-none focus:border-[#171719]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#171719] text-white text-xs uppercase tracking-widest hover:bg-[#C5A880] transition-colors"
              >
                Submit Review
              </button>
            </motion.form>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localReviews.length === 0 ? (
              <p className="text-xs text-[#7A7670]">No reviews written yet. Be the first to share your thoughts.</p>
            ) : (
              localReviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-white border border-[#E8E4DC] rounded-sm shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#171719]">{rev.author}</span>
                    <span className="text-[10px] text-[#8C8880]">{rev.date}</span>
                  </div>
                  <div className="flex text-[#C5A880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                  <p className="font-serif text-sm text-[#171719] font-medium">{rev.title}</p>
                  <p className="text-xs text-[#5A5852] font-light leading-relaxed">{rev.comment}</p>
                  {rev.sizePurchased && (
                    <span className="inline-block text-[10px] text-[#8C8880] bg-[#FAF8F5] px-2 py-0.5 border border-[#E8E4DC]">
                      Size Purchased: {rev.sizePurchased}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                CURATED COMPLEMENTS
              </span>
              <h2 className="font-serif text-3xl text-[#171719] mt-1">
                You May Also Admire
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest text-[#171719] hover:text-[#C5A880] flex items-center gap-1.5"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {otherRecent.length > 0 && (
        <section className="py-16 bg-[#F4EFE6]/60 border-t border-[#E8E4DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                YOUR ARCHIVE HISTORY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171719] mt-1">
                Recently Viewed
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {otherRecent.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modals */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};
