import React, { useState, useMemo } from 'react';
import { 
  Sun, Moon, Search, BookOpen, Download, 
  Feather, Send, MessageCircle, Library, Ghost, Castle, Compass, Sword, Rocket,
  X, Filter
} from 'lucide-react';
import { BOOKS } from './data/books';
import { CATEGORIES } from './data/categories';
import ReaderModal from './components/ReaderModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState(null);

  // Icon mapping
  const getCategoryIcon = (iconName) => {
    switch(iconName) {
      case 'Ghost': return <Ghost className="w-3.5 h-3.5" />;
      case 'Castle': return <Castle className="w-3.5 h-3.5" />;
      case 'Compass': return <Compass className="w-3.5 h-3.5" />;
      case 'Sword': return <Sword className="w-3.5 h-3.5" />;
      case 'Rocket': return <Rocket className="w-3.5 h-3.5" />;
      default: return <Library className="w-3.5 h-3.5" />;
    }
  };

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
    <div className={isDarkMode ? 'dark bg-[#0A0D14] text-slate-100 min-h-screen' : 'bg-[#F8F9FA] text-slate-800 min-h-screen'}>
      
      {/* Top Navbar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${isDarkMode ? 'bg-[#0A0D14]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 h-15 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm ${isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-amber-500 text-white'}`}>
              <Feather className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm sm:text-base block leading-tight">
                PIETAZ PRIVATE DEN
              </span>
              <span className={`text-[9px] font-mono uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Tủ Sách Dịch Thuật
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex relative w-80">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên truyện, tác giả..."
              className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border transition-colors outline-none ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-slate-100 placeholder-slate-500 focus:border-amber-500' 
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
            title={isDarkMode ? 'Giao diện Sáng' : 'Giao diện Tối'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

        </div>
      </header>

      {/* Mobile Search & Category Pills (Tối ưu vuốt ngang cực tiện cho điện thoại) */}
      <div className={`lg:hidden border-b px-4 py-3 sticky top-15 z-30 backdrop-blur-md ${isDarkMode ? 'bg-[#0D1018]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
        {/* Search input mobile */}
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên truyện, tác giả..."
            className={`w-full pl-8 pr-8 py-1.5 text-xs rounded-lg border outline-none ${
              isDarkMode ? 'bg-white/5 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Horizontal Category Slider for Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                  active 
                    ? 'bg-amber-500 text-black font-semibold shadow-sm' 
                    : isDarkMode 
                      ? 'bg-white/5 text-slate-300 border border-white/5' 
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP SIDEBAR: Chỉ hiển thị trên Desktop (Ẩn hoàn toàn trên Mobile) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#11141E] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-current/10">
                <span className="text-xs font-bold font-mono uppercase tracking-wider opacity-70">
                  Thể Loại Truyện
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-semibold">
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
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        active 
                          ? 'bg-amber-500 text-black font-semibold shadow-sm' 
                          : isDarkMode 
                            ? 'text-slate-300 hover:bg-white/5' 
                            : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={active ? 'text-black' : 'text-amber-500'}>
                          {getCategoryIcon(cat.icon)}
                        </span>
                        <span>{cat.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${active ? 'bg-black/20 text-black' : 'opacity-60'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MAIN CONTENT: Books Shelf */}
          <main className="lg:col-span-9">
            
            <div className="hidden lg:flex mb-6 items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Tất cả tác phẩm'}
                </h1>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Bấm "Đọc thử" để đọc trực tiếp các chương mẫu kèm điều hướng chương.
                </p>
              </div>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-20 border border-dashed rounded-2xl border-current/20">
                <p className="text-sm opacity-60">Không tìm thấy truyện nào.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-semibold"
                >
                  Xem tất cả truyện
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredBooks.map((book) => (
                  <div 
                    key={book.id}
                    className={`rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#12151E] border-white/10 shadow-sm' 
                        : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Book Cover Container with 3:4 aspect ratio */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900 border-b border-current/10">
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
                        
                        {/* Status Badge */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md shadow bg-black/75 text-white border border-white/15">
                          <span className={`w-1.5 h-1.5 rounded-full ${book.status === 'Hoàn thành' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                          <span>{book.status}</span>
                        </div>

                        {/* Chapter count pill */}
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono backdrop-blur-md bg-black/75 text-slate-300 border border-white/10">
                          {book.chapters.length} chương đọc thử
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="p-4">
                        <div className="text-[11px] font-mono opacity-70 mb-1">
                          Tác giả: {book.author}
                        </div>

                        <h3 className="font-bold text-base line-clamp-2 leading-snug">
                          {book.title}
                        </h3>

                        <p className={`mt-2 text-xs leading-relaxed line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {book.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {book.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className={`text-[9px] px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`p-4 pt-3 border-t flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                      <button
                        onClick={() => setReadingBook(book)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Đọc thử ({book.chapters.length})</span>
                      </button>

                      <a
                        href={book.downloadUrl}
                        download
                        className={`text-xs flex items-center gap-1 font-mono transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                        title="Tải file mẫu về máy đọc sách"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-500" />
                        <span>EPUB</span>
                      </a>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Footer */}
      <footer id="contact" className={`border-t py-10 px-4 mt-12 transition-colors ${isDarkMode ? 'bg-[#0D1017] border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <div>
            <div className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>PIETAZ PRIVATE DEN</span>
            </div>
            <p className={`text-xs mt-1 max-w-md ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Trang trưng bày và đọc thử bản dịch truyện chữ. Nhận chuyển giao file EPUB, MOBI chất lượng cao cho Kindle/Kobo.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <a 
              href="https://t.me/" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>
            <a 
              href="https://zalo.me/" 
              target="_blank" 
              rel="noreferrer"
              className={`px-4 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-slate-200' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Zalo</span>
            </a>
          </div>
        </div>

        <div className={`mt-6 pt-4 border-t text-center text-[11px] ${isDarkMode ? 'border-white/5 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
          © 2026 PIETAZ PRIVATE DEN • Archival Quality Translation Showcase
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
