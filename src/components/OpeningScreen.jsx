import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SingleTeddyBear } from '../assets/teddy-vectors';
import { soundFx } from '../utils/soundEffects';

export const OpeningScreen = ({ onOpen, data }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    soundFx.playChime();
    setIsOpening(true);

    // Heart Confetti Burst
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F8B4C4', '#E84A5F', '#FFB7C5', '#FFF0F3'],
        shapes: ['square'],
        scalar: 1.2
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F8B4C4', '#E84A5F', '#FFB7C5', '#FFF0F3'],
        shapes: ['square'],
        scalar: 1.2
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 1.05 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5F7] via-[#FCE7F0] to-[#FFF0F3] px-4 text-center select-none overflow-hidden"
    >
      {/* Floating Hearts Particles surrounding the welcome screen */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: [-15, -45, -15], 
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 4 + (i % 3), 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeInOut" 
            }}
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${15 + (i * 6)}%`
            }}
            className="absolute text-pink-400/60"
          >
            {i % 2 === 0 ? '🧸' : '💖'}
          </motion.div>
        ))}
      </div>

      {/* Main Welcome Content Box */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        
        {/* Bouncing Teddy Bear */}
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 18, 
            delay: 0.2 
          }}
          className="relative mb-6"
        >
          <div className="animate-breathe">
            <SingleTeddyBear color="pink" mood="love" waving={true} className="w-44 h-44 md:w-52 md:h-52 drop-shadow-xl" />
          </div>

          {/* Floating mini heart behind ears */}
          <motion.span
            animate={{ scale: [1, 1.3, 1], y: [-5, -15, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 right-4 text-2xl"
          >
            💕
          </motion.span>
        </motion.div>

        {/* Text Step 1: Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-cute text-[#D94E67] font-bold tracking-wide mb-3 drop-shadow-sm"
        >
          {data.opening.welcomeText}
        </motion.h1>

        {/* Text Step 2: Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-base sm:text-lg text-[#6E554F] font-medium mb-8 max-w-xs sm:max-w-sm leading-relaxed"
        >
          {data.opening.subtext}
        </motion.p>

        {/* Button Step 3 */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08, boxShadow: "0 15px 30px -5px rgba(232, 74, 95, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          onClick={handleOpenClick}
          className="relative group px-8 py-4 bg-gradient-to-r from-[#E84A5F] to-[#FF7096] text-white font-cute text-xl sm:text-2xl rounded-full shadow-lg shadow-pink-300/60 border-2 border-white/60 cursor-pointer overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            {data.opening.buttonText}
          </span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.6 }}
          className="mt-6 text-xs text-pink-400 font-medium tracking-wide"
        >
          ✨ Sentuh tombol untuk memulai ✨
        </motion.p>
      </div>
    </motion.div>
  );
};
