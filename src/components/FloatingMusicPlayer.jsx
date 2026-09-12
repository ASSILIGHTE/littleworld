import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const FloatingMusicPlayer = ({ musicData, isMuted, toggleMute }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Sync mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    soundFx.playPop();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio playback error:", err);
      });
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Hidden HTML5 Audio element linked to music.mp3 */}
      <audio ref={audioRef} src={musicData.src} preload="metadata" />

      {/* Main Floating Widget */}
      <div className="relative flex items-center">
        {/* Expanded Controls Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="mr-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-pink-100 flex flex-col min-w-[220px]"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex flex-col overflow-hidden">
                  <span className="font-cute text-sm text-[#D94E67] font-bold truncate">
                    {musicData.title}
                  </span>
                  <span className="text-[10px] text-pink-400 font-medium truncate">
                    {musicData.artist}
                  </span>
                </div>
                <button
                  onClick={toggleMute}
                  className="text-pink-500 hover:text-pink-700 transition-colors p-1"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* Progress Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-pink-400 font-mono">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-pink-100 accent-[#E84A5F] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-pink-400 font-mono">
                  {formatTime(duration)}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Floating Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            soundFx.playPop();
            if (!isPlaying && !isExpanded) {
              togglePlay();
            }
            setIsExpanded(!isExpanded);
          }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#E84A5F] to-[#FF7096] text-white flex items-center justify-center shadow-lg shadow-pink-300/60 border-2 border-white cursor-pointer group"
        >
          {/* Rotating Vinyl/Disc Effect when playing */}
          {isPlaying ? (
            <Disc className="w-7 h-7 animate-spin-slow text-white" />
          ) : (
            <Music className="w-6 h-6 text-white" />
          )}

          {/* Center Play/Pause Overlay icon on hover */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </div>
        </motion.button>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 6s linear infinite;
        }
      `}</style>
    </div>
  );
};
