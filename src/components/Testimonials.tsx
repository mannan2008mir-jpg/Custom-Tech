/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Quote, Heart, ArrowUpRight } from 'lucide-react';
import { WebsiteConfig } from '../types';

interface TestimonialsProps {
  config: WebsiteConfig;
}

export default function Testimonials({ config }: TestimonialsProps) {
  const primaryClr = config.colors.primary;

  return (
    <div className="w-full bg-neutral-900 text-neutral-100 py-16 md:py-24 border-b border-neutral-850" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span 
            style={{ color: primaryClr, backgroundColor: `${primaryClr}15` }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/10 mb-3"
          >
            <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" /> Direct Client Testimony
          </span>
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white font-bold mb-4">
            Trusted By Corporations & Individuals
          </h2>
          <p className="text-sm text-neutral-400">
            Read what our clients say about the tactile detail of our engravings, material depth, and express WhatsApp support.
          </p>
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-neutral-950/40 backdrop-blur-md rounded-[28px] border border-neutral-800 p-8 flex flex-col justify-between relative group hover:bg-neutral-950/80 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-neutral-800 pointer-events-none group-hover:text-neutral-750 transition" />

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal italic pb-8">
                  "{item.content}"
                </p>
              </div>

              {/* Client Avatar credentials */}
              <div className="flex items-center gap-3.5 border-t border-neutral-850 pt-5 mt-auto">
                <img 
                  src={item.avatarUrl} 
                  alt={item.name} 
                  className="w-11 h-11 rounded-full bg-neutral-800 border-2 border-neutral-700 object-cover shrink-0" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-white leading-tight">{item.name}</h4>
                  <p className="text-[10px] text-neutral-400 font-medium tracking-tight mt-0.5">{item.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bulk Action Promo */}
        <div className="mt-16 text-center">
          <p className="text-xs text-neutral-400 font-medium">
            Over 10,000+ custom gifts produced with flawless feedback since inauguration. 
            <a 
              href={`https://wa.me/${config.whatsAppNumber.replace(/[^\d+]/g, '')}`} 
              target="_blank" 
              rel="noreferrer" 
              className="ml-1.5 font-bold underline inline-flex items-center gap-0.5"
              style={{ color: primaryClr }}
            >
              Inquire Corporate Discounts <ArrowUpRight className="w-3 h-3" />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
