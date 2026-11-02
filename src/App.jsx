import React, { useState, useMemo } from 'react';
import { 
  Sun, Moon, Search, Feather, Send, MessageCircle, X, Sparkles, Compass
} from 'lucide-react';
import { BOOKS } from './data/books';
import { CATEGORIES } from './data/categories';
import { InteractiveBookCard } from './components/InteractiveBookCard';
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
    <div className={isDarkMode ? 'dark bg-[#07080B] text-[#E8ECF2] min-h-screen selection:bg-[#E5B54F] selection:text-black font-sans' : 'bg-[#F9FAFB] text-[#1A1F2C] min-h-screen selection:bg-amber-600 selection:text-white font-sans'}>
      
      {/* Dynamic Golden Accent Beam Header */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#E5B54F] to-transparent opacity-80"></div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${isDarkMode ? 'bg-[#07080B]/90 border-white/[0.08]' : 'bg-[#F9FAFB]/90 border-black/[0.08]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand */}
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

          {/* Theme & Live Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>EPUB ARCHIVE ONLINE</span>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded border transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-[#E5B54F]' : 'border-black/10 hover:bg-black/5 text-amber-700'}`}
              title={isDarkMode ? 'Giao diện Sáng' : 'Giao diện Tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Sticky Filter Track */}
      <div className={`lg:hidden border-b px-4 py-3 sticky top-16 z-30 backdrop-blur-md ${isDarkMode ? 'bg-[#0A0C10]/95 border-white/[0.08]' : 'bg-white/95 border-black/[0.08]'}`}>
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

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className={`p-4 rounded border ${isDarkMode ? 'bg-[#0C0E14] border-white/[0.08]' : 'bg-white border-black/[0.08]'}`}>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-current/10 font-mono text-[11px]">
                <span className="uppercase tracking-widest text-zinc-400 font-semibold">
                  Thể Loại Truyện
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
                <div>• Thẻ tương tác 3D Tilt & Cursor Spotlight</div>
                <div>• Đóng gói EPUB chuẩn cho máy đọc sách</div>
              </div>
            </div>
          </aside>

          {/* Gallery of Interactive 3D Tilt Books */}
          <main className="lg:col-span-9">
            
            <div className="hidden lg:flex mb-6 items-baseline justify-between border-b border-current/10 pb-3">
              <h1 className="text-lg font-bold font-mono uppercase tracking-widest flex items-center gap-2">
                <span>{CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Tất cả tác phẩm'}</span>
                <Sparkles className="w-4 h-4 text-[#E5B54F]" />
              </h1>
              <span className="font-mono text-xs text-zinc-400">
                [Di chuột để nghiêng 3D • Bấm để mở đọc trực tiếp]
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <InteractiveBookCard
                    key={book.id}
                    book={book}
                    onRead={(selected) => setReadingBook(selected)}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className={`border-t py-12 px-4 sm:px-6 mt-20 transition-colors font-mono ${isDarkMode ? 'bg-[#050608] border-white/[0.08]' : 'bg-white border-black/[0.08]'}`}>
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

        <div className={`mt-8 pt-4 border-t text-center text-[10px] ${isDarkMode ? 'border-white/[0.05] text-zinc-500' : 'border-black/[0.05] text-zinc-400'}`}>
          PIETAZ PRIVATE DEN © 2026 • ARCHIVAL TRANSLATION STANDARD
        </div>
      </footer>

      {/* In-Browser Reader Modal */}
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
