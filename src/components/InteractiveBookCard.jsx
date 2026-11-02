import React, { useRef, useState } from 'react';
import { BookOpen, Download, Sparkles, Eye } from 'lucide-react';

export function InteractiveBookCard({ book, onRead, isDarkMode }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt calculation & dynamic glare
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spot coordinates
    setSpotlight({ x, y, opacity: 1 });

    // 3D tilt angles (capped at 8 deg for realistic physical weight)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className={`relative rounded-xl border p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer select-none group ${
        isDarkMode 
          ? 'bg-[#0D1017] border-white/10 hover:border-[#E5B54F]/50 shadow-2xl' 
          : 'bg-white border-black/10 hover:border-amber-600/50 shadow-lg'
      }`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, ${
            isDarkMode ? 'rgba(229, 181, 79, 0.12)' : 'rgba(217, 119, 6, 0.08)'
          }, transparent 70%)`
        }}
      />

      {/* Glossy Reflective Glare */}
      <div 
        className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`
        }}
      />

      <div>
        {/* Top Header: Archive Identifier & Live Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-current/10 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F]"></span>
            <span className="opacity-70 tracking-widest uppercase">PIETAZ #{book.id.substring(0, 6)}</span>
          </div>
          <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
            book.status === 'Hoàn thành' 
              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
              : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
          }`}>
            {book.status}
          </span>
        </div>

        {/* Book Spine & Physical Foil Jacket Display */}
        <div className="pt-5 flex gap-5 items-start">
          
          {/* 3D Book Object Container */}
          <div className="w-28 sm:w-36 flex-shrink-0 relative">
            <div className="relative aspect-[3/4.4] w-full rounded-md overflow-hidden shadow-2xl border border-black/30 group-hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 transform group-hover:scale-[1.03]">
              
              <img
                src={book.cover}
                alt={book.title}
                loading="lazy"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = './covers/ban-tron-chi-mang.jpg';
                }}
              />

              {/* Physical Spine Shadow & Leather Crease */}
              <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"></div>
              {/* Foil Stamp Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            <div className="mt-2 text-center font-mono text-[10px] opacity-60">
              {book.chapters.length} chương mẫu
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <span className="font-mono text-[11px] opacity-60 uppercase tracking-wider block mb-1">
              {book.author}
            </span>

            <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight group-hover:text-[#E5B54F] transition-colors line-clamp-2">
              {book.title}
            </h3>

            <div className="font-serif italic text-xs opacity-60 mt-1 truncate">
              {book.originalTitle}
            </div>

            <p className="mt-3 text-xs leading-relaxed opacity-75 line-clamp-3 font-sans">
              {book.description}
            </p>

            {/* Badges / Tags */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {book.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isDarkMode 
                      ? 'bg-white/[0.03] border-white/10 text-zinc-300' 
                      : 'bg-black/[0.03] border-black/10 text-zinc-700'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Bottom Bar */}
      <div className="mt-6 pt-3.5 border-t border-current/10 flex items-center justify-between font-mono text-xs">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRead(book);
          }}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-md ${
            isDarkMode
              ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A] hover:shadow-[0_0_20px_rgba(229,181,79,0.3)]'
              : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Mở Đọc ({book.chapters.length})</span>
        </button>

        <a
          href={book.downloadUrl}
          download
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-lg hover:bg-current/10 flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
          title="Tải EPUB cho Kindle/Kobo"
        >
          <Download className="w-3.5 h-3.5 text-[#E5B54F]" />
          <span className="hidden sm:inline font-mono text-[11px]">EPUB</span>
        </a>
      </div>

    </div>
  );
}
