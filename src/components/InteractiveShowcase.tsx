/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCw, Trash2, Sliders, ChevronRight } from 'lucide-react';
import { Product, WebsiteConfig } from '../types';
import { generateWhatsAppLink } from '../lib/configStore';

interface InteractiveShowcaseProps {
  config: WebsiteConfig;
}

type FinishType = 'gold' | 'silver' | 'rose' | 'black';

export default function InteractiveShowcase({ config }: InteractiveShowcaseProps) {
  const [selectedProductType, setSelectedProductType] = useState<'cover' | 'airpods' | 'keychain' | 'pen'>('cover');
  const [customText, setCustomText] = useState('YOUR NAME');
  const [selectedFont, setSelectedFont] = useState<'serif' | 'sans' | 'mono'>('sans');
  const [selectedFinish, setSelectedFinish] = useState<FinishType>('gold');
  const [dragRotation, setDragRotation] = useState({ x: 15, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rX: 0, rY: 0 });
  const showcaseContainerRef = useRef<HTMLDivElement>(null);

  // Reset text/finish when switching products
  const handleProductTypeChange = (type: 'cover' | 'airpods' | 'keychain' | 'pen') => {
    setSelectedProductType(type);
    if (type === 'pen' && customText.length > 15) {
      setCustomText('EXECUTIVE');
    }
  };

  // Drag handlers for 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rX: dragRotation.x,
      rY: dragRotation.y
    };
    if (showcaseContainerRef.current) {
      showcaseContainerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // Scale down interaction movement for visual comfort
    setDragRotation({
      x: Math.min(Math.max(dragStartRef.current.rX - deltaY * 0.5, -45), 45),
      y: dragStartRef.current.rY + deltaX * 0.5
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Helper colors for finishes
  const finishGradients: Record<FinishType, string> = {
    gold: 'linear-gradient(135deg, #FFF1C5 0%, #D4AF37 50%, #8E6A1B 100%)',
    silver: 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 50%, #475569 100%)',
    rose: 'linear-gradient(135deg, #FFE4E6 0%, #FB7185 50%, #9F1239 100%)',
    black: 'linear-gradient(135deg, #4B5563 0%, #1F2937 50%, #111827 100%)',
  };

  const finishTextColors: Record<FinishType, string> = {
    gold: 'text-[#DFBB5C] shadow-[#DFBB5C]/10',
    silver: 'text-[#E2E8F0] shadow-[#E2E8F0]/10',
    rose: 'text-[#F472B6] shadow-[#F472B6]/10',
    black: 'text-[#ECEFF1] shadow-[#ECEFF1]/10',
  };

  const fontClasses = {
    serif: 'font-serif tracking-widest uppercase',
    sans: 'font-sans font-extrabold tracking-widest uppercase',
    mono: 'font-mono tracking-tight font-medium uppercase'
  };

  const getCustomProductWhatsAppUrl = () => {
    // Make specific pre-filled message according to design choices
    let itemDescriptionState = `Personalized Text: "${customText}" in Custom ${selectedFont.toUpperCase()} Font, ${selectedFinish.toUpperCase()} Finish.`;
    
    const matchedProduct = config.products.find(p => {
      if (selectedProductType === 'cover' && p.id.includes('cover')) return true;
      if (selectedProductType === 'airpods' && p.id.includes('airpods')) return true;
      if (selectedProductType === 'keychain' && p.id.includes('keychain')) return true;
      if (selectedProductType === 'pen' && p.id.includes('pen')) return true;
      return false;
    }) || config.products[0];

    const filledValues: Record<string, string> = {
      model: selectedProductType === 'cover' ? 'iPhone 15 Pro Max' : selectedProductType === 'airpods' ? 'AirPods Pro 2' : 'Custom Base',
      name: customText,
      style: `${selectedFinish.toUpperCase()} Embossed Finish`,
      quantity: '1 Unit',
      details: itemDescriptionState,
      city: 'Karachi, PK',
      ink: selectedProductType === 'pen' ? 'Premium Velvet Black Ink' : '',
      position: selectedProductType === 'airpods' ? 'Front Center' : ''
    };

    return generateWhatsAppLink(config.whatsAppNumber, matchedProduct.whatsAppTemplate, filledValues);
  };

  const autoRotate = () => {
    setDragRotation(prev => ({ ...prev, y: prev.y + (isDragging ? 0 : 0.8) }));
  };

  // Implement auto-rotation loop
  useEffect(() => {
    const timer = setInterval(autoRotate, 30);
    return () => clearInterval(timer);
  }, [isDragging]);

  return (
    <div className="w-full bg-linear-to-b from-neutral-50 to-neutral-100 py-16 md:py-24 border-y border-neutral-200" id="3d-studio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/10 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Luxury 3D Customizer Studio
          </span>
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-neutral-900 font-bold mb-4">
            Simulate Your Design In Real-Time
          </h2>
          <p className="text-base sm:text-lg text-neutral-600">
            Rotate, customize, and experiment with fine metals and finishes. Type your initials to preview your bespoke print.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left panel: Product Selection & Live Inputs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
            
            {/* Inner Dashboard Card */}
            <div className="bg-white/75 backdrop-blur-md rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm flex-1 space-y-6">
              
              {/* Step 1: Product Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-3">
                  1. Select Master Canvas
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleProductTypeChange('cover')}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                      selectedProductType === 'cover'
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    Mobile Cover
                  </button>
                  <button
                    onClick={() => handleProductTypeChange('airpods')}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                      selectedProductType === 'airpods'
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    AirPods Case
                  </button>
                  <button
                    onClick={() => handleProductTypeChange('keychain')}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                      selectedProductType === 'keychain'
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    Custom Keychain
                  </button>
                  <button
                    onClick={() => handleProductTypeChange('pen')}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                      selectedProductType === 'pen'
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    Executive Pen
                  </button>
                </div>
              </div>

              {/* Step 2: Custom Text Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    2. Personalized Inscription
                  </label>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {customText.length}/18 Chars
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={18}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-xl font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 uppercase"
                    placeholder="ENTER YOUR TEXT"
                  />
                  {customText && (
                    <button 
                      onClick={() => setCustomText('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Step 3: Font Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                  3. Executive Font Family
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedFont('sans')}
                    className={`py-2 px-1 rounded-lg border text-center transition-all text-xs font-semibold ${
                      selectedFont === 'sans'
                        ? 'border-neutral-900 bg-neutral-900/5 text-neutral-900 font-bold'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="font-sans block text-sm">Aa</span>
                    Grotesk Sans
                  </button>
                  <button
                    onClick={() => setSelectedFont('serif')}
                    className={`py-2 px-1 rounded-lg border text-center transition-all text-xs font-semibold ${
                      selectedFont === 'serif'
                        ? 'border-neutral-900 bg-neutral-900/5 text-neutral-900 font-bold'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="font-serif block text-sm">Bb</span>
                    Classic Serif
                  </button>
                  <button
                    onClick={() => setSelectedFont('mono')}
                    className={`py-2 px-1 rounded-lg border text-center transition-all text-xs font-semibold ${
                      selectedFont === 'mono'
                        ? 'border-neutral-900 bg-neutral-900/5 text-neutral-900 font-bold'
                        : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="font-mono block text-sm">Cc</span>
                    Tech Mono
                  </button>
                </div>
              </div>

              {/* Step 4: Finish/Metallic Color */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-3">
                  4. Monogram Metal Finish
                </label>
                <div className="flex gap-4">
                  {(['gold', 'silver', 'rose', 'black'] as FinishType[]).map((finish) => {
                    const finishLabels = { gold: 'Gold', silver: 'Silver', rose: 'Rose', black: 'Onyx' };
                    return (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`group relative flex flex-col items-center gap-1.5 focus:outline-none`}
                      >
                        <div
                          style={{ background: finishGradients[finish] }}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedFinish === finish ? 'border-neutral-900 scale-110 ring-4 ring-neutral-900/10' : 'border-white group-hover:scale-105'
                          }`}
                        />
                        <span className="text-[10px] font-medium text-neutral-600">
                          {finishLabels[finish]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Launch CTA */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={getCustomProductWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-6 py-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-3xl font-semibold shadow-xl transition-all"
            >
              <div className="text-left">
                <span className="text-[10px] text-white/80 block font-normal uppercase tracking-widest">Submit Designed Proposal</span>
                <span className="text-base font-bold">Inquire Design via WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/10 py-2 px-3.5 rounded-2xl text-xs">
                Request Quote <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.a>

          </div>

          {/* Right panel: Live interactive 3D Canvas rendering */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 rounded-3xl min-h-[400px] bg-linear-to-tr from-neutral-900 to-neutral-800 shadow-inner relative overflow-hidden order-1 lg:order-2 select-none">
            
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-[150px] h-[150px] rounded-full bg-white/5 blur-[50px] pointer-events-none" />
            
            {/* Hints in Corner */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-white/70 font-mono tracking-tight font-medium uppercase border border-white/10">
              <Sliders className="w-3 h-3 text-amber-500 animate-pulse" /> Left-Click & Drag to Orbit Item
            </div>
            
            <button
              onClick={() => setDragRotation({ x: 15, y: -20 })}
              className="absolute bottom-4 right-4 z-10 bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-full text-[10px] text-white/80 font-mono tracking-tight font-semibold flex items-center gap-1 transform transition hover:scale-105"
            >
              <RotateCw className="w-3 h-3 text-amber-500" /> Reset View
            </button>

            {/* 3D Container viewport */}
            <div
              ref={showcaseContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-[320px] md:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing relative overflow-visible z-10"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Custom CSS 3D Scene Wrapper */}
              <div
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${dragRotation.x}deg) rotateY(${dragRotation.y}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                }}
                className="relative flex items-center justify-center"
              >
                
                {/* Visual Backdrop Plinth */}
                <div 
                  className="absolute w-36 h-36 bg-black/40 rounded-full blur-xl filter brightness-50 pointer-events-none"
                  style={{
                    transform: 'translateY(160px) rotateX(90deg)',
                    transformStyle: 'preserve-3d'
                  }}
                />

                <AnimatePresence mode="wait">
                  
                  {/* MOBILE PHONE COVER 3D SCREEN */}
                  {selectedProductType === 'cover' && (
                    <motion.div
                      key="phone"
                      initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
                      animate={{ scale: 1.05, opacity: 1, rotateY: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      className="w-[140px] h-[260px] bg-neutral-900 border border-neutral-700 rounded-[28px] relative shadow-2xl flex flex-col justify-between p-4"
                      style={{
                        transformStyle: 'preserve-3d',
                        background: 'radial-gradient(circle at top right, #383838, #181818)',
                        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), inset 0 0 10px rgba(255,255,255,0.1)'
                      }}
                    >
                      {/* Sides / Depth Simulation */}
                      <div className="absolute right-0 top-[1.5%] w-[8px] h-[97%] bg-[#1a1a1a] border-l border-white/5" style={{ transform: 'rotateY(90deg) translateZ(4px)' }} />
                      <div className="absolute left-0 top-[1.5%] w-[8px] h-[97%] bg-[#1a1a1a] border-r border-white/5" style={{ transform: 'rotateY(-90deg) translateZ(4px)' }} />
                      <div className="absolute left-[3%] top-0 h-[8px] w-[94%] bg-[#1a1a1a] border-b border-white/5" style={{ transform: 'rotateX(90deg) translateZ(4px)' }} />
                      <div className="absolute left-[3%] bottom-0 h-[8px] w-[94%] bg-[#1a1a1a] border-t border-white/5" style={{ transform: 'rotateX(-90deg) translateZ(4px)' }} />

                      {/* iPhone Camera Island Bump */}
                      <div className="w-[54px] h-[54px] bg-[#1a1a1a] rounded-[14px] border border-white/5 flex flex-wrap gap-1 p-1.5 absolute top-5 left-5 shadow-inner">
                        <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-[#DFBB5C]/35 relative shadow-md">
                          <div className="w-[5px] h-[5px] rounded-full bg-blue-500/25 absolute top-0.5 right-0.5" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-white/10 relative shadow-md" />
                        <div className="w-4 h-4 rounded-full bg-neutral-900 border-2 border-white/10 relative shadow-md" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 self-center mx-auto" />
                      </div>

                      {/* Monogram text container */}
                      <div className="w-full flex flex-col items-center justify-end flex-grow pb-10">
                        {/* Decorative Gold Border Line */}
                        <div className="w-10 h-px bg-amber-500/10 mb-4" />
                        <motion.span
                          layoutId="3d-text-layer"
                          style={{
                            background: finishGradients[selectedFinish],
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: `0 4px 15px rgba(0,0,0,0.5)`,
                            letterSpacing: selectedFont === 'serif' ? '0.3em' : selectedFont === 'sans' ? '0.2em' : '0.05em'
                          }}
                          className={`text-center font-bold absolute ${fontClasses[selectedFont]} ${
                            customText.length > 10 ? 'text-xs px-2' : 'text-sm'
                          }`}
                        >
                          {customText || 'CUSTOM'}
                        </motion.span>
                      </div>

                      {/* Beautiful branding subscript */}
                      <div className="w-full text-center pb-1 text-[7px] text-white/30 uppercase tracking-widest font-mono">
                        Designed by Custom Tech
                      </div>
                    </motion.div>
                  )}

                  {/* AIRPODS CASE 3D pebble */}
                  {selectedProductType === 'airpods' && (
                    <motion.div
                      key="airpods"
                      initial={{ scale: 0.8, opacity: 0, rotateX: -90 }}
                      animate={{ scale: 1.1, opacity: 1, rotateX: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      className="w-[150px] h-[115px] bg-[#1a1a1a] rounded-[36px] border border-neutral-700 relative shadow-2xl flex flex-col justify-between py-6 px-4"
                      style={{
                        transformStyle: 'preserve-3d',
                        background: 'radial-gradient(ellipse at center, #2e2e2e, #141414)',
                        boxShadow: '0 40px 80px -15px rgba(0,0,0,0.8), inset 0 0 12px rgba(255,255,255,0.06)'
                      }}
                    >
                      {/* Premium Cover Lid split groove */}
                      <div className="absolute left-[0.2%] top-[34%] w-[99.6%] h-[3px] bg-neutral-900 border-t border-b border-black/50 pointer-events-none" />

                      {/* Power Status LED glow */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-[46%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#FBBF24] animate-pulse pointer-events-none" />

                      {/* Monogram display zone */}
                      <div className="w-full h-full flex items-end justify-center pb-2 z-10">
                        <motion.span
                          layoutId="3d-text-layer"
                          style={{
                            background: finishGradients[selectedFinish],
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                            letterSpacing: selectedFont === 'serif' ? '0.25em' : selectedFont === 'sans' ? '0.15em' : '0.05em'
                          }}
                          className={`font-semibold text-center ${fontClasses[selectedFont]} ${
                            customText.length > 10 ? 'text-[9px]' : 'text-[11px]'
                          }`}
                        >
                          {customText || 'CUSTOM'}
                        </motion.span>
                      </div>

                      {/* Soft edge ambient glossy reflection bar */}
                      <div className="absolute top-[4%] left-[10%] w-[80%] h-[20%] bg-gradient-to-b from-white/10 to-transparent rounded-full blur-[2px] pointer-events-none" />
                    </motion.div>
                  )}

                  {/* PREMIUM TRANSPARENT KEYCHAIN */}
                  {selectedProductType === 'keychain' && (
                    <motion.div
                      key="keychain"
                      initial={{ scale: 0.8, opacity: 0, scaleZ: 0.1 }}
                      animate={{ scale: 1.15, opacity: 1, scaleZ: 1 }}
                      exit={{ scale: 0.8, opacity: 0, scaleZ: 0.1 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      className="w-[110px] h-[190px] rounded-2xl relative shadow-2xl flex flex-col justify-between p-3"
                      style={{
                        transformStyle: 'preserve-3d',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(20px)',
                        border: '1.5px solid rgba(255,255,255,0.25)',
                        boxShadow: '0 40px 80px -15px rgba(0,0,0,0.9), inset 0 0 15px rgba(255,255,255,0.15)'
                      }}
                    >
                      {/* Suspended Ring and eyelet on top */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Ring circle */}
                        <div className="w-12 h-12 rounded-full border-4 border-amber-500/80 bg-transparent shadow-[0_4px_10px_rgba(245,158,11,0.2)]" />
                        {/* Metal link */}
                        <div className="w-2.5 h-6 bg-amber-600/90 rounded-sm border-l border-white/20 -mt-1.5" />
                      </div>

                      {/* Beautiful floating interior metal plate */}
                      <div 
                        className="w-full h-full bg-[#161616] rounded-xl border border-white/5 p-3 flex flex-col justify-between shadow-2xl"
                        style={{
                          transformStyle: 'preserve-3d',
                          background: 'linear-gradient(135deg, #222222, #0d0d0d)',
                        }}
                      >
                        {/* Small decorative logo icon */}
                        <div className="self-center">
                          <div className="w-4 h-4 rounded-full border border-amber-500/30 flex items-center justify-center text-[7px] font-mono text-amber-500 font-bold">
                            C
                          </div>
                        </div>

                        <div className="w-full flex-grow flex items-center justify-center">
                          <motion.span
                            layoutId="3d-text-layer"
                            style={{
                              background: finishGradients[selectedFinish],
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                              letterSpacing: selectedFont === 'serif' ? '0.2em' : selectedFont === 'sans' ? '0.12em' : '0.04em'
                            }}
                            className={`font-semibold text-center ${fontClasses[selectedFont]} ${
                              customText.length > 10 ? 'text-[8px]' : 'text-[10px]'
                            }`}
                          >
                            {customText || 'COACH'}
                          </motion.span>
                        </div>

                        <div className="text-[5px] text-white/20 tracking-wider font-mono uppercase text-center">
                          Bespoke Quartz
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* EXECUTIVE ROLLERBALL LASER-ENGRAVED PEN */}
                  {selectedProductType === 'pen' && (
                    <motion.div
                      key="pen"
                      initial={{ scale: 0.8, opacity: 0, rotateZ: -45 }}
                      animate={{ scale: 1.15, opacity: 1, rotateZ: -10 }}
                      exit={{ scale: 0.8, opacity: 0, rotateZ: 45 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      className="w-[20px] h-[280px] bg-neutral-900 border-l border-white/10 rounded-full relative shadow-2xl flex flex-col justify-between"
                      style={{
                        transformStyle: 'preserve-3d',
                        background: 'linear-gradient(90deg, #1f1f1f, #0f0f0f 50%, #2f2f2f 100%)',
                        boxShadow: '0 30px 60px -10px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.05)'
                      }}
                    >
                      {/* Gold Clip */}
                      <div className="absolute top-[18px] left-[7px] w-1.5 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-sm shadow-md" style={{ transformStyle: 'preserve-3d', transform: 'translateY(1px) translateZ(8px)' }} />
                      
                      {/* Top Cap Separator Ring */}
                      <div className="absolute top-[85px] left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 to-amber-600" />

                      {/* Bottom Gold Nib Separator */}
                      <div className="absolute bottom-[35px] left-0 w-full h-[4px] bg-gradient-to-r from-amber-400 to-amber-600" />
                      
                      {/* Bottom Pointed Nib */}
                      <div 
                        className="absolute bottom-[-1px] left-0 w-full h-[36px] bg-[#1a1a1a] border-t border-amber-600"
                        style={{
                          clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                          background: 'linear-gradient(90deg, #2a2a2a, #1a1a1a 50%, #3a3a3a 100%)'
                        }}
                      />

                      {/* Engraved monogram going vertically along barrel */}
                      <div className="absolute top-[110px] left-[-30px] w-[80px] text-center" style={{ transform: 'rotate(-90deg) translateZ(7px)' }}>
                        <motion.span
                          layoutId="3d-text-layer"
                          style={{
                            background: finishGradients[selectedFinish],
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.15em'
                          }}
                          className={`font-semibold inline-block text-[8px] whitespace-nowrap ${fontClasses[selectedFont]}`}
                        >
                          {customText || 'ELITE'}
                        </motion.span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            </div>

            {/* Simulated reflection layer */}
            <div className="absolute inset-0 bg-radial-gradient(ellipse at bottom, rgba(239, 68, 68, 0.05) 0%, transparent 80%) pointer-events-none" />

          </div>
          
        </div>

      </div>
    </div>
  );
}
