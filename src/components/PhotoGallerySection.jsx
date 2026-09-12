import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { SingleTeddyBear, StitchLine } from '../assets/teddy-vectors';
import { soundFx } from '../utils/soundEffects';

export const PhotoGallerySection = ({ data }) => {
  const [activeHoverId, setActiveHoverId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="photos" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative select-none">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 text-[#E84A5F] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles size={14} />
          <span>Galeri Kenangan</span>
          <Sparkles size={14} />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-cute text-[#D94E67] font-bold tracking-wide mb-3">
          6 Momen Indah Kita 📸💕
        </h2>
        <p className="text-[#6E554F] text-base sm:text-lg">
          Setiap foto menyimpan sejuta kehangatan dan rasa bersyukur.
        </p>
        <StitchLine className="mt-4 mb-2" />
      </div>

      {/* 6 Photos Grid: 3 cols (desktop), 2 cols (tablet), 1 col (mobile) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8"
      >
        {data.photos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={cardVariants}
            onMouseEnter={() => {
              setActiveHoverId(photo.id);
              soundFx.playPop();
            }}
            onMouseLeave={() => setActiveHoverId(null)}
            className="relative group"
          >
            {/* Polaroid Outer Card */}
            <div 
              className={`bg-white p-4 pb-6 rounded-2xl shadow-md group-hover:shadow-2xl transition-all duration-500 transform ${photo.rotation} group-hover:rotate-0 group-hover:-translate-y-2 border border-pink-100/70 relative`}
            >
              {/* Cute Washi Tape / Woven Sticker on Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/70 backdrop-blur-xs rounded-sm rotate-2 shadow-xs border-dashed border-pink-300 z-10 flex items-center justify-center">
                <span className="text-[10px] text-pink-700 font-cute font-bold tracking-wider">
                  MEMORIES 💖
                </span>
              </div>

              {/* Little Teddy Sticker on Corner */}
              <div className="absolute top-2 right-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-xl">🧸</span>
              </div>

              {/* Photo Frame Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-pink-50 mb-4 border border-pink-100">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  onError={(e) => {
                    // Graceful fallback if path differs
                    if (e.target.src !== photo.fallbackUrl) {
                      e.target.src = photo.fallbackUrl;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Floating Heart Effect on Hover */}
                {activeHoverId === photo.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1.2, y: -20 }}
                    className="absolute bottom-3 right-3 text-2xl text-pink-500 pointer-events-none drop-shadow-md"
                  >
                    ❤️
                  </motion.div>
                )}
              </div>

              {/* Caption & Date */}
              <div className="text-center px-2">
                <p className="font-handwriting text-lg sm:text-xl text-[#4A3E3D] font-bold leading-snug">
                  "{photo.caption}"
                </p>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-pink-400 font-medium">
                  <Heart size={12} className="fill-pink-400 text-pink-400" />
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
