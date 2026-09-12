import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { romanticData } from './data/romanticData';
import { soundFx } from './utils/soundEffects';

import { OpeningScreen } from './components/OpeningScreen';
import { FloatingHeartsBackground } from './components/FloatingHeartsBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { CuteInteractiveSection } from './components/CuteInteractiveSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { TimelineSection } from './components/TimelineSection';
import { SurpriseSection } from './components/SurpriseSection';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { SingleTeddyBear } from './assets/teddy-vectors';

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(false);

  // Toggle audio mute across Web Audio SFX and Music Player
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundFx.setMuted(nextMute);
  };

  // Scroll spy to activate navigation link highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'photos', 'interactive', 'letter', 'timeline', 'surprise'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-pink-200 selection:text-pink-700">
      
      {/* 1. OPENING WELCOME SCREEN OVERLAY */}
      <AnimatePresence>
        {showOpening && (
          <OpeningScreen
            data={romanticData}
            onOpen={() => {
              setShowOpening(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. MAIN WEBSITE CONTENT */}
      {!showOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col min-h-screen"
        >
          {/* Ambient Floating Hearts Background */}
          <FloatingHeartsBackground count={20} />

          {/* Glassmorphism Navbar */}
          <Navbar
            activeSection={activeSection}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />

          {/* Hero Section */}
          <main className="flex-grow">
            <HeroSection data={romanticData} />
            <PhotoGallerySection data={romanticData} />
            <CuteInteractiveSection data={romanticData} />
            <LoveLetterSection data={romanticData} />
            <TimelineSection data={romanticData} />
            <SurpriseSection data={romanticData} />
          </main>

          {/* Romantic Cute Footer */}
          <footer className="py-12 px-4 bg-gradient-to-t from-pink-100/80 to-transparent text-center relative z-20 border-t border-pink-200/50">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <SingleTeddyBear color="pink" mood="love" className="w-16 h-16 mb-3 animate-breathe" />
              <p className="font-cute text-xl text-[#D94E67] font-bold mb-1">
                Dibuat khusus dengan penuh cinta 🧸💕
              </p>
              <p className="text-xs text-[#6E554F] font-medium">
                © {new Date().getFullYear()} Our Little Teddy World. Forever & Always.
              </p>
            </div>
          </footer>

          {/* Floating Bottom Music Player */}
          <FloatingMusicPlayer
            musicData={romanticData.music}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
        </motion.div>
      )}
    </div>
  );
}
