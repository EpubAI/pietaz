import React, { useRef, useState } from 'react';
import { BookOpen, Download, ChevronRight, Bookmark, Sparkles, Layers } from 'lucide-react';

export function InteractiveBookCard({ book, onRead, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'toc'
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

        {/* TOP STATUS HEADER */}
        <div className="px-5 py-3 border-b border-current/10 flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F]"></span>
            <span className="opacity-60 uppercase tracking-widest">ARCHIVE ID // #{book.id.substring(0, 6)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
              book.status === 'Hoàn thành' 
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
            }`}>
              {book.status}
            </span>
          </div>
        </div>

        {/* MAIN BODY: 3D BOOK HARDCOVER + FOLIO DETAILS */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-start">
          
          {/* INTERACTIVE 3D HARDBACK BOOK JACKET */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="w-32 sm:w-36 flex-shrink-0 cursor-pointer group/cover relative mx-auto sm:mx-0 select-none"
            title="Bấm để lật mở xem trích đoạn"
          >
            {/* Realistic Book Mockup with 3D Spine and Pages Thickness */}
            <div className="relative aspect-[3/4.4] w-full rounded-r-lg overflow-hidden border-r-2 border-b-2 border-black/40 shadow-2xl transition-all duration-300 group-hover/cover:-translate-y-1">
              
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
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none"></div>
              
              {/* Gold Foil Hot Stamp Effect on Cover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E5B54F]/15 to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Silk Ribbon Bookmark hanging from bottom */}
              <div className="absolute -bottom-2 left-6 w-3 h-5 bg-[#E5B54F] shadow-md transform rotate-2 pointer-events-none"></div>
            </div>

            {/* Book Pages Stack Texture Effect */}
            <div className="mt-2 text-center">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#E5B54F] group-hover/cover:underline">
                <span>{isOpen ? 'Đóng trích yếu' : 'Mở lật trang'}</span>
                <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
              </span>
            </div>
          </div>

          {/* RIGHT METADATA & FOLIO TEXT */}
          <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
            <div>
              {/* Author & Foreign Title */}
              <div className="flex items-center justify-between text-xs font-mono opacity-60 mb-1">
                <span className="uppercase tracking-widest">{book.author}</span>
                <span className="font-serif italic">{book.originalTitle}</span>
              </div>

              {/* Vietnamese Master Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold leading-tight hover:text-[#E5B54F] transition-colors line-clamp-2">
                {book.title}
              </h2>

              {/* Interactive Tabs: Tóm tắt hoặc Mục lục 20 chương */}
              <div className="mt-4 border-b border-current/10 flex items-center gap-4 text-xs font-mono pb-2">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`pb-1 transition-colors ${activeTab === 'summary' ? 'text-[#E5B54F] border-b-2 border-[#E5B54F] font-semibold' : 'opacity-60 hover:opacity-100'}`}
                >
                  Tóm tắt tác phẩm
                </button>
                <button
                  onClick={() => setActiveTab('toc')}
                  className={`pb-1 transition-colors ${activeTab === 'toc' ? 'text-[#E5B54F] border-b-2 border-[#E5B54F] font-semibold' : 'opacity-60 hover:opacity-100'}`}
                >
                  Mục lục ({book.chapters.length} chương)
                </button>
              </div>

              {/* Tab 1: Summary */}
              {activeTab === 'summary' && (
                <p className="mt-3 text-xs leading-relaxed opacity-75 font-sans line-clamp-3">
                  {book.description}
                </p>
              )}

              {/* Tab 2: Table of Contents Preview */}
              {activeTab === 'toc' && (
                <div className="mt-2.5 max-h-24 overflow-y-auto space-y-1 text-[11px] font-mono opacity-80 pr-2">
                  {book.chapters.slice(0, 5).map((c) => (
                    <div key={c.id} className="truncate hover:text-[#E5B54F] cursor-pointer" onClick={() => onRead(book)}>
                      • {c.title}
                    </div>
                  ))}
                  {book.chapters.length > 5 && (
                    <div className="text-[10px] opacity-50 italic">
                      + thêm {book.chapters.length - 5} chương nữa...
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
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

            {/* Bottom Actions Bar */}
            <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => onRead(book)}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-md ${
                  isDarkMode
                    ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A] hover:shadow-[0_0_20px_rgba(229,181,79,0.35)]'
                    : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Mở Đọc ({book.chapters.length} chương)</span>
              </button>

              <a
                href={book.downloadUrl}
                download
                className="flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-[#E5B54F] transition-all p-1"
                title="Tải EPUB cho máy đọc sách"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EPUB</span>
              </a>
            </div>

          </div>

        </div>

        {/* EXPANDABLE FOLIO PREVIEW (HIỆU ỨNG RÚT BẢN THẢO TRÍCH ĐOẠN) */}
        {isOpen && (
          <div className="border-t border-current/10 p-5 sm:p-6 bg-black/20 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-current/10 font-mono text-xs text-[#E5B54F]">
              <div className="flex items-center gap-1.5 font-semibold">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Trích đoạn hồi mở màn: {book.chapters[0]?.title}</span>
              </div>
              <button 
                onClick={() => onRead(book)}
                className="underline hover:opacity-80"
              >
                Toàn văn →
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
