/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WebsiteConfig, Product, GalleryItem, Testimonial, FAQItem } from '../types';

// Let's specify the exact paths to the beautiful generated images
const AIRPODS_IMG = '/src/assets/images/custom_airpods_1782044764193.jpg';
const PEN_IMG = '/src/assets/images/custom_pen_1782044787778.jpg';
const COVER_IMG = '/src/assets/images/custom_cover_1782044811444.jpg';
const KEYCHAIN_IMG = '/src/assets/images/custom_keychain_1782044832396.jpg';
const GIFT_IMG = '/src/assets/images/custom_gift_box_1782044858697.jpg';

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-cover',
    name: 'Custom Mobile Cover',
    tagline: 'Precision-Engineered Luxury Protection',
    description: 'Transform your smartphone with our executive leather and hybrid matte covers. Personalized with custom debossing, premium brass monograms, or full-color branding with scratch-resistant layers.',
    category: 'Accessories',
    imageUrl: COVER_IMG,
    customizationFields: [
      { label: 'Device Model', placeholder: 'e.g., iPhone 15 Pro Max, Samsung S24 Ultra', key: 'model', type: 'text' },
      { label: 'Personalization Name/Monogram', placeholder: 'e.g., J.D. or CUSTOM TECH', key: 'name', type: 'text' },
      { label: 'Print Style', placeholder: 'Select Style', key: 'style', type: 'select', options: ['Premium Gold Deboss', 'Classic Silver Monogram', 'Full-Wrap Matte Graphic', 'Minimalist Back Engrave'] },
      { label: 'Order Quantity', placeholder: 'e.g., 1, 5, 20', key: 'quantity', type: 'text' },
    ],
    whatsAppTemplate: `Hello, I would like to order a Custom Mobile Cover.
Model: {model}
Name/Monogram: {name}
Print Style: {style}
Quantity: {quantity}
Design Details: {details}
Delivery City: {city}
Please guide me regarding the order process.`
  },
  {
    id: 'prod-airpods',
    name: 'Custom AirPods Case',
    tagline: 'Tailored Leather & Matte Shell Armors',
    description: 'Crafted from premium full-grain leather and precision TPU. Perfectly engineered to protect your case while displaying an ultra-vibrant, high-fidelity custom print or rich logo embossing.',
    category: 'Accessories',
    imageUrl: AIRPODS_IMG,
    customizationFields: [
      { label: 'AirPods Version', placeholder: 'e.g., AirPods Pro 2, AirPods 3, AirPods Max', key: 'model', type: 'text' },
      { label: 'Custom text or Initials', placeholder: 'e.g., ALEXANDER', key: 'name', type: 'text' },
      { label: 'Text Placement', placeholder: 'Select Option', key: 'position', type: 'select', options: ['Front Center', 'Front Bottom', 'Back Minimalist', 'Engraved Side'] },
      { label: 'Order Quantity', placeholder: 'e.g., 1, 2, 10', key: 'quantity', type: 'text' },
    ],
    whatsAppTemplate: `Hello, I would like to order a Custom AirPods Case.
Model: {model}
Direct Text: {name}
Text Placement: {position}
Quantity: {quantity}
Design Details: {details}
Delivery City: {city}
Please guide me regarding the order process.`
  },
  {
    id: 'prod-keychain',
    name: 'Custom Premium Keychain',
    tagline: 'Polished Quartz Crystal Acrylics',
    description: 'A touch of luxury in your pocket. High-density clear acrylic combined with robust solid brass rings. Your logo, coat of arms, or custom text sealed beneath a liquid gloss crystal cover.',
    category: 'Accessories',
    imageUrl: KEYCHAIN_IMG,
    customizationFields: [
      { label: 'Keychain Style', placeholder: 'Select keychain layout', key: 'style', type: 'select', options: ['Rectangular Acrylic Gloss', 'Leather Fob Insert', 'Brass Engraved Plate', 'Personalized Silhouette'] },
      { label: 'Name or Lettering', placeholder: 'e.g., FOCUS-1', key: 'name', type: 'text' },
      { label: 'Order Quantity', placeholder: 'e.g., 5, 50, 500', key: 'quantity', type: 'text' },
    ],
    whatsAppTemplate: `Hello, I would like to order a Custom Keychain.
Keychain Style: {style}
Name/Logo Text: {name}
Quantity: {quantity}
Design Details: {details}
Delivery City: {city}
Please guide me regarding the order process.`
  },
  {
    id: 'prod-pen',
    name: 'Custom Executive Pen',
    tagline: 'Sleek Matte Rollerballs with Brass Trims',
    description: 'Elevate your signature. Premium matte charcoal business rollerballs and fountain pens, customized with ultra-fine gold lasers. Ideal as high-status personal desk items or luxury executive gifts.',
    category: 'Merchandise',
    imageUrl: PEN_IMG,
    customizationFields: [
      { label: 'Laser-Engraved Text', placeholder: 'e.g., Custom Tech or Director Name', key: 'name', type: 'text' },
      { label: 'Ink Type Choice', placeholder: 'Select Ink', key: 'ink', type: 'select', options: ['Premium Velvet Black Ink', 'Deep Royal Blue Ink', 'Calligraphy Fountain Pen Blue'] },
      { label: 'Order Quantity', placeholder: 'e.g., 1, 10, 100', key: 'quantity', type: 'text' },
    ],
    whatsAppTemplate: `Hello, I would like to order Custom Printed Pens.
Quantity: {quantity}
Logo/Text: {name}
Ink Type Choice: {ink}
Delivery City: {city}
Please guide me regarding the order process.`
  },
  {
    id: 'prod-corporate',
    name: 'Custom Corporate Gifts',
    tagline: 'Bespoke Corporate Identity Suites',
    description: 'Premium matching presentation kits. Includes personalized smart temperature cups, elegant executive binders, elite brass metal business card holders, and high-quality canvas totes styled for premium trade shows.',
    category: 'Merchandise',
    imageUrl: GIFT_IMG,
    customizationFields: [
      { label: 'Package Type', placeholder: 'Select Package', key: 'style', type: 'select', options: ['Elite Executive Hamper', 'Presidential Business Box', 'Trade Show Merchandise Base', 'Custom Corporate Bottle Combo'] },
      { label: 'Brand Name / Logo', placeholder: 'e.g., GOOGLE CLOUD INFRA', key: 'name', type: 'text' },
      { label: 'Order Quantity', placeholder: 'Minimum order 10 sets', key: 'quantity', type: 'text' },
    ],
    whatsAppTemplate: `Hello, I would like to order Custom Corporate Gifts.
Package Type: {style}
Brand Logo Text: {name}
Quantity: {quantity}
Design Details: {details}
Delivery City: {city}
Please guide me regarding the order process.`
  }
];

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: 'gal-1', title: 'Luxury Leather Covers', subtitle: 'Gold Deboss Monograms', imageUrl: COVER_IMG, category: 'Covers' },
  { id: 'gal-2', title: 'Solid Matte Quartz Cases', subtitle: 'Bespoke Custom Tech Branding', imageUrl: AIRPODS_IMG, category: 'Cases' },
  { id: 'gal-3', title: 'Sleek Executive Sets', subtitle: 'Precision Laser Engraving', imageUrl: PEN_IMG, category: 'Pens' },
  { id: 'gal-4', title: 'Crystal Acrylic Tokens', subtitle: 'Double-Sided Transparent High-Gloss', imageUrl: KEYCHAIN_IMG, category: 'Keychains' },
  { id: 'gal-5', title: 'Presidential Hampers', subtitle: 'Elite Corporate Merchandise Assemblies', imageUrl: GIFT_IMG, category: 'Corporate' },
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Zayn Ali',
    role: 'Managing Director, Horizon Tech',
    content: 'We ordered 500 personalized pens and matching executive journals for our corporate summit. The finish is stunning—the gold laser lettering has an outstanding, high-status gloss. Every client complimented them.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-2',
    name: 'Sarah Khan',
    role: 'Creative Director',
    content: 'The custom mobile case exceeded my expectations. Elegant gold debossing, rich black texture. The client support on WhatsApp was lightning fast—they shared a 3D digital mockup within an hour for my approval!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-3',
    name: 'Hamza Farooq',
    role: 'Luxury Retail Curator',
    content: 'Absolutely spectacular. Transparent acrylic keychains feel heavy, premium, and look incredibly expensive. The ordering model on WhatsApp works seamlessly. No complex checkout portals—just top-tier service!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Can I use my own custom logo, design or artwork?',
    answer: 'Absolutely! You can provide any custom vector logo (AI, EPS, SVG), transparent PNG, or high-definition photo. Once you click "Order on WhatsApp", our lead design officer will review your design files directly on WhatsApp and make sure they look flawless.'
  },
  {
    id: 'faq-2',
    question: 'Can I order in bulk for corporate gifting or events?',
    answer: 'Yes! We specialize in premium corporate branding, corporate gift sets, summits, and bulk custom merchandise. We offer bespoke bulk pricing tiers directly on WhatsApp based on the scale of your order.'
  },
  {
    id: 'faq-3',
    question: 'Do you provide mockups before printing starts?',
    answer: 'Yes, 100%. We never print a product without your explicit visual approval. After discussing your layout options on WhatsApp, we create high-definition digital 3D product mockups so you see exactly how your branding will look before we initiate custom production.'
  },
  {
    id: 'faq-4',
    question: 'What design file formats do you accept?',
    answer: 'We accept most common design files, including PDF, PNG, JPG, AI, EPS, PSD, and SVG. For best laser-engraving and debossing results, logo vector files are preferred.'
  },
  {
    id: 'faq-5',
    question: 'How do I place an order and pay?',
    answer: 'Our ordering process is designed to be highly luxury-focused and completely personalized. Choose a product and fill out the brief customization parameters on our website, then click "Order on WhatsApp". Your design specifications are automatically packaged. You pay directly via our secure mobile bank transfers, JazzCash, EasyPaisa, or Direct Bank Invoice once the visual mockup is approved.'
  }
];

const STORAGE_KEY = 'CUSTOM_TECH_CONFIG_V1';

export const DEFAULT_CONFIG: WebsiteConfig = {
  whatsAppNumber: '+923052557236',
  logoText: 'CUSTOM TECH',
  logoSlogan: 'Personalized Gifts',
  colors: {
    primary: '#D4AF37', // Luxe Gold
    primaryHover: '#B89326',
    accent: '#1A1A1A', // Midnight Onyx Black
    backgroundTone: 'light'
  },
  bannerHeadline: 'Your Design. Your Identity.',
  bannerSubheadline: 'Transform ordinary products into personalized masterpieces with premium custom printing.',
  products: DEFAULT_PRODUCTS,
  gallery: DEFAULT_GALLERY,
  testimonials: DEFAULT_TESTIMONIALS,
  faqs: DEFAULT_FAQS,
};

export function getWebsiteConfig(): WebsiteConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate structure briefly
      if (parsed.whatsAppNumber && parsed.products) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load design config from localStorage', e);
  }
  return DEFAULT_CONFIG;
}

export function saveWebsiteConfig(config: WebsiteConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save design config to localStorage', e);
  }
}

export function resetWebsiteConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset design config', e);
  }
}

export function generateWhatsAppLink(number: string, template: string, values: Record<string, string>): string {
  // Clean phone number: remove non-numeric chars except possible +
  const cleanNumber = number.replace(/[^\d+]/g, '');
  
  // Replace tokens with filled values, or blank lines if missing
  let message = template;
  Object.keys(values).forEach((key) => {
    message = message.replace(new RegExp(`{${key}}`, 'g'), values[key] || '');
  });
  
  // Make sure to clean any remaining tokens like {details} or {city} if the user didn't fill them
  message = message.replace(/{[a-zA-Z0-9_-]+}/g, '');

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
