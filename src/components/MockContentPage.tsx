import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Clock, MapPin, Phone, Mail, Award, Target, Users } from 'lucide-react';

const photo = (file: string) => `${import.meta.env.BASE_URL}${file}`;

interface MockContentPageProps {
  pageId: string;
}

export const MockContentPage: React.FC<MockContentPageProps> = ({ pageId }) => {
  const content: Record<string, any> = {
    'about_our-story': {
      title: "Our Story",
      subtitle: "A short palette for calm rooms.",
      body: "Vela Atelier started in 2019 with solid-brass tapware and stainless sinks. The catalogue stays narrow so one finish can run from the kitchen mixer to the basin, the towel rail, and the entry pull.",
      image: photo("bathroom_menu.jpg"),
      features: [
        { icon: <Target size={24} />, title: "Our Mission", desc: "To bring architectural hardware and premium fixtures to everyone, elevating the standard of everyday living." },
        { icon: <Users size={24} />, title: "Our Community", desc: "We are proudly supported by a vibrant community of builders, architects, interior designers, and homeowners." },
        { icon: <Award size={24} />, title: "Our Promise", desc: "Uncompromising quality. Every piece is rigorously tested and beautifully crafted to last a lifetime." }
      ],
      gallery: [
        photo("sink1.jpg"),
        photo("antique.jpg")
      ]
    },
    'about_showroom-locations': {
      title: "Showroom Locations",
      subtitle: "Full rooms, not fixture walls.",
      body: "The Vela studios are sample spaces for this portfolio site. Southport, Sydney, Melbourne, and Perth show how brass, stone, and timber sit together. None of the addresses are trading showrooms.",
      image: photo("tiles.jpg"),
      features: [
        { icon: <MapPin size={24} />, title: "Southport Studio", desc: "Our expansive flagship showroom featuring full bathroom and kitchen mockups." },
        { icon: <MapPin size={24} />, title: "Sydney Showroom", desc: "Located in the heart of the design district, tailored for architects and homeowners." },
        { icon: <MapPin size={24} />, title: "Melbourne Gallery", desc: "A curated space showcasing our latest finishes and signature collections." }
      ],
      gallery: [
        photo("entry_pull.jpg"),
        photo("nesso.jpg")
      ]
    },
    'about_sustainability': {
      title: "Sustainability",
      subtitle: "Building a better tomorrow.",
      body: "We are deeply committed to minimizing our environmental footprint. From our manufacturing processes to our packaging, we are continuously seeking innovative ways to create beautiful products sustainably.",
      image: photo("cabinetry.jpg"),
      features: [
        { icon: <CheckCircle size={24} />, title: "Eco-Friendly Packaging", desc: "We have transitioned to 100% recyclable packaging, eliminating single-use plastics." },
        { icon: <CheckCircle size={24} />, title: "Water Efficiency", desc: "Our tapware is WELS rated, ensuring maximum water efficiency without compromising performance." },
        { icon: <CheckCircle size={24} />, title: "Ethical Manufacturing", desc: "We partner strictly with facilities that uphold fair labor practices and environmental standards." }
      ],
      gallery: []
    },
    'about_product-quality': {
      title: "Product Quality",
      subtitle: "Uncompromising standards.",
      body: "Our commitment to quality is uncompromising. Every piece is crafted from premium materials, rigorously tested for durability, and designed to withstand the test of time. We utilise state-of-the-art PVD (Physical Vapour Deposition) colouring technology to ensure our finishes remain vibrant and scratch-resistant.",
      image: photo("laundry_menu.jpg"),
      features: [
        { icon: <CheckCircle size={24} />, title: "Solid Brass Core", desc: "The foundation of our tapware is high-grade solid brass, ensuring longevity and a premium feel." },
        { icon: <Award size={24} />, title: "PVD Finishes", desc: "Industrial-grade colouring technology that provides a highly durable, scratch-resistant surface." },
        { icon: <Target size={24} />, title: "Rigorous Testing", desc: "Every product undergoes strict pressure and functionality testing before it reaches your home." }
      ],
      gallery: [
        photo("outdoor_menu.jpg"),
        photo("feature.jpg")
      ]
    },
    'about_customer-reviews': {
      title: "Customer Reviews",
      subtitle: "Hear from our community.",
      body: "Discover how our products have transformed homes around the world. Our customers' stories inspire us to continue innovating and delivering excellence. We are proud to have been a part of thousands of beautiful renovations and new builds.",
      image: photo("consult_showroom.jpg"),
      features: [
        { icon: <CheckCircle size={24} />, title: "Sarah J. - Interior Designer", desc: "\"The quality and finish of the Lumen range is unmatched. It's my go-to for all client projects.\"" },
        { icon: <CheckCircle size={24} />, title: "Michael R. - Homeowner", desc: "\"Transformed our master ensuite. The brushed brass has held up perfectly even after 3 years of daily use.\"" },
        { icon: <CheckCircle size={24} />, title: "Elena V. - Architect", desc: "\"Clean lines, reliable internals, and a beautiful aesthetic. Exactly what modern architecture demands.\"" }
      ],
      gallery: [
        photo("hero.jpg"),
        photo("bathroom_menu.jpg")
      ]
    },
    'about_the-vela-difference': {
      title: "The Vela Difference",
      subtitle: "A short range, carried through the room.",
      body: "Vela keeps the catalogue narrow so a kitchen mixer, a basin, and an entry pull can share one finish. The planning studio turns that palette into a project list.",
      image: photo("sink1.jpg"),
      features: [
        { icon: <Target size={24} />, title: "Direct to Consumer", desc: "By bypassing traditional retail markups, we deliver premium luxury at an accessible price point." },
        { icon: <Users size={24} />, title: "Design Consultations", desc: "Complimentary sessions with our interior design experts to help you curate your perfect space." },
        { icon: <Award size={24} />, title: "25-Year Warranty", desc: "Our confidence in our product's durability is reflected in our robust, industry-leading warranty." }
      ],
      gallery: []
    },
    'about_journal': {
      title: "The Journal",
      subtitle: "Inspiration and insights.",
      body: "Explore our latest articles, design tips, project reveals, and interviews with industry-leading professionals. A curated space for architectural and interior design inspiration.",
      image: photo("antique.jpg"),
      features: [
        { icon: <Users size={24} />, title: "Project Reveals", desc: "Step inside stunning homes featuring our products, with insights from the designers." },
        { icon: <Users size={24} />, title: "Trend Forecasts", desc: "Stay ahead of the curve with our analysis of emerging interior design trends." },
        { icon: <Users size={24} />, title: "How-To Guides", desc: "Practical advice on installation, maintenance, and styling." }
      ],
      gallery: []
    },
    'about_contact-us': {
      title: "Contact Us",
      subtitle: "We're here to help.",
      body: "Whether you have a question about our products, need assistance with an order, or want to book a design consultation, our dedicated team is ready to assist you.",
      image: photo("tiles.jpg"),
      features: [
        { icon: <Phone size={24} />, title: "Call Us", desc: "Speak directly with our customer service team. Available Monday to Friday, 9am - 5pm." },
        { icon: <Mail size={24} />, title: "Email Us", desc: "Send us a message and we'll aim to respond within 24 business hours." },
        { icon: <MapPin size={24} />, title: "Visit Us", desc: "Find your nearest showroom to speak with our design consultants in person." }
      ],
      gallery: []
    },
    'about_buying-and-care-guides': {
      title: "Buying & Care Guides",
      subtitle: "Protect your investment.",
      body: "Ensure your tapware and fixtures look beautiful for years to come. Our detailed care guides provide all the information you need for maintenance and cleaning.",
      image: photo("entry_pull.jpg"),
      features: [
        { icon: <CheckCircle size={24} />, title: "Finish Specific", desc: "Tailored advice for maintaining brass, copper, gunmetal, and matte black." },
        { icon: <CheckCircle size={24} />, title: "Cleaning Products", desc: "Recommendations on what to use, and importantly, what to avoid." },
        { icon: <CheckCircle size={24} />, title: "Installation Prep", desc: "Pre-installation checklists for your plumber to ensure longevity." }
      ],
      gallery: []
    },
    careers: {
      title: "Careers",
      subtitle: "Join our growing team.",
      body: "Join a passionate team dedicated to design excellence. We are always looking for creative, driven individuals to help us shape the future of interior architecture. Whether you're in product design, marketing, or logistics, we offer a dynamic and supportive environment.",
      image: photo("nesso.jpg"),
      features: [
        { icon: <Users size={24} />, title: "Collaborative Culture", desc: "Work alongside industry experts in an open, creative, and supportive workspace." },
        { icon: <Award size={24} />, title: "Growth Opportunities", desc: "We invest in our people with ongoing training, development, and clear career pathways." },
        { icon: <Target size={24} />, title: "Impactful Work", desc: "Contribute to products that are installed in homes and commercial spaces globally." }
      ],
      gallery: []
    },
    bathroom_calculator: {
      title: "Bathroom Renovation Calculator",
      subtitle: "Plan your project budget.",
      body: "Plan your dream bathroom with our comprehensive calculator. Estimate costs across materials, labor, and fixtures to keep your project on track. This interactive tool helps you allocate your budget intelligently.",
      image: photo("cabinetry.jpg"),
      features: [
        { icon: <CheckCircle size={24} />, title: "Accurate Estimates", desc: "Based on real-world data and current market rates for both labor and materials." },
        { icon: <CheckCircle size={24} />, title: "Customizable Scenarios", desc: "Adjust your selections from budget-friendly to premium luxury to see real-time updates." },
        { icon: <CheckCircle size={24} />, title: "Exportable Reports", desc: "Download your detailed estimate as a PDF to share with your builder or tradespeople." }
      ],
      gallery: []
    },
    tile_calculator: {
      title: "Tile Calculator",
      subtitle: "Measure twice, order once.",
      body: "Ensure you order the perfect amount of tiles for your space. Our calculator factors in cuts, wastage, and grout lines for precise measurements. Never run short or over-order again.",
      image: photo("laundry_menu.jpg"),
      features: [
        { icon: <Target size={24} />, title: "Area Calculation", desc: "Easily input your wall and floor dimensions, including cutouts for windows and doors." },
        { icon: <Target size={24} />, title: "Wastage Buffer", desc: "Automatically calculates the recommended 10-15% buffer for cuts and breakages." },
        { icon: <Target size={24} />, title: "Pattern Adjustments", desc: "Accounts for complex laying patterns like herringbone or chevron which require more material." }
      ],
      gallery: []
    },
    moodboard_builder: {
      title: "Moodboard Builder",
      subtitle: "Visualise your space.",
      body: "Bring your vision to life. Mix and match finishes, textures, and products to create a cohesive design palette for your next project. Save, share, and collaborate on your designs.",
      image: photo("outdoor_menu.jpg"),
      features: [
        { icon: <Users size={24} />, title: "Drag and Drop", desc: "An intuitive interface lets you easily compile swatches, product images, and inspiration." },
        { icon: <Users size={24} />, title: "Shareable Links", desc: "Send your completed moodboard to your partner, designer, or builder with a single click." },
        { icon: <Users size={24} />, title: "Seamless Shopping", desc: "Instantly add all the products featured in your moodboard directly to your cart." }
      ],
      gallery: []
    },
    bim_library: {
      title: "BIM Library",
      subtitle: "For design professionals.",
      body: "Access our comprehensive library of 3D models and BIM objects, designed specifically for architects and design professionals. Streamline your workflow with accurate, high-quality assets.",
      image: photo("feature.jpg"),
      features: [
        { icon: <Award size={24} />, title: "Multiple Formats", desc: "Available for Revit, SketchUp, ArchiCAD, and AutoCAD." },
        { icon: <Award size={24} />, title: "Accurate Dimensions", desc: "True-to-scale models ensuring perfect planning and clash detection." },
        { icon: <Award size={24} />, title: "Regular Updates", desc: "Our library is constantly updated with our latest product releases." }
      ],
      gallery: []
    },
    catalogues: {
      title: "Catalogues",
      subtitle: "Browse our collections.",
      body: "Browse our digital catalogues for seasonal inspiration, new product launches, and comprehensive collection overviews. Download them for offline viewing or request a physical copy.",
      image: photo("consult_showroom.jpg"),
      features: [
        { icon: <CheckCircle size={24} />, title: "Lookbooks", desc: "Highly visual curation of our products styled in stunning settings." },
        { icon: <CheckCircle size={24} />, title: "Technical Specifications", desc: "Detailed manuals containing all the measurements and technical data you need." },
        { icon: <CheckCircle size={24} />, title: "Physical Copies", desc: "Order a beautifully printed copy delivered directly to your studio or home." }
      ],
      gallery: []
    },
    warranty: {
      title: "Warranty Information",
      subtitle: "Peace of mind guaranteed.",
      body: "We stand behind the quality of our products. Our comprehensive warranty covers manufacturing defects and structural integrity, giving you confidence in your investment.",
      image: photo("hero.jpg"),
      features: [
        { icon: <Award size={24} />, title: "25-Year Structural", desc: "Industry-leading structural warranty on all our brass tapware." },
        { icon: <CheckCircle size={24} />, title: "5-Year Finish", desc: "Comprehensive coverage on our PVD and electroplated finishes." },
        { icon: <Phone size={24} />, title: "Dedicated Support", desc: "Our local team is ready to assist with any warranty claims quickly and efficiently." }
      ],
      gallery: []
    },
    returns: {
      title: "Returns & Exchanges",
      subtitle: "Simple, hassle-free returns.",
      body: "The returns flow is here to show a help-centre pattern. In this demo, nothing is shipped and nothing needs to come back.",
      image: photo("bathroom_menu.jpg"),
      features: [
        { icon: <Clock size={24} />, title: "30-Day Window", desc: "Return unused items in their original packaging within 30 days of delivery." },
        { icon: <CheckCircle size={24} />, title: "Easy Process", desc: "Lodge your return online in minutes through our portal." },
        { icon: <MapPin size={24} />, title: "Local Depots", desc: "Convenient return locations across the country." }
      ],
      gallery: []
    },
    shipping: {
      title: "Shipping & Delivery",
      subtitle: "Fast, reliable dispatch.",
      body: "We understand that timelines are critical in construction and renovation. We offer reliable, tracked shipping options to get your products to site when you need them.",
      image: photo("sink1.jpg"),
      features: [
        { icon: <Clock size={24} />, title: "Same Day Dispatch", desc: "Order before 1pm for same-day dispatch on stocked items." },
        { icon: <MapPin size={24} />, title: "Tracked Delivery", desc: "Real-time tracking from our warehouse to your front door." },
        { icon: <Target size={24} />, title: "Careful Packaging", desc: "Every item is securely packed to prevent transit damage." }
      ],
      gallery: []
    },
    terms: {
      title: "Terms & Conditions",
      subtitle: "Our agreement with you.",
      body: "These terms are sample copy for the portfolio site. Vela Atelier does not sell products, take payment, or operate the studios listed in the help centre.",
      image: photo("antique.jpg"),
      features: [
        { icon: <CheckCircle size={24} />, title: "Clear Guidelines", desc: "Transparent policies regarding pricing, delivery, and liability." },
        { icon: <CheckCircle size={24} />, title: "Trade Accounts", desc: "Specific terms applicable to our registered trade partners." },
        { icon: <CheckCircle size={24} />, title: "Consumer Rights", desc: "Your rights under the Australian Consumer Law are fully respected." }
      ],
      gallery: []
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Protecting your data.",
      body: "We value your privacy and are committed to protecting your personal information. This policy describes how we collect, use, and safeguard your data.",
      image: photo("tiles.jpg"),
      features: [
        { icon: <Target size={24} />, title: "Data Security", desc: "Industry-standard encryption to protect your payment and personal details." },
        { icon: <Target size={24} />, title: "Transparent Usage", desc: "We only use your data to improve your shopping experience and deliver orders." },
        { icon: <Target size={24} />, title: "Your Control", desc: "You have full control over your data preferences and communication settings." }
      ],
      gallery: []
    }
  };

  const data = content[pageId] || content['about_our-story'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-white"
    >
      {/* Hero Section */}
      <div className="w-full h-[50vh] md:h-[60vh] relative flex items-center justify-center overflow-hidden">
        <motion.img referrerPolicy="no-referrer" 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={data.image} 
          alt={data.title} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 uppercase tracking-[0.2em] text-[17px] mb-4 block font-medium"
          >
            {data.subtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-5xl md:text-7xl font-serif tracking-wide"
          >
            {data.title}
          </motion.h1>
        </div>
      </div>

      {/* Intro Body */}
      <div className="max-w-4xl mx-auto py-10 px-6 text-center">
        <p className="text-gray-600 text-lg md:text-2xl leading-relaxed font-light">
          {data.body}
        </p>
      </div>

      {/* Features Grid */}
      <div className="bg-[#f8f8f8] py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {data.features.map((feature: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-gray-400 group-hover:text-black transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-serif text-xl mb-4 text-[#222]">{feature.title}</h3>
                <p className="text-[16px] text-gray-500 font-light leading-relaxed max-w-xs">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Gallery Section */}
      {data.gallery && data.gallery.length > 0 && (
        <div className="py-10 px-6 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.gallery.map((img: string, i: number) => (
              <div key={i} className="aspect-square md:aspect-[4/3] overflow-hidden bg-gray-100">
                <img referrerPolicy="no-referrer" src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
