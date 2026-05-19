'use client';

import { motion } from 'framer-motion';

const PARTNERS = [
  "MAERSK", "MSC", "CMA CGM", "COSCO", "HAPAG-LLOYD", "ONE", "EVERGREEN", "DHL", "FEDEX", "UPS"
];

export default function TrustedPartners() {
  return (
    <section className="py-12 bg-[#DADADA]">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Trusted by Leading Brands Worldwide
        </p>
      </div>

      {/* Infinite marquee effect */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <span
              key={index}
              className="text-2xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>

        {/* Gradients for smooth fade in/out on edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-navy to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-navy to-transparent z-10"></div>
      </div>
    </section>
  );
}
