/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Save, RotateCcw, AlertCircle, Plus, Trash2, 
  Settings, Layers, Phone, Palette, Key, Image, MessageSquare, CheckCircle, Smartphone 
} from 'lucide-react';
import { WebsiteConfig, Product, GalleryItem, Testimonial } from '../types';
import { saveWebsiteConfig, resetWebsiteConfig } from '../lib/configStore';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: WebsiteConfig;
  onSave: (newConfig: WebsiteConfig) => void;
}

type TabType = 'contact' | 'colors' | 'products' | 'gallery' | 'testimonials';

export default function AdminPanel({ isOpen, onClose, config, onSave }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('contact');
  const [localConfig, setLocalConfig] = useState<WebsiteConfig>({ ...config });
  const [isSavedNotify, setIsSavedNotify] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    tagline: '',
    description: '',
    category: 'Accessories',
    imageUrl: '',
    customizationFields: [
      { label: 'Device Model', placeholder: 'e.g., iPhone 15 Pro Max', key: 'model', type: 'text' },
      { label: 'Name or Lettering', placeholder: 'e.g., J.D.', key: 'name', type: 'text' },
      { label: 'Order Quantity', placeholder: 'e.g., 10', key: 'quantity', type: 'text' },
    ],
    whatsAppTemplate: 'Hello, I would like to order a Custom Product.\nName: {name}\nQuantity: {quantity}\nDelivery City: {city}\nPlease guide me regarding the order process.'
  });

  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    title: '',
    subtitle: '',
    imageUrl: 'https://picsum.photos/seed/custom/800/600',
    category: 'Covers'
  });

  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    content: '',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  // Simple handler to apply state changes to localConfig
  const updateField = (field: keyof WebsiteConfig, value: any) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
  };

  const updateColorField = (colorProp: 'primary' | 'primaryHover' | 'accent', value: string) => {
    setLocalConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorProp]: value
      }
    }));
  };

  const handleSave = () => {
    saveWebsiteConfig(localConfig);
    onSave(localConfig);
    setIsSavedNotify(true);
    setTimeout(() => {
      setIsSavedNotify(false);
    }, 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restore default brand parameters? This deletes any local customizations.')) {
      resetWebsiteConfig();
      // Reload page to re-trigger default init
      window.location.reload();
    }
  };

  // Product additions
  const addProduct = () => {
    if (!newProduct.name || !newProduct.imageUrl) {
      alert('Product name and high-quality image URL are required.');
      return;
    }
    const finalProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      tagline: newProduct.tagline || 'Bespoke Personalized Elegance',
      description: newProduct.description || 'Premium precision-printed customized product.',
      category: newProduct.category || 'Accessories',
      imageUrl: newProduct.imageUrl,
      customizationFields: newProduct.customizationFields || [],
      whatsAppTemplate: newProduct.whatsAppTemplate || ''
    };
    updateField('products', [...localConfig.products, finalProd]);
    setNewProduct({
      name: '',
      tagline: '',
      description: '',
      category: 'Accessories',
      imageUrl: '',
      customizationFields: [
        { label: 'Name or Lettering', placeholder: 'e.g., J.D.', key: 'name', type: 'text' },
        { label: 'Order Quantity', placeholder: 'e.g., 10', key: 'quantity', type: 'text' },
      ],
      whatsAppTemplate: 'Hello, I would like to order a Custom Product.\nName: {name}\nQuantity: {quantity}\nPlease guide me regarding the order process.'
    });
  };

  const deleteProduct = (id: string) => {
    updateField('products', localConfig.products.filter(p => p.id !== id));
  };

  // Gallery additions
  const addGalleryItem = () => {
    if (!newGalleryItem.title || !newGalleryItem.imageUrl) {
      alert('Gallery item title and image URL are required.');
      return;
    }
    const finalItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newGalleryItem.title,
      subtitle: newGalleryItem.subtitle || 'Custom client display',
      imageUrl: newGalleryItem.imageUrl,
      category: newGalleryItem.category || 'Covers'
    };
    updateField('gallery', [...localConfig.gallery, finalItem]);
    setNewGalleryItem({ title: '', subtitle: '', imageUrl: 'https://picsum.photos/seed/custom/800/600', category: 'Covers' });
  };

  const deleteGalleryItem = (id: string) => {
    updateField('gallery', localConfig.gallery.filter(g => g.id !== id));
  };

  // Testimonials additions
  const addTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.content) {
      alert('Customer name and review content are required.');
      return;
    }
    const finalTest: Testimonial = {
      id: `test-${Date.now()}`,
      name: newTestimonial.name,
      role: newTestimonial.role || 'Verified Buyer',
      content: newTestimonial.content,
      rating: newTestimonial.rating || 5,
      avatarUrl: newTestimonial.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    updateField('testimonials', [...localConfig.testimonials, finalTest]);
    setNewTestimonial({ name: '', role: '', content: '', rating: 5, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' });
  };

  const deleteTestimonial = (id: string) => {
    updateField('testimonials', localConfig.testimonials.filter(t => t.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-xl bg-neutral-900 text-neutral-100 shadow-2xl z-[100] flex flex-col border-l border-neutral-800"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#BFA75E]" />
                <div>
                  <h3 className="text-lg font-bold font-sans">Brand Administration</h3>
                  <p className="text-xs text-neutral-400">Manage products, colors, and order channels</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick action system alerts */}
            {isSavedNotify && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 px-6 py-3 flex items-center gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>Changes saved successfully! The site layout has live-updated.</span>
              </div>
            )}

            {/* Config Tabs Navigator */}
            <div className="flex border-b border-neutral-800 bg-neutral-950 text-xs font-semibold overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-3 flex items-center gap-1.5 transition whitespace-nowrap border-b-2 ${
                  activeTab === 'contact' ? 'border-[#BFA75E] text-white bg-neutral-900' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" /> Identity & Hero
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`px-4 py-3 flex items-center gap-1.5 transition whitespace-nowrap border-b-2 ${
                  activeTab === 'colors' ? 'border-[#BFA75E] text-white bg-neutral-900' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" /> Styling Colors
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-3 flex items-center gap-1.5 transition whitespace-nowrap border-b-2 ${
                  activeTab === 'products' ? 'border-[#BFA75E] text-white bg-neutral-900' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Products Suite
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-3 flex items-center gap-1.5 transition whitespace-nowrap border-b-2 ${
                  activeTab === 'gallery' ? 'border-[#BFA75E] text-white bg-neutral-900' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Image className="w-3.5 h-3.5" /> Gallery Vault
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-4 py-3 flex items-center gap-1.5 transition whitespace-nowrap border-b-2 ${
                  activeTab === 'testimonials' ? 'border-[#BFA75E] text-white bg-neutral-900' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> Customer Reviews
              </button>
            </div>

            {/* Scrollable Drawer Body Content */}
            <div className="flex-grow p-6 overflow-y-auto space-y-6">

              {/* TAB 1: CONTACT & IDENTITY */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">WhatsApp Orders Recipient Number</label>
                    <input
                      type="text"
                      value={localConfig.whatsAppNumber}
                      onChange={(e) => updateField('whatsAppNumber', e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-4.5 py-3 rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#BFA75E]"
                      placeholder="e.g., +923052557236"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">Provide dial code structure (e.g., +92305...). Do not include spaces or brackets.</p>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">Brand Logo Wordmark</label>
                    <input
                      type="text"
                      value={localConfig.logoText}
                      onChange={(e) => updateField('logoText', e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-4.5 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#BFA75E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">Brand Slogan Label</label>
                    <input
                      type="text"
                      value={localConfig.logoSlogan}
                      onChange={(e) => updateField('logoSlogan', e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-4.5 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#BFA75E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">Hero Title Headline</label>
                    <textarea
                      rows={2}
                      value={localConfig.bannerHeadline}
                      onChange={(e) => updateField('bannerHeadline', e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-4.5 py-3 rounded-xl text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">Hero Subtitle Text</label>
                    <textarea
                      rows={3}
                      value={localConfig.bannerSubheadline}
                      onChange={(e) => updateField('bannerSubheadline', e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-4.5 py-3 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: STYLING COLORS */}
              {activeTab === 'colors' && (
                <div className="space-y-5">
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                    <h4 className="text-sm font-semibold text-neutral-200 mb-2">Visual Palette Auto-Adapt</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Adjust your core high-status hexadecimal colors below. The website shadows, decorative micro-borders, and button elements automatically recolor based on these branding variables.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">Branding Primary Accent (Gold)</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={localConfig.colors.primary}
                          onChange={(e) => updateColorField('primary', e.target.value)}
                          className="w-11 h-11 rounded-lg border-0 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={localConfig.colors.primary}
                          onChange={(e) => updateColorField('primary', e.target.value)}
                          className="flex-grow bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-lg text-sm font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">Primary Hover / Shade</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={localConfig.colors.primaryHover}
                          onChange={(e) => updateColorField('primaryHover', e.target.value)}
                          className="w-11 h-11 rounded-lg border-0 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={localConfig.colors.primaryHover}
                          onChange={(e) => updateColorField('primaryHover', e.target.value)}
                          className="flex-grow bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-lg text-sm font-mono uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-bold text-neutral-400 block mb-1.5">Dark Contrast Backdrop Tone</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={localConfig.colors.accent}
                        onChange={(e) => updateColorField('accent', e.target.value)}
                        className="w-11 h-11 rounded-lg border-0 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={localConfig.colors.accent}
                        onChange={(e) => updateColorField('accent', e.target.value)}
                        className="flex-grow bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-lg text-sm font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-[#BFA75E]/5 border border-[#BFA75E]/20 rounded-xl flex items-center gap-3">
                    <Palette className="w-5 h-5 text-[#BFA75E]" />
                    <div>
                      <h5 className="text-xs font-bold text-[#amber-500]">Preselected Luxury Preset Configurations</h5>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => {
                            updateColorField('primary', '#BFA75E');
                            updateColorField('primaryHover', '#A48E4B');
                            updateColorField('accent', '#0D0D0D');
                          }}
                          className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold text-white rounded border border-neutral-700"
                        >
                          Platinum Gold
                        </button>
                        <button
                          onClick={() => {
                            updateColorField('primary', '#E22929');
                            updateColorField('primaryHover', '#B81919');
                            updateColorField('accent', '#050505');
                          }}
                          className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold text-white rounded border border-neutral-700"
                        >
                          Crimson Velocity
                        </button>
                        <button
                          onClick={() => {
                            updateColorField('primary', '#0284C7');
                            updateColorField('primaryHover', '#0369A1');
                            updateColorField('accent', '#0F172A');
                          }}
                          className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold text-white rounded border border-neutral-700"
                        >
                          Cyan Titanium
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  {/* Current product list */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase font-bold text-neutral-400 block">Catalog Content ({localConfig.products.length})</label>
                    <div className="space-y-2">
                      {localConfig.products.map(prod => (
                        <div key={prod.id} className="flex items-center justify-between p-3 bg-neutral-800 rounded-xl border border-neutral-700">
                          <div className="flex items-center gap-3 min-w-0">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.name} 
                              className="w-10 h-10 object-cover rounded-md bg-neutral-900 border border-neutral-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="truncate">
                              <p className="text-sm font-bold text-neutral-100">{prod.name}</p>
                              <p className="text-[10px] text-neutral-400">{prod.category} • {prod.tagline}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="bg-neutral-900 hover:bg-red-950 p-2 text-neutral-400 hover:text-red-400 rounded-lg transition shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Product Subform */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                    <h4 className="text-xs tracking-wider uppercase font-bold text-amber-500 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" /> Enqueue New Custom Merchandise
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Merchandise Name</label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                          placeholder="e.g., Heavy Brass Paperweight"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Luxury Short Tagline</label>
                        <input
                          type="text"
                          value={newProduct.tagline}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, tagline: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                          placeholder="e.g., Heavy-Metal Office Statement Piece"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Image Asset Asset URL</label>
                        <input
                          type="text"
                          value={newProduct.imageUrl}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, imageUrl: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs font-mono text-[10px]"
                          placeholder="e.g., https://picsum.photos/seed/custom/800/600"
                        />
                        <p className="text-[9px] text-neutral-400 mt-0.5">Enter direct photo URL path. You can use standard picsum URLs as sample fallbacks.</p>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Category Type</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                        >
                          <option value="Accessories">Accessories</option>
                          <option value="Merchandise">Merchandise</option>
                          <option value="Executive Gifts">Executive Gifts</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Customization Description</label>
                        <textarea
                          rows={2}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                          placeholder="Detailed customer overview"
                        />
                      </div>

                      <button
                        onClick={addProduct}
                        className="w-full py-2.5 bg-[#BFA75E] hover:bg-[#AB934E] text-neutral-950 rounded-xl font-bold text-xs shadow-md transition"
                      >
                        Insert Product to Live Catalog
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Current Gallery List */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase font-bold text-neutral-400 block">Active Showcase ({localConfig.gallery.length})</label>
                    <div className="grid grid-cols-2 gap-2">
                      {localConfig.gallery.map(item => (
                        <div key={item.id} className="p-2 bg-neutral-800 rounded-xl border border-neutral-700 relative group overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-24 object-cover rounded-md mb-2 bg-neutral-900"
                            referrerPolicy="no-referrer"
                          />
                          <p className="text-[11px] font-bold line-clamp-1">{item.title}</p>
                          <p className="text-[9px] text-neutral-400 line-clamp-1">{item.category}</p>
                          <button
                            onClick={() => deleteGalleryItem(item.id)}
                            className="absolute top-3 right-3 bg-red-600 hover:bg-red-800 text-white p-1.5 rounded-full shadow-lg opacity-90 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Gallery Subform */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <h4 className="text-xs uppercase font-bold text-amber-500">Append Showcase Image</h4>
                    
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Showcase Display Title</label>
                      <input
                        type="text"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                        placeholder="e.g., Corporate Leather Pen Set Gold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Showcase Photo Asset URL</label>
                      <input
                        type="text"
                        value={newGalleryItem.imageUrl}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, imageUrl: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Showcase Category Filter</label>
                      <select
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                      >
                        <option value="Covers">Covers</option>
                        <option value="Cases">Cases</option>
                        <option value="Pens">Pens</option>
                        <option value="Keychains">Keychains</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>

                    <button
                      onClick={addGalleryItem}
                      className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold mt-2 transition"
                    >
                      Publish to Showcase Masonry
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  {/* Testimonial List */}
                  <div className="space-y-3">
                    {localConfig.testimonials.map(item => (
                      <div key={item.id} className="p-3 bg-neutral-800 rounded-xl border border-neutral-700 flex items-start gap-3 justify-between">
                        <div className="min-w-0 flex items-start gap-2.5">
                          <img 
                            src={item.avatarUrl} 
                            alt={item.name} 
                            className="w-8 h-8 rounded-full bg-neutral-900 object-cover mt-0.5 shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="text-xs font-bold text-white leading-tight">{item.name}</p>
                            <p className="text-[9px] text-neutral-400">{item.role}</p>
                            <p className="text-[10px] text-neutral-300 mt-1 line-clamp-2 leading-tight">"{item.content}"</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTestimonial(item.id)}
                          className="bg-neutral-900 hover:bg-red-950 p-1.5 text-neutral-400 hover:text-red-400 rounded transition shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Testimonial Subform */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <h4 className="text-xs uppercase font-bold text-amber-500">Log Customer Recommendation</h4>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Customer Full Name</label>
                        <input
                          type="text"
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                          placeholder="Zayn Ali"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Designation / Role</label>
                        <input
                          type="text"
                          value={newTestimonial.role}
                          onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                          placeholder="Consultant, Horizon Limited"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Recommendation Content</label>
                      <textarea
                        rows={3}
                        value={newTestimonial.content}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-xs"
                        placeholder="Detail recommendation feedback"
                      />
                    </div>

                    <button
                      onClick={addTestimonial}
                      className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition"
                    >
                      Post Review to Carousels
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Panel Footer Controls */}
            <div className="p-6 border-t border-neutral-800 bg-neutral-950 flex gap-3 shrink-0">
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-2xl flex items-center justify-center gap-1.5 transition text-sm font-semibold flex-1"
              >
                <RotateCcw className="w-4 h-4" /> Reset Layout
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-3 bg-[#BFA75E] hover:bg-[#AB934E] text-neutral-950 rounded-2xl flex items-center justify-center gap-1.5 transition text-sm font-extrabold flex-1 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Configuration
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
