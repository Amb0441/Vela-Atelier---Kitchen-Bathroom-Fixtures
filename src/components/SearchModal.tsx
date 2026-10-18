import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Heart } from 'lucide-react';
import { Product, MOCK_PRODUCTS } from '../App';
import { useRegion } from '../context/RegionContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  toggleFavorite: (product: Product) => void;
  addToCart: (product: Product) => void;
  setCurrentPage: (page: string) => void;
  setSelectedProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose,
  savedProducts,
  toggleFavorite,
  addToCart,
  setCurrentPage,
  setSelectedProduct
}) => {
  const { formatPrice } = useRegion();
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchResults = searchQuery.trim().length > 0 
    ? MOCK_PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex flex-col pt-16 md:pt-24 items-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col max-h-[80vh] rounded-md overflow-hidden"
          >
            <div className="flex items-center border-b border-gray-100 p-4 md:p-6 bg-white">
              <Search className="text-gray-400 mr-4" size={24} />
              <input
                type="text"
                placeholder="Search products, finishes, or collections..."
                className="w-full text-lg md:text-xl font-light text-black outline-none placeholder:text-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button onClick={onClose} className="ml-4 text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="overflow-y-auto bg-gray-50 flex-1 p-4 md:p-6">
              {searchQuery.trim().length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <Search size={48} strokeWidth={0.5} className="mb-4 text-gray-300" />
                  <p className="font-light tracking-wide text-base">Type to begin exploring our architectural collections</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {searchResults.map((product) => {
                    const isFavorite = savedProducts.some(p => p.id === product.id);
                    return (
                      <div 
                        key={product.id}
                        onClick={() => {
                          setSelectedProduct(product);
                          setCurrentPage('product_detail');
                          onClose();
                        }}
                        className="bg-white border border-gray-100 hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer p-4 flex flex-col group relative"
                      >
                        <div className="aspect-square flex items-center justify-center mb-2 p-0 bg-gray-50">
                          <img referrerPolicy="no-referrer" src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col mt-auto">
                          <span className="text-black font-medium text-base mb-1">{formatPrice(product.numericPrice)}</span>
                          <span className="text-base text-gray-500 font-light truncate">{product.title}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                          className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-all ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100'}`}
                        >
                          <Heart size={16} strokeWidth={1.5} fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <p className="font-light tracking-wide text-base text-gray-500">No products found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
