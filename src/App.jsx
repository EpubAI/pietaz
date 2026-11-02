import React, { useState, useMemo } from 'react';
import { 
  Sun, Moon, Search, BookOpen, Download, 
  Compass, ArrowUpRight, Check, X, Shield, Sparkles
} from 'lucide-react';
import { BOOKS } from './data/books';
import { CATEGORIES } from './data/categories';
import ReaderModal from './components/ReaderModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState(null);

  // Filter books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      const matchCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={isDarkMode ? 'dark bg-[#08090C] text-[#ECEFF4] min-h-screen selection:bg-[#E5B54F] selection:text-black font-sans' : 'bg-[#F9FAFB] text-[#1A1F2C] min-h-screen selection:bg-[#D97706] selection:text-white font-sans'}>
      
      {/* Editorial Top Border Rule */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#E5B54F] to-transparent opacity-60"></div>

      {/* Masthead Header */}
      <header className={`border-b transition-colors sticky top-0 z-40 backdrop-blur-md ${isDarkMode ? 'bg-[#08090C]/90 border-white/[0.08]' : 'bg-[#F9FAFB]/90 border-black/[0.08]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded border flex items-center justify-center font-mono font-bold text-xs tracking-wider ${isDarkMode ? 'border-[#E5B54F]/40 bg-[#E5B54F]/10 text-[#E5B54F]' : 'border-amber-600/40 bg-amber-500/10 text-amber-700'}`}>
              P
            </div>
            <div>
              <div className="font-bold tracking-[0.2em] text-xs sm:text-sm font-mono uppercase">
                PIETAZ PRIVATE DEN
              </div>
              <div className={`text-[10px] tracking-wider uppercase font-mono ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Archival Translation Portfolio
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex relative w-80">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên tác phẩm, tác giả..."
              className={`w-full pl-9 pr-4 py-1.5 text-xs rounded border transition-colors outline-none font-mono ${
                isDarkMode 
                  ? 'bg-white/[0.03] border-white/10 text-zinc-200 placeholder-zinc-500 focus:border-[#E5B54F]/50' 
                  : 'bg-black/[0.02] border-black/10 text-zinc-800 placeholder-zinc-400 focus:border-amber-600/50'
              }`}
            />
          </div>

          {/* Theme Switcher & Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>EPUB ARCHIVE ONLINE</span>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded border transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-[#E5B54F]' : 'border-black/10 hover:bg-black/5 text-amber-700'}`}
              title={isDarkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Search & Categories Filter (Horizontal swipeable track) */}
      <div className={`lg:hidden border-b px-4 py-3 sticky top-16 z-30 backdrop-blur-md ${isDarkMode ? 'bg-[#0B0D12]/95 border-white/[0.08]' : 'bg-white/95 border-black/[0.08]'}`}>
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tác phẩm, tác giả..."
            className={`w-full pl-8 pr-8 py-1.5 text-xs rounded border outline-none font-mono ${
              isDarkMode ? 'bg-white/[0.03] border-white/10 text-zinc-100' : 'bg-black/[0.03] border-black/10 text-zinc-900'
            }`}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded text-xs whitespace-nowrap transition-all font-mono ${
                  active 
                    ? isDarkMode 
                      ? 'bg-[#E5B54F] text-black font-semibold' 
                      : 'bg-amber-600 text-white font-semibold'
                    : isDarkMode 
                      ? 'bg-white/[0.03] text-zinc-400 border border-white/5' 
                      : 'bg-black/[0.03] text-zinc-600 border border-black/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP SIDEBAR: Archival Taxonomy */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className={`p-4 rounded border ${isDarkMode ? 'bg-[#0E1118] border-white/[0.08]' : 'bg-white border-black/[0.08]'}`}>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-current/10 font-mono text-[11px]">
                <span className="uppercase tracking-widest text-zinc-400 font-semibold">
                  Mục Lục Thể Loại
                </span>
                <span className="text-[#E5B54F]">
                  {filteredBooks.length} Tác phẩm
                </span>
              </div>

              <nav className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? BOOKS.length 
                    : BOOKS.filter(b => b.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-all ${
                        active 
                          ? isDarkMode 
                            ? 'bg-[#E5B54F] text-black font-semibold shadow-sm' 
                            : 'bg-amber-600 text-white font-semibold shadow-sm'
                          : isDarkMode 
                            ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' 
                            : 'text-zinc-600 hover:text-black hover:bg-black/[0.03]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${active ? 'bg-black/20 text-current' : 'opacity-50'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-current/10 font-mono text-[10px] text-zinc-500 space-y-1.5 leading-relaxed">
                <div>• Bản dịch hoàn thiện đối soát song ngữ</div>
                <div>• Đóng gói EPUB 3.0 cho Kindle/Kobo</div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT: Sách dạng Tạp Chí / Thẻ Thư Viện Chuyên Nghiệp */}
          <main className="lg:col-span-9">
            
            <div className="hidden lg:flex mb-6 items-baseline justify-between border-b border-current/10 pb-3">
              <h1 className="text-lg font-bold font-mono uppercase tracking-widest">
                {CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Tất cả tác phẩm'}
              </h1>
              <span className="font-mono text-xs text-zinc-400">
                [Lưu hành độc quyền • Bấm để đọc trực tiếp]
              </span>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-20 border border-dashed rounded border-current/20 font-mono text-xs text-zinc-400">
                <p>Không có tác phẩm nào thuộc thể loại này.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 rounded bg-[#E5B54F] text-black font-semibold"
                >
                  Xem toàn bộ thư khố
                </button>
              </div>
            ) : (
              /* Gallery of Architectural Book Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <article 
                    key={book.id}
                    className={`rounded border overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:border-[#E5B54F]/50 ${
                      isDarkMode 
                        ? 'bg-[#0E1118] border-white/[0.08]' 
                        : 'bg-white border-black/[0.08] shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Top Meta Bar */}
                      <div className="px-4 py-2.5 border-b border-current/10 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                        <span className="tracking-wider uppercase">ARCHIVE ID: #{book.id.substring(0, 8)}</span>
                        <span className={`px-2 py-0.5 rounded ${book.status === 'Hoàn thành' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                          {book.status}
                        </span>
                      </div>

                      {/* Asymmetric Split: Spine & Cover + Details */}
                      <div className="p-4 sm:p-5 flex gap-4 sm:gap-5">
                        
                        {/* Book Jacket (Bìa Sách Khối 3D Tinh Tế) */}
                        <div className="w-28 sm:w-32 flex-shrink-0">
                          <div className="relative aspect-[3/4.2] w-full rounded overflow-hidden shadow-lg border border-black/20 group-hover:shadow-2xl transition-all duration-300">
                            <img 
                              src={book.cover} 
                              alt={book.title} 
                              loading="lazy"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = './covers/ban-tron-chi-mang.jpg';
                              }}
                            />
                            {/* Book Spine Texture Line */}
                            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/40 to-transparent"></div>
                          </div>
                          
                          <div className="mt-2 text-center font-mono text-[10px] text-zinc-400 truncate">
                            {book.totalChapters}
                          </div>
                        </div>

                        {/* Literary Typography Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 truncate">
                              {book.author}
                            </div>

                            <h2 className="font-serif text-lg sm:text-xl font-bold leading-snug group-hover:text-[#E5B54F] transition-colors line-clamp-2">
                              {book.title}
                            </h2>

                            <div className="font-serif italic text-xs text-zinc-400 mt-1 truncate">
                              {book.originalTitle}
                            </div>

                            <p className={`mt-2.5 text-xs leading-relaxed line-clamp-3 font-sans ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              {book.description}
                            </p>
                          </div>

                          {/* Editorial Tags */}
                          <div className="mt-3 flex flex-wrap gap-1">
                            {book.tags.map((tag, idx) => (
                              <span 
                                key={idx} 
                                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-white/[0.04] text-zinc-400' : 'bg-black/[0.04] text-zinc-600'}`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Card Actions Toolbar */}
                    <div className={`px-4 sm:px-5 py-3 border-t flex items-center justify-between font-mono text-xs ${isDarkMode ? 'border-white/[0.08] bg-black/20' : 'border-black/[0.08] bg-black/[0.02]'}`}>
                      <button
                        onClick={() => setReadingBook(book)}
                        className={`px-3.5 py-1.5 rounded font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                          isDarkMode 
                            ? 'bg-[#E5B54F] text-black hover:bg-[#D9A336]' 
                            : 'bg-amber-600 text-white hover:bg-amber-700'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Đọc thử ({book.chapters.length})</span>
                      </button>

                      <a
                        href={book.downloadUrl}
                        download
                        className={`text-xs flex items-center gap-1 transition-colors hover:text-[#E5B54F] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
                        title="Tải file mẫu định dạng EPUB"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>EPUB</span>
                      </a>
                    </div>

                  </article>
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Editorial Footer */}
      <footer id="contact" className={`border-t py-12 px-4 sm:px-6 mt-20 transition-colors font-mono ${isDarkMode ? 'bg-[#06080B] border-white/[0.08]' : 'bg-white border-black/[0.08]'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          <div>
            <div className="font-bold text-sm tracking-wider text-current">
              PIETAZ PRIVATE DEN
            </div>
            <p className="text-[11px] mt-1 text-zinc-400 max-w-md">
              Thư phòng lưu trữ và trưng bày bản dịch văn học chọn lọc. Tối ưu hóa 100% cho màn hình điện thoại và thiết bị đọc sách chuyên dụng.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://t.me/" 
              target="_blank" 
              rel="noreferrer"
              className={`px-4 py-2 rounded font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                isDarkMode ? 'bg-[#E5B54F] text-black hover:bg-[#D9A336]' : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Telegram Dispatch</span>
            </a>
            <a 
              href="https://zalo.me/" 
              target="_blank" 
              rel="noreferrer"
              className={`px-4 py-2 rounded border text-xs transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-zinc-300' : 'border-black/10 hover:bg-black/5 text-zinc-700'}`}
            >
              Zalo
            </a>
          </div>
        </div>

        <div className={`mt-8 pt-4 border-t text-center text-[10px] ${isDarkMode ? 'border-white/[0.05] text-zinc-400' : 'border-black/[0.05] text-zinc-400'}`}>
          PIETAZ PRIVATE DEN © 2026 • ARCHIVAL TRANSLATION STANDARD • ZERO AI SLOP
        </div>
      </footer>

      {/* Reader Modal */}
      {readingBook && (
        <ReaderModal 
          book={readingBook} 
          onClose={() => setReadingBook(null)} 
          isDarkMode={isDarkMode} 
        />
      )}

    </div>
  );
}
