/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Maximize2, X, MessageCircleCode, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GalleryItem, WebsiteConfig } from '../types';

interface GallerySectionProps {
  config: WebsiteConfig;
}

export default function GallerySection({ config }: GallerySectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Covers' | 'Cases' | 'Pens' | 'Keychains' | 'Corporate'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: ('All' | 'Covers' | 'Cases' | 'Pens' | 'Keychains' | 'Corporate')[] = [
    'All', 'Covers', 'Cases', 'Pens', 'Keychains', 'Corporate'
  ];

  const filteredItems = selectedFilter === 'All'
    ? config.gallery
    : config.gallery.filter(item => item.category === selectedFilter);

  const primaryClr = config.colors.primary;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="w-full bg-neutral-50 py-16 md:py-24 border-b border-neutral-200" id="gallery">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/10 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Executive Showcases
            </span>
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-neutral-900 font-bold mb-4">
              Our Printing Showcases
            </h2>
            <p className="text-sm text-neutral-500">
              Browse through our premium corporate engravings, luxury custom monograms, and physical order deliveries. What you see is precisely the print standard you will receive.
            </p>
          </div>

          {/* Filtering controls */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-200/60 rounded-xl shrink-0">
            {filters.map((fl) => (
              <button
                key={fl}
                onClick={() => {
                  setSelectedFilter(fl);
                  setLightboxIndex(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedFilter === fl
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-150'
                }`}
              >
                {fl}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout text-center">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleOpenLightbox(index)}
                className="group relative h-[320px] rounded-[24px] overflow-hidden border border-neutral-250 bg-white shadow-xs hover:shadow-lg transition-all duration-350 cursor-pointer"
              >
                {/* Photo */}
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Gradient Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-60 group-hover:opacity-85 transition-all duration-350" />

                {/* Labeling details overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between text-white z-10 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="space-y-1">
                    <span 
                      style={{ color: primaryClr }}
                      className="text-[9px] uppercase font-bold tracking-widest block font-mono"
                    >
                      {item.category}
                    </span>
                    <h3 className="text-base font-extrabold tracking-tight font-sans">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-neutral-300 font-normal">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md group-hover:bg-[#BFA75E] text-white flex items-center justify-center transition">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Micro Border Ornament */}
                <div 
                  style={{ borderColor: primaryClr }}
                  className="absolute inset-4 rounded-xl border border-transparent group-hover:border-amber-500/25 transition-all duration-300 pointer-events-none" 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty status */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white border border-neutral-200 rounded-[28px] mt-4">
            <Image className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-neutral-700">No images published under this filter</h3>
            <p className="text-xs text-neutral-500 mt-1">Change configurations inside admin panel to link products.</p>
          </div>
        )}

      </div>

      {/* LIGHTBOX POPUP SYSTEM */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header Toolbar */}
            <div className="flex justify-between items-center text-white z-10 max-w-6xl mx-auto w-full">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">
                  {currentLightboxItem.category} Showcase
                </span>
                <h3 className="text-lg font-black tracking-tight mt-0.5">{currentLightboxItem.title}</h3>
              </div>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 transition rounded-full flex items-center justify-center text-white text-lg"
              >
                ✕
              </button>
            </div>

            {/* Img Centerpiece */}
            <div className="flex-grow flex items-center justify-center relative my-4 max-w-6xl mx-auto w-full">
              {/* Prev */}
              <button
                onClick={handlePrevLightbox}
                className="absolute left-2 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white text-lg z-10 transition hidden md:flex"
              >
                ←
              </button>

              {/* Photo Display */}
              <motion.img
                key={currentLightboxItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl bg-neutral-900 border border-white/5"
                referrerPolicy="no-referrer"
              />

              {/* Next */}
              <button
                onClick={handleNextLightbox}
                className="absolute right-2 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white text-lg z-10 transition hidden md:flex"
              >
                →
              </button>
            </div>

            {/* Footer Details */}
            <div className="z-10 text-center max-w-xl mx-auto pb-4 text-white space-y-4">
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                "{currentLightboxItem.subtitle}" — Live custom-produced layout of materials. Inscribe details like this or order bulk corporate kits.
              </p>

              {/* Action */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${config.whatsAppNumber.replace(/[^\d+]/g, '')}?text=${encodeURIComponent(`Hello! I saw the showcase design "${currentLightboxItem.title}" in your Gallery and would like to order one. Please share mock options!`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs"
                onClick={e => e.stopPropagation()}
              >
                <MessageCircleCode className="w-4 h-4 fill-white" />
                <span>Enquire Design on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
              </motion.a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
