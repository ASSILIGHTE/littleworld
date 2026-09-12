import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SingleTeddyBear, StitchLine } from '../assets/teddy-vectors';

export const TimelineSection = ({ data }) => {
  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto relative select-none">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E84A5F] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={14} />
          <span>Perjalanan Cinta Kita</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-cute text-[#D94E67] font-bold tracking-wide mb-3">
          Cerita Perjalanan Kita 🧸✨
        </h2>
        <p className="text-[#6E554F] text-base sm:text-lg">
          Langkah demi langkah yang telah kita lewati bersama.
        </p>
        <StitchLine className="mt-4" />
      </div>

      {/* Timeline Connected Vertical Path */}
      <div className="relative">
        {/* Central Dashed Plushie Seam Path Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-1 border-r-4 border-dashed border-pink-300 pointer-events-none" />

        <div className="space-y-12 sm:space-y-16 relative">
          {data.timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card Side */}
                <div className={`w-full sm:w-1/2 px-4 sm:px-8 ${isEven ? 'sm:text-right' : 'sm:text-left'} text-center mb-4 sm:mb-0`}>
                  <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-pink-100/80 hover:shadow-xl hover:border-pink-300 transition-all duration-300 inline-block w-full">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-1">
                      {item.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-cute text-[#D94E67] font-bold mb-2">
                      {item.icon} {item.title}
                    </h3>
                    <p className="text-[#6E554F] text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Circle Badge Icon */}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#E84A5F] to-[#FF7096] text-white text-2xl shadow-lg border-4 border-white shrink-0">
                  <span>{item.icon}</span>
                </div>

                {/* Empty Spacer Side */}
                <div className="w-full sm:w-1/2 hidden sm:block" />
              </motion.div>
            );
          })}
        </div>

        {/* End Plushie Bear Badge */}
        <div className="mt-16 text-center flex flex-col items-center">
          <div className="animate-breathe">
            <SingleTeddyBear color="pink" mood="love" className="w-24 h-24" />
          </div>
          <span className="text-pink-500 font-cute font-bold text-lg mt-2">
            Dan cerita ini belum berakhir... 💕
          </span>
        </div>
      </div>
    </section>
  );
};
