import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SingleTeddyBear, StitchLine } from '../assets/teddy-vectors';
import { soundFx } from '../utils/soundEffects';

export const LoveLetterSection = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleLetter = () => {
    soundFx.playChime();
    if (!isOpen) {
      // Confetti burst on opening letter
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F8B4C4', '#E84A5F', '#FFCCD5']
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto relative select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E84A5F] text-xs font-semibold uppercase tracking-wider mb-2">
          <Mail size={14} />
          <span>Surat Romantis</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-cute text-[#D94E67] font-bold tracking-wide mb-2">
          {data.loveLetter.title}
        </h2>
        <p className="text-[#6E554F] text-sm sm:text-base">
          {data.loveLetter.previewText}
        </p>
      </div>

      {/* Main Foldable Envelope Box Container */}
      <div className="relative flex flex-col items-center">
        
        {/* Envelope Container */}
        <div className="relative w-full max-w-2xl">
          
          {/* Top Decorative Plushie Teddy Bear */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <SingleTeddyBear color="cream" mood="love" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md" />
          </div>

          {/* Card Envelope */}
          <div className="relative bg-[#FFF0F3] p-6 sm:p-10 rounded-3xl border-4 border-dashed border-pink-200 shadow-xl overflow-hidden transition-all duration-500">
            
            {/* Ambient Background Floating Hearts inside letter when open */}
            {isOpen && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: -100, opacity: [0, 0.6, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
                    style={{ left: `${15 + i * 10}%` }}
                    className="absolute text-pink-300 text-lg"
                  >
                    💖
                  </motion.div>
                ))}
              </div>
            )}

            {/* Closed Envelope View */}
            {!isOpen && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                {/* Cute Heart Wax Seal */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  onClick={handleToggleLetter}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E84A5F] to-[#FF7096] flex items-center justify-center shadow-lg cursor-pointer mb-6 border-2 border-white"
                >
                  <Heart size={36} className="text-white fill-white animate-pulse" />
                </motion.div>

                <p className="font-cute text-xl text-[#D94E67] font-bold mb-4">
                  Surat khusus tersimpan di sini...
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggleLetter}
                  className="px-8 py-3 bg-gradient-to-r from-[#E84A5F] to-[#FF7096] text-white font-cute text-lg rounded-full shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Sparkles size={18} />
                  <span>{data.loveLetter.buttonOpen}</span>
                </motion.button>
              </motion.div>
            )}

            {/* Open Letter Animated Sheet */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-white p-6 sm:p-10 rounded-2xl shadow-inner border border-pink-100 relative"
                >
                  {/* Decorative Stamp */}
                  <div className="absolute top-4 right-4 w-14 h-16 bg-pink-100 border-2 border-dashed border-pink-300 rounded-md p-1 flex flex-col items-center justify-center rotate-3">
                    <span className="text-lg">🧸</span>
                    <span className="text-[9px] text-pink-500 font-bold">LOVE POST</span>
                  </div>

                  {/* Letter Salutation */}
                  <h3 className="font-handwriting text-2xl sm:text-3xl text-[#D94E67] font-bold mb-6">
                    {data.loveLetter.salutation}
                  </h3>

                  {/* Letter Body Paragraphs */}
                  <div className="space-y-4 font-handwriting text-lg sm:text-xl text-[#4A3E3D] leading-relaxed">
                    {data.loveLetter.paragraphs.map((p, idx) => (
                      <p key={idx} className="indent-4">
                        {p}
                      </p>
                    ))}
                  </div>

                  <StitchLine className="my-6" />

                  {/* Letter Closing & Sender */}
                  <div className="text-right pt-2 font-handwriting text-xl text-[#D94E67]">
                    <p className="text-sm text-[#6E554F]">{data.loveLetter.closing}</p>
                    <p className="font-bold text-2xl mt-1">{data.loveLetter.senderName}</p>
                  </div>

                  {/* Close Button */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleToggleLetter}
                      className="px-6 py-2 bg-pink-100 hover:bg-pink-200 text-[#E84A5F] font-cute text-sm rounded-full transition-colors cursor-pointer"
                    >
                      {data.loveLetter.buttonClose}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
