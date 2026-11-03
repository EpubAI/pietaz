import React, { useState, useMemo } from 'react';
import { 
  Sun, Moon, Search, Feather, Send, MessageCircle, X, Sparkles, Compass
} from 'lucide-react';
import { BOOKS } from './data/books';
import { CATEGORIES } from './data/categories';
import { InteractiveBookCard } from './components/InteractiveBookCard';
import ReaderModal from './components/ReaderModal';
import { normalizeVietnamese } from './utils/text';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState(null);

  // Helper lấy danh sách category id của 1 cuốn sách (hỗ trợ cả mảng categories lẫn category đơn)
  const getBookCategories = (book) => {
    if (Array.isArray(book.categories) && book.categories.length > 0) {
      return book.categories;
    }
    if (book.category) {
      return [book.category];
    }
    return [];
  };

  // Danh mục thể loại hiển thị linh hoạt: Luôn giữ 'all', và chỉ hiện các thể loại thực tế có sách (hoặc cấu hình sẵn)
  const availableCategories = useMemo(() => {
    return CATEGORIES.filter(cat => {
      if (cat.id === 'all') return true;
      const count = BOOKS.filter(b => getBookCategories(b).includes(cat.id)).length;
      return count > 0;
    });
  }, []);

  // Filter books với chuẩn hóa không dấu và hỗ trợ multi-category
  const filteredBooks = useMemo(() => {
    const queryNorm = normalizeVietnamese(searchQuery);

    return BOOKS.filter((book) => {
      const bookCats = getBookCategories(book);
      const matchCategory = selectedCategory === 'all' || bookCats.includes(selectedCategory);

      if (!queryNorm) return matchCategory;

      const titleNorm = normalizeVietnamese(book.title);
      const originalTitleNorm = normalizeVietnamese(book.originalTitle || '');
      const authorNorm = normalizeVietnamese(book.author);
      const matchTag = Array.isArray(book.tags) && book.tags.some(t => normalizeVietnamese(t).includes(queryNorm));

      const matchSearch = 
        titleNorm.includes(queryNorm) ||
        originalTitleNorm.includes(queryNorm) ||
        authorNorm.includes(queryNorm) ||
        matchTag;

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

          {/* Contact Links & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Telegram */}
            <a 
              href="https://t.me/Pietaz" 
              target="_blank" 
              rel="noreferrer"
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                isDarkMode 
                  ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A] hover:shadow-[0_0_15px_rgba(229,181,79,0.35)]' 
                  : 'bg-amber-600 text-white hover:bg-amber-700 shadow'
              }`}
              title="Kênh Telegram trao đổi: @Pietaz"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono">Telegram</span>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/heywazzup2024" 
              target="_blank" 
              rel="noreferrer"
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                isDarkMode 
                  ? 'border-white/15 hover:bg-white/5 text-zinc-200 hover:border-white/30' 
                  : 'border-black/15 hover:bg-black/5 text-zinc-800 hover:border-black/30'
              }`}
              title="Facebook cá nhân"
            >
              <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Facebook</span>
            </a>

            <div className="h-4 w-px bg-current opacity-20 mx-0.5 sm:mx-1"></div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-lg border transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-[#E5B54F]' : 'border-black/10 hover:bg-black/5 text-amber-700'}`}
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

        {/* Dropdown chọn thể loại trên Mobile */}
        <div className="relative">
          <label className="block text-[10px] font-mono text-zinc-400 mb-1 uppercase tracking-wider">
            Thể loại:
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-lg border outline-none font-mono appearance-none transition-colors pr-8 ${
                isDarkMode 
                  ? 'bg-[#121620] border-white/15 text-zinc-100 focus:border-[#E5B54F]' 
                  : 'bg-white border-black/15 text-zinc-800 focus:border-amber-600'
              }`}
            >
              {availableCategories.map((cat) => {
                const count = cat.id === 'all' 
                  ? BOOKS.length 
                  : BOOKS.filter(b => getBookCategories(b).includes(cat.id)).length;
                return (
                  <option key={cat.id} value={cat.id} className={isDarkMode ? 'bg-[#121620] text-zinc-100' : 'bg-white text-zinc-900'}>
                    {cat.label} ({count})
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
              ▼
            </div>
          </div>
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
                {availableCategories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? BOOKS.length 
                    : BOOKS.filter(b => getBookCategories(b).includes(cat.id)).length;

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
            </div>
          </aside>

          {/* Gallery of Interactive 3D Tilt Books */}
          <main className="lg:col-span-9">
            
            <div className="hidden lg:flex mb-6 items-baseline justify-between border-b border-current/10 pb-3">
              <h1 className="text-lg font-bold font-mono uppercase tracking-widest flex items-center gap-2">
                <span>{CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Tất cả tác phẩm'}</span>
                <Sparkles className="w-4 h-4 text-[#E5B54F]" />
              </h1>
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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs text-zinc-400">
          <div className="max-w-2xl space-y-2">
            <div className="font-bold text-sm tracking-wider text-current text-[#E5B54F]">
              PIETAZ PRIVATE DEN
            </div>
            <p className="text-[12px] text-zinc-300 font-sans leading-relaxed">
              Website giới thiệu và demo bản dịch AI chất lượng cao.
            </p>
            <p className="text-[12px] text-zinc-400 font-sans leading-relaxed">
              Nhận convert epub; dịch truyện, tài liệu sang tiếng Việt; bản dịch epub song ngữ.
            </p>
            <p className="text-[12px] text-zinc-400 font-sans leading-relaxed">
              Liên hệ telegram/facebook để trao đổi dịch vụ và báo giá bản dịch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://t.me/Pietaz" 
              target="_blank" 
              rel="noreferrer"
              className={`px-4 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all shadow-md ${
                isDarkMode ? 'bg-[#E5B54F] text-black hover:bg-[#F2C76A]' : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Telegram (@Pietaz)</span>
            </a>
            <a 
              href="https://www.facebook.com/heywazzup2024" 
              target="_blank" 
              rel="noreferrer"
              className={`px-4 py-2.5 rounded-lg border text-xs transition-colors flex items-center gap-2 ${isDarkMode ? 'border-white/15 hover:bg-white/5 text-zinc-200' : 'border-black/15 hover:bg-black/5 text-zinc-800'}`}
            >
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        <div className={`mt-8 pt-4 border-t text-center text-[10px] ${isDarkMode ? 'border-white/[0.05] text-zinc-500' : 'border-black/[0.05] text-zinc-400'}`}>
          PIETAZ PRIVATE DEN © 2026 • AI TRANSLATION ARCHIVE & DEMO SHOWCASE
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
