import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TeddyBearCouple, SingleTeddyBear } from '../assets/teddy-vectors';
import { soundFx } from '../utils/soundEffects';

export const HeroSection = ({ data }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Light Parallax Transforms
  const yTeddy = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yHearts = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScrollToGallery = () => {
    soundFx.playPop();
    const element = document.querySelector('#photos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden select-none"
    >
      {/* Background Parallax Floating Elements */}
      <motion.div style={{ y: yHearts }} className="absolute inset-0 pointer-events-none">
        {/* Floating Mini Plushie Teddy Left */}
        <div className="absolute top-24 left-[5%] md:left-[10%] opacity-80 animate-float-slow hidden sm:block">
          <SingleTeddyBear color="pink" mood="happy" className="w-16 h-16 md:w-20 md:h-20" />
        </div>
        {/* Floating Mini Plushie Teddy Right */}
        <div className="absolute top-36 right-[5%] md:right-[12%] opacity-80 animate-float hidden sm:block">
          <SingleTeddyBear color="cream" mood="shy" className="w-16 h-16 md:w-20 md:h-20" />
        </div>
        {/* Floating Heart Badges */}
        <div className="absolute bottom-20 left-[15%] text-pink-300 text-3xl animate-bounce">
          💖
        </div>
        <div className="absolute top-44 right-[25%] text-pink-300 text-2xl animate-pulse">
          ✨
        </div>
      </motion.div>

      {/* Main Content Box */}
      <motion.div 
        style={{ opacity: opacityHero }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {/* Top Cute Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-[#E84A5F] text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-xs"
        >
          <span className="animate-pulse">🧸</span>
          <span>{data.hero.badge}</span>
          <span className="animate-pulse">✨</span>
        </motion.div>

        {/* Hugging Teddy Bear Couple Illustration with Parallax & Breathing Animation */}
        <motion.div
          style={{ y: yTeddy }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-6 cursor-pointer group"
          onClick={() => soundFx.playChime()}
        >
          <div className="animate-breathe">
            <TeddyBearCouple className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80" />
          </div>

          {/* Interactive Hint */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-3 py-1 rounded-full text-[11px] text-pink-600 shadow-md border border-pink-200">
            Sendus Teddy 🧸💕
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-6xl font-cute text-[#D94E67] font-bold tracking-wide mb-4 leading-tight drop-shadow-xs"
        >
          {data.hero.heading}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-[#5C4843] max-w-2xl leading-relaxed font-medium mb-8 px-4"
        >
          "{data.hero.subheading}"
        </motion.p>

        {/* Scroll CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.06, boxShadow: "0 12px 25px -4px rgba(232, 74, 95, 0.35)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          onClick={handleScrollToGallery}
          className="px-8 py-3.5 bg-gradient-to-r from-[#E84A5F] to-[#FF7096] text-white font-cute text-lg sm:text-xl rounded-full shadow-md shadow-pink-300/50 border border-white/50 cursor-pointer flex items-center gap-2"
        >
          <span>{data.hero.buttonText}</span>
        </motion.button>
      </motion.div>
    </section>
  );
};
