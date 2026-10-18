import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Shield, Sparkles, ShoppingBag, FolderHeart, BadgeCheck, RotateCcw } from 'lucide-react';
import { useRegion } from '../context/RegionContext';

interface Product {
  id: number;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  room: string;
  category: string;
  description: string;
}

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  savedProducts: Product[];
  toggleFavorite: (p: Product) => void;
  addToCart: (p: Product) => void;
  addToProjectCart: (p: Product) => void;
  setCartOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  savedProducts,
  toggleFavorite,
  addToCart,
  addToProjectCart,
  setCartOpen,
  showToast
}) => {
  const { formatPrice } = useRegion();
  const isFavorite = savedProducts.some(p => p.id === product.id);
  const [selectedFinish, setSelectedFinish] = useState('Brushed Brass');
  const [selectedQty, setSelectedQty] = useState(1);

  const finishes = [
    { name: 'Brushed Brass', hex: '#d4af37', text: 'text-[#b2901a]', bg: 'bg-[#e5c158]' },
    { name: 'Brushed Nickel', hex: '#afb1b0', text: 'text-[#848685]', bg: 'bg-[#cfd1d0]' },
    { name: 'Matte Black', hex: '#111111', text: 'text-black', bg: 'bg-[#1a1a1a]' },
    { name: 'Chrome', hex: '#e3e4e5', text: 'text-gray-500', bg: 'bg-[#f0f1f2]' },
  ];

  const handleAddRetail = () => {
    for (let i = 0; i < selectedQty; i++) {
      addToCart(product);
    }
    showToast(`Added ${selectedQty}x ${product.title} to your Retail Store Shopping Cart!`);
  };

  const handleAddSpecList = () => {
    for (let i = 0; i < selectedQty; i++) {
      addToProjectCart(product);
    }
    setCartOpen(true);
    showToast(`Added ${selectedQty}x ${product.title} to custom specification draft list.`);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-10">
      {/* Back controls */}
      <button 
        onClick={onBack}
        className="group flex items-center gap-2.5 text-[17px] tracking-widest uppercase text-gray-500 hover:text-black transition-colors mb-12 cursor-pointer"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
      </button>

      {/* Main product presentation panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Side: Gorgeous Image Canvas with transition effects */}
        <div className="lg:col-span-7 bg-[#fafafa] border border-gray-100 rounded-sm flex items-center justify-center relative aspect-square max-h-[650px] overflow-hidden">
          <motion.img referrerPolicy="no-referrer" 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
          />
          {/* Accent tags */}
          <div className="absolute top-6 left-6 bg-neutral-900 text-white text-[17px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-[2px] flex items-center gap-1">
            <Sparkles size={10} className="text-amber-400" /> Premium Spec
          </div>
        </div>

        {/* Right Side: Product Details & Options */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            {/* Category / Breadcrumb */}
            <span className="text-[16px] tracking-widest font-semibold text-amber-800 uppercase bg-amber-50 px-2.5 py-1 rounded-[2px] w-fit block mb-5">
              {product.room} • {product.category}
            </span>

            {/* Title & Pricing */}
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 font-light mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-light text-black">{formatPrice(product.numericPrice)}</span>
              <span className="text-[17px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
                In Stock & Free Shipping
              </span>
            </div>

            {/* Description */}
            <p className="text-base font-light text-gray-600 leading-relaxed mb-8">
              {product.description || "Indulge in pure minimalist aesthetics. Designed to establish an effortless focal point, this architectural essential pairs high-grade materials with an advanced protective coating for lifelong premium luster."}
            </p>

            {/* Finish Selector */}
            <div className="mb-8 border-t border-b border-gray-100 py-6">
              <span className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block mb-4">
                Select Finish: <span className="text-neutral-800 font-medium">{selectedFinish}</span>
              </span>
              <div className="flex gap-4">
                {finishes.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setSelectedFinish(f.name)}
                    className={`group relative p-1 rounded-full border transition-all cursor-pointer ${selectedFinish === f.name ? 'border-neutral-900 scale-110' : 'border-gray-200 hover:border-gray-400'}`}
                    title={f.name}
                  >
                    <div className={`w-6 h-6 rounded-full ${f.bg} shadow-inner`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[16px] tracking-widest text-gray-400 font-bold uppercase">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-[3px] bg-white text-base">
                <button 
                  onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                  className="px-3.5 py-1.5 hover:bg-gray-100 text-gray-500 font-semibold cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-medium border-l border-r border-gray-200 min-w-[32px] text-center">
                  {selectedQty}
                </span>
                <button 
                  onClick={() => setSelectedQty(selectedQty + 1)}
                  className="px-3.5 py-1.5 hover:bg-gray-100 text-gray-500 font-semibold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Double Pathway Actions (Standard vs Studio Board) */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            {/* Primary: Standard Retail Purchase */}
            <button 
              onClick={handleAddRetail}
              className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white text-[17px] tracking-widest uppercase font-semibold rounded-sm transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer group"
            >
              <ShoppingBag size={14} className="group-hover:scale-110 transition-transform" /> Add to Standard Shopping Cart
            </button>

            {/* Secondary: Planning Studio specify list (Project Board) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button 
                onClick={() => {
                  toggleFavorite(product);
                  showToast(isFavorite ? `Removed ${product.title} from Project Board` : `Pinned ${product.title} to Project Board!`);
                }}
                className={`w-full py-3.5 text-[16px] tracking-widest uppercase font-semibold rounded-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${isFavorite ? 'bg-red-50/50 text-red-600 border-red-200 hover:bg-red-50' : 'bg-white text-gray-700 border-gray-200 hover:border-black hover:text-black'}`}
              >
                <Heart size={13} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-red-600" : ""} />
                PIN TO PROJECT BOARD
              </button>
              
              <button 
                onClick={handleAddSpecList}
                className="w-full py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[16px] tracking-widest uppercase font-semibold rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FolderHeart size={13} /> Add to Studio Spec List
              </button>
            </div>
          </div>

          {/* Extra spec cards */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col items-center text-center p-3.5 bg-neutral-50 rounded-sm">
              <Shield size={16} className="text-amber-800 mb-2" />
              <span className="text-[17px] font-bold uppercase tracking-wider text-neutral-800">Lifetime</span>
              <span className="text-[8px] text-gray-400 uppercase font-light mt-0.5">Structural Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center p-3.5 bg-neutral-50 rounded-sm">
              <BadgeCheck size={16} className="text-amber-800 mb-2" />
              <span className="text-[17px] font-bold uppercase tracking-wider text-neutral-800">Watermark</span>
              <span className="text-[8px] text-gray-400 uppercase font-light mt-0.5">Lead-Free Certified</span>
            </div>
            <div className="flex flex-col items-center text-center p-3.5 bg-neutral-50 rounded-sm">
              <RotateCcw size={16} className="text-amber-800 mb-2" />
              <span className="text-[17px] font-bold uppercase tracking-wider text-neutral-800">30 Day Returns</span>
              <span className="text-[8px] text-gray-400 uppercase font-light mt-0.5">Change of Mind Free</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
