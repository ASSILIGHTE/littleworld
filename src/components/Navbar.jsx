import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const Navbar = ({ activeSection, isMuted, toggleMute }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Foto Kita', href: '#photos' },
    { name: 'Pilihan Teddy', href: '#interactive' },
    { name: 'Surat', href: '#letter' },
    { name: 'Cerita', href: '#timeline' },
    { name: 'Surprise', href: '#surprise' }
  ];

  const handleNavClick = (href) => {
    soundFx.playPop();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md py-3 border-b border-pink-100'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-xl shadow-sm transform group-hover:rotate-12 transition-transform duration-300">
            🧸
          </div>
          <div className="flex flex-col">
            <span className="font-cute text-xl text-[#D94E67] font-bold tracking-wide">
              Our Little World
            </span>
            <span className="text-[10px] text-pink-400 font-medium -mt-1 tracking-wider">
              TEDDY & ME
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-pink-100/80 shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === link.href.substring(1)
                  ? 'bg-[#E84A5F] text-white shadow-xs font-semibold'
                  : 'text-[#5C4843] hover:text-[#E84A5F] hover:bg-pink-50'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Mute/Unmute Quick Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute Music & Audio" : "Mute Music & Audio"}
            className="p-2 rounded-full bg-pink-100/80 hover:bg-pink-200 text-[#E84A5F] transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-pink-100/80 text-[#E84A5F] hover:bg-pink-200 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`block px-4 py-2.5 rounded-2xl text-base font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'bg-[#E84A5F] text-white font-semibold'
                      : 'text-[#5C4843] hover:bg-pink-50 hover:text-[#E84A5F]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
