import React, { useRef, useState } from 'react';
import { BookOpen, Calendar, Maximize2, Tag, ChevronRight, Layers } from 'lucide-react';
import { getBookPrice } from '../data/pricing';

export function CompactBookRow({ book, onRead, isDarkMode, onSelectDetail }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const coverSrc = book.cover || book.coverImage || './covers/ban-tron-chi-mang.jpg';
  const pricing = getBookPrice(book);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: ((y - centerY) / centerY) * -2.5,
      y: ((x - centerX) / centerX) * 2.5
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
      onClick={() => onSelectDetail(book)}
      className="w-full relative cursor-pointer group"
      style={{ perspective: '1200px' }}
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className={`relative rounded-xl border p-4 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start overflow-hidden hover:border-[#E5B54F]/50 ${
          isDarkMode
            ? 'bg-[#0E1118] border-white/10 hover:bg-[#121622] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-white border-black/10 hover:bg-zinc-50 shadow-md hover:shadow-lg'
        }`}
      >
        {/* Subtle accent line on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#E5B54F] transition-colors" />

        {/* THUMBNAIL BÌA GỌN */}
        <div className="w-24 sm:w-28 md:w-32 flex-shrink-0 relative select-none">
          <div className="aspect-[3/4.2] w-full rounded-lg overflow-hidden border border-black/40 shadow-md relative group/thumb">
            <img
              src={coverSrc}
              alt={book.title}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover/thumb:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = './covers/ban-tron-chi-mang.jpg';
              }}
            />
            {/* Spine shadow effect */}
            <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* THÔNG TIN CHÍNH GIỮA */}
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            {/* Tác giả & Tiêu đề gốc */}
            <div className="flex items-center gap-2 text-xs font-mono opacity-65 flex-wrap">
              <span className="uppercase tracking-widest font-semibold">{book.author}</span>
              {book.originalTitle && (
                <>
                  <span>•</span>
                  <span className="font-serif italic truncate max-w-[280px]">{book.originalTitle}</span>
                </>
              )}
            </div>

            {/* Tên sách tiếng Việt */}
            <h2 className="font-title-book text-xl sm:text-2xl font-bold leading-tight mt-1 group-hover:text-[#E5B54F] transition-colors">
              {book.title}
            </h2>

            {/* Meta badges: Chương, ngày cập nhật */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mt-1.5 flex-wrap">
              {book.updatedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E5B54F]" />
                  <span>{book.updatedAt}</span>
                </div>
              )}
              {(book.totalChapters || book.chapters?.length) && (
                <div className="flex items-center gap-1 text-zinc-400">
                  <Layers className="w-3 h-3 text-zinc-400" />
                  <span>{book.totalChapters || `${book.chapters.length} chương`}</span>
                </div>
              )}
            </div>

            {/* Đoạn tóm tắt rút gọn */}
            <p className="mt-2 text-xs sm:text-[13px] leading-relaxed opacity-75 font-sans line-clamp-2">
              {book.description}
            </p>
          </div>

          {/* Tags */}
          {Array.isArray(book.tags) && book.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {book.tags.slice(0, 4).map((tag, idx) => (
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
              {book.tags.length > 4 && (
                <span className="text-[10px] font-mono opacity-50 self-center">
                  +{book.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* CỘT PHẢI: GIÁ & NÚT THAO TÁC */}
        <div className="w-full sm:w-44 flex-shrink-0 flex flex-col justify-between sm:items-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:pl-5 border-current/10 self-stretch">
          {/* Price badge */}
          {pricing && (
            <div className={`w-full py-1.5 px-2.5 rounded-lg border font-mono text-xs font-bold flex items-center justify-between sm:justify-center gap-1.5 shadow-sm ${
              pricing.isFree
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                : isDarkMode
                  ? 'bg-[#E5B54F]/10 border-[#E5B54F]/40 text-[#E5B54F]'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <div className="flex items-center gap-1 text-[10px] font-bold tracking-wider">
                <Tag className={`w-3 h-3 ${pricing.isFree ? 'text-emerald-400' : 'text-[#E5B54F]'}`} />
                <span>{pricing.isFree ? 'FREE' : 'GIÁ:'}</span>
              </div>
              <span className={`text-xs uppercase tracking-wide px-1.5 py-0.2 rounded ${
                pricing.isFree
                  ? 'bg-emerald-500 text-black font-black'
                  : 'text-[#E5B54F] font-black'
              }`}>
                {pricing.priceDisplay}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="w-full space-y-1.5 mt-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRead(book);
              }}
              className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md ${
                isDarkMode
                  ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A] hover:shadow-[0_0_15px_rgba(229,181,79,0.35)]'
                  : 'bg-amber-600 text-white hover:bg-amber-700 shadow'
              }`}
              title="Đọc thử tác phẩm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Đọc demo</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectDetail(book);
              }}
              className={`w-full py-1.5 px-2.5 rounded-lg font-mono text-[11px] flex items-center justify-center gap-1 border transition-colors ${
                isDarkMode
                  ? 'border-white/10 hover:bg-white/5 text-zinc-300 hover:text-white'
                  : 'border-black/10 hover:bg-black/5 text-zinc-700 hover:text-black'
              }`}
            >
              <span>Xem chi tiết</span>
              <ChevronRight className="w-3 h-3 opacity-60" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
