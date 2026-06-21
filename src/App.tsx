/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, MessageSquare, ArrowRight, ShieldCheck, 
  Clock, Truck, RotateCcw, Award, CheckCircle2, ChevronRight,
  Gem, Heart, Settings, Palette, Check, Lightbulb, Users, PhoneCall
} from 'lucide-react';
import { getWebsiteConfig, DEFAULT_CONFIG } from './lib/configStore';
import { WebsiteConfig } from './types';

// Components
import Navbar from './components/Navbar';
import InteractiveShowcase from './components/InteractiveShowcase';
import ProductCard from './components/ProductCard';
import HowItWorks from './components/HowItWorks';
import GallerySection from './components/GallerySection';
import FAQSection from './components/FAQSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [config, setConfig] = useState<WebsiteConfig>(DEFAULT_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // Initialize from storage on mounting
  useEffect(() => {
    const activeConfig = getWebsiteConfig();
    setConfig(activeConfig);
    
    // Simulate premium loader
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveConfig = (newCfg: WebsiteConfig) => {
    setConfig(newCfg);
  };

  const primaryClr = config.colors.primary;
  const hoverClr = config.colors.primaryHover;

  // Icons array for "Why Choose Us" cards
  const benefits = [
    {
      title: 'Premium Print Quality',
      desc: 'High-status direct fiber laser metallic markings and rich physical debossing.',
      icon: Award
    },
    {
      title: 'Personalized Designs',
      desc: 'Complete tactile adjustment of characters, fonts, and gold logo embossing coordinates.',
      icon: Sparkles
    },
    {
      title: 'Fast Turnaround',
      desc: 'Rapid production within 48 hours of initial digital 3D proof mockup approval.',
      icon: Clock
    },
    {
      title: 'Corporate & Bulk Orders',
      desc: 'Custom corporate hamper sets and meeting suites tailored with trade show pricing tiers.',
      icon: Users
    },
    {
      title: 'Creative Customization',
      desc: 'Print Names, corporate vectors, QR codes, event monograms or personal wedding motifs.',
      icon: Lightbulb
    },
    {
      title: 'Trusted Customer Service',
      desc: 'No automated robots—one-on-one custom coordination directly with professional designers on WhatsApp.',
      icon: ShieldCheck
    }
  ];

  if (!isIntroComplete) {
    return (
      <div className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center z-50 select-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {/* Logo emblem loader */}
          <div className="relative w-16 h-16 rounded-full border-2 border-[#BFA75E] flex items-center justify-center bg-transparent animate-spin-slow mb-2">
            <span className="text-white font-serif font-bold text-xl">C</span>
            <span className="text-[#BFA75E] font-serif font-bold text-xl">T</span>
          </div>
          
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">CUSTOM TECH</h2>
          <p className="text-[9px] text-neutral-500 uppercase tracking-widest animate-pulse font-mono">Personalized Gifts • Establishing Fine Standards</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col antialiased selection:bg-[#D4AF37] selection:text-neutral-900 scroll-smooth">
      
      {/* Dynamic styles injected based on brand color selection */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Glass navigation header */}
      <Navbar config={config} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 1. HERO CONSOLE */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 border-b border-neutral-200 overflow-hidden bg-[#FDFCFB]">
        {/* Background 3D Elements */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#D4AF37] opacity-10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#C5A059] opacity-15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute right-[20%] top-[30%] w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lead Content Col */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-black bg-neutral-950 text-white shadow-xs">
                <Gem className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" /> Personalized Excellence
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7.5xl font-light font-serif tracking-tight text-neutral-950 leading-[0.92] text-balance">
                {config.bannerHeadline === 'Your Design. Your Identity.' ? (
                  <>
                    Your <span className="font-extrabold italic font-sans">Design.</span><br />
                    Your <span style={{ color: primaryClr }} className="font-black italic font-sans">Identity.</span>
                  </>
                ) : (
                  config.bannerHeadline
                )}
              </h1>

              <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                {config.bannerSubheadline}
              </p>

              {/* Action Anchors */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start pt-3">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#products-showcase"
                  style={{ backgroundColor: primaryClr }}
                  className="w-full sm:w-auto px-8 py-4 text-neutral-950 font-extrabold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-xl shadow-[#D4AF37]/10"
                >
                  Explore Catalog
                  <ChevronRight className="w-4 h-4 text-neutral-950" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="#3d-studio"
                  className="w-full sm:w-auto px-8 py-4 bg-neutral-950 hover:bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-black/10"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                  Try 3D Simulator
                </motion.a>
              </div>

              {/* Inquiries Footnote info */}
              <div className="flex items-center gap-2 justify-center lg:justify-start pt-2 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                <span>WhatsApp Active for Mockups • Secure Bank Transfers • Flat Delivery PK</span>
              </div>

              {/* Theme signature border-grid indicators */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-7">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-8 bg-[#D4AF37] shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest font-bold leading-tight text-neutral-700">Premium<br/>Print Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-8 bg-[#D4AF37] shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest font-bold leading-tight text-neutral-700">Bulk & Corporate<br/>Specialists</span>
                </div>
              </div>
            </div>

            {/* Float 3D Mockups Col - Artistic Stage layout */}
            <div className="lg:col-span-6 flex items-center justify-center relative">
              <div className="absolute w-[440px] h-[440px] rounded-full bg-[#D4AF37]/5 blur-[90px] pointer-events-none animate-pulse" />
              
              <div className="relative w-full max-w-[450px] aspect-square rounded-[40px] border border-neutral-200 bg-white/40 backdrop-blur-xl p-6.5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                
                {/* Embedded elegant illustration or images grid rotating slightly */}
                <div className="grid grid-cols-2 gap-4.5 w-full h-full relative z-10 p-1">
                  {config.products.slice(0, 4).map((prod, idx) => (
                    <motion.a
                      key={prod.id}
                      href="#products-showcase"
                      whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                      className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/90 overflow-hidden relative shadow-xs flex flex-col justify-between p-3.5 group transform transition-colors"
                    >
                      <img 
                        src={prod.imageUrl} 
                        alt={prod.name} 
                        className="w-full h-26 object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                      <div className="pt-2.5">
                        <span className="text-[10px] uppercase font-black tracking-tight text-neutral-900 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                          {prod.name}
                        </span>
                        <span className="text-[7.5px] text-neutral-400 font-mono tracking-widest block font-bold mt-0.5">CLICK FOR DETAILS</span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Overlaid luxury seal */}
                <div className="absolute bottom-6 right-6 bg-neutral-900 text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-[9px] font-mono font-black tracking-widest flex items-center gap-1.5 z-20 shadow-lg">
                  <span className="text-[#D4AF37] animate-pulse">●</span> LUXURY STANDARD
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Luxe Featured Gallery Strip from "Artistic Flair" */}
      <div className="h-24 bg-neutral-950 text-white flex items-center px-6 md:px-12 space-x-8 md:space-x-12 overflow-hidden border-b border-neutral-900">
        <span className="text-[10px] font-mono font-black tracking-[0.4em] uppercase opacity-45 shrink-0">Featured Projects</span>
        <div className="flex-1 flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-none py-1 align-middle">
          <div className="h-12 px-6 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[9px] font-mono tracking-widest font-bold text-neutral-300">CORP GIFTING</div>
          <div className="h-12 px-6 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[9px] font-mono tracking-widest font-bold text-neutral-300">LUXURY PENS</div>
          <div className="h-12 px-6 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[9px] font-mono tracking-widest font-bold text-neutral-300">3D KEYCHAINS</div>
          <div className="h-12 px-6 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[9px] font-mono tracking-widest font-bold text-neutral-300">MERCHANDISE</div>
          <div className="h-12 px-6 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[9px] font-mono tracking-widest font-bold text-neutral-300">BRANDING</div>
        </div>
        <div className="flex items-center space-x-3 shrink-0 hidden lg:flex">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">Verified Reviews</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
          </div>
        </div>
      </div>

      {/* 2. WHY CHOOSE US */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span 
              style={{ color: primaryClr, backgroundColor: `${primaryClr}12` }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-amber-500/10"
            >
              <Award className="w-3.5 h-3.5" /> High-End Features
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-neutral-950 mb-4">
              Why Choose Custom Tech?
            </h2>
            <p className="text-sm text-neutral-500">
              We operate as a personalized custom house, ensuring every laser fiber pass and embossing mold is calibrated to perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.title}
                  className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-7.5 hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="w-11 h-11 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-5 shadow-xs">
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-950 tracking-tight font-sans mb-2.5 group-hover:text-amber-600 transition">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE Showcases Simulators */}
      <InteractiveShowcase config={config} />

      {/* 4. PRODUCT CATALOG SHOWCASE */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-200" id="products-showcase">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span 
              style={{ color: primaryClr, backgroundColor: `${primaryClr}12` }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-amber-500/10"
            >
              <Sparkles className="w-3.5 h-3.5" /> Luxury Catalog
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-neutral-950 mb-4">
              Premium Printed Offerings
            </h2>
            <p className="text-sm text-neutral-500">
              Select or custom configure your physical dimensions. Click a cards "Order" panel to submit customized initials. Price tags are hidden to reflect boutique tailored coordination.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.products.map((prod) => (
              <ProductCard key={prod.id} product={prod} config={config} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. PROCESS STEP-BY-STEP */}
      <HowItWorks config={config} />

      {/* 6. MASONRY PHOTO GALLERY PIECES */}
      <GallerySection config={config} />

      {/* 7. REVIEWS */}
      <Testimonials config={config} />

      {/* 8. FAQS */}
      <FAQSection config={config} />

      {/* 9. FINAL CALL-TO-ACTION CTA */}
      <section className="relative w-full py-16 md:py-24 border-b border-neutral-200 bg-neutral-950 text-white overflow-hidden text-center">
        
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span 
            style={{ color: primaryClr }}
            className="text-xs font-mono font-bold tracking-widest block uppercase"
          >
            Create Your Identity
          </span>

          <h2 className="text-3.5xl sm:text-5xl font-sans font-black tracking-tight leading-tight">
            Ready to Create Something Unique?
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Submit your monograms, company logotypes, or private designs. Discuss material placement and approve your complimentary 3D mockup.
          </p>

          <div className="pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${config.whatsAppNumber.replace(/[^\d+]/g, '')}?text=${encodeURIComponent('Hello! I would like to order a tailored custom print from your website. Please connect me with a designer!')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8.5 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-black shadow-lg shadow-emerald-950/20 text-sm"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Inquire & Order on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.a>
          </div>

          <div className="text-[10px] text-neutral-500 uppercase tracking-widest pt-4 font-mono font-semibold">
            Minimum Order: 1 Unit • Flat Nationwide Insured Logistics
          </div>
        </div>

      </section>

      {/* Footer Details info with hidden system opening keys */}
      <Footer config={config} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Live Administrative Drawer Modal */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        config={config} 
        onSave={handleSaveConfig} 
      />

    </div>
  );
}
