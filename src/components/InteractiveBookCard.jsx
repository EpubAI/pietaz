import React, { useRef, useState } from 'react';
import { BookOpen, Calendar, Maximize2, X, Award, ChevronRight, FileText, Info, Tag } from 'lucide-react';
import { getBookPrice } from '../data/pricing';

export function InteractiveBookCard({ book, onRead, isDarkMode }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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
        onClick={() => setIsDetailModalOpen(true)}
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
              {pricing && (
                <div className={`absolute -top-2.5 left-2 z-20 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold shadow-md flex items-center gap-1 border ${
                  pricing.isFree
                    ? 'bg-emerald-500 text-white border-emerald-300'
                    : isDarkMode
                      ? 'bg-amber-500/90 text-black border-amber-300'
                      : 'bg-amber-600 text-white border-amber-400'
                }`}>
                  <Tag className="w-3 h-3" />
                  <span>{pricing.priceDisplay}</span>
                </div>
              )}
              
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
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-title-book text-2xl sm:text-[26px] font-bold leading-tight group-hover:text-[#E5B54F] transition-colors">
                    {book.title}
                  </h2>
                  {pricing && (
                    <span className={`flex-shrink-0 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border shadow-sm ${
                      pricing.isFree
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : isDarkMode
                          ? 'bg-[#E5B54F]/15 text-[#E5B54F] border-[#E5B54F]/30'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      {pricing.priceDisplay}
                    </span>
                  )}
                </div>

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

      {/* POPUP XEM TOÀN BỘ THÔNG TIN CHI TIẾT CỦA TÁC PHẨM */}
      {isDetailModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsDetailModalOpen(false)}
        >
          <div 
            className={`relative max-w-2xl w-full max-h-[90vh] rounded-2xl border flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${
              isDarkMode ? 'bg-[#0D1017] text-[#E4E7EB] border-white/15' : 'bg-white text-[#1A1F2C] border-black/15'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header popup */}
            <div className="p-4 sm:p-5 border-b border-current/10 flex items-center justify-between sticky top-0 bg-inherit backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#E5B54F]" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Hồ Sơ Tác Phẩm</span>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nội dung chi tiết cuộn */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              
              {/* Cụm thông tin chính */}
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <div 
                  onClick={() => setIsCoverModalOpen(true)}
                  className="w-36 flex-shrink-0 aspect-[3/4.4] rounded-lg overflow-hidden border border-white/20 shadow-xl cursor-pointer hover:opacity-90"
                  title="Xem ảnh bìa lớn"
                >
                  <img src={coverSrc} alt={book.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="text-xs font-mono opacity-60 uppercase tracking-widest">{book.author}</div>
                  <h2 className="text-2xl font-title-book font-bold text-[#E5B54F] mt-0.5">{book.title}</h2>
                  {book.originalTitle && (
                    <div className="text-sm font-serif italic opacity-75 mt-0.5">{book.originalTitle}</div>
                  )}

                  <div className="mt-3 space-y-1 text-xs font-mono opacity-80">
                    <div>• <span className="font-semibold">Quy mô:</span> {book.totalChapters || `${book.chapters?.length || 0} chương`}</div>
                    {book.wordCount && (
                      <div>• <span className="font-semibold">Tổng số chữ:</span> <span className="text-[#E5B54F] font-bold">{book.wordCount}</span></div>
                    )}
                    {pricing && (
                      <div className="p-2.5 rounded-lg border border-[#E5B54F]/30 bg-[#E5B54F]/10 mt-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-semibold text-zinc-300">Định mức giá:</span>
                          <span className={`font-bold px-2 py-0.5 rounded ${pricing.isFree ? 'bg-emerald-500 text-white' : 'bg-[#E5B54F] text-black'}`}>
                            {pricing.priceDisplay}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 mt-1 flex justify-between">
                          <span>Text gốc (.lg): {pricing.rawWordCountFormatted}</span>
                          <span>Phân tầng: {pricing.priceTier}</span>
                        </div>
                      </div>
                    )}
                    {book.updatedAt && <div>• <span className="font-semibold">Cập nhật:</span> {book.updatedAt}</div>}
                    {(book.authorBio || book.authorInfo?.bio) && (
                      <div>• <span className="font-semibold">Tác giả:</span> {book.authorBio || book.authorInfo?.bio}</div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setIsDetailModalOpen(false);
                        onRead(book);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#E5B54F] text-black font-mono text-xs font-bold hover:bg-[#F2C76A] transition-all flex items-center gap-1.5 shadow-md active:scale-95 mx-auto sm:mx-0"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Bắt đầu đọc demo ({book.chapters?.length || 0} chương)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Giải thưởng & Thành tựu */}
              {book.awards && (
                <div className="p-3.5 rounded-xl border border-[#E5B54F]/25 bg-[#E5B54F]/5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5B54F] font-bold uppercase mb-1">
                    <Award className="w-4 h-4" />
                    <span>Giải thưởng & Thành tựu</span>
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed font-sans">{book.awards}</p>
                </div>
              )}

              {/* Bài Review Chuyên Sâu Toàn Văn */}
              {(book.extendedReview || book.description) && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5B54F] font-bold uppercase mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Bài Đánh Giá & Phân Tích Chuyên Sâu</span>
                  </div>
                  <div className="text-xs sm:text-[13px] leading-relaxed opacity-90 space-y-3 font-sans whitespace-pre-line border-t border-current/10 pt-3 text-justify">
                    {book.extendedReview || book.description}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

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
