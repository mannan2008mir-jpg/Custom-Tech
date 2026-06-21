/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Smartphone, Shield, KeyRound, ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { WebsiteConfig } from '../types';

interface FooterProps {
  config: WebsiteConfig;
  onOpenAdmin: () => void;
}

export default function Footer({ config, onOpenAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const primaryClr = config.colors.primary;

  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Top split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-neutral-900 pb-12 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div 
                style={{ borderColor: primaryClr }}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-black font-serif font-bold text-lg select-none"
              >
                <span className="text-white">C</span>
                <span style={{ color: primaryClr }}>T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-[0.16em] uppercase leading-tight">
                  {config.logoText}
                </span>
                <span className="text-[9px] font-semibold text-neutral-500 tracking-[0.1em]">
                  {config.logoSlogan}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed font-normal">
              Specialized in high-end luxury printing, customized leatherette and hybrid phone armors, rollerball fiber laser engraving, and custom corporate executive gifting. Completely automated through pre-filled secure WhatsApp ordering structures.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10px] text-neutral-500 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full Pre-Production Mockup Custom Sign-off Included</span>
            </div>
          </div>

          {/* Catalog Col */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Merchandise Catalogs</h4>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <a href="#products-showcase" className="hover:text-white transition">Custom Mobile Covers</a>
              <a href="#products-showcase" className="hover:text-white transition">Custom AirPods Cases</a>
              <a href="#products-showcase" className="hover:text-white transition">Bespoke Keychains</a>
              <a href="#products-showcase" className="hover:text-white transition">Executive Engraving Pens</a>
              <a href="#products-showcase" className="hover:text-white transition">Corporate Hampers Suite</a>
            </div>
          </div>

          {/* Help Col */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest">Support Enquiries</h4>
            <p className="text-xs text-neutral-500 leading-relaxed font-normal">
              For customizable vectors, bulk pricing quotes, custom wedding return gift orders, or design files submission:
            </p>
            
            <a 
              href={`https://wa.me/${config.whatsAppNumber.replace(/[^\d+]/g, '')}`} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-800 text-white font-bold text-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Direct WhatsApp Channel</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>

        </div>

        {/* Bottom copyright details and Admin trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-neutral-600 font-medium">
          <p>© {currentYear} {config.logoText}. All Executive Rights Reserved. WhatsApp-Based Personalized Ordering.</p>
          
          <div className="flex items-center gap-5">
            {/* Elegant lock key for Admin settings panel */}
            <button
              onClick={onOpenAdmin}
              className="hover:text-neutral-400 transition flex items-center gap-1.5 focus:outline-none"
              title="Identity, Color, Logo & Product catalog editing dashboard"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-500/80" /> Admin Customizer Platform
            </button>
            <span className="hidden sm:inline text-neutral-800">|</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-neutral-700">
              <Sparkles className="w-3 h-3" /> Luxury Print Standard 100% Guaranteed
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
