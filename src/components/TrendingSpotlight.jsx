import React, { useRef } from 'react';
import { Flame, ChevronLeft, ChevronRight, TrendingUp, BookOpen, Eye } from 'lucide-react';
import { getBookPrice } from '../data/pricing';

export function TrendingSpotlight({ 
  trendingItems, 
  timeframe, 
  onTimeframeChange, 
  onSelectBook, 
  onReadBook, 
  isDarkMode 
}) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (!trendingItems || trendingItems.length === 0) return null;

  return (
    <section className="mb-8 relative">
      {/* Header khu vực Hot */}
      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-500">
            <Flame className="w-4 h-4 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <h2 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <span>Tác Phẩm Xem Nhiều</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono hidden sm:inline">
                Top Trending
              </span>
            </h2>
          </div>
        </div>

        {/* Nút lọc Tuần / Tháng & Nút cuộn */}
        <div className="flex items-center gap-2">
          {/* Switcher Tuần / Tháng */}
          <div className={`flex items-center rounded-lg border p-0.5 text-[11px] font-mono ${
            isDarkMode ? 'border-white/10 bg-[#0E1118]' : 'border-black/10 bg-zinc-100'
          }`}>
            <button
              onClick={() => onTimeframeChange('week')}
              className={`px-2.5 py-0.5 rounded transition-all ${
                timeframe === 'week'
                  ? isDarkMode
                    ? 'bg-[#E5B54F] text-black font-bold shadow-sm'
                    : 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              Tuần này
            </button>
            <button
              onClick={() => onTimeframeChange('month')}
              className={`px-2.5 py-0.5 rounded transition-all ${
                timeframe === 'month'
                  ? isDarkMode
                    ? 'bg-[#E5B54F] text-black font-bold shadow-sm'
                    : 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              Tháng này
            </button>
          </div>

          {/* Navigation Arrows for Desktop */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => handleScroll('left')}
              className={`p-1.5 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'border-white/10 hover:bg-white/5 text-zinc-300' 
                  : 'border-black/10 hover:bg-black/5 text-zinc-700'
              }`}
              title="Cuộn sang trái"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className={`p-1.5 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'border-white/10 hover:bg-white/5 text-zinc-300' 
                  : 'border-black/10 hover:bg-black/5 text-zinc-700'
              }`}
              title="Cuộn sang phải"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách cuộn ngang Snap Scroll */}
      <div 
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {trendingItems.map((item, idx) => {
          const { book, score } = item;
          const pricing = getBookPrice(book);
          const coverSrc = book.cover || book.coverImage || './covers/ban-tron-chi-mang.jpg';
          const rank = idx + 1;

          // Màu huy hiệu rank
          const rankColor = 
            rank === 1 ? 'from-amber-400 to-yellow-600 text-black shadow-[0_0_12px_rgba(251,191,36,0.5)]' :
            rank === 2 ? 'from-zinc-200 to-zinc-400 text-black shadow-sm' :
            rank === 3 ? 'from-amber-600 to-amber-800 text-white shadow-sm' :
            'from-zinc-700 to-zinc-800 text-zinc-300 border border-white/10';

          return (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className={`snap-start flex-shrink-0 w-[240px] sm:w-[270px] rounded-xl border p-3 cursor-pointer group transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-[#0E1118] border-white/10 hover:border-[#E5B54F]/50 hover:bg-[#121622] shadow-lg'
                  : 'bg-white border-black/10 hover:border-amber-600/50 hover:bg-zinc-50 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Huy hiệu thứ hạng (Rank Badge) */}
              <div className={`absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-md bg-gradient-to-br ${rankColor} flex items-center justify-center font-mono font-black text-xs`}>
                #{rank}
              </div>

              {/* Lượt tương tác giả định/thực tế */}
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-400">
                <Eye className="w-2.5 h-2.5" />
                <span>{score.toLocaleString()}</span>
              </div>

              {/* Thân thẻ: Bìa & Thông tin */}
              <div>
                {/* Ảnh bìa */}
                <div className="relative aspect-[3/4.2] w-full rounded-lg overflow-hidden border border-black/40 shadow-md mb-2.5">
                  <img
                    src={coverSrc}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = './covers/ban-tron-chi-mang.jpg';
                    }}
                  />
                  {/* Gradient shadow đáy bìa */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Tác giả nổi trên bìa */}
                  <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-zinc-300 uppercase tracking-wider truncate">
                    {book.author}
                  </div>
                </div>

                {/* Tiêu đề tác phẩm */}
                <h3 className="font-title-book font-bold text-sm sm:text-base leading-tight group-hover:text-[#E5B54F] transition-colors line-clamp-1">
                  {book.title}
                </h3>

                {/* Tên gốc / Pinyin nếu có */}
                {book.originalTitle && (
                  <p className="text-[11px] font-serif italic opacity-60 truncate mt-0.5">
                    {book.originalTitle}
                  </p>
                )}

                {/* Tóm tắt ngắn 1 dòng */}
                <p className="text-[11px] opacity-75 line-clamp-2 mt-1.5 font-sans leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Nút Đọc demo & Badge giá */}
              <div className="mt-3 pt-2.5 border-t border-current/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReadBook(book);
                  }}
                  className={`flex-1 py-1 px-2 rounded-lg font-mono text-[11px] font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm ${
                    isDarkMode
                      ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A]'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Đọc thử</span>
                </button>

                {pricing && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-md border ${
                    pricing.isFree
                      ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400'
                      : isDarkMode
                        ? 'bg-white/[0.04] border-white/10 text-zinc-300'
                        : 'bg-black/[0.04] border-black/10 text-zinc-700'
                  }`}>
                    {pricing.isFree ? 'FREE' : pricing.priceDisplay}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
