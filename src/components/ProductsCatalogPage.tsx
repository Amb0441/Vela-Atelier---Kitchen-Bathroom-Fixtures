import React, { useState, useEffect } from 'react';
import { ChevronDown, Heart, Sliders, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS, Product } from '../App';
import { useRegion } from '../context/RegionContext';

interface ProductsCatalogPageProps {
  savedProducts: Product[];
  toggleFavorite: (p: Product) => void;
  addToCart: (p: Product) => void;
  addRecentlyViewed: (p: Product) => void;
  setSelectedProduct: (p: Product) => void;
  setCurrentPage: (p: string) => void;
  productFilter: { type: string; value: string; title: string } | null;
  setProductFilter: (f: { type: string; value: string; title: string } | null) => void;
}

export const ProductsCatalogPage = ({
  savedProducts,
  toggleFavorite,
  addToCart,
  addRecentlyViewed,
  setSelectedProduct,
  setCurrentPage,
  productFilter,
  setProductFilter,
}: ProductsCatalogPageProps) => {
  const { formatPrice } = useRegion();

  // Dynamic products filtering based on the clicked menu item
  const getFilteredProducts = (): Product[] => {
    if (!productFilter) return MOCK_PRODUCTS;
    const val = productFilter.value.toUpperCase();
    const type = productFilter.type;

    let filtered = MOCK_PRODUCTS;

    if (type === 'category') {
      filtered = MOCK_PRODUCTS.filter(p => 
        p.category.toUpperCase() === val || 
        p.category.toUpperCase().includes(val) || 
        p.title.toUpperCase().includes(val) ||
        p.room.toUpperCase() === val
      );
    } else if (type === 'collection') {
      if (val === 'VIEW ALL' || val === 'SHOP ALL') {
        // Return all products, perhaps filtering out those without a collection later, but for now just return all
        filtered = MOCK_PRODUCTS;
      } else {
        filtered = MOCK_PRODUCTS.filter(p => 
          p.title.toUpperCase().includes(val) || 
          p.description.toUpperCase().includes(val) ||
          (p.category && p.category.toUpperCase().includes(val))
        );
      }
    } else if (type === 'finish') {
      filtered = MOCK_PRODUCTS.filter(p => 
        p.finish.toUpperCase() === val || 
        p.finish.toUpperCase().includes(val) ||
        p.title.toUpperCase().includes(val)
      );
    } else if (type === 'tile_colour') {
      const baseColor = val.replace("TILES", "").trim();
      filtered = MOCK_PRODUCTS.filter(p => 
        p.category.toUpperCase() === 'TILES' && 
        (p.finish.toUpperCase().includes(baseColor) || p.title.toUpperCase().includes(baseColor))
      );
    } else if (type === 'commercial') {
      filtered = MOCK_PRODUCTS.filter(p => 
        p.category.toUpperCase() === 'COMMERCIAL' || 
        p.title.toUpperCase().includes('COMMERCIAL')
      );
    }

    if (filtered.length === 0) {
      // Return a general high-quality set of products as fallback so the page is never empty
      return MOCK_PRODUCTS.filter(p => p.id <= 6);
    }

    return filtered;
  };

  const baseProducts = getFilteredProducts();

  // Sidebar dynamic filters state
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);

  // Reset side filters when category filter changes
  useEffect(() => {
    setSelectedSubcategories([]);
    setSelectedFinishes([]);
  }, [productFilter]);

  // Extract unique filters from the current result set
  const availableSubcategories = Array.from(new Set(baseProducts.map(p => p.category)));
  const availableFinishes = Array.from(new Set(baseProducts.map(p => p.finish)));

  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    Subcategory: true,
    Finish: true,
  });

  const toggleFilterExpand = (name: string) => {
    setExpandedFilters(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const toggleFinish = (fin: string) => {
    setSelectedFinishes(prev => 
      prev.includes(fin) ? prev.filter(f => f !== fin) : [...prev, fin]
    );
  };

  const clearSideFilters = () => {
    setSelectedSubcategories([]);
    setSelectedFinishes([]);
  };

  // Final filtered list displayed on grid
  const displayedProducts = baseProducts.filter(product => {
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.category)) {
      return false;
    }
    if (selectedFinishes.length > 0 && !selectedFinishes.includes(product.finish)) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-10" id="products-catalog-page">
      {/* Breadcrumbs */}
      <div className="text-[17px] tracking-[0.2em] text-gray-400 uppercase font-light mb-10 flex flex-wrap gap-2">
        <span onClick={() => setCurrentPage('home')} className="hover:text-black cursor-pointer transition-colors">HOME</span> / 
        <span onClick={() => setProductFilter(null)} className="hover:text-black cursor-pointer transition-colors">SHOP ALL</span>
        {productFilter && (
          <>
            <span>/</span>
            <span className="text-black font-medium">{productFilter.title}</span>
          </>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center max-w-3xl mx-auto">
        <span className="text-[16px] tracking-[0.25em] text-gray-400 uppercase font-medium mb-3">
          {productFilter ? `${productFilter.type.replace('_', ' ')} list` : 'all products'}
        </span>
        <h1 className="text-3xl md:text-[2.8rem] font-serif text-[#111] mb-6 font-light tracking-tight leading-tight uppercase">
          {productFilter ? productFilter.value : 'Complete Range'}
        </h1>
        <p className="text-gray-500 font-light text-base leading-relaxed max-w-xl">
          Discover our meticulously crafted selections of luxury fixtures, refined finishes, and architectural details engineered for exceptional design durability.
        </p>
      </div>

      {/* Grid and Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        
        {/* Left Filter Column */}
        <div className="w-full lg:w-[250px] shrink-0 lg:sticky lg:top-[100px] lg:self-start lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[16px] tracking-[0.15em] uppercase text-gray-400 font-bold flex items-center gap-2">
              <Sliders size={12} /> FILTER RESULTS
            </div>
            {(selectedSubcategories.length > 0 || selectedFinishes.length > 0) && (
              <button 
                onClick={clearSideFilters}
                className="text-[17px] tracking-wider uppercase font-bold text-amber-800 hover:text-black transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="border border-gray-200 rounded-[4px] bg-white divide-y divide-gray-200 shadow-xs overflow-hidden">
            
            {/* Subcategory Filter Group */}
            {availableSubcategories.length > 1 && (
              <div className="flex flex-col">
                <button
                  onClick={() => toggleFilterExpand('Subcategory')}
                  className="w-full py-4 px-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left outline-none"
                >
                  <span className="text-base tracking-wider font-semibold text-neutral-800 uppercase">Subcategory</span>
                  <span className="text-gray-400 text-base font-medium">{expandedFilters.Subcategory ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.Subcategory && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#fafafa] border-t border-gray-100"
                    >
                      <div className="p-4 space-y-2">
                        {availableSubcategories.map(sub => {
                          const isChecked = selectedSubcategories.includes(sub);
                          return (
                            <button
                              key={sub}
                              onClick={() => toggleSubcategory(sub)}
                              className="w-full flex items-center gap-3 text-left py-1 group cursor-pointer"
                            >
                              <div className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${isChecked ? 'bg-black border-black' : 'border-gray-300 group-hover:border-neutral-500'}`}>
                                {isChecked && (
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-base font-light ${isChecked ? 'text-black font-semibold' : 'text-gray-500'}`}>
                                {sub}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Finish Filter Group */}
            {availableFinishes.length > 1 && (
              <div className="flex flex-col">
                <button
                  onClick={() => toggleFilterExpand('Finish')}
                  className="w-full py-4 px-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left outline-none"
                >
                  <span className="text-base tracking-wider font-semibold text-neutral-800 uppercase">Finish</span>
                  <span className="text-gray-400 text-base font-medium">{expandedFilters.Finish ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.Finish && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#fafafa] border-t border-gray-100"
                    >
                      <div className="p-4 space-y-2">
                        {availableFinishes.map(fin => {
                          const isChecked = selectedFinishes.includes(fin);
                          return (
                            <button
                              key={fin}
                              onClick={() => toggleFinish(fin)}
                              className="w-full flex items-center gap-3 text-left py-1 group cursor-pointer"
                            >
                              <div className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${isChecked ? 'bg-black border-black' : 'border-gray-300 group-hover:border-neutral-500'}`}>
                                {isChecked && (
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-base font-light ${isChecked ? 'text-black font-semibold' : 'text-gray-500'}`}>
                                {fin}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>
        </div>

        {/* Right Product Grid Column */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[16px] text-gray-500 font-light">
              Showing <span className="font-semibold text-black">{displayedProducts.length}</span> results
            </div>
            {productFilter && (
              <button 
                onClick={() => setProductFilter(null)}
                className="text-[16px] text-gray-400 hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
              >
                Reset menu filter <X size={12} />
              </button>
            )}
          </div>

          {displayedProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm">
              <span className="text-base text-gray-400 font-light uppercase tracking-wider">No products match the selected criteria.</span>
              <button onClick={clearSideFilters} className="mt-4 block mx-auto text-base text-amber-800 underline font-medium cursor-pointer">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => {
                const isFavorite = savedProducts.some(p => p.id === product.id);
                return (
                  <div 
                    key={product.id} 
                    onMouseEnter={() => addRecentlyViewed(product)}
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentPage('product_detail');
                    }}
                    className="group relative flex flex-col h-full bg-white cursor-pointer"
                  >
                    <div className="aspect-square bg-[#f8f8f8] flex items-center justify-center mb-4 relative overflow-hidden">
                      <img referrerPolicy="no-referrer" src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                        className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-all z-10 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      >
                        <Heart size={18} strokeWidth={1.5} fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="flex flex-col mt-auto px-2 pb-4">
                      <span className="text-[14px] text-gray-500 font-light tracking-wide mb-1 uppercase line-clamp-2 leading-snug h-10">{product.title}</span>
                      <span className="text-lg font-medium text-black">{formatPrice(product.numericPrice)}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="w-full py-3 bg-white border border-black hover:bg-black hover:text-white text-black text-[13px] tracking-widest uppercase font-medium transition-all text-center whitespace-nowrap"
                    >
                      Add to Project
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
