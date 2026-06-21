/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, HelpCircle as HelpIcon, MessageSquare } from 'lucide-react';
import { WebsiteConfig } from '../types';

interface FAQSectionProps {
  config: WebsiteConfig;
}

export default function FAQSection({ config }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(config.faqs[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const primaryClr = config.colors.primary;

  return (
    <div className="w-full bg-white py-16 md:py-24 border-b border-neutral-200" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200 mb-3">
            <HelpIcon className="w-3.5 h-3.5 text-amber-500" /> Information Department
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-neutral-900 mb-4">
            Frequently Asked Queries
          </h2>
          <p className="text-sm text-neutral-500">
            Everything you need to know about preparing your custom vector logos, review processes, and mobile bank invoicing.
          </p>
        </div>

        {/* FAQs list */}
        <div className="space-y-3">
          {config.faqs.map((item, index) => {
            const isOpen = openId === item.id;
            
            return (
              <div 
                key={item.id} 
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen 
                    ? 'border-neutral-900 bg-neutral-50/50 shadow-xs' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-6 py-5.5 flex items-center justify-between gap-4 text-left select-none outline-none focus:outline-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span 
                      style={{ color: primaryClr }}
                      className="font-mono text-xs font-black"
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight font-sans">
                      {item.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Animated content expansion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal border-t border-neutral-100 pl-12.5">
                        <p>{item.answer}</p>
                        
                        {/* Quick CTA to skip to coordinator on WhatsApp */}
                        <div className="mt-4 flex">
                          <a
                            href={`https://wa.me/${config.whatsAppNumber.replace(/[^\d+]/g, '')}?text=${encodeURIComponent(`Hello, I have a quick query regarding: "${item.question}". Can you please assist me?`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-amber-600 hover:text-amber-800 transition"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Direct Assistance via WhatsApp
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
