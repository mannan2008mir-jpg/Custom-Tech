/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sliders, ChevronDown, Check, Sparkles, Send } from 'lucide-react';
import { Product, WebsiteConfig } from '../types';
import { generateWhatsAppLink } from '../lib/configStore';

interface ProductCardProps {
  key?: string;
  product: Product;
  config: WebsiteConfig;
}

export default function ProductCard({ product, config }: ProductCardProps) {
  const [isExpanding, setIsExpanding] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [detailsText, setDetailsText] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');

  const primaryClr = config.colors.primary;

  const handleInputChange = (key: string, val: string) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const executeWhatsAppOrder = () => {
    // Collect customized details
    const filledValues: Record<string, string> = { ...formData };
    
    // Auto-map model/name, and ensure fallback defaults
    if (!filledValues.model) filledValues.model = 'Standard Variant';
    if (!filledValues.name) filledValues.name = 'None Specified';
    if (!filledValues.quantity) filledValues.quantity = '1 Unit';
    if (!filledValues.style) filledValues.style = 'Classic Printed Engrave';
    if (!filledValues.ink) filledValues.ink = 'Black Premium Ink';
    if (!filledValues.position) filledValues.position = 'Front Centered';

    // Add delivery details
    filledValues.details = detailsText || 'Personalized Gift Printing Inscription';
    filledValues.city = deliveryCity || 'Not Specified';

    const redirectUrl = generateWhatsAppLink(config.whatsAppNumber, product.whatsAppTemplate, filledValues);
    window.open(redirectUrl, '_blank');
  };

  return (
    <div 
      className="bg-white rounded-[32px] border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-350 flex flex-col overflow-hidden relative group h-[520px]"
    >
      {/* Product Image Viewer Header */}
      <div className="w-full h-[230px] p-4 shrink-0 relative overflow-hidden">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <motion.img 
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover bg-neutral-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle logo accent overlay in bottom-left */}
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-500 animate-pulse" /> Custom Print
          </div>
        </div>
      </div>

      {/* Product Label details */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            {product.category}
          </span>
          <h3 className="text-xl font-bold font-sans text-neutral-900 tracking-tight leading-tight">
            {product.name}
          </h3>
          <p 
            style={{ color: primaryClr }}
            className="text-xs font-semibold uppercase tracking-wider font-mono"
          >
            {product.tagline}
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed font-normal line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => setIsExpanding(true)}
            className="px-4 py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition flex items-center justify-center gap-1.5 text-xs font-bold"
            title="Configure Print Options"
          >
            <Sliders className="w-3.5 h-3.5 text-neutral-500" />
            <span>Personalize</span>
          </button>

          <button
            onClick={executeWhatsAppOrder}
            style={{ backgroundColor: '#25D366' }}
            className="flex-grow py-3 rounded-2xl text-white hover:brightness-105 transition flex items-center justify-center gap-1.5 text-xs font-bold"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </button>
        </div>

      </div>

      {/* Elegant sliding personalization drawer panel inside card */}
      <AnimatePresence>
        {isExpanding && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-0 bg-neutral-900 text-neutral-100 p-6 flex flex-col justify-between z-10 rounded-[32px]"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3 shrink-0">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-white">Customize Options</h4>
                <p className="text-[9px] text-amber-500 uppercase tracking-widest font-mono">Real-time parameters for printing</p>
              </div>
              <button 
                onClick={() => setIsExpanding(false)}
                className="w-7 h-7 bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 rounded-full text-neutral-300 shadow-lg text-xs"
              >
                ✕
              </button>
            </div>

            {/* Config Fields fields container */}
            <div className="flex-grow overflow-y-auto py-4 space-y-3.5 text-xs pr-1">
              {product.customizationFields.map(field => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full bg-neutral-800 border-0 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 focus:ring-1 focus:ring-[#BFA75E]"
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-neutral-800 border-0 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 focus:ring-1 focus:ring-[#BFA75E]"
                    />
                  )}
                </div>
              ))}

              {/* Extra input for details & city */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                  Delivery City
                </label>
                <input
                  type="text"
                  placeholder="e.g., Karachi, Lahore, Islamabad"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full bg-neutral-800 border-0 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                  Design Notes / Art details
                </label>
                <textarea
                  placeholder="Tell us if you need custom logo placement, custom initials, engraving scale or bulk quantities"
                  rows={2}
                  value={detailsText}
                  onChange={(e) => setDetailsText(e.target.value)}
                  className="w-full bg-neutral-800 border-0 outline-none rounded-xl px-3.5 py-2.5 text-xs text-neutral-200"
                />
              </div>
            </div>

            {/* Launch CTA */}
            <div className="pt-3 border-t border-neutral-800 shrink-0">
              <button
                onClick={executeWhatsAppOrder}
                className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold flex items-center justify-center gap-1.5 text-xs shadow-lg shadow-emerald-950/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire Design on WhatsApp</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
