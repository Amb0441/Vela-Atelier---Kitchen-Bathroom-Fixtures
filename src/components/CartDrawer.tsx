import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, FolderHeart, Calendar, Trash2, Shield, CreditCard, Plus, Minus } from 'lucide-react';
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

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  projectCart: Product[];
  bookings: any[];
  onRemoveCartItem: (id: number) => void;
  onRemoveOneCartItem?: (id: number) => void;
  onAddCartItem?: (product: Product) => void;
  onRemoveProjectCartItem: (id: number) => void;
  onRemoveBooking: (id: number) => void;
  showToast: (msg: string) => void;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  projectCart,
  bookings,
  onRemoveCartItem,
  onRemoveOneCartItem,
  onAddCartItem,
  onRemoveProjectCartItem,
  onRemoveBooking,
  showToast,
  onCheckoutSuccess
}) => {
  const { formatPrice } = useRegion();
  const retailSubtotal = cart.reduce((acc, item) => acc + item.numericPrice, 0);
  const gst = retailSubtotal * 0.1;
  const delivery = retailSubtotal > 200 || retailSubtotal === 0 ? 0 : 15;
  const retailTotal = retailSubtotal + gst + delivery;

  const handleCheckout = () => {
    if (cart.length === 0 && bookings.length === 0 && projectCart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }
    onCheckoutSuccess();
  };

  const groupedCart = useMemo(() => {
    const grouped: Record<number, { product: Product, quantity: number }> = {};
    cart.forEach(item => {
      if (!grouped[item.id]) {
        grouped[item.id] = { product: item, quantity: 1 };
      } else {
        grouped[item.id].quantity += 1;
      }
    });
    return Object.values(grouped);
  }, [cart]);

  const groupedProjectCart = useMemo(() => {
    const grouped: Record<number, { product: Product, quantity: number }> = {};
    projectCart.forEach(item => {
      if (!grouped[item.id]) {
        grouped[item.id] = { product: item, quantity: 1 };
      } else {
        grouped[item.id].quantity += 1;
      }
    });
    return Object.values(grouped);
  }, [projectCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[200] backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer container (sliding in from the right) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[210] shadow-2xl flex flex-col border-l border-gray-150"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fafafa]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-neutral-800" />
                <h2 className="text-md font-serif uppercase tracking-widest text-neutral-900 font-bold">Shopping Cart</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-black cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Split Content Lists */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 divide-y divide-gray-100">
              
              {/* SECTION A: STANDARD RETAIL PURCHASES */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[16px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-1.5">
                    <ShoppingBag size={12} className="text-gray-400" /> Standard Retail Purchases
                  </span>
                  <span className="text-[16px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {groupedCart.length === 0 ? (
                  <div className="p-8 border border-dashed border-gray-200 rounded-sm text-center">
                    <p className="text-base text-gray-400 font-light">No retail products in cart.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {groupedCart.map(({ product, quantity }, index) => (
                      <div key={`${product.id}-${index}`} className="flex gap-4 p-3 bg-white border border-gray-150 rounded-sm hover:border-gray-300 transition-all relative group">
                        <div className="w-16 h-16 bg-gray-50 rounded-sm flex items-center justify-center p-1.5 border border-gray-100 shrink-0">
                          <img referrerPolicy="no-referrer" src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 text-base text-gray-500 font-light flex flex-col justify-center pr-12">
                          <h4 className="text-black font-semibold truncate text-[17px]">{product.title}</h4>
                          <span className="text-[16px] text-gray-400 uppercase tracking-wider mt-0.5">{product.category} • {product.room}</span>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-neutral-900 font-mono font-medium">{formatPrice(product.numericPrice * quantity)}</span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-200 rounded-sm bg-gray-50 text-black">
                              <button 
                                onClick={() => onRemoveOneCartItem && onRemoveOneCartItem(product.id)}
                                className="px-2 py-1 hover:bg-gray-200 transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-2 font-mono text-[14px] min-w-[1.5rem] text-center">{quantity}</span>
                              <button 
                                onClick={() => onAddCartItem && onAddCartItem(product)}
                                className="px-2 py-1 hover:bg-gray-200 transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => onRemoveCartItem(product.id)}
                          className="absolute right-3.5 top-3.5 p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove item entirely"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION B: PLANNING STUDIO BOOKINGS & REQUESTS */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-[16px] uppercase tracking-widest text-amber-800 font-bold flex items-center gap-1.5">
                    <FolderHeart size={12} className="text-amber-800" /> Planning Studio & Trade Specs
                  </span>
                  <span className="text-[16px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded-sm">
                    {bookings.length + projectCart.length} {(bookings.length + projectCart.length) === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {bookings.length === 0 && groupedProjectCart.length === 0 ? (
                  <div className="p-8 border border-dashed border-amber-200/50 bg-amber-50/10 rounded-sm text-center">
                    <p className="text-base text-amber-800/60 font-light">No consultation sessions booked or trade specs added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {groupedProjectCart.map(({ product, quantity }, index) => (
                      <div key={`project-${product.id}-${index}`} className="flex gap-4 p-3 bg-[#fdfdfc] border border-amber-200/40 rounded-sm hover:border-amber-300 transition-all relative group">
                        <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center p-1.5 border border-amber-100 shrink-0">
                          <img referrerPolicy="no-referrer" src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 text-base text-amber-900/60 font-light flex flex-col justify-center pr-12">
                          <h4 className="text-amber-950 font-semibold truncate text-[17px]">{product.title}</h4>
                          <span className="text-[16px] text-amber-800/50 uppercase tracking-wider mt-0.5">{product.category} • {product.room}</span>
                          <span className="text-amber-900 font-mono font-medium mt-1.5 text-sm">Trade Quote Pending (Qty: {quantity})</span>
                        </div>
                        <button 
                          onClick={() => onRemoveProjectCartItem(product.id)}
                          className="absolute right-3.5 top-3.5 p-1.5 rounded-full text-amber-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove item entirely"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-4 bg-[#fdfdfc] border border-amber-200/40 rounded-sm relative text-base font-light">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={13} className="text-amber-700" />
                          <span className="font-bold text-[17px] text-amber-800 uppercase tracking-widest">{booking.type} Consultation</span>
                        </div>
                        <div className="space-y-1 text-gray-600">
                          <p><span className="text-gray-400">Date:</span> {booking.date}</p>
                          <p><span className="text-gray-400">Time:</span> {booking.timeSlot}</p>
                          <p><span className="text-gray-400">Project:</span> {booking.projectType}</p>
                          <p><span className="text-gray-400">Ref Code:</span> <span className="font-mono font-bold text-black bg-gray-100 px-1 py-0.5 rounded-sm">{booking.bookingCode}</span></p>
                        </div>
                        <button 
                          onClick={() => onRemoveBooking(booking.id)}
                          className="absolute right-3.5 bottom-3.5 p-1.5 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Cancel Booking"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Price block and Checkout triggers */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="space-y-2 text-base">
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Retail Subtotal</span>
                  <span className="font-mono">{formatPrice(retailSubtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light">
                  <span>GST (10%)</span>
                  <span className="font-mono">{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Delivery Charge</span>
                  <span className="font-mono">{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black border-t border-gray-200 pt-3">
                  <span>Total (Inc. GST)</span>
                  <span className="font-mono">{formatPrice(retailTotal)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white text-[17px] tracking-widest uppercase font-bold rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard size={14} /> Process Secure Order
                </button>
                <p className="text-[16px] text-gray-400 text-center font-light leading-relaxed flex items-center justify-center gap-1.5">
                  <Shield size={12} className="text-gray-400" /> Encrypted 256-bit checkout gateway
                </p>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
