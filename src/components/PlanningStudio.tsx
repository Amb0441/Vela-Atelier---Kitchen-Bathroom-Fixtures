import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Heart, ShoppingCart, Check, Calculator, FileText, Layers, 
  Download, Printer, Sliders, Info, Sparkles, Plus, Trash2, 
  Palette, Eye, HelpCircle, ChevronLeft, ChevronRight, CheckCircle2, Star, 
  BadgeDollarSign, HelpCircle as HelpIcon, ArrowRight, Save
} from 'lucide-react';
import { Product, MOCK_PRODUCTS } from '../App';
import { useRegion } from '../context/RegionContext';

const photo = (file: string) => `${import.meta.env.BASE_URL}${file}`;
const waste1Img = photo('waste1.jpg');
const waste2Img = photo('waste2.jpg');
const waste3Img = photo('waste3.jpg');

interface WorkspaceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedProducts: Product[];
  toggleFavorite: (product: Product) => void;
  recentlyViewed: Product[];
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setCurrentPage: (page: string) => void;
}

export default function WorkspaceDrawer({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  savedProducts,
  toggleFavorite,
  recentlyViewed,
  cart,
  addToCart,
  removeFromCart,
  setCart,
  setCurrentPage
}: WorkspaceDrawerProps) {
  const { formatPrice } = useRegion();

  // Local Notifications state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // State for Product Comparison Tool
  const [compareIdA, setCompareIdA] = useState<number>(MOCK_PRODUCTS[0]?.id || 1);
  const [compareIdB, setCompareIdB] = useState<number>(MOCK_PRODUCTS[1]?.id || 2);
  const productA = MOCK_PRODUCTS.find(p => p.id === compareIdA) || MOCK_PRODUCTS[0];
  const productB = MOCK_PRODUCTS.find(p => p.id === compareIdB) || MOCK_PRODUCTS[1];

  // State for Finish Matcher
  const [selectedFinish, setSelectedFinish] = useState<'Brushed Brass' | 'Matte Black' | 'Brushed Copper' | 'Brushed Nickel' | 'Chrome'>('Brushed Brass');
  const finishDetails = {
    'Brushed Brass': {
      desc: 'Our signature Brushed Brass finish offers an organic golden hue that brings timeless warmth and mid-century modern opulence to any luxury setting. PVD coated for a lifetime of durability.',
      combo: 'Brushed Brass + Pure White Quartz & Light Oak Cabinets',
      collections: ['Lumen Series', 'Arlo Luxury Kitchen Suite'],
      accessories: ['Cove Extension Tubes', 'Brushed Brass Soap Dispenser', 'Lumen Towel Rails']
    },
    'Matte Black': {
      desc: 'Sleek, velvety, and bold. Matte Black provides high-contrast architectural definition. Electrophoretically coated to resist fingerprints and maintain a rich, absolute black finish.',
      combo: 'Matte Black + Venetian Plaster Walls & Terrazzo Floor Tiles',
      collections: ['Drift Architectural Range', 'Cove Series Matte Black'],
      accessories: ['Matte Black Basket Wastes', 'Drift Roll-up Draining Racks', 'Lumen Black Soap Dispenser']
    },
    'Brushed Copper': {
      desc: 'Brushed Copper introduces a fiery, earthy rose-bronze tone that serves as an artistic centerpiece. Crafted to coordinate with warm concrete, clay bricks, and timber planks.',
      combo: 'Brushed Copper + Earthy Terracotta Tiles & Soft Concrete Countertops',
      collections: ['Marlow Avant-Garde Collection', 'Drift Coastal Range'],
      accessories: ['Cove Copper Floor Wastes', 'Copper Backplates', 'Marlow Hand Showers']
    },
    'Brushed Nickel': {
      desc: 'A premium, understated classic. Brushed Nickel offers a subtle champagne warmth compared to standard chrome, creating soft, tranquil luxury and organic contemporary calm.',
      combo: 'Brushed Nickel + Charcoal Concrete & Calacatta Marble slabs',
      collections: ['Lumen Classic Suite', 'Arlo Brushed Silver Suite'],
      accessories: ['Cove Nickel Basin Wastes', 'Nickel Mounting Flanges']
    },
    'Chrome': {
      desc: 'The ultimate high-shine mirror finish. Polished Chrome is a timeless architectural staple, offering clinical brightness, crisp light reflection, and premium structural presence.',
      combo: 'Chrome + Dark Charcoal Cabinetry & Polished Terrazzo flooring',
      collections: ['Standard Premium Range', 'Commercial Grade Suite'],
      accessories: ['Cove Chrome Grates', 'Polished Silver Flanges']
    }
  };

  // State for Room Assistant
  const [renovatingRoom, setRenovatingRoom] = useState<'Bathroom' | 'Kitchen' | 'Laundry' | 'Outdoor'>('Bathroom');
  const roomDescriptions = {
    'Bathroom': 'An intimate sanctuary. Focus on matching pop-up wastes with gooseneck basin mixers, sleek showers, and minimalist towel rails for a serene spa atmosphere.',
    'Kitchen': 'The heartbeat of the home. Pair a high-capacity fluted farm sink with a dual-flow pull-out mixer to balance professional culinary utility with bespoke design.',
    'Laundry': 'Where utility meets designer boutique elegance. High-grade stainless steel sinks paired with sleek satin mixers make household work an absolute luxury.',
    'Outdoor': 'Coastal-grade architecture. Require marine-grade 316 stainless steel fixtures to withstand harsh sunshine, salty breeze, and pool splashes while retaining pure beauty.'
  };

  // State for AI Design Assistant Chat Thread
  const [assistantMessages, setAssistantMessages] = useState<Array<{ id: string; sender: 'user' | 'agent'; text: string; timestamp: Date }>>([
    {
      id: 'init-Bathroom',
      sender: 'agent',
      text: "Welcome to your Bathroom architectural planning suite. Ask me anything about coordinating Brushed Brass hardware, styling Bathroom layouts, or creating cohesive specifications.",
      timestamp: new Date()
    }
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantTyping, setAssistantTyping] = useState(false);

  useEffect(() => {
    setAssistantMessages([
      {
        id: 'init-' + renovatingRoom,
        sender: 'agent',
        text: `Welcome to your ${renovatingRoom} architectural planning suite. Ask me anything about coordinating ${selectedFinish} hardware, styling ${renovatingRoom} layouts, or creating cohesive specifications.`,
        timestamp: new Date()
      }
    ]);
  }, [renovatingRoom, selectedFinish]);

  // State for Project Checklist Generator
  const [checklistSelections, setChecklistSelections] = useState<Record<string, string[]>>({
    'Bathroom': ['Basin', 'Basin Mixer', 'Shower Rose'],
    'Kitchen': ['Kitchen Sink', 'Pull-out Mixer'],
    'Laundry': ['Laundry Tub'],
    'Outdoor': ['316 Outdoor Shower']
  });

  const masterChecklists = {
    'Bathroom': ['Basin', 'Basin Mixer', 'Shower Rose', 'Shower Mixer', 'Towel Rail', 'Floor Waste', 'Toilet Roll Holder', 'Robe Hook'],
    'Kitchen': ['Kitchen Sink', 'Pull-out Mixer', 'Basket Waste', 'Cabinet Pulls', 'Soap Dispenser', 'Colander Accessory'],
    'Laundry': ['Laundry Tub', 'Satin Gooseneck Mixer', 'Bypass Waste Kit', 'Drying Rack', 'Linen Handles'],
    'Outdoor': ['316 Outdoor Shower', 'Foot Wash Tap', 'Pool Grate Waste', 'Outdoor Sink', 'Heavy-Duty Mixer']
  };

  const toggleChecklistItem = (room: string, item: string) => {
    const current = checklistSelections[room] || [];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    setChecklistSelections({ ...checklistSelections, [room]: updated });
  };

  // Saved Projects State
  const [savedProjects, setSavedProjects] = useState<Array<{ id: string; name: string; room: string; itemsChecked: number; totalItems: number; timestamp: string }>>([
    { id: '1', name: 'Main Ensuite Sanctuary', room: 'Bathroom', itemsChecked: 5, totalItems: 8, timestamp: '2026-06-24' },
    { id: '2', name: 'Architectural Kitchenette', room: 'Kitchen', itemsChecked: 4, totalItems: 6, timestamp: '2026-06-20' }
  ]);

  const saveCurrentChecklistAsProject = (projectName: string) => {
    if (!projectName.trim()) return;
    const room = renovatingRoom;
    const itemsChecked = checklistSelections[room]?.length || 0;
    const totalItems = masterChecklists[room].length;
    const newProject = {
      id: String(Date.now()),
      name: projectName,
      room,
      itemsChecked,
      totalItems,
      timestamp: new Date().toISOString().split('T')[0]
    };
    setSavedProjects([newProject, ...savedProjects]);
    showToast(`Project "${projectName}" saved successfully to your planner!`);
  };

  // State for Renovation Budget Calculator
  const [budgetVal, setBudgetVal] = useState<number>(10000);
  const budgetAllocation = {
    fixtures: Math.round(budgetVal * 0.4),
    tapware: Math.round(budgetVal * 0.25),
    accessories: Math.round(budgetVal * 0.15),
    contingency: Math.round(budgetVal * 0.2)
  };

  // State for Smart Product Finder
  const [finderStep, setFinderStep] = useState<number>(1);
  const [finderRoom, setFinderRoom] = useState<'Bathroom' | 'Kitchen' | 'Laundry' | 'Outdoor' | null>(null);
  const [finderStyle, setFinderStyle] = useState<'Minimalist' | 'Industrial' | 'Farmhouse' | 'Coastal' | null>(null);
  const [finderFinish, setFinderFinish] = useState<'Brushed Brass' | 'Matte Black' | 'Brushed Copper' | 'Brushed Nickel' | 'Chrome' | null>(null);

  // State for Swatch Samples Cart
  const [sampleSwatches, setSampleSwatches] = useState<string[]>([]);
  const [sampleFormSubmitted, setSampleFormSubmitted] = useState<boolean>(false);
  const [sampleForm, setSampleForm] = useState({ name: '', email: '', street: '', city: '', postcode: '' });

  // State for Quote Builder
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);
  const [quoteForm, setQuoteForm] = useState({ company: '', phone: '', note: '' });

  const projectProducts = savedProducts.length > 0 ? savedProducts : MOCK_PRODUCTS.slice(0, 3);
  const projectSubtotal = projectProducts.reduce((acc, p) => acc + p.numericPrice, 0);
  const tradeDiscount = projectSubtotal * 0.1; // 10% Contractor Discount
  const projectTotal = projectSubtotal - tradeDiscount;

  // Sync to local storage or return to session mock
  const restoreUnfinishedSession = () => {
    setChecklistSelections({
      'Bathroom': ['Basin', 'Basin Mixer', 'Shower Rose', 'Towel Rail', 'Floor Waste'],
      'Kitchen': ['Kitchen Sink', 'Pull-out Mixer', 'Basket Waste'],
      'Laundry': ['Laundry Tub'],
      'Outdoor': ['316 Outdoor Shower']
    });
    setBudgetVal(15000);
    showToast('Your previous unfinished planning session has been restored!', 'info');
  };

  const sendAssistantMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = {
      id: String(Date.now()),
      sender: 'user' as const,
      text,
      timestamp: new Date()
    };

    const currentMsgs = [...assistantMessages, userMsg];
    setAssistantMessages(currentMsgs);
    setAssistantInput('');
    setAssistantTyping(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          renovatingRoom,
          finderStyle: finderStyle || 'Minimalist',
          finderFinish: selectedFinish,
          messages: currentMsgs
        })
      });
      if (res.ok) {
        const data = await res.json();
        const agentMsg = {
          id: String(Date.now() + 1),
          sender: 'agent' as const,
          text: data.text,
          timestamp: new Date()
        };
        setAssistantMessages(prev => [...prev, agentMsg]);
        setAssistantTyping(false);
        return;
      }
    } catch (error) {
      console.error("AI assistant error:", error);
    }

    // Heuristic Fallback in case of error/missing key
    setTimeout(() => {
      let advice = `To elevate your ${renovatingRoom} design, coordinate our ${selectedFinish} collection with light stone splashbacks, high-contrast timber handles, and soft integrated lighting.`;
      const matchedProds = MOCK_PRODUCTS.filter(p => p.room === renovatingRoom && p.finish === selectedFinish);
      if (matchedProds.length > 0) {
        advice += `\n\nWe highly recommend adding the following curated specs to your project:\n` + matchedProds.map(p => `• **${p.title}** (${formatPrice(p.numericPrice)})`).join("\n");
      }
      setAssistantMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 2),
          sender: 'agent' as const,
          text: advice,
          timestamp: new Date()
        }
      ]);
      setAssistantTyping(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[720px] bg-[#fdfdfc] shadow-2xl flex flex-col h-full border-l border-gray-200 z-[210]">
        
        {/* Toast Notification Inside Drawer */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-12 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-[17px] tracking-wide font-light z-[100] flex items-center gap-3 ${
                toast.type === 'success' ? 'bg-black text-white' : 'bg-gray-100 text-black border border-gray-200'
              }`}
            >
              <CheckCircle2 size={16} className={toast.type === 'success' ? "text-emerald-400" : "text-blue-500"} />
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drawer Header */}
        <div className="px-4 md:px-8 py-4 md:py-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
          <div className="pr-2 flex items-center gap-3">
            <div>
              <span className="text-[14px] md:text-[17px] tracking-[0.2em] md:tracking-[0.25em] text-gray-400 font-semibold uppercase block mb-1">Vela</span>
              <h2 className="text-lg md:text-xl font-serif text-gray-900 tracking-tight font-light flex items-center gap-2">
                Architectural Planning Studio <Sparkles size={16} className="text-[#c5c8b7] shrink-0" />
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all shrink-0"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable Workspace Body */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-8 bg-[#fdfdfc] space-y-8 hide-scrollbar block`}>
          
          {/* TAB 2: Product Comparison Tool */}
          {activeTab === 'comparison' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Side-by-Side Product Comparison</h3>
                <p className="text-[16px] text-gray-500 font-light">Compare materials, finish treatments, pricing, and warranties on the fly to streamline your specifying process.</p>
              </div>

              {/* Selector Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 border border-gray-200 rounded-sm">
                <div className="min-w-0">
                  <label className="text-[16px] tracking-wider uppercase text-gray-400 font-semibold block mb-1">Product A</label>
                  <select 
                    value={compareIdA}
                    onChange={(e) => setCompareIdA(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-sm p-2 text-base bg-[#fdfdfc] text-[#333] focus:border-black outline-none font-light truncate"
                  >
                    {MOCK_PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>{p.title} ({p.room})</option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="text-[16px] tracking-wider uppercase text-gray-400 font-semibold block mb-1">Product B</label>
                  <select 
                    value={compareIdB}
                    onChange={(e) => setCompareIdB(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-sm p-2 text-base bg-[#fdfdfc] text-[#333] focus:border-black outline-none font-light truncate"
                  >
                    {MOCK_PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>{p.title} ({p.room})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison Matrix Table */}
              <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
                <table className="w-full text-left text-base font-light min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[16px] tracking-wider uppercase text-gray-500">
                      <th className="py-3 px-4 w-1/4">Specification</th>
                      <th className="py-3 px-4 w-3/8 text-center bg-gray-50/50">Product A</th>
                      <th className="py-3 px-4 w-3/8 text-center">Product B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* Image */}
                    <tr>
                      <td className="py-4 px-4 font-medium text-gray-500">Visual</td>
                      <td className="py-4 px-4 bg-gray-50/30 text-center">
                        <img referrerPolicy="no-referrer" src={productA.image} alt="" className="h-20 w-20 object-cover mx-auto border border-gray-100 p-1 rounded-sm bg-white" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <img referrerPolicy="no-referrer" src={productB.image} alt="" className="h-20 w-20 object-cover mx-auto border border-gray-100 p-1 rounded-sm bg-white" />
                      </td>
                    </tr>
                    {/* Name */}
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-gray-500">Name</td>
                      <td className="py-3.5 px-4 text-center font-serif text-[17px] text-gray-900 bg-gray-50/30 font-light">{productA.title}</td>
                      <td className="py-3.5 px-4 text-center font-serif text-[17px] text-gray-900 font-light">{productB.title}</td>
                    </tr>
                    {/* Price */}
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-gray-500">Retail Price</td>
                      <td className="py-3.5 px-4 text-center text-[17px] font-semibold text-black bg-gray-50/30">{formatPrice(productA.numericPrice)}</td>
                      <td className="py-3.5 px-4 text-center text-[17px] font-semibold text-black">{formatPrice(productB.numericPrice)}</td>
                    </tr>
                    {/* Category */}
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-gray-500">Category</td>
                      <td className="py-3.5 px-4 text-center text-gray-600 bg-gray-50/30">{productA.category}</td>
                      <td className="py-3.5 px-4 text-center text-gray-600">{productB.category}</td>
                    </tr>
                    {/* Finish */}
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-gray-500">Finish Color</td>
                      <td className="py-3.5 px-4 text-center bg-gray-50/30">
                        <span className="px-2 py-1 bg-[#f0f1ec] text-gray-700 rounded-full font-mono text-[17px] uppercase tracking-widest">{productA.finish}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-1 bg-[#f0f1ec] text-gray-700 rounded-full font-mono text-[17px] uppercase tracking-widest">{productB.finish}</span>
                      </td>
                    </tr>
                    {/* Material */}
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-gray-500">Core Material</td>
                      <td className="py-3.5 px-4 text-center text-gray-600 bg-gray-50/30">{productA.material}</td>
                      <td className="py-3.5 px-4 text-center text-gray-600">{productB.material}</td>
                    </tr>
                    {/* Warranty */}
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-gray-500">Warranty</td>
                      <td className="py-3.5 px-4 text-center bg-gray-50/30 text-emerald-700 font-medium">{productA.warranty}</td>
                      <td className="py-3.5 px-4 text-center text-emerald-700 font-medium">{productB.warranty}</td>
                    </tr>
                    {/* Rating */}
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-gray-500">Customer Rating</td>
                      <td className="py-3.5 px-4 text-center bg-gray-50/30 text-amber-600 font-medium">
                        <div className="flex items-center justify-center gap-1">
                          <Star size={12} className="fill-current text-amber-400" /> {productA.rating} / 5
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center text-amber-600 font-medium">
                        <div className="flex items-center justify-center gap-1">
                          <Star size={12} className="fill-current text-amber-400" /> {productB.rating} / 5
                        </div>
                      </td>
                    </tr>
                    {/* Actions */}
                    <tr>
                      <td className="py-4 px-4 font-medium text-gray-500">Actions</td>
                      <td className="py-4 px-4 text-center bg-gray-50/30">
                        <button 
                          onClick={() => { addToCart(productA); showToast(`Added ${productA.title} to cart`); }}
                          className="px-3 py-1.5 bg-black text-white text-[16px] uppercase tracking-widest font-semibold rounded-sm hover:bg-gray-800 transition-colors w-full"
                        >
                          Add Product A
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => { addToCart(productB); showToast(`Added ${productB.title} to cart`); }}
                          className="px-3 py-1.5 bg-black text-white text-[16px] uppercase tracking-widest font-semibold rounded-sm hover:bg-gray-800 transition-colors w-full"
                        >
                          Add Product B
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Finish compatibility notification */}
              <div className="p-5 border rounded-sm flex items-start gap-4 bg-[#fcfcfa]">
                <Info size={18} className="text-gray-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-gray-800">
                    {productA.finish === productB.finish ? (
                      <span className="text-emerald-700 flex items-center gap-1">✓ Perfect Finish Match: {productA.finish}</span>
                    ) : (
                      <span className="text-amber-700">Contrasting Metallic Accents ({productA.finish} + {productB.finish})</span>
                    )}
                  </h4>
                  <p className="text-[17px] text-gray-500 leading-relaxed">
                    {productA.finish === productB.finish 
                      ? `Both selections use our high-fidelity ${productA.finish} treatment, ensuring total visual uniformity throughout your architectural build.`
                      : `Mixing metallic colors can establish creative rhythm. We recommend matching hardware (like hinges and pop-up wastes) in the primary accent, while keeping tapware in a consistent metal color to avoid sensory clutter.`}
                  </p>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 3: Finish Matcher */}
          {activeTab === 'finishes' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Bespoke Finish Matcher</h3>
                <p className="text-[16px] text-gray-500 font-light">Select a luxury finish color to instantly unlock matching products, compatible design collections, suggested combinations, and related accessories.</p>
              </div>

              {/* Finish Selection Swatches */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { name: 'Brushed Brass', hex: '#d1b26f', label: 'Brass' },
                  { name: 'Matte Black', hex: '#1c1c1c', label: 'Black' },
                  { name: 'Brushed Copper', hex: '#c58d71', label: 'Copper' },
                  { name: 'Brushed Nickel', hex: '#b0b1ac', label: 'Nickel' },
                  { name: 'Chrome', hex: '#e3e4e6', label: 'Chrome' }
                ].map((f) => {
                  const isSelected = selectedFinish === f.name;
                  return (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFinish(f.name as any)}
                      className={`flex flex-col items-center gap-2.5 p-3 rounded-sm border transition-all ${
                        isSelected ? 'border-black bg-[#f0f1ec]' : 'border-gray-200 bg-white hover:border-gray-400'
                      }`}
                    >
                      <div 
                        className="w-10 h-10 rounded-full border border-gray-300 shadow-inner relative overflow-hidden"
                        style={{ backgroundColor: f.hex }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10" />
                      </div>
                      <span className="text-[16px] tracking-wider text-gray-700 font-medium text-center">{f.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Finish Detailed Guidelines Card */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm space-y-4 shadow-sm">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Palette size={18} className="text-[#a4a896]" />
                  <h4 className="text-[17px] tracking-wider uppercase font-semibold text-gray-900">{selectedFinish} Design Guideline</h4>
                </div>
                <p className="text-base text-gray-500 leading-relaxed font-light">{finishDetails[selectedFinish].desc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-base">
                  <div className="space-y-1">
                    <span className="text-[16px] uppercase text-gray-400 font-semibold block tracking-wider">Suggested Material Pairing</span>
                    <p className="text-gray-800 font-medium">{finishDetails[selectedFinish].combo}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[16px] uppercase text-gray-400 font-semibold block tracking-wider">Compatible Vela Collections</span>
                    <p className="text-gray-800 font-medium">{finishDetails[selectedFinish].collections.join(' & ')}</p>
                  </div>
                </div>
              </div>

              {/* Matching Products Catalog Filter */}
              <div className="space-y-4">
                <h3 className="text-[16px] uppercase tracking-widest text-gray-500 font-semibold">Matching Products in Stock</h3>
                
                <div className="space-y-3">
                  {MOCK_PRODUCTS.filter(p => p.finish === selectedFinish).map((prod) => (
                    <div key={prod.id} className="bg-white border border-gray-100 p-4 rounded-sm flex flex-col sm:flex-row gap-4 sm:items-center justify-between hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <img referrerPolicy="no-referrer" src={prod.image} alt="" className="w-12 h-12 object-cover shrink-0" />
                        <div>
                          <h4 className="text-[16px] font-medium text-gray-900">{prod.title}</h4>
                          <span className="text-[16px] text-gray-400 block sm:inline">{prod.category} • {formatPrice(prod.numericPrice)}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => { addToCart(prod); showToast(`Added ${prod.title} to cart`); }}
                        className="w-full sm:w-auto px-4 py-2 bg-white border border-black hover:bg-black hover:text-white transition-all text-[13px] uppercase tracking-widest font-medium rounded-sm whitespace-nowrap"
                      >
                        Add to Project
                      </button>
                    </div>
                  ))}
                  {MOCK_PRODUCTS.filter(p => p.finish === selectedFinish).length === 0 && (
                    <p className="text-base text-gray-400 italic">No products currently matching this finish in stock.</p>
                  )}
                </div>
              </div>

              {/* Suggested Accessories Matching */}
              <div className="space-y-4 bg-[#f8f9f6] p-6 border border-[#e2e4dc] rounded-sm">
                <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#a4a896]" /> Suggested {selectedFinish} Accents & Accessories
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base text-gray-600 font-light pl-1">
                  {finishDetails[selectedFinish].accessories.map((acc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check size={12} className="text-emerald-600 shrink-0" />
                      <span>{acc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          )}

          {/* TAB 4: Room-Based Shopping Assistant */}
          {activeTab === 'room_assistant' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Renovation Room Assistant</h3>
                <p className="text-[16px] text-gray-500 font-light">Explore bespoke layouts and curate matching hardware sets according to the specific space you are renovating.</p>
              </div>

              {/* Room Choice Quadrant Grid */}
              <div className="grid grid-cols-2 gap-4">
                {(['Bathroom', 'Kitchen', 'Laundry', 'Outdoor'] as const).map((room) => {
                  const isSelected = renovatingRoom === room;
                  return (
                    <button
                      key={room}
                      onClick={() => setRenovatingRoom(room)}
                      className={`py-6 px-4 rounded-sm border text-center transition-all ${
                        isSelected 
                          ? 'border-black bg-white shadow-md' 
                          : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-400'
                      }`}
                    >
                      <h4 className="font-serif text-base text-gray-900 mb-1">{room}</h4>
                      <p className="text-[16px] tracking-wider text-gray-400 uppercase font-light">Renovating space</p>
                    </button>
                  );
                })}
              </div>

              {/* Room Guidelines */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm space-y-4 shadow-sm">
                <h4 className="text-base uppercase tracking-wider text-gray-400 font-semibold">{renovatingRoom} Architecture & Specifying Guidelines</h4>
                <p className="text-base text-gray-500 leading-relaxed font-light">{roomDescriptions[renovatingRoom]}</p>
              </div>

              {/* Room Catalog List */}
              <div className="space-y-4">
                <h3 className="text-[16px] uppercase tracking-widest text-gray-500 font-semibold">Matched products & collections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_PRODUCTS.filter(p => p.room === renovatingRoom).map((prod) => (
                    <div key={prod.id} className="border border-gray-200 bg-white p-4 rounded-sm flex flex-col justify-between group hover:border-gray-400 transition-colors">
                      <div className="aspect-square flex items-center justify-center mb-2 bg-gray-50/50">
                        <img referrerPolicy="no-referrer" src={prod.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1 mb-4 text-center">
                        <h4 className="text-[16px] font-medium text-gray-800 line-clamp-1">{prod.title}</h4>
                        <p className="text-[16px] text-gray-400 font-mono">{formatPrice(prod.numericPrice)}</p>
                      </div>
                      <button
                        onClick={() => { addToCart(prod); showToast(`Added ${prod.title} to cart`); }}
                        className="w-full py-3 bg-white border border-black hover:bg-black hover:text-white text-black text-[13px] tracking-widest uppercase font-medium transition-all text-center whitespace-nowrap"
                      >
                        Add to Project
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Specifier Conversation Panel */}
              <div className="bg-white border border-gray-200 rounded-sm p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-600 animate-pulse" />
                    <h4 className="text-[17px] uppercase tracking-widest text-gray-700 font-semibold">Consult Our Principal AI Design Consultant</h4>
                  </div>
                  <span className="text-[17px] text-gray-400 font-mono">ROOM: {renovatingRoom.toUpperCase()} • FINISH: {selectedFinish.toUpperCase()}</span>
                </div>

                {/* Messages Box */}
                <div className="space-y-3 max-h-[220px] overflow-y-auto p-3 bg-[#fbfbf9] border border-gray-100 rounded-sm text-base">
                  {assistantMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded px-3 py-2 leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-neutral-800 text-white rounded-tr-none font-light' 
                          : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-tl-none whitespace-pre-line font-light'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {assistantTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-400 border border-gray-100 rounded px-3 py-2 flex items-center gap-1.5 shadow-sm">
                        <span className="text-[16px] italic">AI Specifier is typing</span>
                        <span className="flex gap-0.5 items-center mt-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendAssistantMessage(assistantInput);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="text"
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    placeholder={`Ask about styling your ${renovatingRoom} in ${selectedFinish}...`}
                    className="flex-1 bg-[#fdfdfc] border border-gray-300 rounded-sm px-3 py-2 text-base outline-none focus:border-black transition-all font-light"
                  />
                  <button 
                    type="submit"
                    disabled={!assistantInput.trim() || assistantTyping}
                    className="px-4 py-2 bg-black text-white text-[16px] uppercase tracking-widest font-semibold rounded-sm hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Consult
                  </button>
                </form>
              </div>

            </motion.div>
          )}

          {/* TAB 5: Project Checklist Generator */}
          {activeTab === 'checklist' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Project Checklist Generator</h3>
                <p className="text-[16px] text-gray-500 font-light">Interactive architectural specifications checklist. Mark off items as you finalize drawings and orders, then save or print your specs.</p>
              </div>

              {/* Room Type Selector dropdown */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 border border-gray-200 rounded-sm">
                <label className="text-[17px] tracking-wider uppercase text-gray-500 font-semibold whitespace-nowrap">Choose Space:</label>
                <div className="flex flex-wrap gap-2">
                  {(['Bathroom', 'Kitchen', 'Laundry', 'Outdoor'] as const).map(room => (
                    <button
                      key={room}
                      onClick={() => setRenovatingRoom(room)}
                      className={`px-3 py-1 text-[16px] uppercase tracking-wider rounded-full border ${
                        renovatingRoom === room 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive checklist block */}
              <div className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h4 className="text-[17px] uppercase tracking-widest font-semibold text-gray-700">{renovatingRoom} Renovation Checklist</h4>
                  
                  {/* Progress indicator */}
                  <div className="flex items-center gap-3">
                    <span className="text-[16px] font-medium text-gray-500">
                      {(checklistSelections[renovatingRoom] || []).length} / {masterChecklists[renovatingRoom].length} Spec\'d
                    </span>
                    <span className="text-[17px] font-bold text-black bg-white border border-gray-200 px-2 py-0.5 rounded-full font-mono">
                      {Math.round(((checklistSelections[renovatingRoom] || []).length / masterChecklists[renovatingRoom].length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 h-1.5 overflow-hidden">
                  <div 
                    className="bg-black h-full transition-all duration-500" 
                    style={{ width: `${((checklistSelections[renovatingRoom] || []).length / masterChecklists[renovatingRoom].length) * 100}%` }}
                  />
                </div>

                <div className="divide-y divide-gray-100 px-6 py-4">
                  {masterChecklists[renovatingRoom].map((item) => {
                    const isChecked = (checklistSelections[renovatingRoom] || []).includes(item);
                    return (
                      <div 
                        key={item} 
                        onClick={() => toggleChecklistItem(renovatingRoom, item)}
                        className="py-3 flex items-center justify-between cursor-pointer group hover:bg-gray-50/50 -mx-6 px-6"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-4 h-4 border rounded-[2px] flex items-center justify-center transition-all ${
                            isChecked ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black'
                          }`}>
                            {isChecked && <Check size={10} className="text-white stroke-[4px]" />}
                          </div>
                          <span className={`text-[16px] transition-colors duration-200 ${
                            isChecked ? 'line-through text-gray-600 font-medium decoration-gray-400/60' : 'text-gray-800'
                          }`}>{item}</span>
                        </div>
                        <span className={`text-[16px] hover:underline font-mono uppercase transition-all ${
                          isChecked ? 'text-emerald-700 font-semibold' : 'text-gray-400 font-light'
                        }`}>
                          {isChecked ? 'Configured ✓' : 'Spec Item'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form to save checklist project portfolio */}
              <div className="bg-white border border-gray-200 p-5 rounded-sm space-y-4">
                <h4 className="text-[17px] uppercase tracking-wider text-gray-400 font-semibold">Save This Spec Portfolio</h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    id="save_project_name_input"
                    placeholder="e.g. Master Bedroom Suite" 
                    className="flex-1 border border-gray-300 p-2 text-base rounded-sm outline-none focus:border-black min-w-0"
                  />
                  <button 
                    onClick={() => {
                      const input = document.getElementById('save_project_name_input') as HTMLInputElement;
                      if (input && input.value) {
                        saveCurrentChecklistAsProject(input.value);
                        input.value = '';
                      } else {
                        showToast('Please enter a portfolio name.', 'info');
                      }
                    }}
                    className="px-4 py-3 sm:py-2 bg-black text-white text-[16px] uppercase tracking-wider font-semibold rounded-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Save size={12} /> Save Project
                  </button>
                </div>
              </div>

              {/* Download and Print Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => showToast('Checklist PDF successfully exported for local builder use!')}
                  className="py-3 border border-gray-200 hover:border-black rounded-sm flex items-center justify-center gap-2 text-[16px] uppercase tracking-widest font-semibold bg-white transition-colors"
                >
                  <Download size={14} /> Download PDF
                </button>
                <button 
                  onClick={() => window.print()}
                  className="py-3 border border-gray-200 hover:border-black rounded-sm flex items-center justify-center gap-2 text-[16px] uppercase tracking-widest font-semibold bg-white transition-colors"
                >
                  <Printer size={14} /> Print Checklist
                </button>
              </div>

            </motion.div>
          )}

          {/* TAB 6: Renovation Budget Calculator */}
          {activeTab === 'budget' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Renovation Budget Calculator</h3>
                <p className="text-[16px] text-gray-500 font-light">Ensure precise budget allocation across critical hardware packages. Drag the controller to fit your planned trade allowances.</p>
              </div>

              {/* Slider Input Block */}
              <div className="bg-white border border-gray-200 p-6 rounded-sm space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[16px] uppercase tracking-widest text-gray-400 font-semibold">Total Target Space Budget</span>
                  <span className="text-xl font-bold font-mono text-black">${budgetVal.toLocaleString()}</span>
                </div>
                
                <input 
                  type="range" 
                  min={2500} 
                  max={45000} 
                  step={500}
                  value={budgetVal}
                  onChange={(e) => setBudgetVal(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />

                <div className="flex justify-between text-[16px] text-gray-400 font-mono">
                  <span>Min: $2,500</span>
                  <span>Mid: $24,000</span>
                  <span>Max: $45,000</span>
                </div>
              </div>

              {/* Spending Allocations Breakdown */}
              <div className="space-y-3">
                <h3 className="text-[17px] uppercase tracking-widest text-gray-500 font-semibold">Suggested spending allocation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Fixtures Package (40%)', amount: budgetAllocation.fixtures, desc: 'Includes baths, basins, vanity cabinetry, and toilet selections.' },
                    { title: 'Tapware Package (25%)', amount: budgetAllocation.tapware, desc: 'Includes mixers, pull-out taps, showers, and rough-in breeches.' },
                    { title: 'Accessories Package (15%)', amount: budgetAllocation.accessories, desc: 'Includes towel rails, floor wastes, paper holders, and hooks.' },
                    { title: 'Contingency Fund (20%)', amount: budgetAllocation.contingency, desc: 'Highly recommended buffer for unforeseen trade fees or pipe changes.' }
                  ].map((alloc, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 p-4 rounded-sm hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[17px] font-semibold text-gray-800">{alloc.title}</span>
                        <span className="text-base font-bold font-mono text-black">${alloc.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-[16px] text-gray-400 font-light leading-relaxed mb-3">{alloc.desc}</p>
                      
                      {/* Allocation Mini Progress Bar */}
                      <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-black h-full" 
                          style={{ width: `${(alloc.amount / budgetVal) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart product category recommendations based on budget */}
              <div className="bg-[#fcfcfa] border border-gray-200 p-5 rounded-sm space-y-4">
                <h4 className="text-base font-semibold text-gray-800 flex items-center gap-1.5">
                  <Star size={14} className="text-amber-500 fill-amber-400" /> Curated Package Recommendations for your Budget
                </h4>
                
                <p className="text-[17px] text-gray-500 font-light leading-relaxed">
                  Based on your allowance of <span className="font-semibold text-black">${budgetVal.toLocaleString()}</span>, we suggest focusing on these premium specifying models:
                </p>

                <div className="space-y-3 pt-1">
                  {MOCK_PRODUCTS.filter(p => p.numericPrice <= budgetAllocation.fixtures || p.numericPrice <= budgetAllocation.tapware).slice(0, 2).map((prod) => (
                    <div key={prod.id} className="bg-white border border-gray-100 p-3 rounded-sm flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img referrerPolicy="no-referrer" src={prod.image} alt="" className="w-10 h-10 object-cover" />
                        <div>
                          <h5 className="text-[17px] font-medium text-gray-900">{prod.title}</h5>
                          <span className="text-[16px] text-gray-400">Class: Premium High-Durability {prod.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[17px] font-bold block">{formatPrice(prod.numericPrice)}</span>
                        <button 
                          onClick={() => { addToCart(prod); showToast(`Added ${prod.title} to cart`); }}
                          className="text-[17px] text-black font-semibold uppercase tracking-widest hover:underline mt-0.5"
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 7: Smart Product Finder */}
          {activeTab === 'finder' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Smart Product Finder Wizard</h3>
                <p className="text-[16px] text-gray-500 font-light">Our guided specification engine curates a bespoke architectural package tailored to your exact style aesthetic and color plan.</p>
              </div>

              {/* Wizard Multi-Step Container */}
              <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                {/* Wizard Header Progress */}
                <div className="bg-gray-50 py-3 px-6 border-b border-gray-200 flex justify-between text-[16px] font-mono text-gray-400">
                  <span>Guided Spec Flow</span>
                  <span className="font-semibold text-black">Step {finderStep} of 4</span>
                </div>

                <div className="p-6 space-y-6">
                  {/* STEP 1: Select Room */}
                  {finderStep === 1 && (
                    <div className="space-y-4 animate-fadeIn">
                      <h4 className="text-[16px] font-semibold text-gray-800 uppercase tracking-wider">Step 1: Select space to specify</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {(['Bathroom', 'Kitchen', 'Laundry', 'Outdoor'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => { setFinderRoom(r); setFinderStep(2); }}
                            className={`p-4 border text-center rounded-sm transition-all text-base font-medium uppercase tracking-wider ${
                              finderRoom === r ? 'border-black bg-black text-white' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-400'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Select Style */}
                  {finderStep === 2 && (
                    <div className="space-y-4">
                      <h4 className="text-[16px] font-semibold text-gray-800 uppercase tracking-wider">Step 2: Select Architectural Style</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: 'Minimalist', desc: 'Sleek, hidden seams, velvet texture, absolute restraint.' },
                          { name: 'Industrial', desc: 'Exposed structural lines, brushed metal, raw tactile power.' },
                          { name: 'Farmhouse', desc: 'Fluted textures, thick materials, rustic luxury aesthetics.' },
                          { name: 'Coastal', desc: 'Earthy brass/copper, breezy air flows, weathering defense.' }
                        ].map((s) => (
                          <button
                            key={s.name}
                            onClick={() => { setFinderStyle(s.name as any); setFinderStep(3); }}
                            className={`p-4 border text-left rounded-sm transition-all ${
                              finderStyle === s.name ? 'border-black bg-black text-white' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-400'
                            }`}
                          >
                            <h5 className="font-serif text-[17px] font-medium mb-1">{s.name}</h5>
                            <p className="text-[17px] opacity-70 font-light leading-relaxed">{s.desc}</p>
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => setFinderStep(1)}
                        className="text-[16px] uppercase text-gray-400 hover:text-black font-semibold mt-4 block"
                      >
                        ← Back to Space selection
                      </button>
                    </div>
                  )}

                  {/* STEP 3: Select Finish */}
                  {finderStep === 3 && (
                    <div className="space-y-4">
                      <h4 className="text-[16px] font-semibold text-gray-800 uppercase tracking-wider">Step 3: Select Color Accent Plan</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {(['Brushed Brass', 'Matte Black', 'Brushed Copper', 'Brushed Nickel', 'Chrome'] as const).map((f) => (
                          <button
                            key={f}
                            onClick={() => { setFinderFinish(f); setFinderStep(4); }}
                            className={`p-4 border text-center rounded-sm transition-all text-base font-semibold ${
                              finderFinish === f ? 'border-black bg-black text-white' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-400'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => setFinderStep(2)}
                        className="text-[16px] uppercase text-gray-400 hover:text-black font-semibold mt-4 block"
                      >
                        ← Back to Style selection
                      </button>
                    </div>
                  )}

                  {/* STEP 4: Curated Recommendation Results */}
                  {finderStep === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-gray-100 pb-4 text-center">
                        <span className="text-[17px] tracking-widest text-emerald-600 font-bold uppercase block mb-1">Specification Curated!</span>
                        <h4 className="font-serif text-lg text-gray-900 font-light">
                          The {finderStyle} {finderRoom} Suite in {finderFinish}
                        </h4>
                      </div>

                      {/* Recommend Primary Product */}
                      <div className="space-y-3">
                        <span className="text-[16px] uppercase text-gray-400 font-semibold block tracking-wider">Hero Spec Selection</span>
                        
                        {/* Display products matching space and finish */}
                        {MOCK_PRODUCTS.filter(p => p.room === finderRoom && p.finish === finderFinish).slice(0, 1).map((prod) => (
                          <div key={prod.id} className="border border-gray-100 p-4 bg-gray-50/50 rounded-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img referrerPolicy="no-referrer" src={prod.image} alt="" className="w-12 h-12 object-cover" />
                              <div>
                                <h5 className="text-[16px] font-medium text-gray-800">{prod.title}</h5>
                                <span className="text-[16px] text-gray-400">{prod.category} • {formatPrice(prod.numericPrice)}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => { addToCart(prod); showToast(`Added ${prod.title} to cart`); }}
                              className="px-2.5 py-1 bg-black text-white text-[17px] uppercase tracking-wider font-semibold rounded-sm"
                            >
                              Add Hero
                            </button>
                          </div>
                        ))}

                        {MOCK_PRODUCTS.filter(p => p.room === finderRoom && p.finish === finderFinish).length === 0 && (
                          <div className="p-4 bg-gray-50 text-center border text-base text-gray-400 italic">
                            No precise hero matching {finderFinish} in {finderRoom} right now. We recommend: Arlo fluted systems in Brushed Brass.
                          </div>
                        )}
                      </div>

                      {/* Complementary Accessories */}
                      <div className="bg-[#fbfbf9] p-5 border border-gray-200 rounded-sm space-y-3 text-base">
                        <span className="text-[16px] uppercase text-gray-400 font-semibold block tracking-wider">Style Harmony Advice</span>
                        <p className="text-gray-500 font-light leading-relaxed">
                          To establish the ultimate {finderStyle} ambiance, pair this suite with raw textured splashbacks, minimalist trim lines, and soft integrated ambient warm LED strips.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            // Add all matching room & finish products to cart
                            const matches = MOCK_PRODUCTS.filter(p => p.room === finderRoom && p.finish === finderFinish);
                            if (matches.length > 0) {
                              setCart(prev => [...prev, ...matches]);
                              showToast(`Added ${matches.length} matching items to project cart!`);
                            } else {
                              showToast('No matching items in stock right now.', 'info');
                            }
                          }}
                          className="flex-1 py-3 bg-black hover:bg-gray-800 text-white text-[16px] uppercase tracking-widest font-semibold rounded-sm transition-all text-center"
                        >
                          Add Curated Suite to Cart
                        </button>
                        <button 
                          onClick={() => {
                            setFinderStep(1);
                            setFinderRoom(null);
                            setFinderStyle(null);
                            setFinderFinish(null);
                          }}
                          className="px-4 py-3 border border-gray-200 hover:border-black text-[16px] uppercase tracking-widest font-semibold rounded-sm bg-white"
                        >
                          Restart Finder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 8: Order Swatches (Samples Request) */}
          {activeTab === 'samples' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Order Architectural Swatches</h3>
                <p className="text-[16px] text-gray-500 font-light">Physical material samples allow you to check matching metals against your paint, stone, and wood plans under real-world lighting.</p>
              </div>

              {!sampleFormSubmitted ? (
                <>
                  {/* Swatches Selection Grid */}
                  <div className="space-y-3">
                    <span className="text-[16px] uppercase tracking-widest text-gray-400 font-semibold">Available Metallic Disc Swatches</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'sb_brass', name: 'Brushed Brass Metal Disc', finish: 'Brushed Brass', img: waste1Img },
                        { id: 'sb_black', name: 'Matte Black Anodized Plate', finish: 'Matte Black', img: waste2Img },
                        { id: 'sb_copper', name: 'Brushed Copper Patina Disc', finish: 'Brushed Copper', img: waste3Img },
                        { id: 'sb_nickel', name: 'Satin Brushed Nickel Slate', finish: 'Brushed Nickel', img: waste2Img }
                      ].map((swatch) => {
                        const isSelected = sampleSwatches.includes(swatch.name);
                        return (
                          <div 
                            key={swatch.id}
                            onClick={() => {
                              if (isSelected) {
                                setSampleSwatches(sampleSwatches.filter(s => s !== swatch.name));
                              } else {
                                if (sampleSwatches.length >= 3) {
                                  showToast('Maximum of 3 metal swatches per order sample.', 'info');
                                  return;
                                }
                                setSampleSwatches([...sampleSwatches, swatch.name]);
                              }
                            }}
                            className={`p-4 border bg-white rounded-sm flex items-center justify-between cursor-pointer transition-all ${
                              isSelected ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center p-1 bg-gray-50">
                                <img referrerPolicy="no-referrer" src={swatch.img} alt="" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <div>
                                <h4 className="text-[17px] font-medium text-gray-800">{swatch.name}</h4>
                                <span className="text-[17px] text-gray-400">Metal alloy - 50mm diameter</span>
                              </div>
                            </div>
                            <div className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-black border-black' : 'border-gray-300'
                            }`}>
                              {isSelected && <Check size={10} className="text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Address Form block */}
                  <div className="bg-white border border-gray-200 p-6 rounded-sm space-y-4">
                    <h4 className="text-[17px] uppercase tracking-widest text-gray-400 font-semibold">Delivery details (Complimentary Sample Courier)</h4>
                    
                    <div className="space-y-3 text-base">
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          required
                          value={sampleForm.name}
                          onChange={(e) => setSampleForm({ ...sampleForm, name: e.target.value })}
                          className="border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                        />
                        <input 
                          type="email" 
                          placeholder="Professional Email" 
                          required
                          value={sampleForm.email}
                          onChange={(e) => setSampleForm({ ...sampleForm, email: e.target.value })}
                          className="border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                        />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Street Address" 
                        required
                        value={sampleForm.street}
                        onChange={(e) => setSampleForm({ ...sampleForm, street: e.target.value })}
                        className="w-full border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="City / Suburb" 
                          required
                          value={sampleForm.city}
                          onChange={(e) => setSampleForm({ ...sampleForm, city: e.target.value })}
                          className="border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                        />
                        <input 
                          type="text" 
                          placeholder="Postcode" 
                          required
                          value={sampleForm.postcode}
                          onChange={(e) => setSampleForm({ ...sampleForm, postcode: e.target.value })}
                          className="border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (sampleSwatches.length === 0) {
                          showToast('Please select at least 1 metal swatch first.', 'info');
                          return;
                        }
                        if (!sampleForm.name || !sampleForm.email || !sampleForm.street) {
                          showToast('Please complete the address form.', 'info');
                          return;
                        }
                        setSampleFormSubmitted(true);
                        showToast('Complimentary metal swatches successfully ordered!');
                      }}
                      className="w-full py-3 bg-black hover:bg-gray-800 text-white text-[17px] tracking-widest uppercase font-semibold rounded-sm transition-all text-center"
                    >
                      Request Complimentary Swatches ({sampleSwatches.length})
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white border border-gray-200 p-8 rounded-sm text-center space-y-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-gray-900">Swatches Package Ordered!</h4>
                    <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-black">{sampleForm.name}</span>. We have dispatched your ordered sample disc set: <span className="font-medium text-gray-800 italic">{sampleSwatches.join(', ')}</span>.
                    </p>
                    <p className="text-[16px] text-gray-400 font-mono">ESTIMATED COURIER INGRESS: 2 BUSINESS DAYS</p>
                  </div>

                  <button 
                    onClick={() => {
                      setSampleFormSubmitted(false);
                      setSampleSwatches([]);
                      setSampleForm({ name: '', email: '', street: '', city: '', postcode: '' });
                    }}
                    className="px-6 py-2 border border-gray-300 hover:border-black text-[16px] uppercase tracking-wider font-semibold rounded-sm transition-colors bg-white"
                  >
                    Request Another Swatch Set
                  </button>
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 9: Quote Request */}
          {activeTab === 'quote' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-gray-900 font-light">Custom Quote Builder</h3>
                <p className="text-[16px] text-gray-500 font-light">Convert your selected specify list into a trade proposal package containing structural spec discount brackets.</p>
              </div>

              {!quoteSubmitted ? (
                <>
                  {/* Quote Breakdown list */}
                  <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                      <span className="text-[16px] uppercase tracking-widest text-gray-400 font-semibold">Your Spec Summary Package</span>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-[220px] overflow-y-auto px-6 py-3">
                      {projectProducts.map((p) => (
                        <div key={p.id} className="py-2.5 flex justify-between items-center text-base">
                          <span className="text-gray-800 font-medium truncate max-w-[280px]">{p.title}</span>
                          <span className="font-mono text-gray-500">{formatPrice(p.numericPrice)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Cost Calculation block */}
                    <div className="bg-gray-50 px-6 py-5 border-t border-gray-200 space-y-2 text-base">
                      <div className="flex justify-between text-gray-500 font-light">
                        <span>List Price Total ({projectProducts.length} items)</span>
                        <span className="font-mono">${projectSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-700">
                        <span>Contractor Trade Discount (10% Off)</span>
                        <span className="font-mono">-${tradeDiscount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-black border-t border-gray-200 pt-3">
                        <span>Trade Proposal Estimate</span>
                        <span className="font-mono">${projectTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Form Block */}
                  <div className="bg-white border border-gray-200 p-6 rounded-sm space-y-4">
                    <h4 className="text-[17px] uppercase tracking-widest text-gray-400 font-semibold">Submit Quote Request Form</h4>
                    
                    <div className="space-y-3 text-base">
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="Business Name (Optional)" 
                          value={quoteForm.company}
                          onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                          className="border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                        />
                        <input 
                          type="tel" 
                          placeholder="Contact Phone" 
                          required
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          className="border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                        />
                      </div>
                      <textarea 
                        rows={3}
                        placeholder="Architectural spec notes or builder requests..." 
                        value={quoteForm.note}
                        onChange={(e) => setQuoteForm({ ...quoteForm, note: e.target.value })}
                        className="w-full border border-gray-300 rounded-sm p-2 outline-none focus:border-black bg-[#fdfdfc]"
                      />
                    </div>

                    <button 
                      onClick={() => {
                        setQuoteSubmitted(true);
                        showToast('Proposal request received. Your quotation package is being drafted!');
                      }}
                      className="w-full py-3 bg-black hover:bg-gray-800 text-white text-[17px] tracking-widest uppercase font-semibold rounded-sm transition-all text-center"
                    >
                      Request Formal Project Quote
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white border border-gray-200 p-8 rounded-sm text-center space-y-6">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-gray-900">Quote Request Submitted!</h4>
                    <p className="text-base text-gray-500 leading-relaxed max-w-sm mx-auto">
                      Our trade specification managers have compiled your project package and allocated Proposal Code: <span className="font-mono font-bold text-black bg-gray-100 px-2 py-0.5 rounded-sm">VELA-PROPOSAL-8241</span>.
                    </p>
                    <p className="text-[16px] text-gray-400 font-mono">A formal specification PDF has been dispatched to your email.</p>
                  </div>

                  <button 
                    onClick={() => {
                      setQuoteSubmitted(false);
                      setQuoteForm({ company: '', phone: '', note: '' });
                    }}
                    className="px-6 py-2 border border-gray-300 hover:border-black text-[16px] uppercase tracking-wider font-semibold rounded-sm transition-colors bg-white"
                  >
                    Configure New Project Proposal
                  </button>
                </div>
              )}

            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
