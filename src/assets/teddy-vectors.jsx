import React from 'react';

// Single Teddy Bear SVG Component
export const SingleTeddyBear = ({ 
  color = "brown", // "brown" | "pink" | "cream"
  mood = "happy", // "happy" | "love" | "shy"
  className = "w-32 h-32",
  waving = false
}) => {
  // Color presets
  const colors = {
    brown: {
      body: "#D4A373",
      shadow: "#BC8A5F",
      snout: "#FAEDCD",
      innerEar: "#F4A261",
      cheeks: "#F8B4C4",
      stitch: "#A9714B"
    },
    pink: {
      body: "#F4A2B7",
      shadow: "#E8839D",
      snout: "#FFF0F3",
      innerEar: "#FFB7C5",
      cheeks: "#FF7096",
      stitch: "#D46B84"
    },
    cream: {
      body: "#F5EBE0",
      shadow: "#E3D5CA",
      snout: "#FFFFFF",
      innerEar: "#EDC9AF",
      cheeks: "#F8B4C4",
      stitch: "#C9B5A0"
    }
  };

  const c = colors[color] || colors.brown;

  return (
    <svg 
      viewBox="0 0 200 220" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} filter drop-shadow-md transition-transform duration-300`}
    >
      {/* Outer Glow */}
      <circle cx="100" cy="120" r="85" fill={c.body} fillOpacity="0.08" />

      {/* Left Ear */}
      <circle cx="50" cy="45" r="28" fill={c.body} />
      <circle cx="50" cy="45" r="18" fill={c.innerEar} />
      <path d="M 38 45 A 12 12 0 0 1 62 45" stroke={c.stitch} strokeDasharray="3 3" strokeWidth="1.5" fill="none" />

      {/* Right Ear */}
      <circle cx="150" cy="45" r="28" fill={c.body} />
      <circle cx="150" cy="45" r="18" fill={c.innerEar} />
      <path d="M 138 45 A 12 12 0 0 1 162 45" stroke={c.stitch} strokeDasharray="3 3" strokeWidth="1.5" fill="none" />

      {/* Left Foot */}
      <ellipse cx="60" cy="185" rx="22" ry="16" fill={c.shadow} />
      <ellipse cx="60" cy="183" rx="15" ry="10" fill={c.snout} />
      {/* Paw Prints */}
      <circle cx="60" cy="185" r="4" fill={c.innerEar} />
      <circle cx="53" cy="179" r="2" fill={c.innerEar} />
      <circle cx="60" cy="177" r="2" fill={c.innerEar} />
      <circle cx="67" cy="179" r="2" fill={c.innerEar} />

      {/* Right Foot */}
      <ellipse cx="140" cy="185" rx="22" ry="16" fill={c.shadow} />
      <ellipse cx="140" cy="183" rx="15" ry="10" fill={c.snout} />
      {/* Paw Prints */}
      <circle cx="140" cy="185" r="4" fill={c.innerEar} />
      <circle cx="133" cy="179" r="2" fill={c.innerEar} />
      <circle cx="140" cy="177" r="2" fill={c.innerEar} />
      <circle cx="147" cy="179" r="2" fill={c.innerEar} />

      {/* Main Body */}
      <ellipse cx="100" cy="135" rx="55" ry="50" fill={c.body} />
      
      {/* Plushie Belly Patch */}
      <ellipse cx="100" cy="140" rx="35" ry="30" fill={c.snout} />
      {/* Stitch seams around belly */}
      <ellipse cx="100" cy="140" rx="35" ry="30" stroke={c.stitch} strokeDasharray="4 4" strokeWidth="1.5" fill="none" />

      {/* Head */}
      <ellipse cx="100" cy="85" rx="52" ry="45" fill={c.body} />
      {/* Stitch seam down middle of face */}
      <path d="M 100 42 L 100 68" stroke={c.stitch} strokeDasharray="3 3" strokeWidth="1.5" />

      {/* Snout */}
      <ellipse cx="100" cy="95" rx="22" ry="16" fill={c.snout} />
      <ellipse cx="100" cy="89" rx="9" ry="6" fill="#3D291F" />
      {/* Mouth */}
      <path d="M 100 95 L 100 102 M 94 100 Q 100 106 106 100" stroke="#3D291F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      {mood === 'happy' && (
        <>
          <circle cx="78" cy="78" r="6" fill="#3D291F" />
          <circle cx="80" cy="76" r="2" fill="white" />
          <circle cx="122" cy="78" r="6" fill="#3D291F" />
          <circle cx="124" cy="76" r="2" fill="white" />
        </>
      )}

      {mood === 'love' && (
        <>
          {/* Heart Eyes */}
          <path d="M 78 74 C 74 70 68 76 74 82 L 78 86 L 82 82 C 88 76 82 70 78 74 Z" fill="#E84A5F" />
          <path d="M 122 74 C 118 70 112 76 118 82 L 122 86 L 126 82 C 132 76 126 70 122 74 Z" fill="#E84A5F" />
        </>
      )}

      {mood === 'shy' && (
        <>
          <path d="M 72 80 Q 78 74 84 80" stroke="#3D291F" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 116 80 Q 122 74 128 80" stroke="#3D291F" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* Cheeks */}
      <ellipse cx="70" cy="88" rx="8" ry="5" fill={c.cheeks} fillOpacity="0.7" />
      <ellipse cx="130" cy="88" rx="8" ry="5" fill={c.cheeks} fillOpacity="0.7" />

      {/* Left Arm */}
      <path 
        d={waving ? "M 50 115 Q 25 90 20 65 Q 35 60 48 95 Z" : "M 48 115 Q 25 125 32 145 Q 52 145 54 125 Z"} 
        fill={c.body} 
      />
      <circle cx={waving ? "26" : "36"} cy={waving ? "68" : "135"} r="8" fill={c.snout} />

      {/* Right Arm */}
      <path d="M 152 115 Q 175 125 168 145 Q 148 145 146 125 Z" fill={c.body} />
      <circle cx="164" cy="135" r="8" fill={c.snout} />

      {/* Plushie Bowtie / Heart Badge */}
      <path d="M 90 115 Q 100 120 100 125 Q 100 120 110 115 Q 105 110 100 115 Q 95 110 90 115 Z" fill="#E84A5F" />
      <circle cx="100" cy="117" r="3" fill="#FFF0F3" />
    </svg>
  );
};

// Teddy Bear Couple Hugging Component
export const TeddyBearCouple = ({ className = "w-64 h-64" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/40 via-red-100/30 to-amber-100/40 rounded-full blur-2xl animate-pulse-slow" />
      
      <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        {/* Floating Heart between them */}
        <g className="animate-heartbeat">
          <path d="M 160 55 C 145 35 125 55 160 85 C 195 55 175 35 160 55 Z" fill="#E84A5F" />
          <path d="M 154 48 C 148 42 140 50 154 62 Z" fill="#FFF0F3" fillOpacity="0.6" />
        </g>

        {/* --- LEFT TEDDY (BROWN) --- */}
        {/* Left Ear */}
        <circle cx="65" cy="55" r="22" fill="#D4A373" />
        <circle cx="65" cy="55" r="14" fill="#F4A261" />
        {/* Right Ear */}
        <circle cx="125" cy="50" r="20" fill="#D4A373" />
        <circle cx="125" cy="50" r="12" fill="#F4A261" />
        {/* Body */}
        <ellipse cx="100" cy="145" rx="50" ry="45" fill="#D4A373" />
        <ellipse cx="90" cy="145" rx="30" ry="25" fill="#FAEDCD" />
        {/* Head */}
        <ellipse cx="95" cy="90" rx="42" ry="38" fill="#D4A373" />
        <ellipse cx="90" cy="98" rx="18" ry="13" fill="#FAEDCD" />
        <ellipse cx="88" cy="93" rx="7" ry="5" fill="#3D291F" />
        <path d="M 88 98 L 88 103 M 83 102 Q 88 106 93 102" stroke="#3D291F" strokeWidth="2" strokeLinecap="round" />
        {/* Eyes (Happy Closed) */}
        <path d="M 72 85 Q 77 78 82 85" stroke="#3D291F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 102 83 Q 107 76 112 83" stroke="#3D291F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="72" cy="92" rx="6" ry="4" fill="#F8B4C4" />

        {/* --- RIGHT TEDDY (PINK) --- */}
        {/* Left Ear */}
        <circle cx="195" cy="50" r="20" fill="#F4A2B7" />
        <circle cx="195" cy="50" r="12" fill="#FFB7C5" />
        {/* Right Ear */}
        <circle cx="255" cy="55" r="22" fill="#F4A2B7" />
        <circle cx="255" cy="55" r="14" fill="#FFB7C5" />
        {/* Body */}
        <ellipse cx="220" cy="145" rx="50" ry="45" fill="#F4A2B7" />
        <ellipse cx="230" cy="145" rx="30" ry="25" fill="#FFF0F3" />
        {/* Head */}
        <ellipse cx="225" cy="90" rx="42" ry="38" fill="#F4A2B7" />
        <ellipse cx="230" cy="98" rx="18" ry="13" fill="#FFF0F3" />
        <ellipse cx="232" cy="93" rx="7" ry="5" fill="#3D291F" />
        <path d="M 232 98 L 232 103 M 227 102 Q 232 106 237 102" stroke="#3D291F" strokeWidth="2" strokeLinecap="round" />
        {/* Eyes (Loving) */}
        <circle cx="208" cy="83" r="5" fill="#3D291F" />
        <circle cx="210" cy="81" r="1.5" fill="white" />
        <path d="M 238 85 Q 243 78 248 85" stroke="#3D291F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="248" cy="92" rx="6" ry="4" fill="#FF7096" />

        {/* --- HUGGING ARMS OVERLAPPING --- */}
        {/* Left Teddy Arm hugging Right Teddy */}
        <path d="M 125 125 Q 165 110 185 130 Q 165 145 120 140 Z" fill="#D4A373" />
        <circle cx="180" cy="130" r="7" fill="#FAEDCD" />

        {/* Right Teddy Arm hugging Left Teddy */}
        <path d="M 195 125 Q 155 110 135 130 Q 155 145 200 140 Z" fill="#F4A2B7" />
        <circle cx="140" cy="130" r="7" fill="#FFF0F3" />

        {/* Pink Bow on Right Teddy Ear */}
        <path d="M 252 42 C 245 35 245 50 252 45 C 260 50 260 35 252 42 Z" fill="#E84A5F" />
        <circle cx="252" cy="43" r="2.5" fill="#FFF0F3" />
      </svg>
    </div>
  );
};

// Interactive Gift Box with Teddy Peeking
export const GiftBoxTeddy = ({ isOpen = false, onClick, className = "w-48 h-48" }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer select-none group ${className}`}
    >
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        {/* TEDDY BEAR POPPING OUT (Visible when open or hovering) */}
        <g className={`transition-all duration-700 transform origin-bottom ${isOpen ? 'translate-y-0 opacity-100 scale-105' : 'translate-y-12 opacity-60 group-hover:translate-y-4 group-hover:opacity-90'}`}>
          {/* Teddy Head */}
          <circle cx="100" cy="65" r="32" fill="#F4A2B7" />
          <circle cx="75" cy="40" r="14" fill="#F4A2B7" />
          <circle cx="75" cy="40" r="8" fill="#FFB7C5" />
          <circle cx="125" cy="40" r="14" fill="#F4A2B7" />
          <circle cx="125" cy="40" r="8" fill="#FFB7C5" />
          
          {/* Snout & Face */}
          <ellipse cx="100" cy="72" rx="14" ry="10" fill="#FFF0F3" />
          <ellipse cx="100" cy="68" rx="6" ry="4" fill="#3D291F" />
          <path d="M 100 72 L 100 76 M 95 75 Q 100 79 105 75" stroke="#3D291F" strokeWidth="2" strokeLinecap="round" />
          
          {/* Eyes */}
          <circle cx="86" cy="60" r="4" fill="#3D291F" />
          <circle cx="87" cy="59" r="1.5" fill="white" />
          <circle cx="114" cy="60" r="4" fill="#3D291F" />
          <circle cx="115" cy="59" r="1.5" fill="white" />
          <ellipse cx="80" cy="68" rx="5" ry="3" fill="#FF7096" />
          <ellipse cx="120" cy="68" rx="5" ry="3" fill="#FF7096" />

          {/* Teddy Paws holding the box rim */}
          <ellipse cx="70" cy="98" rx="10" ry="7" fill="#F4A2B7" />
          <ellipse cx="130" cy="98" rx="10" ry="7" fill="#F4A2B7" />

          {/* Heart held by Teddy when open */}
          {isOpen && (
            <path d="M 100 85 C 92 75 80 88 100 102 C 120 88 108 75 100 85 Z" fill="#E84A5F" className="animate-bounce" />
          )}
        </g>

        {/* GIFT BOX BODY */}
        <rect x="35" y="100" width="130" height="100" rx="16" fill="#FFF0F3" stroke="#F4A2B7" strokeWidth="4" />
        {/* Vertical Ribbon */}
        <rect x="88" y="100" width="24" height="100" fill="#E84A5F" />
        <rect x="91" y="100" width="6" height="100" fill="#FF8FA3" />

        {/* GIFT BOX LID */}
        <g className={`transition-all duration-700 transform origin-top-left ${isOpen ? '-translate-y-16 -rotate-25 opacity-90' : 'translate-y-0 group-hover:-translate-y-2'}`}>
          <rect x="28" y="85" width="144" height="25" rx="8" fill="#F4A2B7" stroke="#E8839D" strokeWidth="3" />
          <rect x="88" y="85" width="24" height="25" fill="#E84A5F" />

          {/* Large Cute Ribbon Bow */}
          <path d="M 100 85 C 75 60 60 85 100 85 Z" fill="#E84A5F" />
          <path d="M 100 85 C 125 60 140 85 100 85 Z" fill="#E84A5F" />
          <circle cx="100" cy="85" r="8" fill="#FFF0F3" />
        </g>
      </svg>
    </div>
  );
};

// Stitch Line Seam Divider
export const StitchLine = ({ className = "my-8" }) => {
  return (
    <div className={`w-full flex items-center justify-center space-x-2 ${className}`}>
      <div className="flex-1 h-[2px] border-b-2 border-dashed border-pink-300" />
      <span className="text-pink-400 text-sm font-bold tracking-widest px-2">🧸 💕 🧸</span>
      <div className="flex-1 h-[2px] border-b-2 border-dashed border-pink-300" />
    </div>
  );
};
