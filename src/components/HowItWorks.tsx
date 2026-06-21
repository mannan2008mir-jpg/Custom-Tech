/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Smartphone, ShieldCheck, ShoppingCart, MessageSquare, Truck, BadgeCheck, Sparkles } from 'lucide-react';
import { WebsiteConfig } from '../types';

interface HowItWorksProps {
  config: WebsiteConfig;
}

export default function HowItWorks({ config }: HowItWorksProps) {
  const steps = [
    {
      num: '01',
      title: 'Select Canvas',
      desc: 'Browse through our premium executive merchandise catalog. Select from AirPods cases, mobile covers, fine keychains, or rollerball engraving pens.',
      icon: Smartphone,
      color: '#BFA75E'
    },
    {
      num: '02',
      title: 'Share Specification',
      desc: 'Type your name monogram, corporate label, or upload vector logos. Click "Order on WhatsApp" to trigger your pre-filled custom message.',
      icon: MessageSquare,
      color: '#3B82F6'
    },
    {
      num: '03',
      title: 'Approve Mockup',
      desc: 'Our design coordinators immediately draft responsive 3D design proof mockups. We tweak details until your branding proposal feels absolutely perfect.',
      icon: ShieldCheck,
      color: '#10B981'
    },
    {
      num: '04',
      title: 'Production & Delivery',
      desc: 'Once approved, we initialize precise laser fiber engraving or rich high-definition debossing techniques. Your bespoke prints are dispatched in premium gift packaging.',
      icon: Truck,
      color: '#F59E0B'
    }
  ];

  return (
    <div className="w-full bg-white py-16 md:py-24 border-b border-neutral-200 overflow-hidden" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200 mb-3">
            <BadgeCheck className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Seamless Workflow Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-neutral-900 mb-4">
            How Personalization Works
          </h2>
          <p className="text-base text-neutral-500">
            A luxury boutique service from raw design files to finished custom printed masterpieces.
          </p>
        </div>

        {/* Steps Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Timeline Connector line */}
          <div className="hidden md:block absolute top-[65px] left-[15%] right-[15%] h-0.5 bg-neutral-200 z-0" />

          {steps.map((st, i) => {
            const Icon = st.icon;
            
            return (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-6 self-start flex flex-col items-center text-center relative z-10 hover:shadow-lg transition-all"
              >
                {/* Badge Number step */}
                <div 
                  style={{ color: config.colors.primary, backgroundColor: `${config.colors.primary}12` }}
                  className="rounded-full w-8 h-8 flex items-center justify-center font-mono text-xs font-black mb-3 select-none"
                >
                  {st.num}
                </div>

                {/* Circle Icon layout */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md bg-neutral-900 text-white mb-5 transition transform group-hover:scale-110"
                >
                  <Icon className="w-6 h-6" style={{ color: config.colors.primary }} />
                </div>

                <h3 className="text-base font-extrabold text-neutral-900 tracking-tight font-sans mb-2.5">
                  {st.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  {st.desc}
                </p>

                {/* Floating decor arrow */}
                {i < 3 && (
                  <div className="hidden md:flex absolute top-[141px] -right-5 z-20 w-8 h-8 rounded-full border border-neutral-300 bg-white items-center justify-center text-xs text-neutral-400 font-bold shadow-xs">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>

        {/* Bottom micro assurance alert */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-400 font-medium inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-neutral-50 border border-neutral-200">
            <Sparkles className="w-3.5 h-3.5 text-[#BFA75E]" />
            All custom graphics receive full pre-production digital vector cleanup by our master art officers.
          </p>
        </div>

      </div>
    </div>
  );
}
