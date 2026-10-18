import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Video, Home, FileText, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  type: 'Virtual' | 'Showroom' | null;
  onClose: () => void;
  onConfirmBooking: (booking: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  type,
  onClose,
  onConfirmBooking
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '10:00 AM - 11:00 AM',
    projectType: 'Kitchen Remodel',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:30 AM - 12:30 PM',
    '02:00 PM - 03:00 PM',
    '03:30 PM - 04:30 PM'
  ];

  const projectTypes = [
    'Kitchen Remodel',
    'Bathroom Renovation',
    'Full Home Build',
    'Laundry Upgrade',
    'Outdoor Space Design'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingDetails = {
      id: Date.now(),
      type,
      ...formData,
      bookingCode: `VELA-BOOK-${Math.floor(100000 + Math.random() * 900000)}`
    };
    onConfirmBooking(bookingDetails);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && type && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-lg rounded-sm shadow-2xl z-[210] overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-neutral-950 p-6 text-white flex justify-between items-center relative">
              <div className="flex items-center gap-3">
                {type === 'Virtual' ? (
                  <div className="p-2 bg-amber-500 rounded-full text-black">
                    <Video size={16} />
                  </div>
                ) : (
                  <div className="p-2 bg-amber-500 rounded-full text-black">
                    <Home size={16} />
                  </div>
                )}
                <div>
                  <h3 className="text-base font-serif uppercase tracking-widest text-amber-500 font-bold">Complimentary Consultation</h3>
                  <p className="text-[17px] font-mono uppercase text-gray-300 tracking-wider">Book Your {type} Design Session</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded-full cursor-pointer hover:bg-neutral-850 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-base text-gray-700 font-light">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lauren Smith" 
                        className="w-full border border-gray-200 focus:border-black rounded-sm p-3 outline-none text-base transition-colors bg-[#fbfbfa]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +61 400 000 000" 
                        className="w-full border border-gray-200 focus:border-black rounded-sm p-3 outline-none text-base transition-colors bg-[#fbfbfa]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. lauren@example.com" 
                      className="w-full border border-gray-200 focus:border-black rounded-sm p-3 outline-none text-base transition-colors bg-[#fbfbfa]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 relative">
                      <label className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Appointment Date</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full border border-gray-200 focus:border-black rounded-sm p-3 outline-none text-base transition-colors bg-[#fbfbfa] pl-9"
                        />
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Time Slot</label>
                      <div className="relative">
                        <select 
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full border border-gray-200 focus:border-black rounded-sm p-3 outline-none text-base transition-colors bg-[#fbfbfa] appearance-none pl-9"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Project Category</label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {projectTypes.map((pt) => (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: pt })}
                          className={`px-3 py-1.5 border rounded-sm transition-all text-[17px] cursor-pointer ${formData.projectType === pt ? 'border-neutral-900 bg-neutral-900 text-white font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Specific Notes / Requirements</label>
                    <div className="relative">
                      <textarea 
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Looking for Brushed Brass finishes to match with farmhouse ceramic sink layout..." 
                        className="w-full border border-gray-200 focus:border-black rounded-sm p-3 outline-none text-base transition-colors bg-[#fbfbfa] pl-9"
                      />
                      <FileText size={14} className="absolute left-3 top-4 text-gray-400" />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white text-[17px] tracking-widest uppercase font-bold rounded-sm transition-all text-center cursor-pointer shadow-md mt-6"
                  >
                    Confirm Consultation Booking
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 size={40} className="animate-bounce" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl text-gray-900 font-light">Consultation Confirmed!</h4>
                    <p className="text-base text-gray-500 leading-relaxed max-w-sm mx-auto">
                      Thank you, <span className="font-semibold text-black">{formData.name}</span>. Your {type} Design Consultation is officially booked for <span className="font-semibold text-black">{formData.date}</span> at <span className="font-semibold text-black">{formData.timeSlot}</span>.
                    </p>
                    <p className="text-[17px] text-gray-400 font-mono mt-4">
                      Appointment Confirmation Reference Code: <br />
                      <span className="text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-sm border border-amber-200/50 mt-2 inline-block">
                        {`VELA-BOOK-${Math.floor(100000 + Math.random() * 900000)}`}
                      </span>
                    </p>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={onClose}
                      className="px-8 py-3 border border-neutral-300 hover:border-black hover:text-black transition-colors rounded-sm text-[17px] tracking-widest uppercase font-semibold text-gray-600 cursor-pointer"
                    >
                      Back to Page
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
