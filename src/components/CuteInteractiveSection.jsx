import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SingleTeddyBear, StitchLine } from '../assets/teddy-vectors';
import { soundFx } from '../utils/soundEffects';

export const CuteInteractiveSection = ({ data }) => {
  const [activeBear, setActiveBear] = useState(null);
  const [quoteIndices, setQuoteIndices] = useState({ 1: 0, 2: 0 });

  const handleTeddyInteraction = (bearId) => {
    soundFx.playChime();
    setActiveBear(bearId);
    setQuoteIndices((prev) => ({
      ...prev,
      [bearId]: (prev[bearId] + 1) % data.interactiveTeddy.bears[bearId - 1].bubbleQuotes.length
    }));
  };

  return (
    <section id="interactive" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto relative select-none">
      {/* Background Soft Card Container */}
      <div className="plushie-card p-6 sm:p-10 md:p-12 text-center bg-gradient-to-b from-white via-[#FFF8F9] to-pink-50/50">
        
        {/* Header */}
        <div className="max-w-xl mx-auto mb-10">
          <span className="text-3xl mb-2 block animate-bounce">🧸💬</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cute text-[#D94E67] font-bold tracking-wide mb-3">
            {data.interactiveTeddy.heading}
          </h2>
          <p className="text-[#6E554F] text-base sm:text-lg">
            {data.interactiveTeddy.subheading}
          </p>
        </div>

        {/* 2 Interactive Teddy Bear Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
          {data.interactiveTeddy.bears.map((bear) => {
            const isPink = bear.id === 1;
            const isHovered = activeBear === bear.id;
            const currentQuote = bear.bubbleQuotes[quoteIndices[bear.id]];

            return (
              <div
                key={bear.id}
                onMouseEnter={() => handleTeddyInteraction(bear.id)}
                onClick={() => handleTeddyInteraction(bear.id)}
                className="relative group cursor-pointer flex flex-col items-center bg-white/80 backdrop-blur-xs p-6 rounded-3xl border-2 border-pink-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Cute Badge */}
                <div className="px-3 py-1 bg-pink-100 rounded-full text-xs text-[#E84A5F] font-bold mb-4">
                  {bear.title}
                </div>

                {/* Speech Bubble Popup */}
                <div className="min-h-[70px] flex items-center justify-center mb-2 w-full">
                  <AnimatePresence mode="wait">
                    {isHovered ? (
                      <motion.div
                        key={currentQuote}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className="relative bg-[#E84A5F] text-white font-cute text-sm sm:text-base px-4 py-2.5 rounded-2xl shadow-md border border-pink-300 max-w-xs text-center"
                      >
                        <span>{currentQuote}</span>
                        {/* Triangle Speech Pointer */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#E84A5F]" />
                      </motion.div>
                    ) : (
                      <div className="text-xs text-pink-400 font-medium italic">
                        👉 Sentuh atau arahkan kursor!
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Teddy Bear SVG Vector */}
                <div className="relative py-2">
                  <div className={isHovered ? 'animate-wiggle' : 'animate-breathe'}>
                    <SingleTeddyBear
                      color={isPink ? "pink" : "brown"}
                      mood={isHovered ? "love" : "happy"}
                      waving={isHovered}
                      className="w-36 h-36 sm:w-44 sm:h-44"
                    />
                  </div>

                  {/* Bursting Floating Hearts */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 1, 0], y: -40, scale: 1.3 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
                    >
                      💖
                    </motion.div>
                  )}
                </div>

                {/* Subtitle Choice */}
                <div className="mt-4 px-6 py-2.5 rounded-full bg-pink-50 border border-pink-200 text-[#D94E67] font-cute text-lg font-bold group-hover:bg-[#E84A5F] group-hover:text-white transition-colors duration-300 shadow-xs">
                  "{bear.subtitle}"
                </div>
              </div>
            );
          })}
        </div>

        <StitchLine className="mt-10" />
      </div>
    </section>
  );
};
