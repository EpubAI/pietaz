import React, { useRef, useState } from 'react';
import { BookOpen, Calendar, Maximize2, X, Award, ChevronRight, FileText, Info, Tag } from 'lucide-react';
import { getBookPrice } from '../data/pricing';

export function InteractiveBookCard({ book, onRead, onSelectDetail, isDarkMode }) {
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Phổ quát hóa đường dẫn ảnh bìa (hỗ trợ cả book.cover lẫn book.coverImage, cả ./covers lẫn /covers)
  const coverSrc = book.cover || book.coverImage || './covers/ban-tron-chi-mang.jpg';
  const pricing = getBookPrice(book);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
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
    <>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1400px'
        }}
        className="w-full relative cursor-pointer"
        onClick={() => onSelectDetail && onSelectDetail(book)}
      >
        {/* 3D BOOK CASING CONTAINER */}
        <div
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className={`relative rounded-2xl border transition-all duration-500 overflow-hidden group hover:border-[#E5B54F]/50 ${
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
            
            {/* INTERACTIVE 3D HARDBACK BOOK JACKET */}
            <div className="w-64 sm:w-48 md:w-52 flex-shrink-0 relative select-none flex flex-col items-center">
              
              {/* Realistic Book Mockup with 3D Spine and Pages Thickness */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCoverModalOpen(true);
                }}
                className="relative aspect-[3/4.4] w-full rounded-r-xl overflow-hidden border-r-2 border-b-2 border-black/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer group/cover transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(229,181,79,0.3)]"
                title="Bấm để phóng to xem ảnh bìa rõ nét"
              >
                <img
                  src={coverSrc}
                  alt={book.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/cover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = './covers/ban-tron-chi-mang.jpg';
                  }}
                />

                {/* Nút phóng to bìa */}
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm opacity-80 group-hover/cover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Physical Gutter & Crease Line */}
                <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none"></div>
                
                {/* Gold Foil Hot Stamp Effect on Cover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E5B54F]/20 to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Silk Ribbon Bookmark hanging from bottom */}
                <div className="absolute -bottom-2 left-6 w-3 h-5 bg-[#E5B54F] shadow-md transform rotate-2 pointer-events-none"></div>
              </div>

              {/* Nút Đọc Demo Tác Phẩm đặt ngay dưới ảnh bìa để tối ưu không gian */}
              <div className="mt-3 w-full">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRead(book);
                  }}
                  className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md ${
                    isDarkMode
                      ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A] hover:shadow-[0_0_20px_rgba(229,181,79,0.35)]'
                      : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                  }`}
                  title="Đọc thử ngay tác phẩm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Đọc demo tác phẩm</span>
                </button>
              </div>

              {/* Price Tag đặt trang trọng ngay dưới nút Đọc Demo */}
              {pricing && (
                <div className={`mt-2 w-full py-2 px-3 rounded-xl border font-mono text-xs font-bold flex items-center justify-between shadow-md transition-all ${
                  pricing.isFree
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : isDarkMode
                      ? 'bg-[#E5B54F]/10 border-[#E5B54F]/40 text-[#E5B54F]'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider">
                    <Tag className={`w-3.5 h-3.5 ${pricing.isFree ? 'text-emerald-400' : 'text-[#E5B54F]'}`} />
                    <span>{pricing.isFree ? 'ƯU ĐÃI:' : 'GIÁ TRỌN BỘ:'}</span>
                  </div>
                  <span className={`text-xs uppercase tracking-wide px-2 py-0.5 rounded-md ${
                    pricing.isFree 
                      ? 'bg-emerald-500 text-black font-black shadow-sm' 
                      : 'text-[#E5B54F] font-black'
                  }`}>
                    {pricing.priceDisplay}
                  </span>
                </div>
              )}
            </div>

            {/* RIGHT METADATA & FOLIO TEXT */}
            <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
              <div>
                {/* Author & Foreign Title */}
                <div className="flex items-center justify-between text-xs font-mono opacity-60 mb-1.5 flex-wrap gap-2">
                  <span className="uppercase tracking-widest">{book.author}</span>
                  {book.originalTitle && <span className="font-serif italic text-right">{book.originalTitle}</span>}
                </div>

                {/* Vietnamese Master Title & Price Tag */}
                <h2 className="font-title-book text-2xl sm:text-[26px] font-bold leading-tight group-hover:text-[#E5B54F] transition-colors">
                  {book.title}
                </h2>

                {/* Ngày cập nhật upload & Quy mô chương */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mt-1.5 flex-wrap">
                  {book.updatedAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E5B54F]" />
                      <span>Cập nhật: {book.updatedAt}</span>
                    </div>
                  )}
                  {(book.totalChapters || book.chapters?.length) && (
                    <div className="flex items-center gap-1 text-zinc-400">
                      <span>•</span>
                      <span>{book.totalChapters || `${book.chapters.length} chương`}</span>
                    </div>
                  )}
                </div>

                {/* Section Header: Giới thiệu tác phẩm */}
                <div className="mt-3.5 pb-1 border-b border-current/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E5B54F] font-semibold tracking-wider uppercase">
                    Giới thiệu tác phẩm:
                  </span>
                  <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100 group-hover:text-[#E5B54F] transition-all flex items-center gap-0.5">
                    Chi tiết <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed opacity-80 font-sans line-clamp-4">
                  {book.description}
                </p>

                {/* Tags */}
                {Array.isArray(book.tags) && book.tags.length > 0 && (
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
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

{/* POPUP PHÓNG TO ẢNH BÌA */}
      {isCoverModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={() => setIsCoverModalOpen(false)}
        >
          <div className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsCoverModalOpen(false)}
              className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={coverSrc} 
              alt={book.title} 
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl object-contain border border-white/20"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="text-center mt-3 text-white/80 font-mono text-xs font-bold">
              {book.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
