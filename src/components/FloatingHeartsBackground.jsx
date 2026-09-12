import React, { useMemo } from 'react';

export const FloatingHeartsBackground = ({ count = 18 }) => {
  // Generate stable random positions & speeds for hearts
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 18 + 12, // 12px to 30px
      duration: Math.random() * 12 + 10, // 10s to 22s
      delay: Math.random() * 8, // 0s to 8s
      opacity: Math.random() * 0.35 + 0.15,
      color: ['#F8B4C4', '#FFB7C5', '#E84A5F', '#FFCCD5', '#F4A2B7'][i % 5],
      drift: Math.random() * 40 - 20 // sway -20px to 20px
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float-heart opacity-0"
          style={{
            left: `${h.left}%`,
            bottom: `-40px`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            animation: `floatUpHeart ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            color: h.color,
            opacity: h.opacity
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full filter drop-shadow-sm">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes floatUpHeart {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.5;
          }
          85% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-105vh) scale(1.1) rotate(25deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
