/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ShieldCheck, CalendarRange, Phone, Sparkles, MessageCircleCode, ArrowUpRight } from 'lucide-react';
import { WebsiteConfig } from '../types';

interface NavbarProps {
  config: WebsiteConfig;
  onOpenAdmin: () => void;
}

export default function Navbar({ config, onOpenAdmin }: NavbarProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  let lastVal = 0;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    // Dynamic hide on down scroll, show on up scroll
    if (latest > lastVal && latest > 200) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    lastVal = latest;
  });

  const primaryClr = config.colors.primary;

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-110%' }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ${
        isScrolled 
          ? 'py-3' 
          : 'py-5'
      }`}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div 
          className={`flex items-center justify-between px-6 py-3.5 rounded-2xl border transition-all ${
            isScrolled 
              ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-neutral-200 shadow-lg' 
              : 'bg-white/30 backdrop-blur-xs border-transparent'
          }`}
        >
          {/* Logo Brand Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div 
              style={{ borderColor: primaryClr }}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-neutral-950 font-serif font-bold text-lg select-none transition group-hover:scale-105"
            >
              <span className="text-white">C</span>
              <span style={{ color: primaryClr }}>T</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-black font-sans uppercase tracking-[0.16em] leading-tight text-neutral-900">
                {config.logoText}
              </span>
              <span className="text-[9px] font-semibold text-neutral-500 tracking-[0.1em]">
                {config.logoSlogan}
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-bold text-neutral-700">
            <a href="#3d-studio" className="hover:text-neutral-900 flex items-center gap-1 transition">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> 3D customizer
            </a>
            <a href="#products-showcase" className="hover:text-neutral-900 transition">Products</a>
            <a href="#how-it-works" className="hover:text-neutral-900 transition">How It Works</a>
            <a href="#gallery" className="hover:text-neutral-900 transition">Showcase Gallery</a>
            <a href="#testimonials" className="hover:text-neutral-900 transition font-medium text-neutral-500 text-[10px]">Reviews</a>
          </div>

          {/* Social Right Header Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Lock key for brand customization settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAdmin}
              className="p-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 flex items-center gap-1.5 transition text-xs font-semibold"
              title="Open Design Administration Panel"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Admin Setting</span>
            </motion.button>

            {/* Float WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${config.whatsAppNumber.replace(/[^\d+]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-1.5 font-bold shadow-md shadow-emerald-500/10 transition text-xs"
            >
              <MessageCircleCode className="w-4 h-4" />
              <span className="hidden xs:inline">Order Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </motion.a>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}
