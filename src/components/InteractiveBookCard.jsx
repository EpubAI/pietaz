import React, { useRef, useState } from 'react';
import { BookOpen, ChevronRight, Bookmark } from 'lucide-react';

export function InteractiveBookCard({ book, onRead, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isOpen) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlight({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: ((y - centerY) / centerY) * -5,
      y: ((x - centerX) / centerX) * 5
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1400px'
      }}
      className="w-full relative"
    >
      {/* 3D BOOK CASING CONTAINER */}
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${
          isDarkMode 
            ? 'bg-[#0E1118] border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]' 
            : 'bg-white border-black/10 shadow-xl'
        }`}
      >
        {/* Cursor Radial Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(229,181,79,0.1), transparent 70%)`
          }}
        />

        {/* MAIN BODY: 3D BOOK HARDCOVER + FOLIO DETAILS */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-6 sm:gap-7 items-center sm:items-start">
          
          {/* INTERACTIVE 3D HARDBACK BOOK JACKET (KHÔNG GIAN LỚN HƠN) */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="w-56 sm:w-44 md:w-48 lg:w-52 flex-shrink-0 cursor-pointer group/cover relative select-none"
            title="Bấm để lật mở xem trích đoạn"
          >
            {/* Realistic Book Mockup with 3D Spine and Pages Thickness */}
            <div className="relative aspect-[3/4.4] w-full rounded-r-xl overflow-hidden border-r-2 border-b-2 border-black/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover/cover:-translate-y-1 group-hover/cover:shadow-[0_20px_45px_rgba(229,181,79,0.25)]">
              
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

              {/* Physical Gutter & Crease Line */}
              <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none"></div>
              
              {/* Gold Foil Hot Stamp Effect on Cover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E5B54F]/20 to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Silk Ribbon Bookmark hanging from bottom */}
              <div className="absolute -bottom-2 left-6 w-3 h-5 bg-[#E5B54F] shadow-md transform rotate-2 pointer-events-none"></div>
            </div>

            {/* Book Pages Stack Texture Effect */}
            <div className="mt-2 text-center">
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#E5B54F] group-hover/cover:underline">
                <span>{isOpen ? 'Đóng trích đoạn' : 'Xem trích đoạn'}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
              </span>
            </div>
          </div>

          {/* RIGHT METADATA & FOLIO TEXT */}
          <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
            <div>
              {/* Author & Foreign Title */}
              <div className="flex items-center justify-between text-xs font-mono opacity-60 mb-1.5 flex-wrap gap-2">
                <span className="uppercase tracking-widest">{book.author}</span>
                {book.originalTitle && <span className="font-serif italic text-right">{book.originalTitle}</span>}
              </div>

              {/* Vietnamese Master Title */}
              <h2 className="font-serif text-2xl sm:text-2xl font-bold leading-tight hover:text-[#E5B54F] transition-colors">
                {book.title}
              </h2>

              {/* Section Header: Giới thiệu tác phẩm */}
              <div className="mt-4 pb-1 border-b border-current/10">
                <span className="text-xs font-mono text-[#E5B54F] font-semibold tracking-wider uppercase">
                  Giới thiệu tác phẩm:
                </span>
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed opacity-80 font-sans line-clamp-4">
                {book.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
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

            {/* Bottom Actions Bar */}
            <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => onRead(book)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md ${
                  isDarkMode
                    ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A] hover:shadow-[0_0_20px_rgba(229,181,79,0.35)]'
                    : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Đọc tác phẩm</span>
              </button>
            </div>

          </div>

        </div>

        {/* EXPANDABLE FOLIO PREVIEW (HIỆU ỨNG RÚT BẢN THẢO TRÍCH ĐOẠN) */}
        {isOpen && (
          <div className="border-t border-current/10 p-5 sm:p-6 bg-black/20 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-current/10 font-mono text-xs text-[#E5B54F]">
              <div className="flex items-center gap-1.5 font-semibold">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Trích đoạn mở đầu: {book.chapters[0]?.title}</span>
              </div>
              <button 
                onClick={() => onRead(book)}
                className="underline hover:opacity-80"
              >
                Đọc toàn văn →
              </button>
            </div>

            <div className="mt-3 font-serif-reading text-xs sm:text-sm leading-relaxed opacity-85 space-y-2 text-justify">
              <p>{book.chapters[0]?.content[0]}</p>
              <p>{book.chapters[0]?.content[1]}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
