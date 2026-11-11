import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UtensilsCrossed,
  ShoppingBag,
  HeartPulse,
  Croissant,
  Beef,
  Apple,
  GlassWater,
  Grid,
  ArrowRight,
  Star,
  Clock,
  Truck,
  ChevronRight,
  ChevronLeft,
  Heart,
} from 'lucide-react';
import { vendors } from '../../data/mockData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, vendorId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [vendorId]: !prev[vendorId] }));
  };

  // Slides matching the authentic gourmet food showcase from reference mockup
  const heroSlides = [
    {
      id: 0,
      title1: 'Your Favourite',
      title2: 'Food & Essentials',
      title3: 'From Multiple Vendors',
      highlight: 'In One Delivery',
      subtitle: 'Order from different vendors and get everything in a single delivery.',
      buttonText: 'Order Now',
      buttonLink: '/vendors',
      image:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Gourmet Double Burger with Crispy Seasoned Fries and Beverage',
    },
    {
      id: 1,
      title1: 'Fresh Groceries',
      title2: '& Daily Essentials',
      title3: 'From Top Supermarkets',
      highlight: 'Delivered Together',
      subtitle: 'Fresh produce, dairy, bakery items, and pharmacy supplies in a unified checkout.',
      buttonText: 'Explore Groceries',
      buttonLink: '/vendors?category=grocery',
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Fresh organic fruits, vegetables and supermarket goods',
    },
    {
      id: 2,
      title1: 'Hot Cheesy Pizzas',
      title2: '& Crispy Fast Food',
      title3: 'From Local Best Spots',
      highlight: 'Single Courier Ride',
      subtitle: 'Combine your dinner from multiple favourite restaurants with zero duplicate courier fees.',
      buttonText: 'View Restaurants',
      buttonLink: '/vendors?category=restaurant',
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
      imageAlt: 'Stone-baked pizza with stretching mozzarella and toppings',
    },
  ];

  const currentHero = heroSlides[activeSlide];

  // Exactly 8 Category Circles matching user's reference mockup
  const categories = [
    { name: 'Restaurants', category: 'restaurant', icon: UtensilsCrossed, bg: 'bg-[#FFF0EB] text-[#F9541E]' },
    { name: 'Groceries', category: 'grocery', icon: ShoppingBag, bg: 'bg-[#E8F8EE] text-[#16A34A]' },
    { name: 'Pharmacy', category: 'pharmacy', icon: HeartPulse, bg: 'bg-[#E6F4FE] text-[#0284C7]' },
    { name: 'Bakery', category: 'bakery', icon: Croissant, bg: 'bg-[#FEF3E2] text-[#D97706]' },
    { name: 'Meat & Fish', category: 'meat', icon: Beef, bg: 'bg-[#FEECEB] text-[#DC2626]' },
    { name: 'Fruits & Veg', category: 'fruits_vegetables', icon: Apple, bg: 'bg-[#EDF9F0] text-[#15803D]' },
    { name: 'Beverages', category: 'beverages', icon: GlassWater, bg: 'bg-[#FFF2E8] text-[#EA580C]' },
    { name: 'More', category: 'all', icon: Grid, bg: 'bg-[#F1F5F9] text-[#475569]' },
  ];

  // Exactly 4 Popular Near You cards matching user's reference mockup
  const popularVendors = vendors.slice(0, 4);

  return (
    <div className="space-y-7 sm:space-y-9">
      {/* 1. HERO BANNER MATCHING USER'S REFERENCE MOCKUP */}
      <section className="relative overflow-hidden rounded-3xl bg-[#181412] text-white shadow-md min-h-[290px] sm:min-h-[320px] flex items-center">
        {/* Right side gourmet food image seamlessly blending into the dark card */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2 pointer-events-none">
          <img
            src={currentHero.image}
            alt={currentHero.imageAlt}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />
          {/* Gradient overlay to seamlessly merge the photo into the left dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#181412] via-[#181412]/80 sm:via-[#181412]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/60 via-transparent to-transparent sm:hidden" />
        </div>

        {/* Left Text Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl space-y-3.5">
          <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-white tracking-tight leading-[1.14]">
            {currentHero.title1}
            <br />
            {currentHero.title2}
            <br />
            {currentHero.title3}
            <br />
            <span className="text-[#F9541E]">{currentHero.highlight}</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-sm leading-relaxed font-normal">
            {currentHero.subtitle}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate(currentHero.buttonLink)}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#F9541E] hover:bg-[#EA4A15] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>{currentHero.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Navigation Arrow Button matching reference */}
        <button
          type="button"
          onClick={() => setActiveSlide(prev => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all z-20 cursor-pointer shadow-sm active:scale-90"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators at bottom matching reference */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`transition-all duration-300 cursor-pointer ${
                activeSlide === idx
                  ? 'w-6 h-1.5 rounded-full bg-[#F9541E]'
                  : 'w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. CIRCULAR CATEGORY PILLS ROW MATCHING REFERENCE MOCKUP */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            const targetPath =
              cat.category === 'all'
                ? '/categories'
                : `/vendors?category=${cat.category}`;

            return (
              <Link
                key={cat.name}
                to={targetPath}
                className="flex flex-col items-center gap-2 group text-center"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-2xs ${cat.bg}`}
                >
                  <Icon className="w-6 h-6 transition-transform" />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-700 group-hover:text-[#F9541E] transition-colors truncate max-w-[85px]">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR NEAR YOU SECTION MATCHING REFERENCE MOCKUP */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Popular Near You
          </h2>
          <Link
            to="/vendors"
            className="text-xs font-bold text-[#F9541E] hover:text-[#EA4A15] flex items-center gap-1 group"
          >
            <span>See All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards matching user's reference mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularVendors.map(vendor => (
            <Link
              key={vendor.id}
              to={`/vendors/${vendor.id}`}
              className="group rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-[#F9541E]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={vendor.coverImage}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Favorite Heart Button on Top Right matching reference */}
                <button
                  type="button"
                  onClick={e => toggleFavorite(e, vendor.id)}
                  aria-label="Add to favorites"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm backdrop-blur-xs transition-transform active:scale-90"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites[vendor.id]
                        ? 'text-red-500 fill-red-500'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#F9541E] transition-colors truncate">
                  {vendor.name}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>{vendor.rating}</span>
                    <span className="text-slate-400 font-normal">({vendor.reviewsCount})</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{vendor.deliveryTimeMin} min</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  {vendor.deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Free delivery
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Rs. {vendor.deliveryFee} delivery
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-[#F9541E] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View Menu <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
