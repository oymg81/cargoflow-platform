'use client';

import { PackageSearch, Activity, Bell, LayoutDashboard, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerPortal() {
  const features = [
    { icon: <PackageSearch size={24} />, title: 'Shipment Tracking', desc: 'Monitor your cargo across the globe with precision.' },
    { icon: <Activity size={24} />, title: 'Cargo Status', desc: 'Detailed views into logistics handling and conditions.' },
    { icon: <Bell size={24} />, title: 'Real-Time Updates', desc: 'Instant notifications on shipment milestones.' },
    { icon: <LayoutDashboard size={24} />, title: 'Customer Dashboard', desc: 'Centralized portal for all your shipping documentation.' },
    { icon: <ShieldCheck size={24} />, title: 'Secure Access', desc: 'Enterprise-grade security protecting your logistics data.' },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#07142b] mb-6">Customer Portal</h2>
          <p className="text-lg text-neutral-600">
            Access your shipment information, tracking updates, and cargo management tools securely through our integrated logistics portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto justify-center">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-14 h-14 bg-red-50 text-[#F05A28] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F05A28] group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#07142b] mb-3">{feature.title}</h3>
              <p className="text-neutral-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="https://logisti-k.managercargo.com/public/login/indexlogin/logincasillero" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:shadow-[#1E293B]/30"
          >
            Access Portal <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
