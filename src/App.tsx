import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, ChevronDown, ChevronUp, MessageCircle, X, MapPin, Clock, Phone, ArrowRight, Youtube, Facebook, Instagram, Mail, Award, Check, ShieldCheck, Calculator, Briefcase, FileText, Layers, Download, Printer, Sliders, Info, Sparkles, Plus, Trash2, Palette, Eye, HelpCircle, CheckCircle2, Menu, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WorkspaceDrawer from './components/PlanningStudio';
import CustomerSupportChat from './components/CustomerSupportChat';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { ProductsCatalogPage } from './components/ProductsCatalogPage';
import { MockContentPage } from './components/MockContentPage';
import { SearchModal } from './components/SearchModal';
import { SavedProductsPage } from './components/SavedProductsPage';
import { useRegion, Region } from './context/RegionContext';
const photo = (file: string) => `${import.meta.env.BASE_URL}${file}`;
const heroImg = photo('hero.jpg');
const antiqueImg = photo('antique.jpg');
const nessoImg = photo('nesso.jpg');
const tilesImg = photo('tiles.jpg');
const entryPullImg = photo('entry_pull.jpg');
const featureImg = photo('feature.jpg');
const consultVirtualImg = photo('consult_virtual.jpg');
const consultShowroomImg = photo('consult_showroom.jpg');
const helpCentreImg = photo('help_centre.jpg');
const wrenPullImg = photo('ziggy_pull.jpg');
const kitchenMenuImg = photo('kitchen_menu.jpg');
const sink1Img = photo('sink1.jpg');
const sink2Img = photo('sink2.jpg');
const sink3Img = photo('sink3.jpg');
const bathroomMenuImg = photo('bathroom_menu.jpg');
const waste1Img = photo('waste1.jpg');
const waste2Img = photo('waste2.jpg');
const waste3Img = photo('waste3.jpg');
const laundryMenuImg = photo('laundry_menu.jpg');
const outdoorMenuImg = photo('outdoor_menu.jpg');
const cabinetryImg = photo('cabinetry.jpg');

export interface Product {
  id: number;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  category: string;
  room: string;
  finish: string;
  material: string;
  warranty: string;
  rating: number;
  description: string;
  compatibleWith: string[];
  suggestedCombo: string;
  accessories: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Cove Pop-Up Waste - Brushed Brass',
    price: '$59.90',
    numericPrice: 59.90,
    image: waste1Img,
    category: 'Wastes',
    room: 'Bathroom',
    finish: 'Brushed Brass',
    material: 'DR Brass (Dezincification Resistant)',
    warranty: 'Lifetime (25 years)',
    rating: 4.9,
    description: 'A luxurious and functional pop-up waste designed to add a beautiful metallic accent to your basin.',
    compatibleWith: ['Lumen Basin Mixer', 'Marlow Vanity Unit'],
    suggestedCombo: 'Brushed Brass + Matte White Marble',
    accessories: ['Cove Extension Tube', 'Silicone Sealing Washer']
  },
  {
    id: 2,
    title: 'Cove Pop-Up Waste - Brushed Nickel',
    price: '$49.90',
    numericPrice: 49.90,
    image: waste2Img,
    category: 'Wastes',
    room: 'Bathroom',
    finish: 'Brushed Nickel',
    material: 'DR Brass (Dezincification Resistant)',
    warranty: 'Lifetime (25 years)',
    rating: 4.8,
    description: 'A classic, understated brushed nickel pop-up waste that complements any cool-toned or neutral bathroom layout.',
    compatibleWith: ['Lumen Basin Mixer - Nickel', 'All Standard Basins'],
    suggestedCombo: 'Brushed Nickel + Charcoal Terrazzo',
    accessories: ['Cove Extension Tube', 'Silicone Sealing Washer']
  },
  {
    id: 3,
    title: 'Sink Basket Waste 50mm - Brushed Brass',
    price: '$59.90',
    numericPrice: 59.90,
    image: waste3Img,
    category: 'Wastes',
    room: 'Kitchen',
    finish: 'Brushed Brass',
    material: 'Premium Stainless Steel / Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.9,
    description: 'Elegantly styled kitchen sink waste with integrated strainer basket. Perfect for modern, gourmet kitchen designs.',
    compatibleWith: ['Arlo Double Kitchen Sink', 'Lumen Kitchen Mixer'],
    suggestedCombo: 'Brushed Brass + Dark Emerald Green Cabinetry',
    accessories: ['Strainer Cup replacement', 'Deep Basket Attachment']
  },
  {
    id: 4,
    title: 'Arlo Double Kitchen Sink - Brushed Brass',
    price: '$899.00',
    numericPrice: 899.00,
    image: sink1Img,
    category: 'Sinks',
    room: 'Kitchen',
    finish: 'Brushed Brass',
    material: '304 Stainless Steel (1.2mm Thick)',
    warranty: 'Lifetime (25 years)',
    rating: 5.0,
    description: 'Our flagship fluted double kitchen sink, engineered with PVD coloring technology for superior durability and warmth.',
    compatibleWith: ['Lumen Kitchen Mixer', 'Sink Basket Waste 50mm'],
    suggestedCombo: 'Brushed Brass + Pure White Quartz Countertop',
    accessories: ['Arlo Colander', 'Arlo Bamboo Cutting Board', 'Protective Sink Grates']
  },
  {
    id: 5,
    title: 'Arlo Single Kitchen Sink - Matte Black',
    price: '$649.00',
    numericPrice: 649.00,
    image: sink2Img,
    category: 'Sinks',
    room: 'Kitchen',
    finish: 'Matte Black',
    material: '304 Stainless Steel (1.2mm Thick)',
    warranty: 'Lifetime (25 years)',
    rating: 4.9,
    description: 'A dramatic, minimalist single-bowl sink designed to sit flush or under-mount in high-end architect-designed kitchens.',
    compatibleWith: ['Lumen Kitchen Mixer - Matte Black', 'Matte Black Basket Waste'],
    suggestedCombo: 'Matte Black + Natural Oak Panels',
    accessories: ['Stainless Steel Colander', 'Roll-up Dish Drying Rack']
  },
  {
    id: 6,
    title: 'Lumen Pull-Out Kitchen Mixer - Brushed Brass',
    price: '$459.00',
    numericPrice: 459.00,
    image: sink3Img,
    category: 'Tapware',
    room: 'Kitchen',
    finish: 'Brushed Brass',
    material: 'Solid Brass Lead-Free Core',
    warranty: 'Lifetime (25 years)',
    rating: 4.8,
    description: 'The ultimate kitchen statement piece. Features a flexible pull-out hose and multi-flow dual spray function.',
    compatibleWith: ['Arlo Double Kitchen Sink', 'Marlow Laundry Tub'],
    suggestedCombo: 'Brushed Brass + Travertine Stone Splashback',
    accessories: ['Replacement Hose', 'Alternative Flow Aerator']
  },
  {
    id: 7,
    title: 'Lumen Basin Mixer - Matte Black',
    price: '$289.00',
    numericPrice: 289.00,
    image: waste1Img,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Matte Black',
    material: 'Solid Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.9,
    description: 'Sleek, gooseneck basin mixer with precise ceramic disc cartridge and a refined velvet-like matte black finish.',
    compatibleWith: ['Cove Pop-Up Waste - Matte Black', 'Marlow Basin'],
    suggestedCombo: 'Matte Black + Venetian Plaster Walls',
    accessories: ['Standard Care Microfiber Cloth', 'Alternative Flow restrictor']
  },
  {
    id: 8,
    title: 'Drift Outdoor Shower - Brushed Copper',
    price: '$1249.00',
    numericPrice: 1249.00,
    image: outdoorMenuImg,
    category: 'Showers',
    room: 'Outdoor',
    finish: 'Brushed Copper',
    material: 'Marine Grade 316 Stainless Steel',
    warranty: 'Lifetime (25 years)',
    rating: 5.0,
    description: 'A majestic outdoor shower designed to withstand harsh coastal weather conditions while aging into a gorgeous patina.',
    compatibleWith: ['Drift Foot Wash Tap', 'Drift Hand Shower'],
    suggestedCombo: 'Brushed Copper + Raw Concrete & Wood Panels',
    accessories: ['Wall Mount Brackets', 'Replacement 316 Shower Rose']
  },
  {
    id: 9,
    title: 'Marlow Wall Mounted Basin Mixer - Brushed Copper',
    price: '$399.00',
    numericPrice: 399.00,
    image: wrenPullImg,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Brushed Copper',
    material: 'Solid Brass Core',
    warranty: 'Lifetime (25 years)',
    rating: 4.7,
    description: 'Minimalist wall-mounted mixer featuring a sleek horizontal spout and structured backplate for modern architectural bathrooms.',
    compatibleWith: ['Cove Pop-Up Waste - Brushed Copper', 'Under-counter Basins'],
    suggestedCombo: 'Brushed Copper + Earthy Terracotta Tiles',
    accessories: ['Rough-in In-wall Breech', 'Backplate Seal']
  },
  {
    id: 10,
    title: 'Lumen Laundry Mixer - Matte Black',
    price: '$349.00',
    numericPrice: 349.00,
    image: laundryMenuImg,
    category: 'Tapware',
    room: 'Laundry',
    finish: 'Matte Black',
    material: 'Solid Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.8,
    description: 'The elegant gooseneck laundry tapware that makes laundry utility rooms feel like premium boutique extensions of your home.',
    compatibleWith: ['Marlow Laundry Tub', 'Lumen Soap Dispenser'],
    suggestedCombo: 'Matte Black + Terrazzo Floor Tiles',
    accessories: ['Aerator Key', 'Braided Flexi-Hoses']
  },
  {
    id: 11,
    title: 'Lumen Terrazzo Tile - Green',
    price: '$89.90',
    numericPrice: 89.90,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'Green Tiles',
    material: 'Natural Terrazzo Stone',
    warranty: '10 Years',
    rating: 4.8,
    description: 'Bespoke hand-cast terrazzo tiles with green granite chips embedded in solid cement. Perfect for bathroom or kitchen splashbacks.',
    compatibleWith: ['Lumen Basin Mixer', 'Cove Pop-Up Waste'],
    suggestedCombo: 'Green Tiles + Brushed Brass fixtures',
    accessories: ['Tile Spacer Pack', 'Sealer Kit']
  },
  {
    id: 12,
    title: 'Drift Zellige Ceramic Tile - White',
    price: '$75.00',
    numericPrice: 75.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'White Tiles',
    material: 'Glazed Ceramic',
    warranty: '10 Years',
    rating: 4.9,
    description: 'Traditional Moroccan-style glazed terracotta tiles with a glossy irregular finish that reflects light beautifully.',
    compatibleWith: ['Lumen Tapware', 'Arlo Sinks'],
    suggestedCombo: 'White Tiles + Brushed Brass & Light Oak Wood',
    accessories: ['White Tile Grout', 'Finishing Trims']
  },
  {
    id: 13,
    title: 'Classic Antique Brass Tapware Mixer',
    price: '$349.00',
    numericPrice: 349.00,
    image: antiqueImg,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Antique Brass',
    material: 'Lead-Free DZR Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.9,
    description: 'Indulge in timeless nostalgia. The Antique Brass collection features a deep hand-brushed finish with a golden hue.',
    compatibleWith: ['Marlow Wall Mixer', 'Antique Waste'],
    suggestedCombo: 'Antique Brass + Travertine Stone Vanity',
    accessories: ['Standard Care Microfiber Cloth', 'Solenoid Adapter']
  },
  {
    id: 14,
    title: 'Chamber Oak Timber Flooring - Premium Pack',
    price: '$119.00',
    numericPrice: 119.00,
    image: entryPullImg,
    category: 'Timber Flooring',
    room: 'Kitchen',
    finish: 'White',
    material: 'Engineered European Oak',
    warranty: '25 Years Residential',
    rating: 4.7,
    description: 'French Oak multi-ply timber flooring. Micro-bevelled edge with premium UV-lacquered low-sheen finish.',
    compatibleWith: ['Arlo Sinks', 'Lumen Kitchen Mixers'],
    suggestedCombo: 'European Oak + Venetian Plaster Walls',
    accessories: ['Underlay Roll', 'Coordinated T-moulding']
  },
  {
    id: 15,
    title: 'Vale Care Grab Rail - Brushed Brass',
    price: '$189.00',
    numericPrice: 189.00,
    image: nessoImg,
    category: 'Accessible',
    room: 'Bathroom',
    finish: 'Brushed Brass',
    material: '304 Grade Stainless Steel',
    warranty: '15 Years',
    rating: 4.9,
    description: 'Highly compliant assisted-living care rail featuring a high-load heavy-duty chassis and a gorgeous brushed brass PVD finish.',
    compatibleWith: ['Vale Accessible Tapware', 'Lumen Basin Mixer'],
    suggestedCombo: 'Brushed Brass + Pure White Quartz & Light Oak Cabinets',
    accessories: ['Heavy duty mounting kit', 'Flange Cover plates']
  },
  {
    id: 16,
    title: 'Calla Wall-Hung Toilet Suite - Matte Black',
    price: '$799.00',
    numericPrice: 799.00,
    image: sink2Img,
    category: 'Toilet',
    room: 'Bathroom',
    finish: 'Matte Black',
    material: 'Vitreous China & Urea Seat',
    warranty: '10 Years Ceramic',
    rating: 4.9,
    description: 'An architectural rimless toilet suite with space-saving wall-hung pan, soft-closing slim seat and matte black finish.',
    compatibleWith: ['Calla Flush Plate - Matte Black', 'Lumen Basin Mixer'],
    suggestedCombo: 'Matte Black + Terrazzo Floor Tiles',
    accessories: ['In-Wall Cistern Frame', 'Premium Matte Black Buttons']
  },
  {
    id: 17,
    title: 'Isla Freestanding Acrylic Bath - Pure White',
    price: '$1499.00',
    numericPrice: 1499.00,
    image: waste2Img,
    category: 'Baths',
    room: 'Bathroom',
    finish: 'White',
    material: 'Lucite Sanitary Grade Acrylic',
    warranty: '25 Years',
    rating: 5.0,
    description: 'Boasting a soft pill shape and slim rim details, this luxury freestanding bath forms an eye-catching focal point in any designer bathroom.',
    compatibleWith: ['Lumen Floor Mounted Bath Mixer', 'Cove Pop-Up Waste'],
    suggestedCombo: 'Pure White + Brushed Brass Tapware',
    accessories: ['Flexible Waste Connector', 'Premium Bath Rest Pillow']
  },
  {
    id: 18,
    title: 'Sensor LED Backlit Mirror - Brass Rimmed',
    price: '$459.00',
    numericPrice: 459.00,
    image: waste1Img,
    category: 'Mirrors',
    room: 'Bathroom',
    finish: 'Brushed Brass',
    material: 'Copper-free HD Mirror & Aluminum Frame',
    warranty: '5 Years',
    rating: 4.8,
    description: 'Experience smart luxury with our touchless sensor LED mirror. Feature dynamic dimming, defogger heat pad, and Brushed Brass bezel.',
    compatibleWith: ['Lumen Basin Mixer', 'Marlow Fluted Vanity'],
    suggestedCombo: 'Brushed Brass + Matte White Marble & Soft Lighting',
    accessories: ['Wall Mount Brackets', 'Power Supply Cable']
  },
  {
    id: 19,
    title: 'Marlow Fluted Timber Vanity Unit - 1200mm',
    price: '$1299.00',
    numericPrice: 1299.00,
    image: wrenPullImg,
    category: 'Bathroom Vanity Units',
    room: 'Bathroom',
    finish: 'White',
    material: 'Solid Oak & Water-resistant Board',
    warranty: '10 Years',
    rating: 4.9,
    description: 'Showcasing a beautiful fluted wooden surround and deep soft-closing drawers, the Marlow vanity is the ultimate statement in warm luxury.',
    compatibleWith: ['Marlow Ceramic Basin', 'Lumen Basin Mixer'],
    suggestedCombo: 'Light Oak + Brushed Brass & Venetia Plaster',
    accessories: ['Divider Inserts', 'Wall Hanging Bolts']
  },
  {
    id: 20,
    title: 'Antique Bronze Basin Mixer - Vintage Line',
    price: '$329.00',
    numericPrice: 329.00,
    image: antiqueImg,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Antique Bronze',
    material: 'DZR Solid Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.8,
    description: 'An elegant vintage-inspired mixer displaying rich earthy chocolate tones and subtle bronze highlights that age beautifully.',
    compatibleWith: ['Antique Bronze Waste', 'Under-counter Basins'],
    suggestedCombo: 'Antique Bronze + Travertine Stone Splashback',
    accessories: ['Care Microfiber Cloth', 'Installation wrench']
  },
  {
    id: 21,
    title: 'Commercial Sensor Touchless Tap - Chrome',
    price: '$529.00',
    numericPrice: 529.00,
    image: laundryMenuImg,
    category: 'Commercial',
    room: 'Bathroom',
    finish: 'Chrome',
    material: 'DR Solid Brass Core',
    warranty: '10 Years',
    rating: 4.9,
    description: 'Automatic motion-activated touchless basin tap for high-end commercial projects, hospitals, and high-traffic washrooms.',
    compatibleWith: ['Commercial Basin', 'Cove Chrome Waste'],
    suggestedCombo: 'Chrome + Venetian Plaster Walls',
    accessories: ['Solenoid Valve Box', 'Battery Pack', 'AC Power Adapter']
  },
  {
    id: 22,
    title: 'Commercial Kitchen Heavy-Duty Pull-Out Mixer',
    price: '$689.00',
    numericPrice: 689.00,
    image: sink3Img,
    category: 'Commercial',
    room: 'Kitchen',
    finish: 'Brushed Nickel',
    material: '304 Grade Stainless Steel',
    warranty: '15 Years',
    rating: 5.0,
    description: 'Commercial grade kitchen mixer with high-arch spring neck and multi-functional high-pressure spray nozzle.',
    compatibleWith: ['Commercial Double Sink', 'Nickel Basket Waste'],
    suggestedCombo: 'Brushed Nickel + Charcoal Terrazzo Countertop',
    accessories: ['Counterweight', 'Hot/Cold Braided Hoses']
  },
  {
    id: 23,
    title: 'Antique Gunmetal Wall Spout',
    price: '$219.00',
    numericPrice: 219.00,
    image: waste3Img,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Antique Gunmetal',
    material: 'DR Solid Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.7,
    description: 'Rich, charcoal-toned wall spout with subtle metallic highlights that provides an industrial luxury feel to vintage bathrooms.',
    compatibleWith: ['Antique Gunmetal Wall Mixer'],
    suggestedCombo: 'Antique Gunmetal + Venetian Plaster Walls',
    accessories: ['Aerator Key']
  },
  {
    id: 24,
    title: 'Antique Stainless Steel Basin Tap',
    price: '$289.00',
    numericPrice: 289.00,
    image: sink3Img,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Antique Stainless Steel',
    material: 'Marine Grade 316 Stainless Steel',
    warranty: 'Lifetime (25 years)',
    rating: 4.8,
    description: 'Hand-finished antique pewter look combined with marine grade strength for ultimate timeless charm.',
    compatibleWith: ['Stainless Steel Waste'],
    suggestedCombo: 'Antique Stainless Steel + Raw Concrete',
    accessories: ['Supply Flexi Hoses']
  },
  {
    id: 25,
    title: 'Arlo Porcelain Tile - Black Tiles',
    price: '$69.00',
    numericPrice: 69.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'Black Tiles',
    material: 'Premium Porcelain',
    warranty: '10 Years',
    rating: 4.9,
    description: 'Deep matte black porcelain tile. Scratch-resistant, waterproof and ideal for dramatic dark accents.',
    compatibleWith: ['Lumen Matte Black Tapware'],
    suggestedCombo: 'Black Tiles + Matte Black Fixtures',
    accessories: ['Black Tile Grout']
  },
  {
    id: 26,
    title: 'Terrazzo Grey Tile - Grey Tiles',
    price: '$79.00',
    numericPrice: 79.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'Grey Tiles',
    material: 'Porcelain Grained',
    warranty: '10 Years',
    rating: 4.7,
    description: 'Neutral grey stone look tile. Provides a tranquil slate effect perfect for wet-room design.',
    compatibleWith: ['Lumen Brushed Nickel Tapware'],
    suggestedCombo: 'Grey Tiles + Brushed Nickel',
    accessories: ['Grey Tile Grout']
  },
  {
    id: 27,
    title: 'Beige Travertine Tile - Beige Tiles',
    price: '$95.00',
    numericPrice: 95.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'Beige Tiles',
    material: 'Natural Travertine',
    warranty: '10 Years',
    rating: 5.0,
    description: 'Earthy travertine limestone tile featuring soft warm textures and veins of cream, beige and ivory.',
    compatibleWith: ['Marlow Wall Mounted Mixer'],
    suggestedCombo: 'Beige Tiles + Brushed Copper',
    accessories: ['Tile Sealer']
  },
  {
    id: 28,
    title: 'Lumen Blue Zellige Tile - Blue Tiles',
    price: '$85.00',
    numericPrice: 85.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'Blue Tiles',
    material: 'Glazed Ceramic',
    warranty: '10 Years',
    rating: 4.8,
    description: 'Individually glazed cobalt-blue clay tiles reflecting gorgeous ocean-like hues and ripples.',
    compatibleWith: ['Lumen Chrome Mixer'],
    suggestedCombo: 'Blue Tiles + Chrome & Pure White Quartz',
    accessories: ['Blue Grout Pack']
  },
  {
    id: 29,
    title: 'Brushed Gunmetal Toilet Roll Holder',
    price: '$69.00',
    numericPrice: 69.00,
    image: entryPullImg,
    category: 'Accessories',
    room: 'Bathroom',
    finish: 'Brushed Gunmetal',
    material: 'Solid Brass',
    warranty: '5 Years',
    rating: 4.9,
    description: 'Sleek cylindrical roll holder in robust dark graphite, engineered via PVD for superior resistance.',
    compatibleWith: ['Calla Matte Black Toilet'],
    suggestedCombo: 'Brushed Gunmetal + Venetian Plaster',
    accessories: ['Mounting Screws', 'Hex Key']
  },
  {
    id: 30,
    title: 'Lumen Chrome Hand Shower',
    price: '$219.00',
    numericPrice: 219.00,
    image: outdoorMenuImg,
    category: 'Showers',
    room: 'Bathroom',
    finish: 'Chrome',
    material: 'Solid Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.8,
    description: 'High-polished mirror chrome hand shower on premium slide rail with adjustable water spray.',
    compatibleWith: ['Lumen Mixer', 'Cove Chrome Waste'],
    suggestedCombo: 'Chrome + Venetian Plaster Walls',
    accessories: ['Chrome Hose', 'Wall brackets']
  },
  {
    id: 31,
    title: 'Belfast Farmhouse Sink - White',
    price: '$799.00',
    numericPrice: 799.00,
    image: sink1Img,
    category: 'Kitchen Sinks',
    room: 'Kitchen',
    finish: 'White',
    material: 'Fireclay Ceramic',
    warranty: 'Lifetime (25 years)',
    rating: 4.9,
    description: 'Classic apron-front farmhouse sink. Fireclay ceramic construction offers unparalleled durability and chip resistance.',
    compatibleWith: ['Lumen Kitchen Mixer', 'Basket Waste - White'],
    suggestedCombo: 'White Ceramic + Brushed Brass Tapware',
    accessories: ['Sink Grid', 'Cutting Board']
  },
  {
    id: 32,
    title: 'Outdoor Freestanding Shower Column',
    price: '$1299.00',
    numericPrice: 1299.00,
    image: outdoorMenuImg,
    category: 'Showers',
    room: 'Outdoor',
    finish: 'Stainless Steel',
    material: '316 Marine Grade Stainless Steel',
    warranty: '25 Years',
    rating: 5.0,
    description: 'Minimalist freestanding shower designed to withstand the elements, perfect for poolside rinsing or outdoor bathing.',
    compatibleWith: ['Outdoor Foot Wash Spout'],
    suggestedCombo: 'Stainless Steel + Natural Timber Decking',
    accessories: ['Mounting Base Plate']
  },
  {
    id: 33,
    title: 'Odelia Fluted Basin - Matte White',
    price: '$399.00',
    numericPrice: 399.00,
    image: nessoImg,
    category: 'Basins',
    room: 'Bathroom',
    finish: 'Matte White',
    material: 'Solid Surface Ceramic',
    warranty: '5 Years',
    rating: 4.7,
    description: 'An elegant above-counter basin featuring delicate fluted exterior details, bringing beautiful texture to any vanity.',
    compatibleWith: ['Marlow Wall Mixer', 'Matte White Pop-up Waste'],
    suggestedCombo: 'Matte White + Brushed Nickel Tapware',
    accessories: ['Cleaning Cloth']
  },
  {
    id: 34,
    title: 'Half-Moon Drawer Pull - Brushed Brass',
    price: '$29.00',
    numericPrice: 29.00,
    image: cabinetryImg,
    category: 'Hardware',
    room: 'Kitchen',
    finish: 'Brushed Brass',
    material: 'Solid Brass',
    warranty: '5 Years',
    rating: 4.8,
    description: 'A semi-circle solid brass cabinet pull that forms a complete circle when paired on double doors.',
    compatibleWith: ['Lumen Kitchen Mixer'],
    suggestedCombo: 'Brushed Brass + Navy Blue Cabinetry',
    accessories: ['Installation Screws']
  },
  {
    id: 35,
    title: 'Oasis Round LED Mirror - 800mm',
    price: '$349.00',
    numericPrice: 349.00,
    image: waste1Img,
    category: 'Mirrors',
    room: 'Bathroom',
    finish: 'Frameless',
    material: 'Copper-free HD Mirror',
    warranty: '5 Years',
    rating: 4.9,
    description: 'Minimalist frameless round mirror with an integrated backlit LED halo providing perfect vanity illumination.',
    compatibleWith: ['Odelia Fluted Basin', 'Calla Basin Mixer'],
    suggestedCombo: 'Frameless Mirror + Brushed Gunmetal',
    accessories: ['Mounting bracket', 'Hardwiring kit']
  },
  {
    id: 36,
    title: 'Aura Back-to-Wall Freestanding Bath',
    price: '$1399.00',
    numericPrice: 1399.00,
    image: waste2Img,
    category: 'Baths',
    room: 'Bathroom',
    finish: 'White',
    material: 'Lucite Acrylic',
    warranty: '10 Years',
    rating: 4.8,
    description: 'Space-saving back-to-wall freestanding bath offering luxury depth without the cleaning gap behind the tub.',
    compatibleWith: ['Wall Mounted Bath Mixer'],
    suggestedCombo: 'White Acrylic + Matte Black Tapware',
    accessories: ['Pop-up Bath Waste']
  },
  {
    id: 37,
    title: 'Terrazzo Orange Tile - Orange Tiles',
    price: '$89.00',
    numericPrice: 89.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'Orange Tiles',
    material: 'Natural Terrazzo Stone',
    warranty: '10 Years',
    rating: 4.5,
    description: 'Vibrant orange terrazzo featuring warm amber and terracotta chips in a light cement matrix.',
    compatibleWith: ['Antique Brass Tapware'],
    suggestedCombo: 'Orange Tiles + Antique Brass',
    accessories: ['Tile Sealer']
  },
  {
    id: 38,
    title: 'Zellige Pink Tile - Pink Tiles',
    price: '$85.00',
    numericPrice: 85.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Bathroom',
    finish: 'Pink Tiles',
    material: 'Glazed Ceramic',
    warranty: '10 Years',
    rating: 4.8,
    description: 'Soft blush pink glazed tiles with irregular surface textures, perfect for a romantic Mediterranean vibe.',
    compatibleWith: ['Brushed Brass Tapware', 'White Basins'],
    suggestedCombo: 'Pink Tiles + Brushed Brass',
    accessories: ['White Grout']
  },
  {
    id: 39,
    title: 'Subway Red Tile - Red Tiles',
    price: '$65.00',
    numericPrice: 65.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Kitchen',
    finish: 'Red Tiles',
    material: 'Ceramic',
    warranty: '10 Years',
    rating: 4.6,
    description: 'Deep crimson gloss subway tile, adding dramatic color to any kitchen splashback or feature wall.',
    compatibleWith: ['Matte Black Kitchen Mixer'],
    suggestedCombo: 'Red Tiles + Matte Black Tapware',
    accessories: ['Black Grout']
  },
  {
    id: 40,
    title: 'Limestone Yellow Tile - Yellow Tiles',
    price: '$79.00',
    numericPrice: 79.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Outdoor',
    finish: 'Yellow Tiles',
    material: 'Natural Limestone',
    warranty: '10 Years',
    rating: 4.7,
    description: 'Warm sandy yellow limestone tiles with a non-slip surface, ideal for outdoor patios and pool surrounds.',
    compatibleWith: ['Outdoor Showers'],
    suggestedCombo: 'Yellow Tiles + Stainless Steel',
    accessories: ['Outdoor Sealer']
  },
  {
    id: 41,
    title: 'Alpine Ash Timber Flooring',
    price: '$99.00',
    numericPrice: 99.00,
    image: entryPullImg,
    category: 'Timber Flooring',
    room: 'Kitchen',
    finish: 'Ash',
    material: 'Engineered Timber',
    warranty: '20 Years',
    rating: 4.8,
    description: 'Light and airy Alpine Ash flooring featuring pale straw tones and subtle grain patterns for a Scandinavian look.',
    compatibleWith: ['White Kitchen Cabinetry'],
    suggestedCombo: 'Ash Timber + Matte White Tapware',
    accessories: ['Underlay']
  },
  {
    id: 42,
    title: 'Heated Towel Rail - Matte Black',
    price: '$289.00',
    numericPrice: 289.00,
    image: wrenPullImg,
    category: 'Accessories',
    room: 'Bathroom',
    finish: 'Matte Black',
    material: 'Stainless Steel Core',
    warranty: '5 Years',
    rating: 4.9,
    description: 'Sleek ladder-style heated towel rail to keep towels warm and dry, featuring energy-efficient heating technology.',
    compatibleWith: ['Calla Matte Black Tapware'],
    suggestedCombo: 'Matte Black + Grey Stone Tiles',
    accessories: ['Hardwiring Kit', 'Wall Mounts']
  },
  {
    id: 43,
    title: 'Accessible Shower Seat - Teak & Chrome',
    price: '$349.00',
    numericPrice: 349.00,
    image: nessoImg,
    category: 'Accessible',
    room: 'Bathroom',
    finish: 'Chrome',
    material: 'Teak Wood & Stainless Steel',
    warranty: '5 Years',
    rating: 4.8,
    description: 'Fold-down wall-mounted shower seat featuring a warm teak slatted top and heavy-duty chrome brackets.',
    compatibleWith: ['Vale Care Grab Rail'],
    suggestedCombo: 'Chrome + Timber accents',
    accessories: ['Heavy Duty Fixing Kit']
  },
  {
    id: 44,
    title: 'Commercial Hands-Free Soap Dispenser',
    price: '$159.00',
    numericPrice: 159.00,
    image: laundryMenuImg,
    category: 'Commercial',
    room: 'Bathroom',
    finish: 'Stainless Steel',
    material: '304 Stainless Steel',
    warranty: '5 Years',
    rating: 4.7,
    description: 'Wall-mounted automatic soap dispenser with infrared sensor, designed for high-traffic commercial washrooms.',
    compatibleWith: ['Commercial Sensor Touchless Tap'],
    suggestedCombo: 'Stainless Steel + Large Format Tiles',
    accessories: ['Mounting Screws', 'Battery Pack']
  },
  {
    id: 45,
    title: 'Outdoor BBQ Sink Mixer - 316 Stainless',
    price: '$459.00',
    numericPrice: 459.00,
    image: sink3Img,
    category: 'Tapware',
    room: 'Outdoor',
    finish: 'Stainless Steel',
    material: 'Marine Grade 316 Stainless Steel',
    warranty: '15 Years',
    rating: 4.9,
    description: 'Heavy-duty kitchen mixer constructed entirely from 316 marine-grade stainless steel to resist coastal corrosion.',
    compatibleWith: ['Outdoor Kitchen Sink'],
    suggestedCombo: 'Stainless Steel + Granite BBQ Bench',
    accessories: ['Braided Hoses']
  },
  {
    id: 46,
    title: 'Drift Shower Shelf - Brushed Copper',
    price: '$129.00',
    numericPrice: 129.00,
    image: waste3Img,
    category: 'Accessories',
    room: 'Bathroom',
    finish: 'Brushed Copper',
    material: 'Solid Brass',
    warranty: '5 Years',
    rating: 4.8,
    description: 'Minimalist folded brass shower shelf with drainage slots, finished in a warm, living brushed copper.',
    compatibleWith: ['Lumen Copper Shower'],
    suggestedCombo: 'Brushed Copper + Dark Terrazzo',
    accessories: ['Concealed Fixings']
  },
  {
    id: 47,
    title: 'Arlo Double Kitchen Sink - Gunmetal',
    price: '$999.00',
    numericPrice: 999.00,
    image: sink2Img,
    category: 'Kitchen Sinks',
    room: 'Kitchen',
    finish: 'Brushed Gunmetal',
    material: '304 Grade Stainless Steel',
    warranty: '25 Years',
    rating: 4.9,
    description: 'Large double bowl kitchen sink with a durable PVD gunmetal finish, complete with sound-deadening pads.',
    compatibleWith: ['Lumen Pull-Out Mixer - Gunmetal'],
    suggestedCombo: 'Gunmetal + Concrete Benchtops',
    accessories: ['Sink Grid', 'Basket Waste']
  },
  {
    id: 48,
    title: 'T-Bar Cabinet Handle - Matte White',
    price: '$24.00',
    numericPrice: 24.00,
    image: cabinetryImg,
    category: 'Hardware',
    room: 'Kitchen',
    finish: 'White',
    material: 'Solid Brass',
    warranty: '5 Years',
    rating: 4.6,
    description: 'Sleek cylindrical T-bar handle finished in a pristine matte white, perfect for modern minimalist cabinetry.',
    compatibleWith: ['Matte White Tapware'],
    suggestedCombo: 'Matte White + Pale Timber Cabinets',
    accessories: ['Mounting Screws']
  },
  {
    id: 49,
    title: 'Poolside Outdoor Shower - Matte Black',
    price: '$989.00',
    numericPrice: 989.00,
    image: outdoorMenuImg,
    category: 'Showers',
    room: 'Outdoor',
    finish: 'Matte Black',
    material: '316 Marine Grade Stainless Steel',
    warranty: '15 Years',
    rating: 4.7,
    description: 'Striking matte black outdoor shower column, engineered for exterior durability with a minimal profile.',
    compatibleWith: ['Outdoor Foot Wash'],
    suggestedCombo: 'Matte Black + Bluestone Paving',
    accessories: ['Installation Base']
  },
  {
    id: 50,
    title: 'Lumen Minimalist Spout - Chrome',
    price: '$149.00',
    numericPrice: 149.00,
    image: antiqueImg,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Chrome',
    material: 'Solid Brass',
    warranty: 'Lifetime (25 years)',
    rating: 4.8,
    description: 'A timeless, simple wall-mounted bath spout in a high-gloss chrome finish. Features an internal aerator for smooth flow.',
    compatibleWith: ['Chrome Wall Mixer'],
    suggestedCombo: 'Chrome + White Subway Tiles',
    accessories: ['Aerator Key']
  },
  {
    id: 51,
    title: 'Odelia Round Basin - Brushed Brass',
    price: '$459.00',
    numericPrice: 459.00,
    image: nessoImg,
    category: 'Basins',
    room: 'Bathroom',
    finish: 'Brushed Brass',
    material: 'Stainless Steel',
    warranty: '5 Years',
    rating: 4.8,
    description: 'A striking above-counter round basin crafted from stainless steel with a radiant brushed brass finish.',
    compatibleWith: ['Brushed Brass Tapware'],
    suggestedCombo: 'Brushed Brass + Dark Granite',
    accessories: ['Matching Brass Pop-up Waste']
  },
  {
    id: 52,
    title: 'Drift Freestanding Bath Mixer - Matte Black',
    price: '$899.00',
    numericPrice: 899.00,
    image: waste3Img,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'Matte Black',
    material: 'Solid Brass',
    warranty: '15 Years',
    rating: 4.9,
    description: 'A sleek floor-mounted bath mixer complete with a hand shower attachment, perfect for modern freestanding baths.',
    compatibleWith: ['Isla Freestanding Bath'],
    suggestedCombo: 'Matte Black + Pure White Acrylic',
    accessories: ['Floor Mounting Kit']
  },
  {
    id: 53,
    title: 'Calla Basin Mixer - White',
    price: '$219.00',
    numericPrice: 219.00,
    image: nessoImg,
    category: 'Tapware',
    room: 'Bathroom',
    finish: 'White',
    material: 'Solid Brass',
    warranty: '15 Years',
    rating: 4.7,
    description: 'A compact and elegant basin mixer featuring a soft matte white finish that blends seamlessly into minimalist spaces.',
    compatibleWith: ['Matte White Basins'],
    suggestedCombo: 'White Tapware + Light Timber',
    accessories: ['Flexible Hoses']
  },
  {
    id: 54,
    title: 'Subway Green Tile - Green Tiles',
    price: '$65.00',
    numericPrice: 65.00,
    image: tilesImg,
    category: 'Tiles',
    room: 'Kitchen',
    finish: 'Green Tiles',
    material: 'Ceramic',
    warranty: '10 Years',
    rating: 4.6,
    description: 'Glossy sage green subway tile, bringing a touch of nature and calm to any kitchen or bathroom wall.',
    compatibleWith: ['Brushed Brass Tapware'],
    suggestedCombo: 'Green Tiles + Brushed Brass',
    accessories: ['White Grout']
  },
  {
    id: 55,
    title: 'Lumen Gooseneck Mixer - Brushed Copper',
    price: '$389.00',
    numericPrice: 389.00,
    image: sink1Img,
    category: 'Kitchen Sinks',
    room: 'Kitchen',
    finish: 'Brushed Copper',
    material: 'Solid Brass',
    warranty: '15 Years',
    rating: 4.8,
    description: 'A tall gooseneck kitchen mixer in a living brushed copper finish that develops a unique patina over time.',
    compatibleWith: ['Copper Kitchen Sink'],
    suggestedCombo: 'Brushed Copper + Dark Timber',
    accessories: ['Pull-out Hose']
  },
  {
    id: 56,
    title: 'Vale Accessible Wash Basin',
    price: '$429.00',
    numericPrice: 429.00,
    image: sink2Img,
    category: 'Accessible',
    room: 'Bathroom',
    finish: 'White',
    material: 'Ceramic',
    warranty: '10 Years',
    rating: 4.8,
    description: 'Wheelchair-accessible wall-hung basin with a shallow bowl and contoured front for easy reach and use.',
    compatibleWith: ['Sensor Touchless Tap'],
    suggestedCombo: 'White Ceramic + Chrome Accessories',
    accessories: ['Wall Brackets']
  },
  {
    id: 57,
    title: 'Commercial Urinal Sensor Flush',
    price: '$319.00',
    numericPrice: 319.00,
    image: laundryMenuImg,
    category: 'Commercial',
    room: 'Bathroom',
    finish: 'Stainless Steel',
    material: '304 Stainless Steel',
    warranty: '5 Years',
    rating: 4.7,
    description: 'Automatic urinal flush valve with an infrared sensor for optimal hygiene and water efficiency in commercial settings.',
    compatibleWith: ['Commercial Ceramic Urinal'],
    suggestedCombo: 'Stainless Steel + Grey Tiles',
    accessories: ['Concealed Valve Box']
  },
  {
    id: 58,
    title: 'Front Door Pull Handle - Brushed Nickel',
    price: '$189.00',
    numericPrice: 189.00,
    image: entryPullImg,
    category: 'Hardware',
    room: 'Outdoor',
    finish: 'Brushed Nickel',
    material: 'Solid Brass',
    warranty: '10 Years',
    rating: 4.9,
    description: 'A striking 600mm entry door pull handle finished in sophisticated brushed nickel for a grand entrance.',
    compatibleWith: ['Brushed Nickel House Numbers'],
    suggestedCombo: 'Brushed Nickel + Solid Timber Door',
    accessories: ['Back-to-back Fixing Kit']
  },
  {
    id: 59,
    title: 'Marlow Fluted Vanity - Black Oak',
    price: '$1399.00',
    numericPrice: 1399.00,
    image: wrenPullImg,
    category: 'Bathroom Vanity Units',
    room: 'Bathroom',
    finish: 'Black Oak',
    material: 'Solid Oak & Water-resistant Board',
    warranty: '10 Years',
    rating: 4.9,
    description: 'A luxurious dark timber vanity featuring deep fluted details and a seamless white stone top.',
    compatibleWith: ['Brushed Gunmetal Tapware'],
    suggestedCombo: 'Black Oak + Gunmetal + Terrazzo',
    accessories: ['Stone Top', 'Drawer Organisers']
  },
  {
    id: 60,
    title: 'Drift Double Towel Rail - Antique Brass',
    price: '$149.00',
    numericPrice: 149.00,
    image: antiqueImg,
    category: 'Accessories',
    room: 'Bathroom',
    finish: 'Antique Brass',
    material: 'Solid Brass',
    warranty: '5 Years',
    rating: 4.8,
    description: 'A sturdy double towel rail in our rich Antique Brass finish, providing ample space for large bath sheets.',
    compatibleWith: ['Antique Brass Tapware'],
    suggestedCombo: 'Antique Brass + Travertine',
    accessories: ['Concealed Wall Mounts']
  }
];

const TopBar = ({ setCurrentPage }) => {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const { region, setRegion } = useRegion();

  const aboutUsLinks = [
    { name: 'OUR STORY', page: 'about_our-story' },
    { name: 'SHOWROOM LOCATIONS', page: 'about_showroom-locations' },
    { name: 'SUSTAINABILITY', page: 'about_sustainability' },
    { name: 'PRODUCT QUALITY', page: 'about_product-quality' },
    { name: 'CUSTOMER REVIEWS', page: 'about_customer-reviews' },
    { name: 'THE VELA DIFFERENCE', page: 'about_the-vela-difference' },
    { name: 'JOURNAL', page: 'about_journal' },
    { name: 'CONTACT US', page: 'about_contact-us' },
    { name: 'BUYING AND CARE GUIDES', page: 'about_buying-and-care-guides' },
  ];

  const getRegionLabel = () => {
    switch (region) {
      case 'NEW ZEALAND': return 'NZ';
      case 'UNITED KINGDOM': return 'UK';
      case 'INTERNATIONAL': return 'INT';
      case 'AUSTRALIA':
      default: return 'AU';
    }
  };

  return (
    <div className="relative z-[100]">
      <div className="w-full bg-white text-[17px] text-gray-500 flex flex-col md:flex-row justify-between items-center md:items-stretch border-b border-gray-200 tracking-wide font-light relative z-[90]">
        <div className="px-4 md:px-8 py-2 md:py-2.5 flex items-center w-full md:w-auto justify-center md:justify-start border-b md:border-b-0 border-gray-200 md:border-transparent">60-Day-Returns</div>
        <div className="hidden xl:flex flex-wrap justify-center md:justify-end items-stretch md:border-l border-gray-200 w-full md:w-auto">
          <button onClick={() => setIsRegionOpen(!isRegionOpen)} className="cursor-pointer hover:bg-gray-50 hover:text-black transition-colors px-3 md:px-4 py-2 md:py-2.5 border-r border-gray-200 flex items-center gap-1 uppercase outline-none focus:bg-gray-50">{getRegionLabel()} {isRegionOpen ? <ChevronUp size={12} strokeWidth={1.5}/> : <ChevronDown size={12} strokeWidth={1.5}/>}</button>
          <button onClick={() => setCurrentPage('help_centre')} className="cursor-pointer hover:bg-gray-50 hover:text-black transition-colors px-3 md:px-4 py-2 md:py-2.5 border-r border-gray-200 flex items-center uppercase outline-none focus:bg-gray-50">HELP CENTRE</button>
          
          <div 
            className="relative flex items-stretch border-r border-gray-200"
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
          >
            <button className="cursor-pointer hover:bg-gray-50 hover:text-black transition-colors px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-1 uppercase outline-none focus:bg-gray-50">
              ABOUT US <ChevronDown size={12} strokeWidth={1.5}/>
            </button>
            
            <div 
              className={`absolute top-full right-0 md:right-auto md:left-0 w-64 bg-white shadow-lg border border-gray-100 transition-all duration-300 origin-top z-50 ${
                isAboutHovered ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
              }`}
            >
              <div className="flex flex-col py-2">
                {aboutUsLinks.map((link, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      setCurrentPage(link.page);
                      setIsAboutHovered(false);
                    }}
                    className="w-full text-left px-6 py-2.5 text-[16px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setCurrentPage('trade')} className="cursor-pointer hover:bg-gray-50 hover:text-black transition-colors px-3 md:px-4 py-2 md:py-2.5 border-r border-gray-200 flex items-center uppercase outline-none focus:bg-gray-50">TRADE</button>
          
          <div 
            className="relative flex items-stretch"
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
          >
            <button className="cursor-pointer hover:bg-gray-50 hover:text-black transition-colors px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-1 uppercase outline-none focus:bg-gray-50">
              LOGIN <ChevronDown size={12} strokeWidth={1.5}/>
            </button>

            <div 
              className={`absolute top-full right-0 w-48 bg-white shadow-lg border border-gray-100 transition-all duration-300 origin-top z-50 ${
                isLoginHovered ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
              }`}
            >
              <div className="flex flex-col py-2">
                <button className="w-full text-left px-6 py-2.5 text-[16px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Sign In</button>
                <button className="w-full text-left px-6 py-2.5 text-[16px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Create Account</button>
                <button className="w-full text-left px-6 py-2.5 text-[16px] tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors uppercase font-light">Order History</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Region Dropdown */}
      {isRegionOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-sm z-10 p-12"
        >
          <button onClick={() => setIsRegionOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors">
            <X size={24} strokeWidth={1} />
          </button>
          
          <div className="flex justify-center gap-12 max-w-5xl mx-auto text-center">
            <div className="flex flex-col items-center gap-6 cursor-pointer group" onClick={() => { setRegion('AUSTRALIA'); setIsRegionOpen(false); }}>
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-gray-800 stroke-current fill-none stroke-[1.2] group-hover:scale-105 transition-transform"><path d="M20,40 Q40,20 60,30 T80,50 Q80,70 60,80 T30,70 Q10,50 20,40 Z" /><circle cx="65" cy="85" r="2"/></svg>
              <span className="text-[16px] tracking-widest text-gray-500 group-hover:text-black transition-colors">AUSTRALIA</span>
            </div>
            <div className="flex flex-col items-center gap-6 cursor-pointer group" onClick={() => { setRegion('NEW ZEALAND'); setIsRegionOpen(false); }}>
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-gray-800 stroke-current fill-none stroke-[1.2] group-hover:scale-105 transition-transform"><path d="M40,20 Q50,40 45,60 T35,80 Q30,60 35,40 T40,20 Z" /><path d="M55,60 Q65,70 60,90 T45,80 Z" /></svg>
              <span className="text-[16px] tracking-widest text-gray-500 group-hover:text-black transition-colors">NEW ZEALAND</span>
            </div>
            <div className="flex flex-col items-center gap-6 cursor-pointer group" onClick={() => { setRegion('UNITED KINGDOM'); setIsRegionOpen(false); }}>
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-gray-800 stroke-current fill-none stroke-[1.2] group-hover:scale-105 transition-transform"><path d="M40,80 Q50,60 45,40 T35,20 Q30,40 35,60 T40,80 Z" /><path d="M30,50 Q20,60 25,70" /></svg>
              <span className="text-[16px] tracking-widest text-gray-500 group-hover:text-black transition-colors">UNITED KINGDOM</span>
            </div>
            <div className="flex flex-col items-center gap-6 cursor-pointer group" onClick={() => { setRegion('INTERNATIONAL'); setIsRegionOpen(false); }}>
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-gray-800 stroke-current fill-none stroke-[1.2] group-hover:scale-105 transition-transform"><circle cx="50" cy="50" r="40" /><path d="M10,50 Q50,60 90,50 M50,10 Q40,50 50,90 M50,10 Q60,50 50,90" /></svg>
              <span className="text-[16px] tracking-widest text-gray-500 group-hover:text-black transition-colors">INTERNATIONAL</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const megaMenuData = {
  'Our Range': {
    items: [
      { name: 'TILES' },
      { name: 'TIMBER FLOORING' },
      { name: 'TAPWARE' },
      { name: 'SHOWERS' },
      { name: 'BASINS' },
      { name: 'WASTES' },
      { name: 'HARDWARE', hasSub: true },
      { name: 'TOILET' },
      { name: 'KITCHEN SINKS' },
      { name: 'BATHS' },
      { name: 'MIRRORS' },
      { name: 'BATHROOM VANITY UNITS' },
      { name: 'ACCESSIBLE' },
      { name: 'ACCESSORIES' },
      { name: 'NEW ARRIVALS' },
      { name: 'SAMPLES' },
      { name: 'SALE' },
      { name: 'GIFTS' },
    ],
    subcategories: {
      'HARDWARE': {
        title: 'Hardware',
        items: [
          { name: 'CABINET HANDLES', image: wrenPullImg, title: 'Wren Adjustable Cabinetry Pull' },
          { name: 'DOOR HANDLES', image: antiqueImg, title: 'Classic Door Handles' },
          { name: 'FRONT DOOR HANDLES', image: entryPullImg, title: 'Entry Door Handles' },
          { name: 'DOOR HARDWARE', image: heroImg, title: 'Premium Door Hardware' },
          { name: 'GLASS HARDWARE', image: nessoImg, title: 'Glass Hardware' },
          { name: 'Shop All', isLink: true }
        ]
      }
    }
  },
  'Collections': {
    items: [
      { name: 'ANTIQUE', image: antiqueImg, title: 'Antique Collection' },
      { name: 'VALE', image: sink2Img, title: 'Vale Collection' },
      { name: 'LUMEN', image: sink1Img, title: 'Lumen Collection' },
      { name: 'ARLO', image: nessoImg, title: 'Arlo Collection' },
      { name: 'MARLOW', image: cabinetryImg, title: 'Marlow Collection' },
      { name: 'ISLA', image: waste2Img, title: 'Isla Collection' },
      { name: 'CALLA', image: heroImg, title: 'Calla Collection' },
      { name: 'SENSOR', image: laundryMenuImg, title: 'Sensor Collection' },
      { name: 'DRIFT', image: waste3Img, title: 'Drift Collection' },
      { name: 'VIEW ALL', isLink: true, image: heroImg, title: 'All Collections' },
    ]
  },
  'Signature Finishes': {
    items: [
      { name: 'COLOUR SAMPLES', colors: ['#C8B273', '#D1D3D4', '#231F20'] },
      { name: 'BRUSHED BRASS', color: '#C8B273' },
      { name: 'BRUSHED NICKEL', color: '#D1D3D4' },
      { name: 'BRUSHED COPPER', color: '#B97A57' },
      { name: 'BRUSHED GUNMETAL', color: '#59595B' },
      { name: 'STAINLESS STEEL', color: '#E6E7E8' },
      { name: 'MATTE BLACK', color: '#231F20' },
      { name: 'WHITE', color: '#FFFFFF', border: true },
      { name: 'CHROME', color: '#A7A9AC' },
    ]
  },
  'Antique Finishes': {
    items: [
      { name: 'ANTIQUE COLOUR SAMPLES', colors: ['#C8B273', '#6A4D3B', '#444444'] },
      { name: 'ANTIQUE BRASS', color: '#C8B273' },
      { name: 'ANTIQUE BRONZE', color: '#6A4D3B' },
      { name: 'ANTIQUE GUNMETAL', color: '#444444' },
      { name: 'ANTIQUE STAINLESS STEEL', color: '#A0A0A0' },
    ]
  },
  'Tile Colours': {
    items: [
      { name: 'WHITE TILES', color: '#F9F9F9', border: true },
      { name: 'BLACK TILES', color: '#222222' },
      { name: 'GREY TILES', color: '#888888' },
      { name: 'BEIGE TILES', color: '#D4C4B7' },
      { name: 'GREEN TILES', color: '#4A5D4E' },
      { name: 'ORANGE TILES', color: '#C97A3E' },
      { name: 'YELLOW TILES', color: '#E2B842' },
      { name: 'PINK TILES', color: '#E5BDBF' },
      { name: 'RED TILES', color: '#A03B32' },
      { name: 'BLUE TILES', color: '#779599' },
    ]
  },
  'Commercial': {
    items: [
      { name: 'COMMERCIAL KITCHEN' },
      { name: 'COMMERCIAL BATHROOM' },
    ]
  }
};

const Navbar = ({ setCurrentPage, savedProductsCount, cartCount, setWorkspaceOpen, setWorkspaceTab, setSelectedProduct, setCartOpen, productFilter, setProductFilter, setSearchOpen }: { setCurrentPage: (page: string) => void; savedProductsCount: number; cartCount: number; setWorkspaceOpen: (open: boolean) => void; setWorkspaceTab: (tab: string) => void; setSelectedProduct: (p: any) => void; setCartOpen: (open: boolean) => void; productFilter: any; setProductFilter: (f: any) => void; setSearchOpen: (open: boolean) => void }) => {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isKitchenMenuOpen, setIsKitchenMenuOpen] = useState(false);
  const [isBathroomMenuOpen, setIsBathroomMenuOpen] = useState(false);
  const [isLaundryMenuOpen, setIsLaundryMenuOpen] = useState(false);
  const [isOutdoorMenuOpen, setIsOutdoorMenuOpen] = useState(false);
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(['Our Range']);
  const [activeMiddleCat, setActiveMiddleCat] = useState('Our Range');
  const [activeMiddleSubCat, setActiveMiddleSubCat] = useState('HARDWARE');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const closeAllMenus = () => {
    setIsProductsMenuOpen(false);
    setIsKitchenMenuOpen(false);
    setIsBathroomMenuOpen(false);
    setIsLaundryMenuOpen(false);
    setIsOutdoorMenuOpen(false);
    setIsPlanningOpen(false);
  };

  useEffect(() => {
    if (isProductsMenuOpen || isKitchenMenuOpen || isBathroomMenuOpen || isLaundryMenuOpen || isOutdoorMenuOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProductsMenuOpen, isKitchenMenuOpen, isBathroomMenuOpen, isLaundryMenuOpen, isOutdoorMenuOpen, isMobileMenuOpen]);

  const toggleCategory = (cat) => {
    setOpenCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleProductHover = (product) => {
    if (product.image) {
      setHoveredProduct(product);
    } else {
      setHoveredProduct(null);
    }
  };

  return (
    <div 
      className="sticky top-0 z-50"
    >
      <div className="bg-[#2d2d2d] text-white text-center py-2 px-4 text-[13px] font-light tracking-wide flex items-center justify-center gap-2">
        <span>Portfolio showcase · a fictional kitchen and bathroom storefront</span>
      </div>
      <nav className="bg-white w-full py-4 px-4 md:px-8 flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between border-b border-gray-200 transition-all duration-300 relative z-20">
        <div className="flex items-center gap-4 md:gap-8 justify-start">
          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded cursor-pointer"
            aria-label="Toggle Menu"
            id="mobile-hamburger-btn"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Logo Placeholder */}
          <div onClick={() => { setCurrentPage('home'); closeAllMenus(); }} className="flex flex-col leading-normal cursor-pointer py-1 mt-1 md:mt-0 relative z-50">
            <span className="text-[32px] md:text-[46px] font-[100] text-[#222] tracking-[0.05em] mb-1 transition-all">VELA</span>
            <span className="text-[7px] md:text-[8px] font-normal tracking-[0.45em] text-[#555] uppercase transition-all">ATELIER</span>
          </div>
        </div>

        <div className="hidden xl:flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 text-[17px] font-[300] text-gray-600 items-center">
          <button 
              onClick={() => {
                setCurrentPage('home');
                closeAllMenus();
              }}
              className={`transition-colors border-b-2 py-4 pb-2 cursor-pointer border-transparent hover:text-black`}
            >
              Home
            </button>
            <button 
              onClick={() => {
                setIsProductsMenuOpen(!isProductsMenuOpen);
                setIsKitchenMenuOpen(false);
                setIsBathroomMenuOpen(false);
                setIsLaundryMenuOpen(false);
                setIsOutdoorMenuOpen(false);
                setIsPlanningOpen(false);
              }}
              className={`transition-colors border-b-2 py-4 pb-2 cursor-pointer ${isProductsMenuOpen ? 'border-black text-black' : 'border-transparent hover:text-black'}`}
            >
              Products
            </button>
            <button 
              onClick={() => {
                setIsKitchenMenuOpen(!isKitchenMenuOpen);
                setIsProductsMenuOpen(false);
                setIsBathroomMenuOpen(false);
                setIsLaundryMenuOpen(false);
                setIsOutdoorMenuOpen(false);
                setIsPlanningOpen(false);
              }}
              className={`transition-colors border-b-2 py-4 pb-2 cursor-pointer ${isKitchenMenuOpen ? 'border-black text-black' : 'border-transparent hover:text-black'}`}
            >
              Kitchen
            </button>
            <button 
              onClick={() => {
                setIsBathroomMenuOpen(!isBathroomMenuOpen);
                setIsKitchenMenuOpen(false);
                setIsProductsMenuOpen(false);
                setIsLaundryMenuOpen(false);
                setIsOutdoorMenuOpen(false);
                setIsPlanningOpen(false);
              }}
              className={`transition-colors border-b-2 py-4 pb-2 cursor-pointer ${isBathroomMenuOpen ? 'border-black text-black' : 'border-transparent hover:text-black'}`}
            >
              Bathroom
            </button>
            <button 
              onClick={() => {
                setIsLaundryMenuOpen(!isLaundryMenuOpen);
                setIsBathroomMenuOpen(false);
                setIsKitchenMenuOpen(false);
                setIsProductsMenuOpen(false);
                setIsOutdoorMenuOpen(false);
                setIsPlanningOpen(false);
              }}
              className={`transition-colors border-b-2 py-4 pb-2 cursor-pointer ${isLaundryMenuOpen ? 'border-black text-black' : 'border-transparent hover:text-black'}`}
            >
              Laundry
            </button>
            <button 
              onClick={() => {
                setIsOutdoorMenuOpen(!isOutdoorMenuOpen);
                setIsLaundryMenuOpen(false);
                setIsBathroomMenuOpen(false);
                setIsKitchenMenuOpen(false);
                setIsProductsMenuOpen(false);
                setIsPlanningOpen(false);
              }}
              className={`transition-colors border-b-2 py-4 pb-2 cursor-pointer ${isOutdoorMenuOpen ? 'border-black text-black' : 'border-transparent hover:text-black'}`}
            >
              Outdoor
            </button>

            <button 
              onClick={() => {
                setCurrentPage('book_consult');
                setIsProductsMenuOpen(false);
                setIsKitchenMenuOpen(false);
                setIsBathroomMenuOpen(false);
                setIsLaundryMenuOpen(false);
                setIsOutdoorMenuOpen(false);
                setIsPlanningOpen(false);
              }}
              className="transition-colors border-b-2 border-transparent py-4 pb-2 hover:text-black cursor-pointer hidden lg:block"
            >
              Book a Consult
            </button>

            <div className="h-4 w-px bg-gray-200 mx-2 hidden lg:block" />
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsPlanningOpen(!isPlanningOpen);
                  setIsProductsMenuOpen(false);
                  setIsKitchenMenuOpen(false);
                  setIsBathroomMenuOpen(false);
                  setIsLaundryMenuOpen(false);
                  setIsOutdoorMenuOpen(false);
                }}
                className={`transition-all duration-200 border-b-2 py-4 pb-2 flex items-center gap-1.5 font-medium text-base tracking-wider uppercase text-amber-600 hover:text-amber-700 ${isPlanningOpen ? 'border-amber-500 text-amber-800' : 'border-transparent'}`}
              >
                <Sparkles size={14} className="text-amber-500 animate-pulse" />
                Planning Studio
                <ChevronDown size={12} className={`transition-transform duration-200 ${isPlanningOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPlanningOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsPlanningOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto">
                    <div className="px-4 py-1.5 border-b border-gray-50 mb-1">
                      <span className="text-[16px] font-bold text-gray-400 uppercase tracking-widest block">Design & Planning</span>
                      <p className="text-[17px] text-gray-500 font-light mt-0.5 hidden sm:block">Premium interior orchestration tools.</p>
                    </div>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('comparison');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <Eye size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Features Compare Tool</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Side-by-side product comparison</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('finishes');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <Palette size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Finish Matcher</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Mix and match tapware & finishes</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('room_assistant');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <MessageCircle size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Room Assistant</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Consult with our AI design consultant</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('checklist');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <FileText size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Checklist Builder</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Renovation timeline and milestones</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('budget');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <Calculator size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Budget Allocator</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Estimate & track renovation costs</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('finder');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <Sliders size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Smart Finder</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Advanced specification filter</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('samples');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <Info size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Order Swatches</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Request material samples</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => {
                        setWorkspaceTab('quote');
                        setWorkspaceOpen(true);
                        setIsPlanningOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group pb-3"
                    >
                      <div className="p-1.5 rounded bg-amber-50 group-hover:bg-amber-100/70 transition-colors">
                        <ShoppingCart size={14} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800 block">Quote Request</span>
                        <span className="text-[16px] text-gray-400 font-light hidden sm:block">Request a project quote</span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        <div className="flex gap-4 md:gap-8 items-center justify-end text-gray-800">
          <button onClick={() => setSearchOpen(true)} className="hover:text-black hover:scale-105 transition-all text-base tracking-wider uppercase font-medium flex items-center gap-1.5"><Search size={18} strokeWidth={1.2} /> <span className="hidden lg:inline text-[16px]">Find Product</span></button>
          <button 
            onClick={() => setCurrentPage('saved_products')} 
            className="hover:text-black hover:scale-105 transition-all relative flex items-center"
          >
            <Heart size={22} strokeWidth={1.2} />
            {savedProductsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[17px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center animate-bounce">
                {savedProductsCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setCartOpen(true)} 
            className="hover:text-black hover:scale-105 transition-all relative flex items-center cursor-pointer"
          >
            <ShoppingCart size={22} strokeWidth={1.2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-black text-white text-[17px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      {isProductsMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-10" onClick={() => setIsProductsMenuOpen(false)}></div>
          <div 
            className={`absolute top-full left-0 bg-[#f8f8f8] border-b border-gray-200 shadow-lg z-20 flex opacity-100 ${
              hoveredProduct && hoveredProduct.image ? 'w-[900px] xl:w-[1200px]' : (activeMiddleCat && activeMiddleSubCat && megaMenuData[activeMiddleCat]?.subcategories?.[activeMiddleSubCat] ? 'w-[600px]' : 'w-[300px]')
            }`}
            style={{ height: 'calc(100vh - 75px)' }}
          >
            
            {/* Left Col: Categories */}
            <div 
              className="w-[300px] h-full overflow-y-auto bg-[#f8f8f8] py-8 pl-12 pr-6 flex flex-col gap-6 relative"
              onMouseEnter={() => setHoveredProduct(null)}
            >
              <button onClick={() => setIsProductsMenuOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
                <X size={20} strokeWidth={1} />
              </button>
              
              {Object.keys(megaMenuData).map((cat) => (
                <div key={cat} className="flex flex-col gap-4">
                  <div 
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-2 cursor-pointer text-[#333] font-serif text-[17px] group"
                  >
                    <span className="text-gray-400 font-sans text-base group-hover:text-black transition-colors font-light">
                      {openCategories.includes(cat) ? '—' : '+'}
                    </span>
                    <span className={`transition-colors ${openCategories.includes(cat) ? 'font-medium text-black' : 'hover:text-black'}`}>{cat}</span>
                  </div>
                  
                  {openCategories.includes(cat) && (
                    <div className="flex flex-col gap-4 pl-4 mt-2">
                      {megaMenuData[cat].items.map((item, idx) => (
                        <div 
                          key={idx}
                          onMouseEnter={() => {
                            if (item.hasSub) {
                              setActiveMiddleCat(cat);
                              setActiveMiddleSubCat(item.name);
                            } else {
                              setActiveMiddleCat('');
                              setActiveMiddleSubCat('');
                              if (item.image) {
                                setHoveredProduct(item);
                              } else {
                                setHoveredProduct(null);
                              }
                            }
                          }}
                          onClick={() => {
                            if (!item.hasSub) {
                              let filterType = 'category';
                              if (cat === 'Collections') {
                                filterType = 'collection';
                              } else if (cat === 'Signature Finishes' || cat === 'Antique Finishes') {
                                filterType = 'finish';
                              } else if (cat === 'Tile Colours') {
                                filterType = 'tile_colour';
                              } else if (cat === 'Commercial') {
                                filterType = 'commercial';
                              }
                              
                              setProductFilter({
                                type: filterType,
                                value: item.name,
                                title: `${cat} — ${item.name}`
                              });
                              setCurrentPage('filtered_catalog');
                              setIsProductsMenuOpen(false);
                            }
                          }}
                          className={`flex items-center justify-between cursor-pointer group text-[17px] tracking-wider uppercase font-light transition-colors ${item.name === activeMiddleSubCat && cat === activeMiddleCat ? 'text-black border-l-2 border-black pl-2 -ml-2' : ''} ${item.isLink ? 'text-black border-b border-black w-fit pb-1 mt-2 hover:text-gray-600' : 'text-gray-500 hover:text-black'}`}
                        >
                          <span className="flex items-center justify-between w-full">
                            <span>{item.name}</span>
                            <span className="flex items-center">
                              {item.color && (
                                <span 
                                  className={`w-3.5 h-3.5 rounded-full ${item.border ? 'border border-gray-200' : ''}`}
                                  style={{ backgroundColor: item.color }}
                                />
                              )}
                              {item.colors && (
                                <span className="flex -space-x-1.5">
                                  {item.colors.map((c, i) => (
                                    <span 
                                      key={i}
                                      className="w-3.5 h-3.5 rounded-full border border-white"
                                      style={{ backgroundColor: c, zIndex: item.colors.length - i }}
                                    />
                                  ))}
                                </span>
                              )}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Middle Col: Subcategories */}
            {activeMiddleCat && activeMiddleSubCat && megaMenuData[activeMiddleCat]?.subcategories?.[activeMiddleSubCat] && (
              <div 
                className="w-[300px] h-full bg-white border-x border-gray-200 py-10 px-10 flex flex-col overflow-y-auto relative shrink-0"
              >
                <h3 className="font-serif text-[22px] text-[#222] mb-10">{megaMenuData[activeMiddleCat].subcategories[activeMiddleSubCat].title}</h3>
                <div className="flex flex-col gap-6">
                  {megaMenuData[activeMiddleCat].subcategories[activeMiddleSubCat].items.map((subItem, idx) => (
                    <span 
                      key={idx}
                      onMouseEnter={() => handleProductHover(subItem)}
                      onClick={() => {
                        setProductFilter({
                          type: 'category',
                          value: subItem.name,
                          title: `${activeMiddleSubCat} — ${subItem.name}`
                        });
                        setCurrentPage('filtered_catalog');
                        setIsProductsMenuOpen(false);
                      }}
                      className={`text-[17px] tracking-[0.1em] uppercase font-light cursor-pointer transition-colors ${subItem.isLink ? 'text-black border-b border-black w-fit pb-1 mt-4' : 'text-gray-500 hover:text-black'}`}
                    >
                      {subItem.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Right Col: Image Preview */}
            {hoveredProduct && hoveredProduct.image && (
              <div className="flex-1 bg-[#f8f8f8] relative hidden lg:block overflow-hidden shrink-0 min-w-[300px]">
                <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-300" style={{ backgroundImage: `url(${hoveredProduct.image})` }}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <h3 className="text-white text-3xl font-serif">{hoveredProduct.title || hoveredProduct.name}</h3>
                  </div>
                </div>
              </div>
            )}

          </div>
        </>
      )}

      {/* Kitchen Mega Menu Overlay */}
      {isKitchenMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-10" onClick={() => setIsKitchenMenuOpen(false)}></div>
          <div 
            className="absolute top-full left-0 bg-white border-b border-gray-200 shadow-lg z-20 flex w-full h-auto max-h-[calc(100vh-75px)] overflow-y-auto"
            
          >
            {/* Left Col: Kitchen Links */}
            <div className="w-full h-auto bg-white py-12 px-12 flex flex-col relative max-w-[1600px] mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-serif text-[22px] text-[#222]">Kitchen</h3>
                <button onClick={() => setIsKitchenMenuOpen(false)} className="text-gray-400 hover:text-black">
                  <X size={18} strokeWidth={1} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6">
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TAPWARE', title: 'Kitchen — Tapware' }); setCurrentPage('filtered_catalog'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">KITCHEN TAPWARE</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TILES', title: 'Kitchen — Tiles' }); setCurrentPage('filtered_catalog'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">KITCHEN TILES</span>
                <span 
                  onClick={() => {
                    setProductFilter({ type: 'category', value: 'SINKS', title: 'Kitchen — Sinks' });
                    setCurrentPage('filtered_catalog');
                    setIsKitchenMenuOpen(false);
                  }}
                  className="text-[17px] tracking-[0.1em] uppercase font-light text-black hover:text-black cursor-pointer transition-colors"
                >KITCHEN SINKS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'WASTES', title: 'Kitchen — Wastes' }); setCurrentPage('filtered_catalog'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">SINK WASTES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'HARDWARE', title: 'Kitchen — Hardware' }); setCurrentPage('filtered_catalog'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">CABINET HANDLES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSORIES', title: 'Kitchen — Accessories' }); setCurrentPage('filtered_catalog'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">KITCHEN ACCESSORIES</span>
                
                <span onClick={() => { setProductFilter({ type: 'category', value: 'KITCHEN', title: 'Kitchen Range' }); setCurrentPage('filtered_catalog'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-medium text-black mt-2 mb-4 border-b border-black w-fit pb-1 cursor-pointer">SHOP ALL KITCHEN</span>
                
                
                <span onClick={() => { setProductFilter({ type: 'commercial', value: 'COMMERCIAL KITCHEN', title: 'Commercial Kitchen' }); setCurrentPage('filtered_catalog'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-medium text-black cursor-pointer">COMMERCIAL KITCHEN</span>
                
                
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors mt-2">KITCHEN INSPIRATION</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">PROJECT GALLERY</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">TILE CALCULATOR</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">MOODBOARD BUILDER</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">SHOP THE LOOK</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsKitchenMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BIM LIBRARY</span>
              </div>
            </div>

            
          </div>
        </>
      )}

      {/* Bathroom Mega Menu Overlay */}
      {isBathroomMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-10" onClick={() => setIsBathroomMenuOpen(false)}></div>
          <div 
            className="absolute top-full left-0 bg-white border-b border-gray-200 shadow-lg z-20 flex w-full h-auto max-h-[calc(100vh-75px)] overflow-y-auto"
            
          >
            {/* Left Col: Bathroom Links */}
            <div className="w-full h-auto bg-white py-12 px-12 flex flex-col relative max-w-[1600px] mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-serif text-[22px] text-[#222]">Bathroom</h3>
                <button onClick={() => setIsBathroomMenuOpen(false)} className="text-gray-400 hover:text-black">
                  <X size={18} strokeWidth={1} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6">
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TAPWARE', title: 'Bathroom — Tapware' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BATHROOM TAPWARE</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TILES', title: 'Bathroom — Tiles' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BATHROOM TILES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'BASINS', title: 'Bathroom — Basins' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BASINS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'BATHROOM VANITY UNITS', title: 'Bathroom — Vanity Units' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BATHROOM VANITY UNITS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'SHOWERS', title: 'Bathroom — Showers' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">SHOWERS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'BATHS', title: 'Bathroom — Baths' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BATHS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TOILETS', title: 'Bathroom — Toilets' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">TOILETS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'MIRRORS', title: 'Bathroom — Mirrors' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">MIRRORS</span>
                <span 
                  onClick={() => {
                    setProductFilter({ type: 'category', value: 'WASTES', title: 'Bathroom — Wastes' });
                    setCurrentPage('filtered_catalog');
                    setIsBathroomMenuOpen(false);
                  }}
                  className="text-[17px] tracking-[0.1em] uppercase font-light text-black hover:text-black cursor-pointer transition-colors"
                >BATHROOM WASTES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSORIES', title: 'Bathroom — Accessories' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BATHROOM ACCESSORIES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSORIES', title: 'Bathroom — Toilet Accessories' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">TOILET ACCESSORIES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSIBLE', title: 'Bathroom — Accessible' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">ACCESSIBLE BATHROOM</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSIBLE', title: 'Bathroom — Ambulant' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">AMBULANT BATHROOM</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSIBLE', title: 'Bathroom — Assisted Living' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">ASSISTED LIVING BATHROOM</span>
                
                <span onClick={() => { setProductFilter({ type: 'category', value: 'BATHROOM', title: 'Bathroom Range' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-medium text-black mt-2 mb-4 border-b border-black w-fit pb-1 cursor-pointer">SHOP ALL BATHROOM</span>
                
                
                <span onClick={() => { setProductFilter({ type: 'commercial', value: 'COMMERCIAL BATHROOM', title: 'Commercial Bathroom' }); setCurrentPage('filtered_catalog'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-medium text-black cursor-pointer">COMMERCIAL BATHROOM</span>
                
                
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors mt-2">BATHROOM INSPIRATION</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">PROJECT GALLERY</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">TILE CALCULATOR</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">RENOVATION CALCULATOR</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">MOODBOARD BUILDER</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">SHOP THE LOOK</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsBathroomMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BIM LIBRARY</span>
              </div>
            </div>

            
          </div>
        </>
      )}

      {/* Laundry Mega Menu Overlay */}
      {isLaundryMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-10" onClick={() => setIsLaundryMenuOpen(false)}></div>
          <div 
            className="absolute top-full left-0 bg-white border-b border-gray-200 shadow-lg z-20 flex w-full h-auto max-h-[calc(100vh-75px)] overflow-y-auto"
            
          >
            {/* Left Col: Laundry Links */}
            <div className="w-full h-auto bg-white py-12 px-12 flex flex-col relative max-w-[1600px] mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-serif text-[22px] text-[#222]">Laundry</h3>
                <button onClick={() => setIsLaundryMenuOpen(false)} className="text-gray-400 hover:text-black">
                  <X size={18} strokeWidth={1} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6">
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TAPWARE', title: 'Laundry — Tapware' }); setCurrentPage('filtered_catalog'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">LAUNDRY TAPWARE</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TILES', title: 'Laundry — Tiles' }); setCurrentPage('filtered_catalog'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">LAUNDRY TILES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'SINKS', title: 'Laundry — Sinks' }); setCurrentPage('filtered_catalog'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">LAUNDRY SINKS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'WASTES', title: 'Laundry — Wastes' }); setCurrentPage('filtered_catalog'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">SINK WASTES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'HARDWARE', title: 'Laundry — Hardware' }); setCurrentPage('filtered_catalog'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">CABINET HANDLES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSORIES', title: 'Laundry — Accessories' }); setCurrentPage('filtered_catalog'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">LAUNDRY ACCESSORIES</span>
                
                <span onClick={() => { setProductFilter({ type: 'category', value: 'LAUNDRY', title: 'Laundry Range' }); setCurrentPage('filtered_catalog'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-medium text-black mt-2 mb-4 border-b border-black w-fit pb-1 cursor-pointer">SHOP ALL LAUNDRY</span>
                
                
                
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors mt-2">LAUNDRY INSPIRATION</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">PROJECT GALLERY</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">TILE CALCULATOR</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">MOODBOARD BUILDER</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">SHOP THE LOOK</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsLaundryMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BIM LIBRARY</span>
              </div>
            </div>

            
          </div>
        </>
      )}

      {/* Outdoor Mega Menu Overlay */}
      {isOutdoorMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-10" onClick={() => setIsOutdoorMenuOpen(false)}></div>
          <div 
            className="absolute top-full left-0 bg-white border-b border-gray-200 shadow-lg z-20 flex w-full h-auto max-h-[calc(100vh-75px)] overflow-y-auto"
            
          >
            {/* Left Col: Outdoor Links */}
            <div className="w-full h-auto bg-white py-12 px-12 flex flex-col relative max-w-[1600px] mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-serif text-[22px] text-[#222]">Outdoor</h3>
                <button onClick={() => setIsOutdoorMenuOpen(false)} className="text-gray-400 hover:text-black">
                  <X size={18} strokeWidth={1} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6">
                <span onClick={() => { setProductFilter({ type: 'category', value: 'OUTDOOR KITCHEN', title: 'Outdoor — Kitchen' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">OUTDOOR KITCHEN</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TILES', title: 'Outdoor — Tiles' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">OUTDOOR TILES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TILES', title: 'Outdoor — Pool Tiles' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">POOL TILES</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'SHOWERS', title: 'Outdoor — Showers' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">OUTDOOR SHOWERS</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'TAPWARE', title: 'Outdoor — Tapware' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">OUTDOOR TAPWARE</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'HARDWARE', title: 'Outdoor — Front Door Hardware' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">FRONT DOOR HARDWARE</span>
                <span onClick={() => { setProductFilter({ type: 'category', value: 'ACCESSORIES', title: 'Outdoor — Accessories' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">OUTDOOR ACCESSORIES</span>
                
                <span onClick={() => { setProductFilter({ type: 'category', value: 'OUTDOOR', title: 'Outdoor Range' }); setCurrentPage('filtered_catalog'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-medium text-black mt-2 mb-4 border-b border-black w-fit pb-1 cursor-pointer">SHOP ALL OUTDOOR</span>
                
                
                
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors mt-2">EXPLORE OUTDOOR</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">PROJECT GALLERY</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">TILE CALCULATOR</span>
                <span onClick={() => { setCurrentPage('bathroom_wastes'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">MOODBOARD BUILDER</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">SHOP THE LOOK</span>
                <span onClick={() => { setCurrentPage('kitchen_sinks'); setIsOutdoorMenuOpen(false); }} className="text-[17px] tracking-[0.1em] uppercase font-light text-gray-500 hover:text-black cursor-pointer transition-colors">BIM LIBRARY</span>
              </div>
            </div>

            
          </div>
        </>
      )}

      {/* Mobile Menu Slide-out Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[100] xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Slide-out Panel */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-[110] xl:hidden flex flex-col h-full overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="flex flex-col leading-normal cursor-pointer py-1 mt-1 relative z-50">
                  <span className="text-[32px] font-[100] text-[#222] tracking-[0.05em] mb-1">VELA</span>
                  <span className="text-[6px] font-normal tracking-[0.45em] text-[#555] uppercase">ATELIER</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full cursor-pointer"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6 px-6 space-y-8">
                {/* Rooms section */}
                <div className="space-y-4">
                  <span className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Rooms / Categories</span>
                  <div className="flex flex-col gap-3.5 text-base font-light text-gray-800">
                    <button 
                      onClick={() => { setCurrentPage('kitchen_sinks'); setIsMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-black transition-colors border-b border-gray-50 flex justify-between items-center w-full cursor-pointer"
                    >
                      Kitchen Sinks & Tapware <ChevronRight size={14} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => { setCurrentPage('bathroom_wastes'); setIsMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-black transition-colors border-b border-gray-50 flex justify-between items-center w-full cursor-pointer"
                    >
                      Bathroom Wastes & Mixers <ChevronRight size={14} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => { setCurrentPage('kitchen_sinks'); setIsMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-black transition-colors border-b border-gray-50 flex justify-between items-center w-full cursor-pointer"
                    >
                      Laundry Sinks & Fittings <ChevronRight size={14} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => { setCurrentPage('bathroom_wastes'); setIsMobileMenuOpen(false); }}
                      className="text-left py-2 hover:text-black transition-colors border-b border-gray-50 flex justify-between items-center w-full cursor-pointer"
                    >
                      Outdoor Showers & Tiles <ChevronRight size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Planning Studio section */}
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      if (openCategories.includes('Planning Studio')) {
                        setOpenCategories(openCategories.filter(c => c !== 'Planning Studio'));
                      } else {
                        setOpenCategories([...openCategories, 'Planning Studio']);
                      }
                    }}
                    className="flex w-full justify-between items-center text-left py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-600" />
                      <span className="text-[16px] tracking-widest text-amber-800 font-bold uppercase block">Planning Studio</span>
                    </div>
                    <ChevronDown size={14} className={`text-amber-600 transition-transform ${openCategories.includes('Planning Studio') ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {openCategories.includes('Planning Studio') && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3.5 text-base font-light text-gray-800 pl-5 pb-2">
                          <button 
                            onClick={() => { setWorkspaceTab('comparison'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center border-b border-gray-50 w-full cursor-pointer"
                          >
                            Features Compare Tool <ChevronRight size={14} className="text-gray-400" />
                          </button>
                          <button 
                            onClick={() => { setWorkspaceTab('finishes'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center border-b border-gray-50 w-full cursor-pointer"
                          >
                            Finish Matcher <ChevronRight size={14} className="text-gray-400" />
                          </button>
                          <button 
                            onClick={() => { setWorkspaceTab('room_assistant'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center border-b border-gray-50 w-full cursor-pointer"
                          >
                            Room Assistant <ChevronRight size={14} className="text-gray-400" />
                          </button>
                          <button 
                            onClick={() => { setWorkspaceTab('checklist'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center border-b border-gray-50 w-full cursor-pointer"
                          >
                            Checklist Builder <ChevronRight size={14} className="text-gray-400" />
                          </button>
                          <button 
                            onClick={() => { setWorkspaceTab('budget'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center border-b border-gray-50 w-full cursor-pointer"
                          >
                            Budget Allocator <ChevronRight size={14} className="text-gray-400" />
                          </button>
                          <button 
                            onClick={() => { setWorkspaceTab('finder'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center border-b border-gray-50 w-full cursor-pointer"
                          >
                            Smart Finder <ChevronRight size={14} className="text-gray-400" />
                          </button>
                          <button 
                            onClick={() => { setWorkspaceTab('samples'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center border-b border-gray-50 w-full cursor-pointer"
                          >
                            Order Swatches <ChevronRight size={14} className="text-gray-400" />
                          </button>
                          <button 
                            onClick={() => { setWorkspaceTab('quote'); setWorkspaceOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-left py-2 hover:text-black transition-colors flex justify-between items-center font-medium text-amber-700 w-full cursor-pointer"
                          >
                            Quote Request <ChevronRight size={14} className="text-amber-300" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info Links */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <span className="text-[16px] tracking-widest text-gray-400 font-bold uppercase block">Company & Support</span>
                  <div className="flex flex-col gap-3 text-base font-light text-gray-600">
                    <button onClick={() => { setCurrentPage('about_our-story'); setIsMobileMenuOpen(false); }} className="text-left hover:text-black transition-colors cursor-pointer">About Us</button>
                    <button onClick={() => { setCurrentPage('book_consult'); setIsMobileMenuOpen(false); }} className="text-left hover:text-black transition-colors cursor-pointer">Book Complimentary Consult</button>
                    <button onClick={() => { setCurrentPage('help_centre'); setIsMobileMenuOpen(false); }} className="text-left hover:text-black transition-colors cursor-pointer">Help Centre & FAQs</button>
                    <button onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-left hover:text-black transition-colors cursor-pointer">Login / Register</button>
                  </div>
                </div>
              </div>

              {/* Drawer status bar */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 text-[16px] text-gray-400 font-mono flex flex-col gap-1 uppercase">
                <span>ESTABLISHED 2019 • WARM BRASS</span>
                <span>VELA ATELIER</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Button = ({ children, outline, onClick = undefined }) => (
  <button onClick={onClick} className={`flex items-center gap-4 px-8 py-4 text-[17px] tracking-widest uppercase transition-all duration-500 hover:bg-black hover:text-white ${outline ? 'border border-gray-300' : 'bg-black text-white'}`}>
    {children} <span className="font-light transition-transform duration-500 group-hover:translate-x-1">→</span>
  </button>
);

const Hero = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <section className="relative w-full h-[85vh] overflow-hidden flex items-center">
    <motion.img referrerPolicy="no-referrer" 
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute inset-0 w-full h-full object-cover" 
      src={heroImg}
      alt="Hero Image"
    />
    <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay for text legibility */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative z-10 w-full flex flex-col justify-center px-12 lg:px-32 py-20 text-white"
    >
      <h1 className="text-5xl lg:text-[5.5rem] font-serif leading-[1.1] mb-10 tracking-tight max-w-4xl drop-shadow-md">
        Kitchen and bathroom fixtures, <br /> specified as one room.
      </h1>
      <div>
        <button 
          onClick={() => setCurrentPage('kitchen_sinks')}
          className="group flex items-center gap-4 px-8 py-4 text-[17px] tracking-widest uppercase transition-all duration-500 border border-white hover:bg-white hover:text-black"
        >
          Explore <span className="font-light transition-transform duration-500 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </motion.div>
  </section>
);

const ProductCard = ({ title, description, linkText, image, onClick = undefined }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className="flex flex-col group cursor-pointer"
    onClick={onClick}
  >
    <div className="w-full aspect-[4/5] bg-gray-100 mb-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <img referrerPolicy="no-referrer" src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]" />
    </div>
    <h3 className="text-2xl font-serif text-gray-900 mb-4">{title}</h3>
    <p className="text-[17px] text-gray-500 leading-relaxed mb-8 flex-grow">{description}</p>
    <button className="text-[17px] tracking-widest uppercase text-gray-900 flex items-center gap-3 transition-colors border-b border-gray-900 pb-1 self-start hover:text-gray-500 hover:border-gray-500 duration-300">
      {linkText}
    </button>
  </motion.div>
);

const CategoryGrid = ({ setCurrentPage }) => (
  <section className="py-16 px-6 lg:px-16 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
    <ProductCard 
      title="Antique Collection" 
      description="Aged brass and gunmetal for rooms that want a little history, without looking restored." 
      linkText="Shop Collection" 
      image={antiqueImg}
      onClick={() => setCurrentPage('bathroom_wastes')}
    />
    <ProductCard 
      title="Arlo" 
      description="Fluted stainless sinks, finished to sit with the same brass and black tapware used in the bathroom." 
      linkText="Shop Arlo" 
      image={nessoImg}
      onClick={() => setCurrentPage('kitchen_sinks')}
    />
    <ProductCard 
      title="Tiles" 
      description="Small-format tiles for floors and splashbacks, chosen to sit beside the metal finishes in the catalogue." 
      linkText="Shop Tiles" 
      image={tilesImg}
      onClick={() => setCurrentPage('bathroom_wastes')}
    />
    <ProductCard 
      title="Entry Pulls" 
      description="Door and entry pulls in the same finishes as the tapware, so the hardware reads as one set." 
      linkText="Shop Entry Pulls" 
      image={entryPullImg}
      onClick={() => setCurrentPage('bathroom_wastes')}
    />
  </section>
);

const FeatureSection = ({ title, text, buttonText, imageLeft, imageSrc, onClick = undefined }) => (
  <section className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} w-full items-stretch`}>
    <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-[70vh] overflow-hidden relative">
      <motion.img referrerPolicy="no-referrer" 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
        src={imageSrc}
        alt={title}
      />
    </div>
    <div className="w-full md:w-1/2 p-16 lg:p-16 flex flex-col justify-center bg-[#fafafa] min-h-[50vh] md:min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, x: imageLeft ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-8 leading-tight">{title}</h2>
        <p className="text-[17px] text-gray-500 leading-relaxed mb-12 max-w-lg">{text}</p>
        <div>
          <Button outline onClick={onClick}>{buttonText}</Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const IconRange = () => {
  const icons = [
    { name: 'TOILETS', svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 10h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z"/><path d="M8 10V6h8v4"/><circle cx="10" cy="8" r="0.5"/><circle cx="14" cy="8" r="0.5"/></svg> },
    { name: 'MIRRORS', svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v10h10V10a5 5 0 0 0-10 0z"/><line x1="10" y1="10" x2="14" y2="6"/><line x1="10" y1="15" x2="14" y2="11"/></svg> },
    { name: 'ACCESSORIES', svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="12" r="3"/><line x1="11" y1="12" x2="22" y2="12"/><line x1="11" y1="10" x2="11" y2="14"/><line x1="22" y1="10" x2="22" y2="14"/></svg> },
    { name: 'HARDWARE', svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><line x1="12" y1="5" x2="12" y2="19"/></svg> },
    { name: 'SINKS', svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="4,10 20,10 18,16 6,16" /><polygon points="4,10 6,8 22,8 20,10" /><polygon points="20,10 22,8 20,14 18,16" /></svg> },
    { name: 'TILES', svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="8" height="8"/><rect x="13" y="6" width="6" height="14"/><rect x="8" y="4" width="5" height="7"/></svg> }
  ];

  const marqueeIcons = [...icons, ...icons, ...icons, ...icons];

  return (
    <section className="py-10 flex flex-col items-center bg-white overflow-hidden border-b border-gray-100">
      <div className="w-full relative flex items-center group">
        <div className="w-full overflow-hidden flex relative mask-image-fade">
          <motion.div 
            className="flex gap-16 lg:gap-16 items-center w-max pr-16 lg:pr-32"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {marqueeIcons.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-6 cursor-pointer group/icon">
                <div className="text-gray-600 group-hover/icon:text-black transition-colors duration-300">
                  {item.svg}
                </div>
                <span className="text-[17px] tracking-[0.2em] text-gray-500 group-hover/icon:text-black transition-colors uppercase font-medium whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FormInput = ({ label, type = "text" }) => (
  <div className="flex flex-col gap-2 mb-6">
    <label className="text-base text-gray-500 tracking-wider uppercase">{label}</label>
    <input 
      type={type} 
      className="border border-gray-300 p-3 bg-transparent rounded-sm focus:outline-none focus:border-gray-800 transition-colors w-full"
    />
  </div>
);

const NewsletterSignup = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <section className="py-16 flex flex-col items-center px-6">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl lg:text-4xl font-serif text-gray-900 mb-6 text-center"
    >
      Need assistance selecting the right products from our range?
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-[17px] text-gray-500 mb-12 text-center max-w-2xl"
    >
      We offer free consultations to guide you through the selection process, helping you create the perfect design for your space.
    </motion.p>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <Button outline onClick={() => setCurrentPage('book_consult')}>Book a Consultation</Button>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-32 bg-[#f4f4f4] p-12 lg:p-12 w-full max-w-[1400px] flex flex-col lg:flex-row gap-20 items-center"
    >
      <div className="w-full lg:w-1/2">
        <h2 className="text-5xl font-serif text-gray-900 mb-8 leading-[1.1]">Enjoy $25<br/>Off Today!</h2>
        <p className="text-[17px] text-gray-500 mb-8 leading-relaxed">Join our mailing list to be the first to know of exclusive offers, product releases, the latest interior design inspiration, and more!</p>
        <p className="text-[17px] text-gray-400 italic">Check your inbox for your welcome code. *Minimum $100 spend applies.</p>
      </div>
      <div className="w-full lg:w-1/2">
        <form className="w-full max-w-md mx-auto lg:mx-0">
          <FormInput label="First Name" />
          <FormInput label="Phone" type="tel" />
          <FormInput label="Email" type="email" />
          <button type="submit" className="text-[17px] uppercase tracking-widest text-gray-900 flex items-center gap-3 border-b border-gray-900 pb-2 hover:text-gray-500 hover:border-gray-500 transition-all duration-300 mt-8">
            Sign Up →
          </button>
          <p className="text-[17px] text-gray-400 mt-8 leading-relaxed">
            By submitting this form and providing your phone number, you consent to receive marketing text messages from Vela.
          </p>
        </form>
      </div>
    </motion.div>
  </section>
);

const ConsultationIntro = () => (
  <section className="py-10 px-8 lg:px-16 flex flex-col items-center text-center bg-white border-t border-gray-100">
    <h2 className="font-serif text-4xl lg:text-5xl text-[#2d2d2d] mb-6 max-w-3xl leading-tight">
      Book a Complimentary Design Consultation
    </h2>
    <p className="text-gray-500 max-w-3xl leading-relaxed font-light mt-4">
      Whatever the project, gain expert advice in person at one of our showrooms or remotely — to help bring your dream space to life with Vela products. Our complimentary consultations include a personalised moodboard, tailored product selection guidance, samples, and a customised quotation.
    </p>
  </section>
);

const ConsultationCards = ({ onBook }: { onBook: (type: 'Virtual' | 'Showroom') => void }) => (
  <section className="px-8 lg:px-16 pb-24 bg-white flex flex-col md:flex-row gap-8 justify-center max-w-[1600px] mx-auto">
    <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-gray-200 hover:border-black/30 transition-all duration-300">
      <img referrerPolicy="no-referrer" src={consultVirtualImg} alt="Virtual Consultation" className="w-full h-[400px] object-cover" />
      <div className="p-8">
        <h3 className="font-serif text-3xl text-[#2d2d2d] mb-3">Virtual Consultation</h3>
        <p className="text-gray-500 font-light text-base mb-8">Meet online with our senior design specifier via video conference. Includes direct file and layout sharing.</p>
        <button 
          onClick={() => onBook('Virtual')}
          className="inline-flex items-center text-base tracking-wider font-semibold text-amber-800 hover:text-black transition-colors uppercase border-b border-amber-800 pb-1 cursor-pointer"
        >
          Book Appointment <span className="ml-2 font-light">→</span>
        </button>
      </div>
    </div>
    <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-gray-200 hover:border-black/30 transition-all duration-300">
      <img referrerPolicy="no-referrer" src={consultShowroomImg} alt="Showroom Consultation" className="w-full h-[400px] object-cover" />
      <div className="p-8">
        <h3 className="font-serif text-3xl text-[#2d2d2d] mb-3">In-Showroom Consultation</h3>
        <p className="text-gray-500 font-light text-base mb-8">Visit our showroom for an immersive touch-and-feel material consultation with custom finish comparisons.</p>
        <button 
          onClick={() => onBook('Showroom')}
          className="inline-flex items-center text-base tracking-wider font-semibold text-amber-800 hover:text-black transition-colors uppercase border-b border-amber-800 pb-1 cursor-pointer"
        >
          Book Appointment <span className="ml-2 font-light">→</span>
        </button>
      </div>
    </div>
  </section>
);

const ConsultationFAQ = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in the consultation?",
      answer: "Our design consultations include a dedicated one-on-one session with our experienced consultants. We will help you select the perfect fixtures for your project, coordinate finishes across different spaces, and provide expert advice on layout and functionality. You will receive a comprehensive project quote and a personalized specification schedule."
    },
    {
      question: "Why book a consultation?",
      answer: "Booking a consultation ensures you receive tailored advice specific to your project's unique requirements. Our experts understand the nuances of our product range and can guide you towards choices that elevate your design while meeting your practical needs. It streamlines the selection process and minimizes the risk of costly mistakes."
    },
    {
      question: "What's the difference between our virtual and showroom consultations?",
      answer: "Showroom consultations offer a tactile experience where you can see, touch, and compare our physical products and finishes in person. Virtual consultations provide the same level of expert guidance and personalized recommendations, conducted via video call, making it a convenient option if you are unable to visit a showroom."
    }
  ];

  return (
    <section className="py-10 px-8 lg:px-16 bg-[#f7f7f7] flex flex-col items-center">
      <h2 className="text-2xl text-[#2d2d2d] font-light mb-10">About our Design Consultations</h2>
      <div className="w-full max-w-4xl flex flex-col gap-0 border-t border-gray-200">
        {faqs.map((faq, i) => {
          const isOpen = expandedFAQ === i;
          return (
            <div key={i} className="flex flex-col border-b border-gray-200">
              <button 
                onClick={() => setExpandedFAQ(isOpen ? null : i)}
                className="py-6 flex justify-between items-center cursor-pointer group text-left w-full focus:outline-none"
              >
                <span className={`font-light transition-colors ${isOpen ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>{faq.question}</span>
                <ChevronDown className={`text-gray-400 font-light transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} strokeWidth={1} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-2 text-gray-500 font-light text-[17px] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const HelpCentrePage = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'returns' | 'warranty' | 'shipping' | 'faqs'>('contact');
  const [activeState, setActiveState] = useState<'QLD' | 'NSW' | 'VIC' | 'WA'>('QLD');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    clientType: 'Retail Client',
    timeline: 'Immediate (0-3 months)',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEnquiryForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        clientType: 'Retail Client',
        timeline: 'Immediate (0-3 months)',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  const statesData = {
    QLD: {
      title: "Visit Our Southport Studio",
      address: "18 Harbour Lane, Southport QLD 4215",
      hours: [
        { label: "Mon - Fri", value: "7.00am - 5.00pm (AEST)" },
        { label: "Sat", value: "8.30am - 3.00pm (AEST)" },
        { label: "Sun", value: "Closed" }
      ],
      parking: "",
      mapUrl: "https://maps.google.com/maps?q=Southport%20QLD&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    NSW: {
      title: "Visit Our Sydney Studio",
      address: "42 Studio Lane, Surry Hills NSW 2010",
      hours: [
        { label: "Monday - Saturday", value: "9.00am - 5.00pm" },
        { label: "Sunday", value: "Closed" }
      ],
      parking: "Street parking near the Surry Hills studio fills quickly. Check time limits on the surrounding streets before you leave the car. This address is fictional.",
      mapUrl: "https://maps.google.com/maps?q=Surry%20Hills%20NSW&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    VIC: {
      title: "Visit Our Melbourne Studio",
      address: "9 Gallery Street, Fitzroy VIC 3065",
      hours: [
        { label: "Mon - Fri", value: "9:00am - 5:00pm (AEST)" },
        { label: "Sat", value: "9:00am - 3:00pm (AEST)" },
        { label: "Sun", value: "Closed" }
      ],
      parking: "",
      mapUrl: "https://maps.google.com/maps?q=Fitzroy%20VIC&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    WA: {
      title: "Visit Our Perth Studio",
      address: "6 Workshop Road, Northbridge WA 6003",
      hours: [
        { label: "Mon - Fri", value: "9:00am - 5:00pm (AWST)" },
        { label: "Sat", value: "8:30am - 5:00pm (AWST)" },
        { label: "Sun", value: "10:00am - 4:00pm (AWST)" }
      ],
      parking: "",
      mapUrl: "https://maps.google.com/maps?q=Northbridge%20WA&t=&z=15&ie=UTF8&iwloc=&output=embed"
    }
  };

  const faqs = [
    {
      question: "What's included in a design consultation?",
      answer: "Our complimentary showroom and virtual consultations include a personalised moodboard, tailored product selection guidance, architectural samples, and a fully customised quotation tailored to your build or renovation project."
    },
    {
      question: "Why should I book a consultation?",
      answer: "Booking a consultation allows you to work 1-on-1 with our design experts who will guide you on colour matching, product sizing, and material durability, saving you time and ensuring your design achieves a cohesive, high-end finish."
    },
    {
      question: "What's the difference between virtual and showroom consultations?",
      answer: "Showroom consultations take place in person, letting you touch and feel our complete range in various custom finishes. Virtual consultations are held online via video call, allowing you to access our expert advice from any location globally."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-7 business days across Australia, while express shipping is available for urgent orders and takes 1-3 business days. International orders generally deliver within 7-14 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a flexible 30-day return policy for unused, uninstalled products in their original packaging. Please contact our support team or initiate a return through the Help Centre portal to get started."
    },
    {
      question: "Do you offer product warranties?",
      answer: "Yes, we stand behind the durability and craftsmanship of our products. All Vela fixtures are assured by our generous residential Lifetime warranty, and structured commercial warranties depending on the product range."
    }
  ];

  return (
    <div className="w-full bg-white text-[#222]">
      {/* Title block */}
      <div className="pt-28 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-100">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-[#222] mb-3">Help Centre</h1>
          <p className="text-gray-500 font-light text-[16px]">How can we assist you with your project today?</p>
        </div>
      </div>

      {/* Primary Sub-Nav Tabs */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-8">
        <div className="flex flex-wrap gap-8 md:gap-12 border-b border-gray-200 text-[16px] tracking-[0.15em] uppercase font-medium">
          {(['contact', 'returns', 'warranty', 'shipping', 'faqs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpandedFAQ(null);
              }}
              className={`pb-4 transition-all relative border-b-2 ${
                activeTab === tab 
                  ? 'border-black text-black font-semibold' 
                  : 'border-transparent text-gray-400 hover:text-black'
              }`}
            >
              {tab === 'contact' ? 'Contact Us' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        {activeTab === 'contact' && (
          <div>
            {/* Showroom State Selection */}
            <div className="flex gap-8 border-b border-gray-100 pb-4 mb-12 text-[16px] tracking-[0.1em] font-medium text-gray-400">
              {(['QLD', 'NSW', 'VIC', 'WA'] as const).map((state) => (
                <button
                  key={state}
                  onClick={() => setActiveState(state)}
                  className={`pb-2 relative transition-all uppercase ${
                    activeState === state 
                      ? 'text-black font-semibold border-b border-black' 
                      : 'hover:text-black'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>

            {/* Showroom Details & Map Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
              {/* Showroom details */}
              <div className="flex flex-col gap-6">
                <h2 className="font-serif text-[28px] md:text-[34px] font-light text-[#222] leading-tight">
                  {statesData[activeState].title}
                </h2>
                
                <p className="text-[17px] font-medium tracking-wide text-gray-800">
                  {statesData[activeState].address}
                </p>

                <div className="flex flex-col gap-4 text-[17px] text-gray-600 font-light max-w-md">
                  {statesData[activeState].hours.map((hour, idx) => (
                    <div key={idx} className="flex justify-between items-start py-1 border-b border-gray-50">
                      <span className="font-medium text-black">{hour.label}</span>
                      <span>{hour.value}</span>
                    </div>
                  ))}
                </div>

                {statesData[activeState].parking && (
                  <div className="mt-4 p-5 bg-gray-50 border border-gray-100 rounded-[4px] text-[16px] leading-relaxed text-gray-500 font-light">
                    <span className="font-semibold text-black block mb-2 uppercase tracking-wide text-[17px]">Parking Information</span>
                    {statesData[activeState].parking}
                  </div>
                )}

                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(statesData[activeState].address)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[17px] uppercase tracking-wider font-semibold border-b border-black w-fit pb-1 mt-6 flex items-center gap-2 hover:opacity-85 transition-opacity"
                >
                  Get Directions <ArrowRight size={14} />
                </a>
              </div>

              {/* Map embed */}
              <div className="w-full aspect-[4/3] min-h-[350px] lg:min-h-[450px] border border-gray-200 rounded-[6px] overflow-hidden bg-gray-100 shadow-sm relative">
                <iframe
                  src={statesData[activeState].mapUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title={`${activeState} Showroom Location Map`}
                ></iframe>
              </div>
            </div>

            {/* Middle Prompt */}
            <div className="text-center max-w-xl mx-auto mb-12">
              <p className="text-gray-500 text-[16px] font-light leading-relaxed">
                If you have any questions, please feel free to contact us at any time.
              </p>
            </div>

            {/* Three Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
              {/* Card 1: Live Chat */}
              <div className="border border-gray-200 rounded-[6px] p-8 flex flex-col justify-between items-start bg-white h-full hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-shadow">
                <div className="flex flex-col gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 mb-2">
                    <MessageCircle size={20} strokeWidth={1.5} className="text-[#333]" />
                  </div>
                  <h3 className="font-serif text-[20px] font-normal text-black">Live Chat</h3>
                  <div className="flex flex-col gap-2.5 text-[16px] font-light text-gray-500 font-sans">
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="font-medium text-black">Mon - Fri</span>
                      <span>7:00am - 5:00pm (AEST)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="font-medium text-black">Sat</span>
                      <span>8:30am - 3:00pm (AEST)</span>
                    </div>
                    <div className="flex justify-between pb-1.5">
                      <span className="font-medium text-black">Sun</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Live Chat initiated. Connecting with an agent...')}
                  className="mt-8 text-[17px] uppercase tracking-wider font-semibold border border-black px-6 py-2.5 rounded-[4px] hover:bg-black hover:text-white transition-colors duration-300 w-full text-center"
                >
                  Chat Now
                </button>
              </div>

              {/* Card 2: Call Us */}
              <div className="border border-gray-200 rounded-[6px] p-8 flex flex-col justify-between items-start bg-white h-full hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-shadow">
                <div className="flex flex-col gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 mb-2">
                    <Phone size={20} strokeWidth={1.5} className="text-[#333]" />
                  </div>
                  <h3 className="font-serif text-[20px] font-normal text-black">Call Us</h3>
                  <div className="flex flex-col gap-2.5 text-[16px] font-light text-gray-500 font-sans">
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="font-medium text-black">Mon - Fri</span>
                      <span>7:00am - 5:00pm (AEST)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="font-medium text-black">Sat</span>
                      <span>8:30am - 3:00pm (AEST)</span>
                    </div>
                    <div className="flex justify-between pb-1.5">
                      <span className="font-medium text-black">Sun</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
                <a 
                  href="tel:0390002140"
                  className="mt-8 text-[17px] uppercase tracking-wider font-semibold border border-black px-6 py-2.5 rounded-[4px] hover:bg-black hover:text-white transition-colors duration-300 w-full text-center block"
                >
                  (03) 9000 2140
                </a>
              </div>

              {/* Card 3: Email Us */}
              <div className="border border-gray-200 rounded-[6px] p-8 flex flex-col justify-between items-start bg-white h-full hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-shadow">
                <div className="flex flex-col gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 mb-2">
                    <Mail size={20} strokeWidth={1.5} className="text-[#333]" />
                  </div>
                  <h3 className="font-serif text-[20px] font-normal text-black">Email Us</h3>
                  <p className="text-[16px] text-gray-500 font-light leading-relaxed mb-1">
                    Here to help with any enquiries you may have.
                  </p>
                  
                  <div className="flex flex-col gap-3 text-[17px] mt-1">
                    <div>
                      <span className="font-semibold text-black uppercase tracking-wider text-[17px] block">Sales Team</span>
                      <a href="mailto:hello@vela-atelier.example" className="text-gray-500 hover:text-black transition-colors">hello@vela-atelier.example</a>
                    </div>
                    <div>
                      <span className="font-semibold text-black uppercase tracking-wider text-[17px] block">Trade Team</span>
                      <a href="mailto:trade@vela-atelier.example" className="text-gray-500 hover:text-black transition-colors">trade@vela-atelier.example</a>
                    </div>
                    <div>
                      <span className="font-semibold text-black uppercase tracking-wider text-[17px] block">Customer Experience</span>
                      <a href="mailto:help@vela-atelier.example" className="text-gray-500 hover:text-black transition-colors">help@vela-atelier.example</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Send an Enquiry Form */}
            <div className="max-w-3xl mx-auto border border-gray-200 rounded-[6px] p-8 md:p-12 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
              <div className="text-center mb-10">
                <h3 className="font-serif text-[28px] text-black font-light mb-2">Send an Enquiry</h3>
                <p className="text-gray-400 font-light text-[17px] tracking-wider uppercase">"*" indicates required fields</p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-[22px] text-black mb-2">Thank you!</h4>
                  <p className="text-gray-500 font-light text-base max-w-md mx-auto leading-relaxed">
                    Your enquiry has been received successfully. One of our design consultants will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">First Name *</label>
                      <input 
                        required
                        type="text" 
                        value={enquiryForm.firstName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, firstName: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Last Name *</label>
                      <input 
                        required
                        type="text" 
                        value={enquiryForm.lastName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, lastName: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Email *</label>
                      <input 
                        required
                        type="email" 
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Phone *</label>
                      <input 
                        required
                        type="tel" 
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">I Am A *</label>
                      <select 
                        value={enquiryForm.clientType}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, clientType: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      >
                        <option>Retail Client</option>
                        <option>Trade Client</option>
                        <option>Developer</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Project Timeline *</label>
                      <select 
                        value={enquiryForm.timeline}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, timeline: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      >
                        <option>Immediate (0-3 months)</option>
                        <option>Medium (3-6 months)</option>
                        <option>Future (6+ months)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Subject *</label>
                    <input 
                      required
                      type="text" 
                      value={enquiryForm.subject}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>

                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Enquiry *</label>
                    <textarea 
                      required
                      rows={5}
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="mt-4 text-[17px] uppercase tracking-[0.15em] border border-black bg-black text-white px-8 py-3.5 rounded-[4px] font-semibold hover:bg-white hover:text-black transition-colors duration-300 w-full flex justify-center items-center gap-2"
                  >
                    Submit Enquiry <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="max-w-4xl mx-auto py-8">
            <h2 className="font-serif text-3xl font-light text-black mb-8">Returns Policy</h2>
            <div className="prose prose-sm text-gray-600 font-light leading-relaxed flex flex-col gap-6">
              <p>
                At Vela, we want you to be completely satisfied with your purchase. If a product isn't quite right for your space, we offer a flexible returns policy within 30 days of delivery.
              </p>
              
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-[4px] my-6">
                <h3 className="font-serif text-xl text-black font-normal mb-3">Key Return Requirements:</h3>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>Items must be returned within 30 days of receiving your order.</li>
                  <li>Products must be unused, uninstalled, and in their original packaging.</li>
                  <li>Packaging must be in pristine condition, with no markings or damage.</li>
                  <li>Proof of purchase (invoice or order confirmation) is required.</li>
                </ul>
              </div>

              <h3 className="font-serif text-[22px] text-black font-normal mt-4">How to Initiate a Return</h3>
              <p>
                To initiate a return, please contact our Customer Experience team via email at <a href="mailto:help@vela-atelier.example" className="text-black hover:underline">help@vela-atelier.example</a> with your order number and list of products you wish to return.
              </p>
              <p>
                Once approved, you will be provided with a return authorization number and instructions on where to send your items. Return shipping costs are the responsibility of the customer unless the product is deemed faulty.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="max-w-4xl mx-auto py-8">
            <h2 className="font-serif text-3xl font-light text-black mb-8">Warranty Information</h2>
            <div className="prose prose-sm text-gray-600 font-light leading-relaxed flex flex-col gap-6">
              <p>
                We stand behind the superior quality, engineering, and longevity of Vela products. All of our fixtures are crafted from high-grade materials and are subject to rigorous quality assurance standards.
              </p>
              
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-[4px] my-6">
                <h3 className="font-serif text-xl text-black font-normal mb-3">Residential Additional Lifetime Warranty</h3>
                <p className="mb-4">
                  For peace of mind in your home, all Vela tapware, showers, basins, and hardware come with our generous Lifetime additional warranty for residential applications. This covers:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>Structural integrity and material defects.</li>
                  <li>Cartridges, mixers, and internal mechanisms.</li>
                  <li>Surface finishes, including physical vapour deposition (PVD) finishes.</li>
                </ul>
              </div>

              <h3 className="font-serif text-[22px] text-black font-normal mt-4">Commercial Applications</h3>
              <p>
                For multi-residential, retail, office, and hospitality projects, our products are backed by robust structured commercial warranties (typically 5 to 10 years depending on the range). Please contact our trade division for detailed commercial warranty sheets.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="max-w-4xl mx-auto py-8">
            <h2 className="font-serif text-3xl font-light text-black mb-8">Shipping & Delivery</h2>
            <div className="prose prose-sm text-gray-600 font-light leading-relaxed flex flex-col gap-6">
              <p>
                We deliver nationwide across Australia as well as internationally, working with top-tier courier networks to ensure your products arrive safely and on schedule.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                <div className="border border-gray-200 p-6 rounded-[4px]">
                  <h3 className="font-serif text-lg text-black font-normal mb-2">Standard Shipping</h3>
                  <p className="text-[17px] text-gray-500 mb-2">3-7 business days delivery across capital cities and regional hubs.</p>
                  <p className="font-medium text-black">Calculated at checkout by weight/dimensions.</p>
                </div>
                <div className="border border-gray-200 p-6 rounded-[4px]">
                  <h3 className="font-serif text-lg text-black font-normal mb-2">Express Shipping</h3>
                  <p className="text-[17px] text-gray-500 mb-2">1-3 business days priority courier dispatch for urgent timelines.</p>
                  <p className="font-medium text-black">Available as an upgrade option at checkout.</p>
                </div>
              </div>

              <h3 className="font-serif text-[22px] text-black font-normal mt-4">Delivery Guidelines & Tracking</h3>
              <p>
                Once your order has been dispatched from our Southport warehouse, you will receive an email confirmation containing a unique tracking link to monitor your shipment.
              </p>
              <p>
                We highly recommend scheduling your tradespeople or plumbers only after your products have safely arrived and been inspected, to avoid any project delays.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="max-w-3xl mx-auto py-8">
            <h2 className="font-serif text-3xl font-light text-black mb-12 text-center">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-0 border-t border-gray-200">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 py-5">
                  <div 
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="flex justify-between items-center cursor-pointer group"
                  >
                    <span className="text-[16px] text-gray-800 font-medium group-hover:text-black transition-colors">{faq.question}</span>
                    <ChevronDown 
                      className={`text-gray-400 font-light transition-transform duration-300 ${expandedFAQ === idx ? 'rotate-180 text-black' : ''}`} 
                      size={18} 
                      strokeWidth={1.5} 
                    />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedFAQ === idx ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-500 font-light text-[17px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TradePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<'benefits' | 'calculator' | 'swatches' | 'apply'>('benefits');
  const [activeReview, setActiveReview] = useState(0);
  
  // Pricing Calculator State
  const [calcScale, setCalcScale] = useState<'residential' | 'multi' | 'commercial'>('residential');
  const [calcFinish, setCalcFinish] = useState<'brass' | 'copper' | 'gunmetal' | 'black' | 'chrome'>('brass');

  // Swatch Selection State
  const [swatches, setSwatches] = useState([
    { id: 'brass', name: 'Brushed Brass', hex: '#D4AF37', active: true, description: 'Premium physical vapour deposition (PVD) gold hue.' },
    { id: 'copper', name: 'Brushed Copper', hex: '#B87333', active: true, description: 'Natural warm copper tone, designed to age elegantly.' },
    { id: 'gunmetal', name: 'Brushed Gunmetal', hex: '#4A4A4A', active: true, description: 'Dark, modern industrial graphite finish with PVD strength.' },
    { id: 'black', name: 'Matte Black', hex: '#1A1A1A', active: false, description: 'Sleek, velvety electroplated matte finish.' },
    { id: 'chrome', name: 'Chrome', hex: '#E5E5E5', active: false, description: 'Mirror-polished standard timeless metallic finish.' }
  ]);
  const [isSwatchSubmitted, setIsSwatchSubmitted] = useState(false);
  const [swatchForm, setSwatchForm] = useState({ fullName: '', email: '', company: '', address: '' });

  // Trade Application Form State
  const [tradeForm, setTradeForm] = useState({
    companyName: '',
    abn: '',
    fullName: '',
    email: '',
    phone: '',
    website: '',
    profession: 'Architect',
    estimatedAnnualSpend: '$5,000 - $20,000',
    message: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const toggleSwatch = (id: string) => {
    setSwatches(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleSwatchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSwatchSubmitted(true);
    setTimeout(() => {
      setIsSwatchSubmitted(false);
      setSwatchForm({ fullName: '', email: '', company: '', address: '' });
    }, 4000);
  };

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setTimeout(() => {
      setIsFormSubmitted(false);
      setTradeForm({
        companyName: '',
        abn: '',
        fullName: '',
        email: '',
        phone: '',
        website: '',
        profession: 'Architect',
        estimatedAnnualSpend: '$5,000 - $20,000',
        message: ''
      });
    }, 5000);
  };

  // Calculator Multipliers & Rules
  const calculatorData = {
    residential: {
      label: 'Single Luxury Residence',
      retailVal: 6850,
      discountPct: 15,
      description: 'Typically includes high-end fixtures for a main bathroom, ensuite, kitchen mixer and powder room.'
    },
    multi: {
      label: 'Multi-Residential Development (5-12 units)',
      retailVal: 48200,
      discountPct: 22,
      description: 'Volume discount package tailored for developers and builders managing boutique apartment complexes.'
    },
    commercial: {
      label: 'Commercial Hotel / Boutique Office',
      retailVal: 128000,
      discountPct: 30,
      description: 'Special trade partnership pricing tier with highest direct bulk discount and dedicated container dispatch.'
    }
  };

  const finishMultipliers = {
    brass: { name: 'Brushed Brass', factor: 1.1, desc: 'PVD Durability Guarantee' },
    copper: { name: 'Brushed Copper', factor: 1.15, desc: 'Living Finish Coating' },
    gunmetal: { name: 'Brushed Gunmetal', factor: 1.1, desc: 'High-Resilience PVD Coating' },
    black: { name: 'Matte Black', factor: 1.05, desc: 'Electroplated Double Layer' },
    chrome: { name: 'Chrome', factor: 1.0, desc: 'Mirror Finished Stainless Steel' }
  };

  // Calculate Mock Figures
  const currentBase = calculatorData[calcScale];
  const currentFinish = finishMultipliers[calcFinish];
  const finalRetailVal = Math.round(currentBase.retailVal * currentFinish.factor);
  const discountAmt = Math.round(finalRetailVal * (currentBase.discountPct / 100));
  const finalTradePrice = finalRetailVal - discountAmt;

  const tradeReviews = [
    {
      quote: "Partnering with Vela has streamlined our high-end residential builds. Their Trade Program gives us not just a commercial pricing edge, but absolute trust in their PVD finishes and customer support timeline.",
      author: "Marcus Vance",
      role: "Lead Architect, Vance & Associates",
      location: "Sydney, NSW"
    },
    {
      quote: "The sample swatch boards and complimentary swap kits are invaluable for our moodboarding sessions with clients. Their team responds to pricing requests within hours, keeping our procurement perfectly on track.",
      author: "Sofia Geller",
      role: "Creative Director, Sofia Geller Interiors",
      location: "Melbourne, VIC"
    },
    {
      quote: "We specified Vela fixtures across 14 luxury townhouses in Southport. The priority shipping and staging warehouse holds meant we could schedule plumbers precisely when ready, saving thousands in delays.",
      author: "David Thorne",
      role: "Director, Thorne Construction Group",
      location: "Brisbane, QLD"
    }
  ];

  return (
    <div className="w-full bg-white text-[#222]">
      {/* Editorial Page Hero */}
      <div className="pt-28 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
          <span className="text-gray-400 font-light text-[17px] tracking-[0.2em] uppercase block mb-3">Architectural Partnerships</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#222] mb-4">Vela Trade Program</h1>
          <p className="text-gray-500 font-light text-[17px] max-w-xl leading-relaxed">
            A premium, end-to-end specification service tailored specifically for architects, interior designers, builders, developers, and trade professionals.
          </p>
        </div>
        <div className="flex gap-12 border-l border-gray-100 pl-8 h-fit text-[17px] tracking-wider uppercase font-medium text-gray-400">
          <div>
            <span className="text-black text-2xl font-serif block mb-1">15-30%</span>
            <span>Exclusive Trade Discount</span>
          </div>
          <div>
            <span className="text-black text-2xl font-serif block mb-1">1-on-1</span>
            <span>Account Management</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-8">
        <div className="flex flex-wrap gap-8 md:gap-12 border-b border-gray-200 text-[16px] tracking-[0.15em] uppercase font-medium">
          {(['benefits', 'calculator', 'swatches', 'apply'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={`pb-4 transition-all relative border-b-2 ${
                selectedCategory === tab 
                  ? 'border-black text-black font-semibold' 
                  : 'border-transparent text-gray-400 hover:text-black'
              }`}
            >
              {tab === 'benefits' && 'Program Benefits'}
              {tab === 'calculator' && 'Pricing Calculator'}
              {tab === 'swatches' && 'Swatch Finish Swatches'}
              {tab === 'apply' && 'Apply Now'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Render Area */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        {/* TAB 1: BENEFITS */}
        {selectedCategory === 'benefits' && (
          <div>
            {/* Core Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 mt-4">
              <div className="border border-gray-100 p-8 rounded-[4px] bg-[#fafafa]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 mb-6">
                  <Award size={18} className="text-[#333]" />
                </div>
                <h3 className="font-serif text-[18px] font-normal text-black mb-3">Tiered Trade Discounts</h3>
                <p className="text-[17px] text-gray-500 font-light leading-relaxed">
                  Access preferential, margin-protecting commercial pricing tiers from 15% to 30% off our retail catalogs based on specification volume.
                </p>
              </div>

              <div className="border border-gray-100 p-8 rounded-[4px] bg-[#fafafa]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 mb-6">
                  <Briefcase size={18} className="text-[#333]" />
                </div>
                <h3 className="font-serif text-[18px] font-normal text-black mb-3">Dedicated Support</h3>
                <p className="text-[17px] text-gray-500 font-light leading-relaxed">
                  Work directly with a personal Account Executive who oversees your quotations, tech specifications, and project scheduling constraints.
                </p>
              </div>

              <div className="border border-gray-100 p-8 rounded-[4px] bg-[#fafafa]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 mb-6">
                  <ShieldCheck size={18} className="text-[#333]" />
                </div>
                <h3 className="font-serif text-[18px] font-normal text-black mb-3">Extended Warranties</h3>
                <p className="text-[17px] text-gray-500 font-light leading-relaxed">
                  Full warranty security assured for heavy-duty commercial applications, backed by certified Lifetime guarantees on core home-grade fittings.
                </p>
              </div>

              <div className="border border-gray-100 p-8 rounded-[4px] bg-[#fafafa]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 mb-6">
                  <Clock size={18} className="text-[#333]" />
                </div>
                <h3 className="font-serif text-[18px] font-normal text-black mb-3">Priority Dispatch</h3>
                <p className="text-[17px] text-gray-500 font-light leading-relaxed">
                  Secure stock holding privileges at our main Southport warehouse with timed dispatch intervals to correspond directly with trades.
                </p>
              </div>
            </div>

            {/* Detailed Info Block */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12 py-8 border-t border-b border-gray-100">
              <div className="flex flex-col gap-6">
                <span className="text-gray-400 text-[16px] tracking-[0.15em] uppercase font-semibold">Premium Finishes</span>
                <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight">Advanced PVD Finish Engineering</h2>
                <p className="text-[16px] text-gray-500 font-light leading-relaxed">
                  Unlike conventional spray paints or thin electroplating, Vela utilizes state-of-the-art **Physical Vapour Deposition (PVD)** coating technology. We vaporize metallic alloys inside high-vacuum chambers to bond thin, extremely dense layers directly to our brass fixtures.
                </p>
                <p className="text-[16px] text-gray-500 font-light leading-relaxed">
                  The result is an exceptionally durable finish that is highly resistant to corrosion, scratches, and chemical abrasion — backed by structural longevity guarantees for multi-residential environments.
                </p>
                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={() => setSelectedCategory('swatches')}
                    className="text-[17px] uppercase tracking-wider font-semibold bg-black text-white px-6 py-3 rounded-[4px] hover:opacity-90 transition-opacity"
                  >
                    Request Finish Kit
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('calculator')}
                    className="text-[17px] uppercase tracking-wider font-semibold border border-gray-300 px-6 py-3 rounded-[4px] hover:bg-gray-50 transition-colors"
                  >
                    View Pricing Calculator
                  </button>
                </div>
              </div>
              <div className="bg-[#fafafa] border border-gray-100 rounded-[6px] p-8 lg:p-12">
                <h3 className="font-serif text-xl font-normal mb-6 text-black">Finish Durability Comparison</h3>
                <div className="flex flex-col gap-5 text-[16px]">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-black">Vela PVD Coating (Brass / Copper / Gunmetal)</span>
                      <span className="text-gray-500">10 / 10 Excellent</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-[#d0d3c5] h-full w-full rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-black">Electroplated Finish (Matte Black)</span>
                      <span className="text-gray-500">8 / 10 Very Good</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-gray-700 h-full w-[80%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-black">Standard Powder Coat</span>
                      <span className="text-gray-500">5 / 10 Standard</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-gray-400 h-full w-[50%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Slider */}
            <div className="max-w-4xl mx-auto py-8 text-center relative px-8">
              <h3 className="text-gray-400 text-[16px] tracking-[0.15em] uppercase font-semibold mb-6">Trade Partner Reviews</h3>
              <p className="font-serif text-lg md:text-xl italic text-gray-700 leading-relaxed mb-6">
                "{tradeReviews[activeReview].quote}"
              </p>
              <h4 className="font-sans text-[17px] font-semibold text-black mb-1">
                {tradeReviews[activeReview].author}
              </h4>
              <p className="text-[17px] text-gray-400 font-light mb-8">
                {tradeReviews[activeReview].role} — {tradeReviews[activeReview].location}
              </p>
              
              <div className="flex justify-center gap-2">
                {tradeReviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReview(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${activeReview === idx ? 'bg-black w-6' : 'bg-gray-200'}`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CALCULATOR */}
        {selectedCategory === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
            {/* Controls */}
            <div className="lg:col-span-7 flex flex-col gap-8 border border-gray-150 p-8 rounded-[6px] bg-white">
              <div>
                <h3 className="font-serif text-2xl font-light text-black mb-2 flex items-center gap-3">
                  <Calculator size={22} strokeWidth={1.5} /> Project Pricing Simulator
                </h3>
                <p className="text-[17px] text-gray-500 font-light">
                  Select your estimated design scale and fixture finish to preview standard Trade Program discount margins and estimated cost savings.
                </p>
              </div>

              {/* Scale choice */}
              <div>
                <label className="text-[16px] tracking-[0.15em] font-medium text-gray-400 block mb-3 uppercase">1. Select Project Scale</label>
                <div className="flex flex-col gap-3">
                  {(['residential', 'multi', 'commercial'] as const).map((scale) => (
                    <div 
                      key={scale}
                      onClick={() => setCalcScale(scale)}
                      className={`border p-4 rounded-[4px] cursor-pointer transition-all flex justify-between items-center ${
                        calcScale === scale 
                          ? 'border-black bg-gray-50/50 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <p className="text-base font-semibold text-black">{calculatorData[scale].label}</p>
                        <p className="text-[16px] text-gray-400 font-light mt-1 max-w-md">{calculatorData[scale].description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[17px] uppercase tracking-wide bg-gray-100 text-gray-600 px-2.5 py-1 rounded-[3px] font-medium">
                          {calculatorData[scale].discountPct}% Off
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Finish choice */}
              <div>
                <label className="text-[16px] tracking-[0.15em] font-medium text-gray-400 block mb-3 uppercase">2. Select Fixture Finish</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {(['brass', 'copper', 'gunmetal', 'black', 'chrome'] as const).map((fin) => (
                    <div
                      key={fin}
                      onClick={() => setCalcFinish(fin)}
                      className={`border p-3 rounded-[4px] cursor-pointer text-center transition-all flex flex-col items-center gap-2 ${
                        calcFinish === fin 
                          ? 'border-black bg-gray-50/50 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span 
                        className="w-5 h-5 rounded-full border border-gray-100" 
                        style={{
                          backgroundColor: 
                            fin === 'brass' ? '#D4AF37' : 
                            fin === 'copper' ? '#B87333' : 
                            fin === 'gunmetal' ? '#4A4A4A' : 
                            fin === 'black' ? '#111111' : '#E5E5E5'
                        }}
                      />
                      <span className="text-[17px] font-medium text-black capitalize">{fin}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-5 bg-gray-50 border border-gray-150 rounded-[6px] p-8 flex flex-col justify-between min-h-[420px]">
              <div>
                <h4 className="text-[16px] tracking-[0.15em] uppercase font-semibold text-gray-400 border-b border-gray-200 pb-3 mb-6">
                  Estimated Trade Proposal
                </h4>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between text-base text-gray-500 font-light">
                    <span>Selected Scale:</span>
                    <span className="font-medium text-black">{calculatorData[calcScale].label.split(' (')[0]}</span>
                  </div>
                  <div className="flex justify-between text-base text-gray-500 font-light border-b border-gray-100 pb-3">
                    <span>Fixture Finish:</span>
                    <span className="font-medium text-black">{finishMultipliers[calcFinish].name}</span>
                  </div>

                  <div className="flex justify-between items-baseline mt-4">
                    <span className="text-base text-gray-500 font-light">Est. Retail Value:</span>
                    <span className="text-md text-gray-400 line-through">${finalRetailVal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-baseline py-2 text-green-600 border-b border-gray-100">
                    <span className="text-base font-medium">Trade Discount Savings ({calculatorData[calcScale].discountPct}%):</span>
                    <span className="text-md font-semibold">-${discountAmt.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-baseline mt-4">
                    <span className="text-base font-semibold text-black">Estimated Trade Price:</span>
                    <span className="text-3xl font-serif font-light text-[#222]">${finalTradePrice.toLocaleString()} AUD</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white border border-gray-100 rounded-[4px] text-[17px] text-gray-400 font-light leading-relaxed">
                  <span className="font-semibold text-black block mb-1 uppercase tracking-wider text-[8px]">{finishMultipliers[calcFinish].desc}</span>
                  Includes premium quality finishing processes with robust structural assurance. Actual pricing will be provided via official architectural quote.
                </div>
              </div>

              <button 
                onClick={() => setSelectedCategory('apply')}
                className="mt-8 text-[17px] uppercase tracking-[0.15em] bg-black text-white px-6 py-3.5 rounded-[4px] font-semibold hover:bg-white hover:text-black border border-black transition-colors duration-300 w-full text-center"
              >
                Apply for Trade Account & Lock Pricing
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SWATCHES */}
        {selectedCategory === 'swatches' && (
          <div className="max-w-4xl mx-auto mt-4">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h3 className="font-serif text-3xl font-light text-black mb-3">Custom Swatch Finish Kit</h3>
              <p className="text-[17px] text-gray-500 font-light leading-relaxed">
                We believe in the tactile experience of high-end fixtures. Build your complimentary Trade Swatch Kit with 3-5 of our premium PVD or electroplated finishes below.
              </p>
            </div>

            {isSwatchSubmitted ? (
              <div className="border border-gray-200 rounded-[6px] p-12 text-center bg-white shadow-sm max-w-xl mx-auto">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={24} />
                </div>
                <h4 className="font-serif text-[22px] text-black mb-2">Swatch Kit Ordered!</h4>
                <p className="text-gray-500 font-light text-base leading-relaxed mb-1">
                  We are preparing your custom finish swatches for dispatch.
                </p>
                <p className="text-gray-400 text-base font-light">
                  A tracking number will be emailed to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSwatchOrder} className="flex flex-col gap-10">
                {/* Selector interface */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {swatches.map((swatch) => (
                    <div
                      key={swatch.id}
                      onClick={() => toggleSwatch(swatch.id)}
                      className={`border p-5 rounded-[4px] cursor-pointer transition-all flex flex-col items-center gap-4 text-center ${
                        swatch.active 
                          ? 'border-black bg-gray-50/50 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span 
                        className="w-10 h-10 rounded-full border border-gray-150 shadow-inner flex items-center justify-center text-white" 
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {swatch.active && <Check size={14} className={swatch.id === 'chrome' || swatch.id === 'white' ? 'text-black' : 'text-white'} />}
                      </span>
                      <div>
                        <span className="text-[16px] font-medium text-black block mb-1">{swatch.name}</span>
                        <span className="text-[16px] text-gray-400 font-light block leading-normal">{swatch.description}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submitting form */}
                <div className="border border-gray-150 p-8 rounded-[6px] bg-[#fafafa] max-w-2xl mx-auto w-full flex flex-col gap-6">
                  <h4 className="font-serif text-lg text-black font-normal border-b border-gray-200 pb-3">Delivery Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[17px] tracking-[0.1em] font-medium text-gray-400 block mb-1 uppercase">Full Name *</label>
                      <input 
                        required
                        type="text" 
                        value={swatchForm.fullName}
                        onChange={(e) => setSwatchForm({ ...swatchForm, fullName: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-3.5 py-2 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="text-[17px] tracking-[0.1em] font-medium text-gray-400 block mb-1 uppercase">Email Address *</label>
                      <input 
                        required
                        type="email" 
                        value={swatchForm.email}
                        onChange={(e) => setSwatchForm({ ...swatchForm, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-3.5 py-2 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[17px] tracking-[0.1em] font-medium text-gray-400 block mb-1 uppercase">Company Name *</label>
                      <input 
                        required
                        type="text" 
                        value={swatchForm.company}
                        onChange={(e) => setSwatchForm({ ...swatchForm, company: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-3.5 py-2 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="text-[17px] tracking-[0.1em] font-medium text-gray-400 block mb-1 uppercase">Shipping Address *</label>
                      <input 
                        required
                        type="text" 
                        value={swatchForm.address}
                        onChange={(e) => setSwatchForm({ ...swatchForm, address: e.target.value })}
                        className="w-full border border-gray-200 rounded-[4px] px-3.5 py-2 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="text-[17px] uppercase tracking-[0.15em] bg-black text-white px-6 py-3 rounded-[4px] font-semibold hover:opacity-90 transition-opacity w-full text-center mt-2"
                  >
                    Request Complimentary Swatch Kit
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: APPLY NOW */}
        {selectedCategory === 'apply' && (
          <div className="max-w-3xl mx-auto mt-4 border border-gray-200 rounded-[6px] p-8 md:p-12 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
            <div className="text-center mb-10">
              <h3 className="font-serif text-[28px] text-black font-light mb-2">Trade Partnership Application</h3>
              <p className="text-gray-400 font-light text-[17px] tracking-wider uppercase">"*" indicates required fields</p>
            </div>

            {isFormSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={32} />
                </div>
                <h4 className="font-serif text-[22px] text-black mb-2">Application Received Successfully!</h4>
                <p className="text-gray-500 font-light text-base max-w-md mx-auto leading-relaxed">
                  Thank you for applying. A commercial account manager will verify your credentials (ABN / Website) and contact you within 1 business day to finalize your account setup.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTradeSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Company Name *</label>
                    <input 
                      required
                      type="text" 
                      value={tradeForm.companyName}
                      onChange={(e) => setTradeForm({ ...tradeForm, companyName: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">ABN / NZBN *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. 12 345 678 910"
                      value={tradeForm.abn}
                      onChange={(e) => setTradeForm({ ...tradeForm, abn: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Contact Name *</label>
                    <input 
                      required
                      type="text" 
                      value={tradeForm.fullName}
                      onChange={(e) => setTradeForm({ ...tradeForm, fullName: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Email *</label>
                    <input 
                      required
                      type="email" 
                      value={tradeForm.email}
                      onChange={(e) => setTradeForm({ ...tradeForm, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Phone *</label>
                    <input 
                      required
                      type="tel" 
                      value={tradeForm.phone}
                      onChange={(e) => setTradeForm({ ...tradeForm, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Company Website</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://company.com"
                      value={tradeForm.website}
                      onChange={(e) => setTradeForm({ ...tradeForm, website: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Profession *</label>
                    <select 
                      value={tradeForm.profession}
                      onChange={(e) => setTradeForm({ ...tradeForm, profession: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    >
                      <option>Architect</option>
                      <option>Interior Designer</option>
                      <option>Builder / Contractor</option>
                      <option>Developer</option>
                      <option>Plumber / Mechanical</option>
                      <option>Other Trade</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Est. Annual Fixture Spend *</label>
                    <select 
                      value={tradeForm.estimatedAnnualSpend}
                      onChange={(e) => setTradeForm({ ...tradeForm, estimatedAnnualSpend: e.target.value })}
                      className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                    >
                      <option>$5,000 - $20,000</option>
                      <option>$20,000 - $50,000</option>
                      <option>$50,000 - $150,000</option>
                      <option>$150,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[16px] tracking-[0.1em] font-medium text-gray-400 block mb-2 uppercase">Project Comments / Specific Requirements</label>
                  <textarea 
                    rows={4}
                    value={tradeForm.message}
                    onChange={(e) => setTradeForm({ ...tradeForm, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
                  />
                </div>

                <button 
                  type="submit"
                  className="mt-4 text-[17px] uppercase tracking-[0.15em] border border-black bg-black text-white px-8 py-3.5 rounded-[4px] font-semibold hover:bg-white hover:text-black transition-colors duration-300 w-full flex justify-center items-center gap-2"
                >
                  Submit Application <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = ({ setCurrentPage, setProductFilter, setComingSoonModal }) => {
  const { region, setRegion } = useRegion();
  return (
  <footer className="w-full border-t border-gray-200 pt-8 pb-6 px-6 lg:px-12 bg-white font-sans text-gray-800">
    {/* Top Brand & Contact Info Bar */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6 items-start max-w-[1600px] mx-auto">
      {/* Brand logo */}
      <div onClick={() => setCurrentPage('home')} className="flex flex-col leading-tight cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-[46px] font-[100] text-[#222] tracking-[0.05em] mb-1">VELA</span>
        <span className="text-[8px] font-normal tracking-[0.45em] text-[#555] uppercase">ATELIER</span>
      </div>

      {/* Locations */}
      <div className="flex gap-4 items-start">
        <MapPin size={24} strokeWidth={1} className="text-[#333] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-[17px] tracking-[0.1em] font-medium text-black uppercase">Locations</span>
          <button onClick={() => setCurrentPage('help_centre')} className="text-[17px] font-light text-gray-500 border-b border-gray-300 pb-1 flex items-center gap-1.5 hover:text-black hover:border-black transition-all w-fit mt-1">
            Find a Location <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="flex gap-4 items-start">
        <Clock size={24} strokeWidth={1} className="text-[#333] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 text-[17px]">
          <div className="flex flex-col">
            <span className="font-medium text-black">Mon - Fri</span>
            <span className="font-light text-gray-500 mt-0.5">7:00am - 5:00pm</span>
          </div>
          <div className="flex flex-col mt-2">
            <span className="font-medium text-black">Sat</span>
            <span className="font-light text-gray-500 mt-0.5">8:30am - 3:00pm</span>
          </div>
        </div>
      </div>

      {/* Call Us & Social Media */}
      <div className="flex gap-4 items-start">
        <Phone size={24} strokeWidth={1} className="text-[#333] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 w-full">
          <span className="text-[17px] tracking-[0.1em] font-medium text-black uppercase">Call Us</span>
          <span className="text-[17px] font-light text-gray-500 mt-0.5">03 9000 2140</span>
          
          <div className="flex gap-4 items-center mt-6">
            <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="YouTube">
              <Youtube size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="Facebook">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="Instagram">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="Pinterest">
              <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.63 7.85 6.39 9.34-.1-.79-.19-2.01.04-2.88.21-.79 1.34-5.69 1.34-5.69s-.34-.69-.34-1.71c0-1.6 1-.21 1-1 2.21-.71 3.25-1.57 3.25-3.15 0-2.82-2.45-5.02-5.78-5.02-3.83 0-6.07 2.87-6.07 5.84 0 1.15.44 2.39 1 3.06.11.13.13.25.1.39-.11.45-.35 1.4-.4 1.6-.07.28-.24.34-.55.2-2.04-.95-3.32-3.95-3.32-6.35 0-5.18 3.76-9.94 10.86-9.94 5.7 0 10.13 4.06 10.13 9.49 0 5.67-3.57 10.23-8.53 10.23-1.67 0-3.23-.87-3.77-1.89l-1.03 3.91c-.37 1.42-1.38 3.2-2.06 4.3C10.5 21.75 11.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="Houzz">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 24H4V16h8v8zm0-11H4V5h8v8zm8 11h-8V13h8v11zm0-14h-8V2h8v8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <hr className="border-gray-200 my-6 max-w-[1600px] mx-auto" />

    {/* Links Columns */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 max-w-[1600px] mx-auto text-base">
      {/* Column 1 */}
      <div className="flex flex-col gap-3.5 text-gray-500 items-start">
        <h4 className="text-black font-semibold uppercase tracking-wider text-[17px] mb-2">About Us</h4>
        <button onClick={() => setCurrentPage('our_story')} className="hover:text-black transition-colors font-light text-[17px] text-left">Our Story</button>
        <button onClick={() => setCurrentPage('product_quality')} className="hover:text-black transition-colors font-light text-[17px] text-left">Product Quality</button>
        <button onClick={() => setCurrentPage('help_centre')} className="hover:text-black transition-colors font-light text-[17px] text-left">Showroom Locations</button>
        <button onClick={() => setCurrentPage('testimonials')} className="hover:text-black transition-colors font-light text-[17px] text-left">Testimonials</button>
        <button onClick={() => setCurrentPage('careers')} className="hover:text-black transition-colors font-light text-[17px] text-left">Careers</button>
        <button onClick={() => setCurrentPage('trade')} className="hover:text-black transition-colors font-light text-[17px] text-left">Partner With Us</button>
        <button onClick={() => setCurrentPage('help_centre')} className="hover:text-black transition-colors font-light text-[17px] text-left">Contact Us</button>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-3.5 text-gray-500 items-start">
        <h4 className="text-black font-semibold uppercase tracking-wider text-[17px] mb-2">Help Centre</h4>
        <button onClick={() => setCurrentPage('warranty')} className="hover:text-black transition-colors font-light text-[17px] text-left">Warranty</button>
        <button onClick={() => setCurrentPage('returns')} className="hover:text-black transition-colors font-light text-[17px] text-left">Returns</button>
        <button onClick={() => setCurrentPage('shipping')} className="hover:text-black transition-colors font-light text-[17px] text-left">Shipping</button>
        <button onClick={() => setCurrentPage('care_guides')} className="hover:text-black transition-colors font-light text-[17px] text-left">Buying & Care Guides</button>
        <button onClick={() => setCurrentPage('terms')} className="hover:text-black transition-colors font-light text-[17px] text-left">Terms & Conditions</button>
        <button onClick={() => setCurrentPage('terms')} className="hover:text-black transition-colors font-light text-[17px] text-left">Website Terms of Use</button>
        <button onClick={() => setCurrentPage('terms')} className="hover:text-black transition-colors font-light text-[17px] text-left">Mobile Terms of Service</button>
        <button onClick={() => setCurrentPage('privacy')} className="hover:text-black transition-colors font-light text-[17px] text-left">Privacy Policy</button>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-3.5 text-gray-500 items-start">
        <h4 className="text-black font-semibold uppercase tracking-wider text-[17px] mb-2">Tools</h4>
        <button onClick={() => setCurrentPage('book_consult')} className="hover:text-black transition-colors font-light text-[17px] text-left">Book A Consult</button>
        <button onClick={() => setCurrentPage('bathroom_calculator')} className="hover:text-black transition-colors font-light text-[17px] text-left">Bathroom Renovation Calculator</button>
        <button onClick={() => setCurrentPage('tile_calculator')} className="hover:text-black transition-colors font-light text-[17px] text-left">Tile Calculator</button>
        <button onClick={() => setCurrentPage('moodboard_builder')} className="hover:text-black transition-colors font-light text-[17px] text-left">Moodboard Builder</button>
        <button onClick={() => setCurrentPage('bim_library')} className="hover:text-black transition-colors font-light text-[17px] text-left">BIM Library</button>
        <button onClick={() => setCurrentPage('journal')} className="hover:text-black transition-colors font-light text-[17px] text-left">Journal</button>
        <button onClick={() => setCurrentPage('catalogues')} className="hover:text-black transition-colors font-light text-[17px] text-left">Catalogues</button>
      </div>

      {/* Column 4 */}
      <div className="flex flex-col gap-3.5 text-gray-500 items-start">
        <h4 className="text-black font-semibold uppercase tracking-wider text-[17px] mb-2">Popular Products</h4>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'TAPWARE', title: 'Tapware' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Tapware</button>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'TILES', title: 'Tiles' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Tiles</button>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'HARDWARE', title: 'Cabinet Handles' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Cabinet Handles</button>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'KITCHEN SINKS', title: 'Sinks' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Sinks</button>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'SHOWERS', title: 'Showers' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Showers</button>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'BATHROOM VANITY UNITS', title: 'Vanities' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Vanities</button>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'BATHROOM WASTES', title: 'Toilet Fittings' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Toilet Fittings</button>
        <button onClick={() => { setProductFilter({ type: 'category', value: 'SAMPLES', title: 'Colour Samples' }); setCurrentPage('filtered_catalog'); }} className="hover:text-black transition-colors font-light text-[17px] text-left">Colour Samples</button>
      </div>
    </div>

    {/* Email Signup Card Component */}
    <div className="max-w-[1600px] mx-auto border border-gray-200 rounded-[6px] p-6 bg-white mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-serif text-[24px] text-[#222] font-light mb-2">Enjoy $25 Off Today*</h3>
          <p className="text-gray-500 font-light text-[17px] leading-relaxed">
            Be the first to know of exclusive offers, product releases, the latest interior design inspiration, and more!
          </p>
          <p className="text-gray-400 font-light text-[16px] mt-1.5">
            ^Minimum $100 spend applies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mt-4">
          <div className="md:col-span-5">
            <label className="text-[17px] tracking-[0.15em] font-medium text-gray-400 block mb-2 uppercase">First Name</label>
            <input 
              type="text" 
              className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
            />
          </div>
          <div className="md:col-span-5">
            <label className="text-[17px] tracking-[0.15em] font-medium text-gray-400 block mb-2 uppercase">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-200 rounded-[4px] px-4 py-2.5 text-base font-light focus:outline-none focus:border-black transition-colors bg-white text-black"
            />
          </div>
          <div className="md:col-span-2 pb-1 flex justify-end md:justify-start">
            <button className="text-[17px] tracking-[0.15em] uppercase border-b border-black font-semibold text-black pb-1.5 flex items-center gap-2 hover:opacity-85 transition-opacity">
              Sign Up <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Country selector and Legal/ABN Footer details */}
    <div className="border-t border-gray-200 pt-6 flex flex-col gap-6 text-gray-400 font-light text-[17px] leading-relaxed max-w-[1600px] mx-auto">
      <div className="flex gap-4 uppercase tracking-[0.15em] font-semibold text-[16px] text-gray-400">
        <span onClick={() => setRegion('AUSTRALIA')} className={`${region === 'AUSTRALIA' ? 'text-black' : 'hover:text-black transition-colors'} cursor-pointer`}>Australia</span> | <span onClick={() => setRegion('NEW ZEALAND')} className={`${region === 'NEW ZEALAND' ? 'text-black' : 'hover:text-black transition-colors'} cursor-pointer`}>New Zealand</span> | <span onClick={() => setRegion('UNITED KINGDOM')} className={`${region === 'UNITED KINGDOM' ? 'text-black' : 'hover:text-black transition-colors'} cursor-pointer`}>United Kingdom</span> | <span onClick={() => setRegion('INTERNATIONAL')} className={`${region === 'INTERNATIONAL' ? 'text-black' : 'hover:text-black transition-colors'} cursor-pointer`}>International</span>
      </div>
      
      <p className="max-w-[1400px]">
        Vela Atelier is a portfolio demonstration of a premium interiors storefront. Product names, prices, studios, and policies are fictional. Nothing on this site is for sale. © 2026.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[16px] pt-4 border-t border-gray-100">
        <span>Vela Atelier · Portfolio project · Studios shown are not trading locations</span>
        <a href="#" className="hover:text-black transition-colors underline underline-offset-4 uppercase tracking-wider text-[17px] font-medium">Sitemap</a>
      </div>
    </div>
  </footer>
);
}

const AboutUsPage = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) => {
  const pageTitle = currentPage.replace('about_', '').replace(/-/g, ' ').toUpperCase();
  
  const getContent = () => {
    switch(pageTitle) {
      case 'OUR STORY':
        return (
          <>
            <p>Vela Atelier started in 2019 with a short palette of solid-brass tapware and stainless sinks, made for rooms that should feel calm rather than decorated.</p>
            <p>Architects, builders, and homeowners draw from the same catalogue. Finishes carry across kitchen, bath, laundry, and outdoor so a project can be specified from one book.</p>
          </>
        );
      case 'SHOWROOM LOCATIONS':
        return (
          <>
            <p>The studios are arranged as full rooms, not fixture walls, so brass, stone, and timber can be judged together.</p>
            <p>Southport, Sydney, Melbourne, and Perth are on the map for this demo, with virtual appointments for New Zealand, the United Kingdom, and everywhere else.</p>
          </>
        );
      case 'SUSTAINABILITY':
        return (
          <>
            <p>We are committed to minimizing our environmental footprint and protecting our planet for future generations.</p>
            <p>Through conscious material sourcing, innovative lead-free stainless steel engineering, energy-efficient manufacturing, and sustainable packaging, we strive to make a positive impact.</p>
          </>
        );
      case 'PRODUCT QUALITY':
        return (
          <>
            <p>At Vela, quality is not just a standard, but a promise. Every product undergoes rigorous testing to ensure durability, mechanical reliability, and structural integrity.</p>
            <p>Our fixtures are crafted from solid brass, grade 304 and 316 stainless steel, and utilize advanced processes such as Physical Vapor Deposition (PVD) to ensure a lifetime of flawless performance.</p>
          </>
        );
      case 'CUSTOMER REVIEWS':
        return (
          <>
            <p>We are honored to have helped thousands of clients bring their dream spaces to life. Read their stories and feedback.</p>
            <p className="italic text-gray-600 bg-neutral-50 p-6 rounded border-l-2 border-[#d0d3c5] text-left">
              "The brushed brass finish is absolutely stunning and the build quality feels premium. Customer service was incredibly helpful throughout our build process." — Sarah M., Melbourne
            </p>
          </>
        );
      case 'THE VELA DIFFERENCE':
        return (
          <>
            <p>Vela keeps the range narrow on purpose. Fewer profiles, more finishes, and a planning studio that turns a room into a specification.</p>
            <p>The same metal can run from the kitchen mixer to the basin, the towel rail, and the entry pull.</p>
          </>
        );
      case 'JOURNAL':
        return (
          <>
            <p>The Vela Journal collects room studies, finish pairings, and care notes for the people specifying the next project.</p>
            <p>Use it as a sample editorial section: short stories, not a live magazine.</p>
          </>
        );
      case 'CONTACT US':
        return (
          <>
            <p>Our dedicated customer support and design consultation teams are here to assist you with every stage of your project.</p>
            <p>Get in touch via phone, live chat, email, or visit one of our international showrooms to discuss your specifications, ordering, or delivery.</p>
          </>
        );
      case 'BUYING AND CARE GUIDES':
        return (
          <>
            <p>Ensure your premium fixtures maintain their architectural beauty for a lifetime. Our detailed buying and care guides offer expert technical tips.</p>
            <p>Learn how to select the right components for your plumbing specifications, choose compatible finishes, and properly care for brushed, matte, and PVD surfaces.</p>
          </>
        );
      default:
        return (
          <>
            <p>This is a dynamically routed page for the <strong>{pageTitle}</strong> section.</p>
            <p>Here you would inject the specific content, rich text, images, or interactive elements related to this part of the Vela story.</p>
          </>
        );
    }
  };

  return (
    <div className="py-10 px-6 lg:px-24 flex flex-col items-center text-center min-h-[60vh] justify-center bg-white">
      <span className="text-base text-[#d0d3c5] tracking-widest mb-4 font-semibold uppercase">ABOUT US</span>
      <h1 className="text-4xl lg:text-5xl font-serif text-gray-800 mb-8 font-light tracking-wide">{pageTitle}</h1>
      <div className="max-w-2xl text-gray-500 font-light leading-relaxed space-y-6">
        {getContent()}
      </div>
      <button 
        onClick={() => setCurrentPage('home')} 
        className="mt-12 text-base font-semibold text-gray-800 border-b border-gray-400 pb-1 hover:border-black hover:gap-3 flex items-center gap-2 transition-all uppercase tracking-wider"
      >
        ← Back to Home
      </button>
    </div>
  );
};

const BathroomWastesPage = ({ savedProducts, toggleFavorite, addToCart, addRecentlyViewed, setSelectedProduct, setCurrentPage }: { savedProducts: Product[]; toggleFavorite: (p: Product) => void; addToCart: (p: Product) => void; addRecentlyViewed: (p: Product) => void; setSelectedProduct: (p: Product) => void; setCurrentPage: (p: string) => void }) => {
  const { formatPrice } = useRegion();
  const categories = [
    { name: 'BASIN WASTES' },
    { name: 'BATH WASTES' },
    { name: 'BOTTLE TRAPS' },
    { name: 'CLEAR OUTS' },
    { name: 'COMMERCIAL WASTES' },
    { name: 'SHOWER AND FLOOR WASTES' }
  ];

  const products = MOCK_PRODUCTS.filter(p => p.room === 'Bathroom');

  const filterOptions: Record<string, string[]> = {
    Subcategory: ['Wastes', 'Tapware'],
    Colour: ['Brushed Brass', 'Brushed Nickel', 'Matte Black', 'Chrome'],
    Material: ['DR Brass (Dezincification Resistant)', 'Solid Brass'],
    Overflow: ['With Overflow', 'Without Overflow']
  };

  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    Subcategory: false,
    Colour: false,
    Material: false,
    Overflow: false,
  });

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    Subcategory: [],
    Colour: [],
    Material: [],
    Overflow: [],
  });

  const toggleFilterExpand = (filterName: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleSelectFilter = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const isSelected = current.includes(option);
      const next = isSelected 
        ? current.filter(item => item !== option) 
        : [...current, option];
      return {
        ...prev,
        [category]: next
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      Subcategory: [],
      Colour: [],
      Material: [],
      Overflow: [],
    });
  };

  const filteredProducts = products.filter(product => {
    if (selectedFilters.Subcategory.length > 0) {
      if (!selectedFilters.Subcategory.includes(product.category)) return false;
    }
    if (selectedFilters.Colour.length > 0) {
      if (!selectedFilters.Colour.includes(product.finish || '')) return false;
    }
    if (selectedFilters.Material.length > 0) {
      if (!selectedFilters.Material.includes(product.material || '')) return false;
    }
    if (selectedFilters.Overflow.length > 0) {
      const hasOverflow = product.title.toLowerCase().includes('overflow') || product.id % 2 === 0;
      const requestedOverflow = selectedFilters.Overflow.includes('With Overflow');
      const requestedNoOverflow = selectedFilters.Overflow.includes('Without Overflow');
      if (requestedOverflow && !requestedNoOverflow && !hasOverflow) return false;
      if (requestedNoOverflow && !requestedOverflow && hasOverflow) return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto px-8 py-10">
      <div className="text-[17px] tracking-[0.2em] text-gray-400 uppercase font-light mb-10 flex gap-2">
        <span onClick={() => setCurrentPage('home')} className="hover:text-black cursor-pointer transition-colors">HOME</span> / 
        <span onClick={() => setCurrentPage('home')} className="hover:text-black cursor-pointer transition-colors">SHOP ALL</span> / 
        <span className="text-black font-medium">BATHROOM WASTES</span>
      </div>

      <div className="flex flex-col items-center mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-[3.5rem] font-serif text-[#333] mb-8 font-light tracking-tight">Wastes & Basin Mixers</h1>
        <p className="text-gray-500 font-light leading-relaxed">
          Our wide range of wastes and mixers are functional, durable, and available in various finishes to enable you to match your tapware.
        </p>
      </div>

      <div className="flex items-center justify-between mb-20 relative">
        <button className="text-gray-400 hover:text-black absolute left-0 z-10"><ChevronDown className="rotate-90" size={20} strokeWidth={1} /></button>
        <div className="flex justify-center gap-10 md:gap-16 w-full overflow-hidden px-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 cursor-pointer group min-w-max">
              <div className="h-[50px] w-[60px] border border-gray-300 group-hover:border-black rounded-[4px] transition-colors relative">
                 <div className="absolute inset-2 border border-gray-300 rounded-[2px]" />
                 <div className="absolute inset-[6px] border border-gray-300 rounded-[1px] rotate-12" />
              </div>
              <span className="text-[16px] tracking-[0.15em] font-medium text-gray-500 group-hover:text-black transition-colors max-w-[100px] text-center">{cat.name}</span>
            </div>
          ))}
        </div>
        <button className="text-gray-400 hover:text-black absolute right-0 z-10"><ChevronDown className="-rotate-90" size={20} strokeWidth={1} /></button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filter Column with click dropdown menu */}
        <div className="w-full lg:w-[250px] shrink-0">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[16px] tracking-[0.15em] uppercase text-gray-400 font-bold">Filter</div>
            {(selectedFilters.Subcategory.length > 0 || selectedFilters.Colour.length > 0 || selectedFilters.Material.length > 0 || selectedFilters.Overflow.length > 0) && (
              <button 
                onClick={clearAllFilters}
                className="text-[17px] tracking-wider uppercase font-bold text-amber-800 hover:text-black transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="border border-gray-200 rounded-[4px] bg-white divide-y divide-gray-200 shadow-xs overflow-hidden">
            {['Subcategory', 'Colour', 'Material', 'Overflow'].map((filter) => {
              const isOpen = expandedFilters[filter];
              const activeCount = selectedFilters[filter].length;
              const options = filterOptions[filter] || [];

              return (
                <div key={filter} className="flex flex-col">
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleFilterExpand(filter)}
                    className="w-full py-4 px-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left outline-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base tracking-wider font-semibold text-neutral-800 uppercase">{filter}</span>
                      {activeCount > 0 && (
                        <span className="bg-amber-100 text-amber-800 font-bold text-[17px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                          {activeCount}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-400 text-base font-medium transition-transform duration-300">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Dropdown Options */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden bg-[#fafafa] border-t border-gray-100"
                      >
                        <div className="p-4 space-y-3">
                          {options.map((opt) => {
                            const isChecked = selectedFilters[filter].includes(opt);
                            return (
                              <button
                                key={opt}
                                onClick={() => handleSelectFilter(filter, opt)}
                                className="w-full flex items-center gap-3 text-left py-1 group cursor-pointer"
                              >
                                <div className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${isChecked ? 'bg-neutral-950 border-neutral-950' : 'border-gray-300 group-hover:border-neutral-500'}`}>
                                  {isChecked && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className={`text-base font-light transition-colors ${isChecked ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>
                                  {opt}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[16px] text-gray-500 font-light flex items-center gap-2">
              <span className="font-semibold text-black">{filteredProducts.length}</span> Results showing of <span className="font-semibold text-black">{products.length}</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="text-[16px] text-gray-500 font-light flex items-center gap-2 uppercase tracking-[0.1em]">
              Popular <ChevronDown size={14} />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm">
              <span className="text-base text-gray-400 font-light uppercase tracking-wider">No products match the selected criteria.</span>
              <button onClick={clearAllFilters} className="mt-4 block mx-auto text-base text-amber-800 underline font-medium cursor-pointer">Clear All Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
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
                      className="w-full py-3 bg-white border border-black hover:bg-black hover:text-white text-black text-[13px] tracking-widest uppercase font-medium transition-all text-center"
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

const KitchenSinksPage = ({ savedProducts, toggleFavorite, addToCart, addRecentlyViewed, setSelectedProduct, setCurrentPage }: { savedProducts: Product[]; toggleFavorite: (p: Product) => void; addToCart: (p: Product) => void; addRecentlyViewed: (p: Product) => void; setSelectedProduct: (p: Product) => void; setCurrentPage: (p: string) => void }) => {
  const { formatPrice } = useRegion();
  const categories = [
    { name: 'CERAMIC SINKS' },
    { name: 'COMMERCIAL SINKS' },
    { name: 'DOUBLE SINKS' },
    { name: 'FARMHOUSE SINKS' },
    { name: 'FLUTED SINKS' },
    { name: 'OUTDOOR SINKS' }
  ];

  const products = MOCK_PRODUCTS.filter(p => p.room === 'Kitchen');

  const filterOptions: Record<string, string[]> = {
    Subcategory: ['Sinks', 'Tapware', 'Wastes'],
    Colour: ['Brushed Brass', 'Matte Black', 'Brushed Nickel', 'Chrome'],
    Material: ['304 Stainless Steel (1.2mm Thick)', 'Solid Brass Lead-Free Core', 'Premium Stainless Steel / Brass'],
    Overflow: ['With Overflow', 'Without Overflow']
  };

  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    Subcategory: false,
    Colour: false,
    Material: false,
    Overflow: false,
  });

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    Subcategory: [],
    Colour: [],
    Material: [],
    Overflow: [],
  });

  const toggleFilterExpand = (filterName: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleSelectFilter = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const isSelected = current.includes(option);
      const next = isSelected 
        ? current.filter(item => item !== option) 
        : [...current, option];
      return {
        ...prev,
        [category]: next
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      Subcategory: [],
      Colour: [],
      Material: [],
      Overflow: [],
    });
  };

  const filteredProducts = products.filter(product => {
    if (selectedFilters.Subcategory.length > 0) {
      if (!selectedFilters.Subcategory.includes(product.category)) return false;
    }
    if (selectedFilters.Colour.length > 0) {
      if (!selectedFilters.Colour.includes(product.finish || '')) return false;
    }
    if (selectedFilters.Material.length > 0) {
      if (!selectedFilters.Material.includes(product.material || '')) return false;
    }
    if (selectedFilters.Overflow.length > 0) {
      const hasOverflow = product.title.toLowerCase().includes('overflow') || product.id % 2 === 0;
      const requestedOverflow = selectedFilters.Overflow.includes('With Overflow');
      const requestedNoOverflow = selectedFilters.Overflow.includes('Without Overflow');
      if (requestedOverflow && !requestedNoOverflow && !hasOverflow) return false;
      if (requestedNoOverflow && !requestedOverflow && hasOverflow) return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto px-8 py-10">
      <div className="text-[17px] tracking-[0.2em] text-gray-400 uppercase font-light mb-10 flex gap-2">
        <span onClick={() => setCurrentPage('home')} className="hover:text-black cursor-pointer transition-colors">HOME</span> / 
        <span onClick={() => setCurrentPage('home')} className="hover:text-black cursor-pointer transition-colors">SHOP ALL</span> / 
        <span className="text-black font-medium">KITCHEN SINKS & LAUNDRY SINKS</span>
      </div>

      <div className="flex flex-col items-center mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-[3.5rem] font-serif text-[#333] mb-8 font-light tracking-tight">Kitchen Sinks & Laundry Sinks</h1>
        <p className="text-gray-500 font-light leading-relaxed">
          We have a large selection of kitchen sinks and laundry sinks that are available in a range of different shapes and finishes to transform your space.
        </p>
      </div>

      <div className="flex items-center justify-between mb-20 relative">
        <button className="text-gray-400 hover:text-black absolute left-0 z-10"><ChevronDown className="rotate-90" size={20} strokeWidth={1} /></button>
        <div className="flex justify-center gap-10 md:gap-16 w-full overflow-hidden px-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 cursor-pointer group min-w-max">
              <div className="h-[50px] w-[60px] border border-gray-300 group-hover:border-black rounded-[4px] transition-colors relative">
                 {/* Placeholder for icon graphic */}
                 <div className="absolute inset-2 border border-gray-300 rounded-[2px]" />
                 <div className="absolute inset-[6px] border border-gray-300 rounded-[1px] rotate-12" />
              </div>
              <span className="text-[16px] tracking-[0.15em] font-medium text-gray-500 group-hover:text-black transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
        <button className="text-gray-400 hover:text-black absolute right-0 z-10"><ChevronDown className="-rotate-90" size={20} strokeWidth={1} /></button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filter Column with click dropdown menu */}
        <div className="w-full lg:w-[250px] shrink-0">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[16px] tracking-[0.15em] uppercase text-gray-400 font-bold">Filter</div>
            {(selectedFilters.Subcategory.length > 0 || selectedFilters.Colour.length > 0 || selectedFilters.Material.length > 0 || selectedFilters.Overflow.length > 0) && (
              <button 
                onClick={clearAllFilters}
                className="text-[17px] tracking-wider uppercase font-bold text-amber-800 hover:text-black transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="border border-gray-200 rounded-[4px] bg-white divide-y divide-gray-200 shadow-xs overflow-hidden">
            {['Subcategory', 'Colour', 'Material', 'Overflow'].map((filter) => {
              const isOpen = expandedFilters[filter];
              const activeCount = selectedFilters[filter].length;
              const options = filterOptions[filter] || [];

              return (
                <div key={filter} className="flex flex-col">
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleFilterExpand(filter)}
                    className="w-full py-4 px-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors text-left outline-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base tracking-wider font-semibold text-neutral-800 uppercase">{filter}</span>
                      {activeCount > 0 && (
                        <span className="bg-amber-100 text-amber-800 font-bold text-[17px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                          {activeCount}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-400 text-base font-medium transition-transform duration-300">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Dropdown Options */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden bg-[#fafafa] border-t border-gray-100"
                      >
                        <div className="p-4 space-y-3">
                          {options.map((opt) => {
                            const isChecked = selectedFilters[filter].includes(opt);
                            return (
                              <button
                                key={opt}
                                onClick={() => handleSelectFilter(filter, opt)}
                                className="w-full flex items-center gap-3 text-left py-1 group cursor-pointer"
                              >
                                <div className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${isChecked ? 'bg-neutral-950 border-neutral-950' : 'border-gray-300 group-hover:border-neutral-500'}`}>
                                  {isChecked && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className={`text-base font-light transition-colors ${isChecked ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>
                                  {opt}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[16px] text-gray-500 font-light flex items-center gap-2">
              <span className="font-semibold text-black">{filteredProducts.length}</span> Results showing of <span className="font-semibold text-black">{products.length}</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="text-[16px] text-gray-500 font-light flex items-center gap-2 uppercase tracking-[0.1em]">
              Popular <ChevronDown size={14} />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm">
              <span className="text-base text-gray-400 font-light uppercase tracking-wider">No products match the selected criteria.</span>
              <button onClick={clearAllFilters} className="mt-4 block mx-auto text-base text-amber-800 underline font-medium cursor-pointer">Clear All Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
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
                      className="w-full py-3 bg-white border border-black hover:bg-black hover:text-white text-black text-[13px] tracking-widest uppercase font-medium transition-all text-center"
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [productFilter, setProductFilter] = useState<{ type: string; value: string; title: string } | null>(null);
  const { formatPrice } = useRegion();

  // Shared planning/e-commerce states
  const [savedProducts, setSavedProducts] = useState<Product[]>([
    MOCK_PRODUCTS[0], // Cove Pop-Up Waste Brushed Brass
    MOCK_PRODUCTS[3]  // Arlo Double Kitchen Sink Brushed Brass
  ]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([
    MOCK_PRODUCTS[1], // Cove Pop-Up Waste Brushed Nickel
    MOCK_PRODUCTS[4], // Arlo Single Kitchen Sink Matte Black
    MOCK_PRODUCTS[6]  // Lumen Basin Mixer Matte Black
  ]);
  const [cart, setCart] = useState<Product[]>([]);
  const [projectCart, setProjectCart] = useState<Product[]>([]);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [workspaceTab, setWorkspaceTab] = useState('finishes');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Interactive booking, PDP and segregated cart drawer states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeBookingType, setActiveBookingType] = useState<'Virtual' | 'Showroom' | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | null }>({ message: '', type: null });
  const [comingSoonModal, setComingSoonModal] = useState<{isOpen: boolean, title: string}>({isOpen: false, title: ''});
  const [checkoutSuccessModal, setCheckoutSuccessModal] = useState<{isOpen: boolean, data: any | null}>({isOpen: false, data: null});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, productFilter]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 4000);
  };

  const handleConfirmBooking = (bookingDetails: any) => {
    setBookings(prev => [...prev, bookingDetails]);
    showToast(`Booked ${bookingDetails.type} Design Consultation!`);
    setTimeout(() => {
      setCartOpen(true);
    }, 1200);
  };

  const handleRemoveBooking = (id: number) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    showToast("Consultation appointment cancelled.");
  };

  const handleCheckoutSuccess = () => {
    const retailSubtotal = cart.reduce((acc, item) => acc + item.numericPrice, 0);
    const delivery = retailSubtotal > 200 || retailSubtotal === 0 ? 0 : 15;
    const retailTotal = retailSubtotal * 1.1 + delivery;

    const mockOrderData = {
      orderNumber: "VELA-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
      total: formatPrice(retailTotal),
      items: cart.length
    };

    setCart([]);
    setProjectCart([]);
    setBookings([]);
    setCartOpen(false);
    setCheckoutSuccessModal({ isOpen: true, data: mockOrderData });
  };

  const toggleFavorite = (product: Product) => {
    setSavedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const removeOneFromCart = (id: number) => {
    setCart(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const addToProjectCart = (product: Product) => {
    setProjectCart(prev => [...prev, product]);
  };

  const removeFromProjectCart = (id: number) => {
    setProjectCart(prev => prev.filter(item => item.id !== id));
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const totalCartCount = cart.length + projectCart.length + bookings.length;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <TopBar setCurrentPage={setCurrentPage} />
      <Navbar 
        setCurrentPage={setCurrentPage} 
        savedProductsCount={savedProducts.length} 
        cartCount={totalCartCount} 
        setWorkspaceOpen={setWorkspaceOpen} 
        setWorkspaceTab={setWorkspaceTab} 
        setSelectedProduct={setSelectedProduct}
        setCartOpen={setCartOpen}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        setSearchOpen={setSearchOpen}
      />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <CategoryGrid setCurrentPage={setCurrentPage} />
            <FeatureSection 
              title="One finish, the whole room"
              text="Tapware, sinks, wastes, and hardware share a finish book, so a kitchen and a bathroom can be drawn as one scheme. Residential pieces in this catalogue carry a lifetime warranty."
              buttonText="Discover Product Quality"
              imageLeft={true}
              imageSrc={featureImg}
              onClick={() => setCurrentPage('bathroom_wastes')}
            />
            <FeatureSection 
              title="A trade desk for studios and builders"
              text="Architects, interior designers, and developers can build a project list, request samples, and send a quote from the planning studio."
              buttonText="Explore Trade Program"
              imageLeft={false}
              imageSrc={nessoImg}
              onClick={() => setCurrentPage('trade')}
            />
            <IconRange />
          </>
        )}
        {currentPage === 'trade' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <TradePage />
          </motion.div>
        )}
        {currentPage === 'book_consult' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ConsultationIntro />
            <ConsultationCards onBook={setActiveBookingType} />
            <ConsultationFAQ />
          </motion.div>
        )}
        {currentPage === 'help_centre' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <HelpCentrePage />
          </motion.div>
        )}
        {currentPage === 'kitchen_sinks' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <KitchenSinksPage 
              savedProducts={savedProducts} 
              toggleFavorite={toggleFavorite} 
              addToCart={addToCart} 
              addRecentlyViewed={addRecentlyViewed} 
              setSelectedProduct={setSelectedProduct}
              setCurrentPage={setCurrentPage}
            />
          </motion.div>
        )}
        {currentPage === 'bathroom_wastes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <BathroomWastesPage 
              savedProducts={savedProducts} 
              toggleFavorite={toggleFavorite} 
              addToCart={addToCart} 
              addRecentlyViewed={addRecentlyViewed} 
              setSelectedProduct={setSelectedProduct}
              setCurrentPage={setCurrentPage}
            />
          </motion.div>
        )}
        {currentPage === 'filtered_catalog' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ProductsCatalogPage 
              savedProducts={savedProducts} 
              toggleFavorite={toggleFavorite} 
              addToCart={addToCart} 
              addRecentlyViewed={addRecentlyViewed} 
              setSelectedProduct={setSelectedProduct}
              setCurrentPage={setCurrentPage}
              productFilter={productFilter}
              setProductFilter={setProductFilter}
            />
          </motion.div>
        )}
        {currentPage === 'saved_products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <SavedProductsPage
              savedProducts={savedProducts}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
              setCurrentPage={setCurrentPage}
              setSelectedProduct={setSelectedProduct}
            />
          </motion.div>
        )}

        {['our_story', 'product_quality', 'testimonials', 'careers', 'bathroom_calculator', 'tile_calculator', 'moodboard_builder', 'bim_library', 'journal', 'catalogues', 'warranty', 'returns', 'shipping', 'care_guides', 'terms', 'privacy'].includes(currentPage) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <MockContentPage pageId={currentPage} />
          </motion.div>
        )}

        {currentPage === 'product_detail' && selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ProductDetailPage 
              product={selectedProduct}
              onBack={() => {
                if (productFilter) {
                  setCurrentPage('filtered_catalog');
                } else if (selectedProduct.room === 'Kitchen') {
                  setCurrentPage('kitchen_sinks');
                } else {
                  setCurrentPage('bathroom_wastes');
                }
              }}
              savedProducts={savedProducts}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
              addToProjectCart={addToProjectCart}
              setCartOpen={setCartOpen}
              showToast={showToast}
            />
          </motion.div>
        )}
        {currentPage.startsWith('about_') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <AboutUsPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </motion.div>
        )}
      </main>
      <Footer 
        setCurrentPage={setCurrentPage} 
        setProductFilter={setProductFilter}
        setComingSoonModal={setComingSoonModal}
      />
      
      {/* Floating Customer Support Chat Bot */}
      <CustomerSupportChat />

      {/* Interactive Consultation Booking Modal */}
      <BookingModal 
        isOpen={activeBookingType !== null}
        type={activeBookingType}
        onClose={() => setActiveBookingType(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Segregated Shopping Cart Drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        projectCart={projectCart}
        bookings={bookings}
        onRemoveCartItem={removeFromCart}
        onRemoveOneCartItem={removeOneFromCart}
        onAddCartItem={addToCart}
        onRemoveProjectCartItem={removeFromProjectCart}
        onRemoveBooking={handleRemoveBooking}
        showToast={showToast}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Floating Toast Notice */}
      <AnimatePresence>
        {toast.type && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-32 right-4 md:right-8 z-[100] bg-neutral-900 text-white px-5 py-3.5 rounded-sm shadow-xl flex items-center gap-3 border border-neutral-800 text-base tracking-widest uppercase font-semibold font-mono"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planning Studio Workspace Drawer Overlay */}
      <WorkspaceDrawer
        isOpen={workspaceOpen}
        onClose={() => setWorkspaceOpen(false)}
        activeTab={workspaceTab}
        setActiveTab={(tab) => setWorkspaceTab(tab)}
        savedProducts={savedProducts}
        recentlyViewed={recentlyViewed}
        cart={projectCart}
        toggleFavorite={toggleFavorite}
        addToCart={addToProjectCart}
        removeFromCart={removeFromProjectCart}
        setCart={setProjectCart}
        setCurrentPage={setCurrentPage}
      />
      
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        savedProducts={savedProducts}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
        setCurrentPage={setCurrentPage}
        setSelectedProduct={setSelectedProduct}
      />

      <AnimatePresence>
        {comingSoonModal.isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setComingSoonModal({isOpen: false, title: ''})}
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="relative w-full max-w-md bg-white p-10 border border-gray-100 flex flex-col items-center text-center shadow-2xl"
            >
              <button 
                onClick={() => setComingSoonModal({isOpen: false, title: ''})}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
              >
                <X size={20} strokeWidth={1} />
              </button>
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Info size={24} strokeWidth={1} className="text-black" />
              </div>
              <h3 className="font-serif text-[24px] text-[#222] mb-3">{comingSoonModal.title}</h3>
              <p className="text-gray-500 font-light text-[17px] leading-relaxed mb-8">
                This feature is currently under development. Please check back later for updates as we continue to enhance your experience.
              </p>
              <button 
                onClick={() => setComingSoonModal({isOpen: false, title: ''})}
                className="w-full bg-black text-white text-[17px] tracking-[0.15em] uppercase font-semibold py-3.5 hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {checkoutSuccessModal.isOpen && checkoutSuccessModal.data && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setCheckoutSuccessModal({isOpen: false, data: null})}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white w-full max-w-md p-10 shadow-2xl z-10 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} strokeWidth={1.5} className="text-green-600" />
              </div>
              <h3 className="font-serif text-[28px] text-[#222] mb-2">Order Confirmed</h3>
              <p className="text-gray-500 font-light text-[16px] leading-relaxed mb-6">
                Thank you for your purchase. Your order has been placed successfully and a confirmation email has been sent to you.
              </p>
              
              <div className="w-full bg-gray-50 p-6 mb-8 text-left space-y-3 border border-gray-100">
                <div className="flex justify-between items-center text-[16px]">
                  <span className="text-gray-500">Order Number:</span>
                  <span className="font-mono font-medium text-black">{checkoutSuccessModal.data.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center text-[16px]">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-black">{checkoutSuccessModal.data.date}</span>
                </div>
                <div className="flex justify-between items-center text-[16px]">
                  <span className="text-gray-500">Items:</span>
                  <span className="text-black">{checkoutSuccessModal.data.items}</span>
                </div>
                <div className="flex justify-between items-center text-[16px] pt-3 border-t border-gray-200">
                  <span className="text-gray-800 font-medium">Total Paid:</span>
                  <span className="font-mono font-medium text-black">{checkoutSuccessModal.data.total}</span>
                </div>
              </div>

              <button 
                onClick={() => setCheckoutSuccessModal({isOpen: false, data: null})}
                className="w-full bg-black text-white text-[17px] tracking-[0.15em] uppercase font-semibold py-4 hover:bg-neutral-800 transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
