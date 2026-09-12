import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GiftBoxTeddy, SingleTeddyBear, StitchLine } from '../assets/teddy-vectors';
import { soundFx } from '../utils/soundEffects';

export const SurpriseSection = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpenSurprise = () => {
    soundFx.playSoftBoxOpen();
    setIsOpen(true);

    // Full screen Heart Confetti Explosion
    const end = Date.now() + 3000;
    const colors = ['#E84A5F', '#F8B4C4', '#FFCCD5', '#FF7096', '#FFF0F3'];

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setShowModal(true);
    }, 700);
  };

  const handleCloseModal = () => {
    soundFx.playPop();
    setShowModal(false);
  };

  return (
    <section id="surprise" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto relative select-none">
      {/* Container Box */}
      <div className="plushie-card p-8 sm:p-12 text-center bg-gradient-to-b from-white via-[#FFF5F7] to-[#FCE7F0] overflow-hidden">
        
        <span className="text-3xl mb-2 block animate-pulse">🎁✨</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-cute text-[#D94E67] font-bold tracking-wide mb-3">
          {data.surprise.title}
        </h2>
        <p className="text-[#6E554F] text-base sm:text-lg max-w-md mx-auto mb-8">
          {data.surprise.subtitle}
        </p>

        {/* Gift Box Interactive Graphic */}
        <div className="flex justify-center mb-8">
          <GiftBoxTeddy
            isOpen={isOpen}
            onClick={handleOpenSurprise}
            className="w-52 h-52 sm:w-64 sm:h-64 cursor-pointer"
          />
        </div>

        {/* Open Button */}
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 15px 30px -5px rgba(232, 74, 95, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenSurprise}
          className="px-8 py-4 bg-gradient-to-r from-[#E84A5F] to-[#FF7096] text-white font-cute text-xl rounded-full shadow-lg border-2 border-white/60 cursor-pointer inline-flex items-center gap-2"
        >
          <span>{data.surprise.buttonText}</span>
        </motion.button>

        <StitchLine className="mt-10" />
      </div>

      {/* "I Love You ❤️" Surprise Modal Popup */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl border-4 border-pink-200 relative overflow-hidden"
            >
              {/* Background Hearts */}
              <div className="absolute top-2 left-4 text-3xl animate-bounce">💖</div>
              <div className="absolute bottom-4 right-4 text-3xl animate-pulse">🧸</div>

              {/* Teddy Bear Vector */}
              <div className="flex justify-center mb-4">
                <SingleTeddyBear color="pink" mood="love" waving={true} className="w-36 h-36" />
              </div>

              {/* Big Header */}
              <h3 className="text-4xl sm:text-5xl font-cute text-[#D94E67] font-extrabold mb-4 tracking-wide">
                {data.surprise.modalTitle}
              </h3>

              {/* Message */}
              <p className="text-[#6E554F] font-medium text-base sm:text-lg leading-relaxed mb-8">
                {data.surprise.modalMessage}
              </p>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseModal}
                className="w-full py-3.5 bg-gradient-to-r from-[#E84A5F] to-[#FF7096] text-white font-cute text-xl rounded-2xl shadow-md cursor-pointer"
              >
                {data.surprise.modalButton}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
