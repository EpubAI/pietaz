import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sun, Moon, Search, Feather, Send, MessageCircle, X, Sparkles, Compass, LayoutGrid, List,
  SlidersHorizontal, ArrowUpDown, ArrowUpNarrowWide, ArrowDownWideNarrow, RotateCcw, DollarSign
} from 'lucide-react';
import { BOOKS } from './data/books';
import { CATEGORIES } from './data/categories';
import { getBookPrice } from './data/pricing';
import { InteractiveBookCard } from './components/InteractiveBookCard';
import { CompactBookRow } from './components/CompactBookRow';
import { BookDetailModal } from './components/BookDetailModal';
import { TrendingSpotlight } from './components/TrendingSpotlight';
import { recordBookInteraction, getTrendingBooks, fetchRemoteViews } from './utils/analytics';
import ReaderModal from './components/ReaderModal';
import { normalizeVietnamese } from './utils/text';

// Định nghĩa các preset khoảng giá nhanh
const PRICE_PRESETS = [
  { id: 'all', label: 'Tất cả mức giá' },
  { id: 'free', label: 'Miễn phí (0 đ)' },
  { id: 'under-100k', label: 'Dưới 100.000 đ' },
  { id: '100k-200k', label: '100.000 - 200.000 đ' },
  { id: 'above-200k', label: 'Trên 200.000 đ' },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState(null);
  const [detailBook, setDetailBook] = useState(null);
  const [trendingTimeframe, setTrendingTimeframe] = useState('week');
  const [remoteViews, setRemoteViews] = useState({});

  // State lọc và sắp xếp theo giá
  const [pricePreset, setPricePreset] = useState('all');
  const [customMinPrice, setCustomMinPrice] = useState('');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('default'); // 'default' | 'price-asc' | 'price-desc' | 'chapters-desc'

  // Tự động inject Schema.org JSON-LD CollectionPage + Books vào head để tối ưu Google & AI SEO
  useEffect(() => {
    const existing = document.getElementById('piepub-schema-jsonld');
    if (existing) existing.remove();

    const bookItems = BOOKS.slice(0, 35).map((b, idx) => ({
      "@type": "Book",
      "name": b.title,
      "alternateName": b.originalTitle || undefined,
      "author": {
        "@type": "Person",
        "name": b.author
      },
      "inLanguage": "vi",
      "description": b.description || undefined,
      "url": "https://piepub.net"
    }));

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "PIETAZ PRIVATE DEN — Thư Khố Đọc Thử Bản Dịch Tuyển Chọn",
      "url": "https://piepub.net",
      "description": "Thư phòng đọc thử các bản dịch truyện chọn lọc, lọc theo thể loại và trải nghiệm đọc tinh gọn.",
      "inLanguage": "vi",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": BOOKS.length,
        "itemListElement": bookItems.map((item, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": item
        }))
      }
    };

    const script = document.createElement('script');
    script.id = 'piepub-schema-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('piepub-schema-jsonld');
      if (el) el.remove();
    };
  }, []);

  // Tự động tải số lượt view từ Cloudflare Worker API
  useEffect(() => {
    let isMounted = true;
    fetchRemoteViews(trendingTimeframe).then((views) => {
      if (isMounted && views && Object.keys(views).length > 0) {
        setRemoteViews(views);
      }
    });
    return () => { isMounted = false; };
  }, [trendingTimeframe]);

  // Top tác phẩm xem nhiều (Trending) theo tuần / tháng kết hợp Cloudflare Views
  const trendingBooks = useMemo(() => {
    return getTrendingBooks(BOOKS, trendingTimeframe, remoteViews, 6);
  }, [trendingTimeframe, remoteViews]);

  const handleReadBook = (book) => {
    recordBookInteraction(book?.id);
    setReadingBook(book);
  };

  const handleSelectDetail = (book) => {
    recordBookInteraction(book?.id);
    setDetailBook(book);
  };

  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('piepub_view_mode');
    if (saved) return saved;
    // Mặc định: hàng ngang (list) trên máy tính/tablet (>=768px), cột thẻ (grid) trên điện thoại (<768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'grid';
    }
    return 'list';
  });

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('piepub_view_mode', mode);
    } catch (e) {
      // ignore
    }
  };

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

  // Reset toàn bộ bộ lọc
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPricePreset('all');
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setSortOption('default');
  };

  const isFilterActive = selectedCategory !== 'all' || searchQuery.trim() !== '' || pricePreset !== 'all' || customMinPrice !== '' || customMaxPrice !== '' || sortOption !== 'default';

  // Filter books với chuẩn hóa không dấu, tìm kiếm toàn diện và lọc theo giá
  const filteredBooks = useMemo(() => {
    const queryNorm = normalizeVietnamese(searchQuery);

    const minPriceNum = customMinPrice !== '' ? parseInt(customMinPrice.replace(/\D/g, ''), 10) : null;
    const maxPriceNum = customMaxPrice !== '' ? parseInt(customMaxPrice.replace(/\D/g, ''), 10) : null;

    let result = BOOKS.filter((book) => {
      const bookCats = getBookCategories(book);
      
      // 1. Lọc theo thể loại
      const matchCategory = selectedCategory === 'all' || bookCats.includes(selectedCategory);
      if (!matchCategory) return false;

      // 2. Lọc theo từ khóa tìm kiếm (nếu có)
      if (queryNorm) {
        const titleNorm = normalizeVietnamese(book.title);
        const originalTitleNorm = normalizeVietnamese(book.originalTitle || '');
        const authorNorm = normalizeVietnamese(book.author);
        const descNorm = normalizeVietnamese(book.description || '');
        const matchTag = Array.isArray(book.tags) && book.tags.some(t => normalizeVietnamese(t).includes(queryNorm));

        const matchSearch = 
          titleNorm.includes(queryNorm) ||
          originalTitleNorm.includes(queryNorm) ||
          authorNorm.includes(queryNorm) ||
          descNorm.includes(queryNorm) ||
          matchTag;

        if (!matchSearch) return false;
      }

      // 3. Lọc theo giá
      const priceInfo = getBookPrice(book);
      const bookPrice = priceInfo?.price ?? 0;

      // Lọc theo khoảng tùy chỉnh (Từ ... Đến ...) nếu có nhập
      if (minPriceNum !== null && !isNaN(minPriceNum) && bookPrice < minPriceNum) {
        return false;
      }
      if (maxPriceNum !== null && !isNaN(maxPriceNum) && bookPrice > maxPriceNum) {
        return false;
      }

      // Lọc theo preset (nếu người dùng chưa nhập khoảng tùy chỉnh)
      if (minPriceNum === null && maxPriceNum === null) {
        if (pricePreset === 'free' && bookPrice > 0) return false;
        if (pricePreset === 'under-100k' && (bookPrice <= 0 || bookPrice >= 100000)) return false;
        if (pricePreset === '100k-200k' && (bookPrice < 100000 || bookPrice > 200000)) return false;
        if (pricePreset === 'above-200k' && bookPrice <= 200000) return false;
      }

      return true;
    });

    // 4. Sắp xếp danh sách
    if (sortOption === 'price-asc') {
      result.sort((a, b) => (getBookPrice(a)?.price ?? 0) - (getBookPrice(b)?.price ?? 0));
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => (getBookPrice(b)?.price ?? 0) - (getBookPrice(a)?.price ?? 0));
    } else if (sortOption === 'chapters-desc') {
      const getChapCount = (b) => {
        const m = (b.totalChapters || '').match(/(\d+)\s*chương/);
        return m ? parseInt(m[1], 10) : (Array.isArray(b.chapters) ? b.chapters.length : 0);
      };
      result.sort((a, b) => getChapCount(b) - getChapCount(a));
    }

    return result;
  }, [selectedCategory, searchQuery, pricePreset, customMinPrice, customMaxPrice, sortOption]);

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
              className={`w-full pl-9 pr-8 py-1.5 text-xs rounded border transition-colors outline-none font-mono ${
                isDarkMode 
                  ? 'bg-white/[0.03] border-white/10 text-zinc-200 placeholder-zinc-500 focus:border-[#E5B54F]/50' 
                  : 'bg-black/[0.02] border-black/10 text-zinc-800 placeholder-zinc-400 focus:border-amber-600/50'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Contact Links & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Telegram */}
            <a 
              href="https://t.me/pietaz" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                isDarkMode 
                  ? 'border-white/15 hover:bg-white/5 text-zinc-200 hover:border-white/30' 
                  : 'border-black/15 hover:bg-black/5 text-zinc-800 hover:border-black/30'
              }`}
              title="Nhắn tin Telegram cho Admin"
            >
              <Send className="w-3.5 h-3.5 text-[#E5B54F]" />
              <span className="hidden sm:inline">Telegram</span>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/ninh.trieu.129/" 
              target="_blank" 
              rel="noopener noreferrer"
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

        {/* Dropdown chọn thể loại, mức giá & sắp xếp trên Mobile */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Thể loại */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-2.5 py-2 text-xs rounded-lg border outline-none font-mono appearance-none transition-colors pr-7 truncate ${
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
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-60">
              ▼
            </div>
          </div>

          {/* Sắp xếp */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={`w-full px-2.5 py-2 text-xs rounded-lg border outline-none font-mono appearance-none transition-colors pr-7 truncate ${
                isDarkMode 
                  ? 'bg-[#121620] border-white/15 text-zinc-100 focus:border-[#E5B54F]' 
                  : 'bg-white border-black/15 text-zinc-800 focus:border-amber-600'
              }`}
            >
              <option value="default">Sắp xếp: Mới nhất</option>
              <option value="price-asc">Giá: Thấp ➔ Cao</option>
              <option value="price-desc">Giá: Cao ➔ Thấp</option>
              <option value="chapters-desc">Quy mô: Nhiều chương nhất</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-60">
              ▼
            </div>
          </div>
        </div>

        {/* Mức giá nhanh & Toggle View Mobile */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={pricePreset}
              onChange={(e) => {
                setPricePreset(e.target.value);
                setCustomMinPrice('');
                setCustomMaxPrice('');
              }}
              className={`w-full px-2.5 py-1.5 text-xs rounded-lg border outline-none font-mono appearance-none transition-colors pr-7 truncate ${
                isDarkMode 
                  ? 'bg-[#121620] border-white/15 text-zinc-100 focus:border-[#E5B54F]' 
                  : 'bg-white border-black/15 text-zinc-800 focus:border-amber-600'
              }`}
            >
              {PRICE_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-60">
              ▼
            </div>
          </div>

          {isFilterActive && (
            <button
              onClick={handleResetFilters}
              className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 ${
                isDarkMode ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-red-400 text-red-600 bg-red-50'
              }`}
              title="Đặt lại bộ lọc"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Toggle view mode mobile */}
          <div className={`flex items-center rounded-lg border p-0.5 ${isDarkMode ? 'border-white/15 bg-white/[0.02]' : 'border-black/15 bg-black/[0.02]'}`}>
            <button
              onClick={() => handleSetViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? (isDarkMode ? 'bg-[#E5B54F] text-black' : 'bg-amber-600 text-white') : 'opacity-60 hover:opacity-100'}`}
              title="Danh sách gọn (1 hàng)"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSetViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? (isDarkMode ? 'bg-[#E5B54F] text-black' : 'bg-amber-600 text-white') : 'opacity-60 hover:opacity-100'}`}
              title="Thẻ 3D lớn (2 cột)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar (Bộ lọc & Tiện ích) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-5">
            
            {/* KHỐI 1: THỂ LOẠI */}
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#0C0E14] border-white/[0.08]' : 'bg-white border-black/[0.08]'}`}>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-current/10 font-mono text-[11px]">
                <span className="uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#E5B54F]" />
                  Thể Loại Truyện
                </span>
                <span className="text-[#E5B54F] font-bold">
                  {filteredBooks.length} Tác phẩm
                </span>
              </div>

              <nav className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
                {availableCategories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? BOOKS.length 
                    : BOOKS.filter(b => getBookCategories(b).includes(cat.id)).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-mono transition-all ${
                        active 
                          ? isDarkMode 
                            ? 'bg-[#E5B54F] text-black font-semibold shadow-sm' 
                            : 'bg-amber-600 text-white font-semibold shadow-sm'
                          : isDarkMode 
                            ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' 
                            : 'text-zinc-600 hover:text-black hover:bg-black/[0.03]'
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono shrink-0 ml-2 ${active ? 'bg-black/20 text-current' : 'opacity-50'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* KHỐI 2: LỌC THEO MỨC GIÁ & KHOẢNG GIÁ TÙY CHỈNH */}
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#0C0E14] border-white/[0.08]' : 'bg-white border-black/[0.08]'}`}>
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-current/10 font-mono text-[11px]">
                <span className="uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#E5B54F]" />
                  Mức Giá Tác Phẩm
                </span>
                {(pricePreset !== 'all' || customMinPrice || customMaxPrice) && (
                  <button
                    onClick={() => {
                      setPricePreset('all');
                      setCustomMinPrice('');
                      setCustomMaxPrice('');
                    }}
                    className="text-[10px] text-zinc-400 hover:text-[#E5B54F] flex items-center gap-1"
                    title="Đặt lại giá"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Các nút chọn khoảng giá nhanh */}
              <div className="space-y-1 mb-3">
                {PRICE_PRESETS.map((p) => {
                  const active = pricePreset === p.id && !customMinPrice && !customMaxPrice;
                  let count = 0;
                  if (p.id === 'all') count = BOOKS.length;
                  else if (p.id === 'free') count = BOOKS.filter(b => (getBookPrice(b)?.price ?? 0) === 0).length;
                  else if (p.id === 'under-100k') count = BOOKS.filter(b => {
                    const pr = getBookPrice(b)?.price ?? 0;
                    return pr > 0 && pr < 100000;
                  }).length;
                  else if (p.id === '100k-200k') count = BOOKS.filter(b => {
                    const pr = getBookPrice(b)?.price ?? 0;
                    return pr >= 100000 && pr <= 200000;
                  }).length;
                  else if (p.id === 'above-200k') count = BOOKS.filter(b => (getBookPrice(b)?.price ?? 0) > 200000).length;

                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPricePreset(p.id);
                        setCustomMinPrice('');
                        setCustomMaxPrice('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-mono transition-all ${
                        active
                          ? isDarkMode 
                            ? 'bg-[#E5B54F] text-black font-semibold' 
                            : 'bg-amber-600 text-white font-semibold'
                          : isDarkMode 
                            ? 'text-zinc-400 hover:text-white hover:bg-white/[0.03]' 
                            : 'text-zinc-600 hover:text-black hover:bg-black/[0.03]'
                      }`}
                    >
                      <span>{p.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${active ? 'bg-black/20 text-current' : 'opacity-50'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Nhập khoảng giá tùy chỉnh: Từ ... Đến ... */}
              <div className="pt-2.5 border-t border-current/10">
                <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Khoảng giá tùy chỉnh (đ)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="10000"
                    min="0"
                    placeholder="Từ (vd: 50000)"
                    value={customMinPrice}
                    onChange={(e) => {
                      setCustomMinPrice(e.target.value);
                      setPricePreset('custom');
                    }}
                    className={`w-1/2 px-2 py-1 text-[11px] rounded border outline-none font-mono ${
                      isDarkMode ? 'bg-white/[0.04] border-white/10 text-zinc-100 placeholder-zinc-600 focus:border-[#E5B54F]' : 'bg-black/[0.03] border-black/10 text-zinc-800 placeholder-zinc-400 focus:border-amber-600'
                    }`}
                  />
                  <span className="text-xs text-zinc-500 font-mono">-</span>
                  <input
                    type="number"
                    step="10000"
                    min="0"
                    placeholder="Đến (vd: 150000)"
                    value={customMaxPrice}
                    onChange={(e) => {
                      setCustomMaxPrice(e.target.value);
                      setPricePreset('custom');
                    }}
                    className={`w-1/2 px-2 py-1 text-[11px] rounded border outline-none font-mono ${
                      isDarkMode ? 'bg-white/[0.04] border-white/10 text-zinc-100 placeholder-zinc-600 focus:border-[#E5B54F]' : 'bg-black/[0.03] border-black/10 text-zinc-800 placeholder-zinc-400 focus:border-amber-600'
                    }`}
                  />
                </div>
                {(customMinPrice || customMaxPrice) && (
                  <p className="text-[10px] text-[#E5B54F] font-mono mt-1.5">
                    Đang lọc: {customMinPrice ? `${parseInt(customMinPrice, 10).toLocaleString('vi-VN')} đ` : '0 đ'} ➔ {customMaxPrice ? `${parseInt(customMaxPrice, 10).toLocaleString('vi-VN')} đ` : 'Vô cực'}
                  </p>
                )}
              </div>
            </div>

          </aside>

          {/* Gallery / Feed of Books */}
          <main className="lg:col-span-9">
            
            {/* Header thanh công cụ: Tiêu đề + Bộ sắp xếp + Chuyển đổi View Mode */}
            <div className="flex mb-6 items-center justify-between border-b border-current/10 pb-3 flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold font-mono uppercase tracking-widest flex items-center gap-2">
                  <span>{CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Tất cả tác phẩm'}</span>
                  <Sparkles className="w-4 h-4 text-[#E5B54F]" />
                  <span className="text-xs font-normal opacity-50 font-mono">({filteredBooks.length})</span>
                </h1>

                {/* Badge trạng thái lọc giá nếu đang kích hoạt */}
                {(pricePreset !== 'all' || customMinPrice || customMaxPrice) && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                    isDarkMode ? 'bg-[#E5B54F]/10 border-[#E5B54F]/30 text-[#E5B54F]' : 'bg-amber-50 border-amber-300 text-amber-800'
                  }`}>
                    <DollarSign className="w-3 h-3" />
                    {customMinPrice || customMaxPrice 
                      ? `${customMinPrice || '0'} - ${customMaxPrice || '∞'} đ`
                      : PRICE_PRESETS.find(p => p.id === pricePreset)?.label}
                  </span>
                )}

                {isFilterActive && (
                  <button
                    onClick={handleResetFilters}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                      isDarkMode ? 'border-white/10 hover:border-white/30 text-zinc-400 hover:text-white' : 'border-black/10 hover:border-black/30 text-zinc-600 hover:text-black'
                    }`}
                    title="Đặt lại toàn bộ bộ lọc"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Đặt lại
                  </button>
                )}
              </div>

              {/* Các nút công cụ bên phải (Desktop Sắp xếp & Chế độ xem) */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Desktop Sort Dropdown */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3" />
                    Sắp xếp:
                  </span>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className={`px-2.5 py-1 text-xs rounded-lg border outline-none font-mono appearance-none transition-colors pr-7 ${
                        isDarkMode 
                          ? 'bg-[#0E1118] border-white/10 text-zinc-200 focus:border-[#E5B54F]' 
                          : 'bg-zinc-100 border-black/10 text-zinc-800 focus:border-amber-600'
                      }`}
                    >
                      <option value="default">Mới cập nhật</option>
                      <option value="price-asc">Giá: Thấp ➔ Cao</option>
                      <option value="price-desc">Giá: Cao ➔ Thấp</option>
                      <option value="chapters-desc">Quy mô: Nhiều chương nhất</option>
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-60">
                      ▼
                    </div>
                  </div>
                </div>

                {/* View Switcher (Desktop & Tablet) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-zinc-400 mr-1 hidden md:inline">Chế độ xem:</span>
                  <div className={`flex items-center rounded-lg border p-0.5 ${isDarkMode ? 'border-white/10 bg-[#0E1118]' : 'border-black/10 bg-zinc-100'}`}>
                    <button
                      onClick={() => handleSetViewMode('list')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
                        viewMode === 'list'
                          ? isDarkMode
                            ? 'bg-[#E5B54F] text-black font-bold shadow-sm'
                            : 'bg-amber-600 text-white font-bold shadow-sm'
                          : isDarkMode
                            ? 'text-zinc-400 hover:text-white'
                            : 'text-zinc-600 hover:text-black'
                      }`}
                      title="Chế độ 1 hàng / tác phẩm (Gọn gàng, dễ quét danh sách)"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span className="text-[11px]">1 Hàng (Gọn)</span>
                    </button>

                    <button
                      onClick={() => handleSetViewMode('grid')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
                        viewMode === 'grid'
                          ? isDarkMode
                            ? 'bg-[#E5B54F] text-black font-bold shadow-sm'
                            : 'bg-amber-600 text-white font-bold shadow-sm'
                          : isDarkMode
                            ? 'text-zinc-400 hover:text-white'
                            : 'text-zinc-600 hover:text-black'
                      }`}
                      title="Chế độ thẻ lớn 3D (2 cột)"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span className="text-[11px]">2 Cột (Thẻ 3D)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-20 border border-dashed rounded-xl border-current/20 font-mono text-xs text-zinc-400">
                <p className="text-sm mb-1 text-zinc-300">Không tìm thấy tác phẩm nào phù hợp với bộ lọc hiện tại.</p>
                <p className="text-zinc-500 mb-4">Hãy thử điều chỉnh khoảng giá, thể loại hoặc xóa từ khóa tìm kiếm.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg bg-[#E5B54F] text-black font-semibold hover:bg-[#d6a540] transition-colors"
                >
                  Đặt lại toàn bộ bộ lọc
                </button>
              </div>
            ) : viewMode === 'list' ? (
              /* VIEW 1 HÀNG GỌN GÀNG (COMPACT ROW) */
              <div className="space-y-3.5">
                {filteredBooks.map((book) => (
                  <CompactBookRow
                    key={book.id}
                    book={book}
                    onRead={(selected) => handleReadBook(selected)}
                    onSelectDetail={(selected) => handleSelectDetail(selected)}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            ) : (
              /* VIEW 2 CỘT THẺ 3D TRUYỀN THỐNG */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <InteractiveBookCard
                    key={book.id}
                    book={book}
                    onRead={(selected) => handleReadBook(selected)}
                    onSelectDetail={(selected) => handleSelectDetail(selected)}
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
            <p className="text-[11px] text-zinc-500 font-sans">
              * Mọi dữ liệu sách và trích đoạn đều nhằm mục đích giới thiệu văn hóa và tham khảo học thuật phi thương mại.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a 
              href="https://t.me/pietaz" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded border font-mono text-xs transition-colors flex items-center gap-2 ${
                isDarkMode 
                  ? 'border-white/10 hover:border-[#E5B54F] hover:text-[#E5B54F] text-zinc-300' 
                  : 'border-black/10 hover:border-amber-600 hover:text-amber-800 text-zinc-700'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Liên hệ qua Telegram</span>
            </a>
            
            <a 
              href="https://www.facebook.com/ninh.trieu.129/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded border font-mono text-xs transition-colors flex items-center gap-2 ${
                isDarkMode 
                  ? 'border-white/10 hover:border-blue-400 hover:text-blue-400 text-zinc-300' 
                  : 'border-black/10 hover:border-blue-600 hover:text-blue-600 text-zinc-700'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Facebook Admin</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Reader Modal (Đọc sách trực tiếp) */}
      {readingBook && (
        <ReaderModal 
          book={readingBook} 
          onClose={() => setReadingBook(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Book Detail Modal (Chi tiết tác phẩm & Bài review chuyên sâu) */}
      {detailBook && (
        <BookDetailModal
          book={detailBook}
          onClose={() => setDetailBook(null)}
          onReadBook={(selected) => {
            setDetailBook(null);
            handleReadBook(selected);
          }}
          isDarkMode={isDarkMode}
        />
      )}

    </div>
  );
}
