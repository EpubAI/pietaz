import React, { useState, useMemo } from 'react';
import { 
  Sun, Moon, Search, BookOpen, Download, 
  ExternalLink, Layers, Sparkles, Feather, Send, MessageCircle 
} from 'lucide-react';
import { BOOKS, CATEGORIES } from './data/books';
import ReaderModal from './components/ReaderModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState(null);

  // Filter books based on category and search query
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
    <div className={isDarkMode ? 'dark bg-[#0B0D13] text-slate-100 min-h-screen' : 'bg-[#F8F9FA] text-slate-800 min-h-screen'}>
      
      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${isDarkMode ? 'bg-[#0B0D13]/85 border-white/10' : 'bg-white/85 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-amber-500 text-white'}`}>
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-base sm:text-lg block leading-tight">
                PIETAZ PRIVATE DEN
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Tủ Sách Dịch Thuật
              </span>
            </div>
          </div>

          {/* Right Actions: Dark mode toggle & Links */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a 
              href="#contact" 
              className={`hidden sm:inline text-xs font-medium hover:text-amber-500 transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Liên hệ / Đặt dịch
            </a>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
              title={isDarkMode ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Hero / Filter Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        
        {/* Intro */}
        <div className="max-w-2xl mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Thư phòng đọc thử bản dịch
          </h1>
          <p className={`mt-2.5 text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Các tác phẩm truyện dịch được trau chuốt từng câu chữ, hỗ trợ đọc trực tiếp trên web và tải file tối ưu cho máy đọc sách Kindle/Kobo.
          </p>
        </div>

        {/* Search Bar & Categories Control */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-current/10">
          
          {/* Categories Pill List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    active 
                      ? 'bg-amber-500 text-black shadow-sm font-semibold' 
                      : isDarkMode 
                        ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5' 
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
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

        </div>

      </section>

      {/* Book Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20">
        
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm opacity-60">Không tìm thấy tác phẩm nào phù hợp với bộ lọc.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-semibold"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBooks.map((book) => (
              <div 
                key={book.id}
                className={`rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-[#12151E] border-white/10 hover:border-amber-500/40' 
                    : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-sm'
                }`}
              >
                <div>
                  {/* Book Cover Container with 3:4 aspect ratio */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900 border-b border-current/10">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md shadow bg-black/60 text-white border border-white/15">
                      <span className={`w-1.5 h-1.5 rounded-full ${book.status === 'Hoàn thành' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      <span>{book.status}</span>
                    </div>

                    {/* Progress pill */}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono backdrop-blur-md bg-black/60 text-slate-300 border border-white/10">
                      {book.totalChapters}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-mono opacity-70 mb-1.5">
                      <span>Tác giả: {book.author}</span>
                    </div>

                    <h3 className="font-bold text-lg group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                      {book.title}
                    </h3>

                    <p className={`mt-2.5 text-xs leading-relaxed line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {book.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {book.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`text-[10px] px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className={`p-5 pt-3 border-t flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                  
                  {/* Read Sample CTA */}
                  <button
                    onClick={() => setReadingBook(book)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Đọc thử</span>
                  </button>

                  {/* Direct EPUB Download Trigger */}
                  <a
                    href={book.downloadUrl}
                    download
                    className={`text-xs flex items-center gap-1 font-mono transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    title="Tải file mẫu về máy đọc sách"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-500" />
                    <span>EPUB mẫu</span>
                  </a>

                </div>

              </div>
            ))}
          </div>
        )}

      </main>

      {/* Contact & Footer Section */}
      <footer id="contact" className={`border-t py-12 px-4 sm:px-6 transition-colors ${isDarkMode ? 'bg-[#0E1119] border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <div>
            <div className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>PIETAZ PRIVATE DEN</span>
            </div>
            <p className={`text-xs mt-1 max-w-md ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Trang giới thiệu và đọc thử bản dịch truyện chữ chất lượng cao. Đóng gói đầy đủ định dạng EPUB, MOBI, PDF cho Kindle và Kobo.
            </p>
          </div>

          <div className="flex items-center gap-3">
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

        <div className={`mt-8 pt-6 border-t text-center text-xs ${isDarkMode ? 'border-white/5 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
          © 2026 PIETAZ PRIVATE DEN • Tuyển Tập Truyện Dịch
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
