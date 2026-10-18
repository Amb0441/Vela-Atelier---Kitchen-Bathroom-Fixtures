import React from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Product } from '../App';
import { useRegion } from '../context/RegionContext';

interface SavedProductsPageProps {
  savedProducts: Product[];
  toggleFavorite: (product: Product) => void;
  addToCart: (product: Product) => void;
  setCurrentPage: (page: string) => void;
  setSelectedProduct: (product: Product) => void;
}

export const SavedProductsPage: React.FC<SavedProductsPageProps> = ({
  savedProducts,
  toggleFavorite,
  addToCart,
  setCurrentPage,
  setSelectedProduct
}) => {
  const { formatPrice } = useRegion();
  return (
    <div className="pt-16 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={28} strokeWidth={1} className="text-gray-900" />
        <h1 className="text-3xl font-serif text-gray-900 tracking-tight">Saved Products</h1>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center border border-gray-100 bg-gray-50 flex flex-col items-center justify-center">
          <Heart size={48} strokeWidth={0.5} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-light mb-6">You haven't saved any products yet.</p>
          <button 
            onClick={() => setCurrentPage('kitchen_sinks')}
            className="px-6 py-2.5 bg-black text-white text-base tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {savedProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setCurrentPage('product_detail');
              }}
              className="bg-white border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer group flex flex-col"
            >
              <div className="aspect-square flex items-center justify-center bg-gray-50 relative">
                <img referrerPolicy="no-referrer" src={product.image} alt={product.title} className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-sm"
                  title="Remove from saved"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-base font-medium text-black mb-1">{formatPrice(product.numericPrice)}</span>
                <span className="text-base text-gray-500 font-light line-clamp-2 mb-4">{product.title}</span>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="mt-auto w-full py-2 bg-black hover:bg-gray-800 text-white text-[16px] tracking-widest uppercase font-semibold rounded-sm transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
