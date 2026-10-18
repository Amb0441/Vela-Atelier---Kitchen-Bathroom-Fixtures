import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  HelpCircle, 
  Truck, 
  ShieldCheck, 
  Calendar, 
  RotateCcw, 
  Sparkles,
  MapPin,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

const QUICK_TOPICS = [
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck, detail: 'Rates, dispatch, and delivery times.' },
  { id: 'finishes', label: 'Finishes & Materials', icon: Sparkles, detail: 'PVD, solid brass, care & warranty info.' },
  { id: 'returns', label: 'Returns & Exchange', icon: RotateCcw, detail: '14-day hassle-free return policy.' },
  { id: 'consults', label: 'Book Consultation', icon: Calendar, detail: 'Showrooms and virtual design consults.' },
];

export default function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'agent',
          text: "Hello, this is Vela Atelier. Ask about shipping, finishes, returns, or the studios.\n\nReplies here are scripted for the portfolio demo.",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Auto-scroll to bottom on new messages or typing state change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle unread counts when minimized
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string, isUserAction = true) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    };

    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages })
      });
      if (res.ok) {
        const data = await res.json();
        const agentMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: data.text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentMsg]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.warn("API chat error, falling back to local heuristic response:", err);
    }

    // Fallback response simulation
    setTimeout(() => {
      const responseText = getAgentResponse(text);
      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleTopicClick = (topicId: string, label: string) => {
    handleSendMessage(label);
  };

  const getAgentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Check Shipping & Delivery
    if (input.includes('ship') || input.includes('delivery') || input.includes('post') || input.includes('freight') || input.includes('dispatch')) {
      return "🚚 **Vela Shipping & Delivery Guidelines:**\n\n• **Free Shipping:** We offer complimentary shipping on all orders over **$1,000 AUD** within Australia.\n• **Flat Rates:** For orders under $1,000, shipping rates are calculated at checkout based on package dimensions and delivery location.\n• **Dispatch Times:** In-stock items are typically dispatched from our main warehouse within **1-2 business days**.\n• **Delivery ETA:** Once dispatched, metropolitan deliveries usually arrive in **2-5 business days**, while regional areas may take **5-8 business days**.\n\nNeed specific tracking assistance? Please provide your Order ID (e.g. VELA-10492) and I will retrieve the status.";
    }

    // Check Finishes & Care
    if (input.includes('finish') || input.includes('brass') || input.includes('pvd') || input.includes('care') || input.includes('clean') || input.includes('nickel') || input.includes('copper') || input.includes('chrome') || input.includes('black')) {
      return "✨ **Vela Premium Finishes & Product Care:**\n\nWe utilize advanced **PVD (Physical Vapor Deposition)** technology to coat our premium finishes, making them highly scratch-resistant and durable.\n\n**Quick Care Advice:**\n• **Brushed Brass, Copper, & Gunmetal:** Clean only with a soft microfiber cloth, warm water, and mild pH-neutral soap. Never use acidic or abrasive cleaners.\n• **Matte Black & Chrome:** Wipe clean after use to prevent hard water mineral deposits from etching the surface.\n• **Lifetime Warranty:** All of our premium electroplated and PVD finishes are backed by our **Lifetime Finishes Warranty** for absolute peace of mind.";
    }

    // Check Returns
    if (input.includes('return') || input.includes('refund') || input.includes('exchange') || input.includes('fault') || input.includes('cancel')) {
      return "🔄 **Vela Return & Exchange Policy:**\n\n• **14-Day Hassle-Free Returns:** We accept returns within **14 days** of you receiving your order, provided the items are in their original packaging, unopened, and in resaleable condition.\n• **Exchanges:** To exchange an item, simply return your original product for a full store credit or refund, and place a new order online for the replacement.\n• **Return Process:** To lodge a return, navigate to our **Help Centre > Returns Portal** or reply to your order confirmation email. Return shipping costs are the responsibility of the customer.\n• **Custom Orders:** Please note that custom or customized fixtures cannot be returned unless verified as faulty.";
    }

    // Check Showrooms / Consultations
    if (input.includes('showroom') || input.includes('visit') || input.includes('consult') || input.includes('location') || input.includes('melbourne') || input.includes('sydney') || input.includes('brisbane') || input.includes('gold coast') || input.includes('appointment')) {
      return "📍 **Vela Studios:**\n\nThe finishes are laid out as full rooms in four fictional studios:\n• **Southport:** 18 Harbour Lane, QLD\n• **Sydney:** 42 Studio Lane, Surry Hills, NSW\n• **Melbourne:** 9 Gallery Street, Fitzroy, VIC\n• **Perth:** 6 Workshop Road, Northbridge, WA\n\n**Book a Consultation:**\nUse **Book Consult** in the top bar to try a 30-minute in-studio or video appointment. These studios are part of the portfolio demo.";
    }

    // Check Materials / Lead free
    if (input.includes('lead') || input.includes('material') || input.includes('steel') || input.includes('stainless') || input.includes('brass')) {
      return "🛡️ **Eco-Friendly Materials & Structural Integrity:**\n\n• **Lead-Free Engineering:** Vela is dedicated to healthy living. Our premium sinks, tapware, and wastes are crafted with lead-free **Grade 304 and 316 Stainless Steel** for absolute purity.\n• **Durable Construction:** Our internal cartridges use precision Swiss ceramic discs that prevent any dripping or wearing down over decades of use.\n• **Certifications:** All products comply with Australian watermark, WELS energy ratings, and lead-free plumbing standards.";
    }

    // Check Help / Contact
    if (input.includes('help') || input.includes('contact') || input.includes('phone') || input.includes('email') || input.includes('support') || input.includes('agent') || input.includes('human')) {
      return "📞 **Get in Touch with our Support Team:**\n\nIf you'd like to speak with a human support agent or have a complex order request, our team is available Monday to Friday from 8:30 AM to 5:00 PM AEST:\n\n• **Phone Support:** +61 3 9000 2140\n• **Email Inquiries:** hello@vela-atelier.example\n• **Virtual Design Chat:** Available directly on our contact page.\n\nSimply let me know your contact phone number or email, and I can request an agent to get back to you within 2 business hours!";
    }

    // Greet / General
    if (input.includes('hello') || input.includes('hi ') || input.includes('hey') || input.includes('g\'day') || input.includes('morning') || input.includes('afternoon')) {
      return "Hello there! I'm your Vela automated assistant. 🌟\n\nI can help you instantly with shipping queries, return policies, finish details, showroom coordinates, or help you request a callback from a specialist. What can I clarify for you?";
    }

    if (input.includes('thank') || input.includes('great') || input.includes('awesome') || input.includes('perfect')) {
      return "You are very welcome! It's our absolute pleasure to assist with your build. Is there anything else about tapware, sinks, or our planning tools I can help with?";
    }

    // Default Fallback
    return "Thank you for reaching out! 🏠 I have logged your inquiry regarding: \n\n*\"" + userInput + "\"*\n\nOur client coordination team usually reviews inquiries within **2 hours**. \n\nIn the meantime, you can review our **Buying & Care Guides** (under ABOUT US) or explore the **Planning Studio** on the main navigation bar to organize your project specifications!";
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 md:bottom-8 right-4 md:right-8 w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#d0d3c5] hover:bg-[#b0b3a5] text-white rounded-full flex justify-center items-center shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 z-[150] group"
        title="Chat with Customer Support"
        id="support-chat-trigger"
      >
        <MessageCircle className="text-white group-hover:rotate-12 transition-transform" size={28} strokeWidth={1.5} />
        
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 justify-center items-center rounded-full bg-amber-500 text-[16px] font-bold text-white shadow-md animate-bounce">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[380px] h-[500px] md:h-[550px] bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-[160] font-sans"
            id="support-chat-window"
          >
            {/* Header */}
            <div className="bg-[#fcfbf9] border-b border-gray-100 px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d0d3c5]/30 flex items-center justify-center text-gray-700 relative">
                  <span className="font-semibold text-base tracking-wider">VELA</span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 tracking-wider uppercase">Vela Atelier</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[17px] text-gray-400 font-light uppercase tracking-widest">Support Specialist</span>
                    <span className="text-[8px] px-1.5 py-0.2 bg-emerald-50 text-emerald-600 rounded-full font-bold">ONLINE</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#fbfbfb] space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-lg px-4 py-3 text-base leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-neutral-800 text-white rounded-tr-none' 
                        : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                    <div className={`text-[8px] mt-1.5 font-light text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-400 border border-gray-100 shadow-sm rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                    <span className="text-[16px] italic">Agent is typing</span>
                    <span className="flex gap-0.5 items-center mt-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Recommended/Quick Help Topics bar */}
            {messages.length === 1 && (
              <div className="px-4 py-3 bg-[#fcfbf9] border-t border-gray-100">
                <span className="text-[17px] font-bold text-gray-400 tracking-wider uppercase block mb-2">Common Inquiries</span>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic.id, topic.label)}
                        className="p-2 bg-white border border-gray-100 rounded text-left hover:border-neutral-800 hover:bg-neutral-50 transition-all group"
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon size={12} className="text-gray-400 group-hover:text-black" />
                          <span className="text-[16px] font-medium text-gray-700 group-hover:text-black">{topic.label}</span>
                        </div>
                        <span className="text-[8px] text-gray-400 font-light block mt-0.5 truncate">{topic.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!inputValue.trim()) return;
                handleSendMessage(inputValue);
                setInputValue('');
              }}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about shipping, finishes, warranty..." 
                className="flex-1 bg-gray-50 border border-gray-100 focus:border-gray-300 rounded px-3 py-2.5 text-base text-gray-800 outline-none placeholder:text-gray-400 transition-all font-light"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className={`p-2.5 rounded transition-all ${
                  inputValue.trim() 
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
