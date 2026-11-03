import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, List, 
  ArrowLeft, Sliders
} from 'lucide-react';

export default function ReaderModal({ book, onClose, isDarkMode }) {
  const [fontSize, setFontSize] = useState(19);
  const [lineHeight, setLineHeight] = useState(2.1); // 1.7 | 2.1 | 2.5
  const [paddingX, setPaddingX] = useState('normal'); // 'compact' | 'normal' | 'wide'
  const [fontFamily, setFontFamily] = useState('bookerly'); // 'bookerly' | 'libron'
  const [readerTheme, setReaderTheme] = useState('dark');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showChapterDrawer, setShowChapterDrawer] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  useEffect(() => {
    setReaderTheme(isDarkMode ? 'dark' : 'paper');
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentChapterIndex < book.chapters.length - 1) {
        setCurrentChapterIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentChapterIndex > 0) {
        setCurrentChapterIndex(prev => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentChapterIndex, book.chapters.length]);

  if (!book) return null;

  const currentChapter = book.chapters[currentChapterIndex] || book.chapters[0];

  const themeClasses = {
    dark: 'bg-[#0E1118] text-[#E4E7EB] border-white/10',
    sepia: 'bg-[#F4EBD9] text-[#2C241D] border-amber-900/20',
    paper: 'bg-[#FAF8F5] text-[#1E232A] border-slate-300'
  };

  const headerThemeClasses = {
    dark: 'border-white/10 bg-[#0A0D14]/90 text-slate-300',
    sepia: 'border-amber-900/10 bg-[#E8DCB8]/90 text-[#2C241D]',
    paper: 'border-slate-200 bg-[#EFECE6]/90 text-[#1E232A]'
  };

  // Helper render an toàn: Hỗ trợ cả mảng paragraphs (string[]) lẫn chuỗi HTML/text nguyên bản
  const renderChapterContent = () => {
    if (!currentChapter) return null;

    if (Array.isArray(currentChapter.content)) {
      return currentChapter.content.map((paragraph, index) => (
        <p 
          key={index} 
          className="text-justify indent-8 tracking-normal"
          style={{ lineHeight: lineHeight }}
        >
          {paragraph}
        </p>
      ));
    }

    if (typeof currentChapter.content === 'string') {
      // Nếu là chuỗi HTML
      if (currentChapter.content.includes('<p') || currentChapter.content.includes('<div') || currentChapter.content.includes('<section')) {
        return (
          <div 
            className="prose dark:prose-invert max-w-none text-justify space-y-4"
            style={{ lineHeight: lineHeight }}
            dangerouslySetInnerHTML={{ __html: currentChapter.content }}
          />
        );
      }
      // Nếu là chuỗi text thuần nhiều dòng
      return currentChapter.content.split('\n').filter(Boolean).map((para, idx) => (
        <p key={idx} className="text-justify indent-8 tracking-normal" style={{ lineHeight: lineHeight }}>
          {para}
        </p>
      ));
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-4xl h-[95vh] rounded-2xl border flex flex-col shadow-2xl overflow-hidden relative transition-colors duration-200 ${themeClasses[readerTheme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Toolbar */}
        <header className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-20 ${headerThemeClasses[readerTheme]}`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              title="Quay lại danh sách"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Table of contents button */}
            <button
              onClick={() => setShowChapterDrawer(!showChapterDrawer)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-current/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono text-xs"
              title="Mục lục các chương"
            >
              <List className="w-4 h-4 text-[#E5B54F]" />
              <span className="hidden sm:inline">Mục lục</span>
              <span className="opacity-60 text-[10px]">({book.chapters.length})</span>
            </button>
          </div>

          {/* Current chapter title snippet */}
          <div className="hidden md:block text-xs font-mono truncate max-w-xs text-center opacity-70">
            {currentChapter.title}
          </div>

          {/* Typography & layout quick controls */}
          <div className="flex items-center gap-2">
            
            {/* Font switcher */}
            <div className="hidden sm:flex items-center bg-black/10 dark:bg-white/5 rounded-lg p-0.5 text-xs font-mono border border-current/15">
              <button
                onClick={() => setFontFamily('bookerly')}
                className={`px-2 py-1 rounded transition-colors text-xs ${
                  fontFamily === 'bookerly'
                    ? 'bg-[#E5B54F] text-black font-bold shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Font Bookerly"
              >
                Bookerly
              </button>
              <button
                onClick={() => setFontFamily('libron')}
                className={`px-2 py-1 rounded transition-colors text-xs ${
                  fontFamily === 'libron'
                    ? 'bg-[#E5B54F] text-black font-bold shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title="Font Libron"
              >
                Libron
              </button>
            </div>

            {/* Font scale */}
            <div className="flex items-center border border-current/20 rounded-lg p-0.5 text-xs font-mono">
              <button 
                onClick={() => setFontSize(Math.max(14, fontSize - 1))} 
                className="px-2 py-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
                title="Giảm cỡ chữ"
              >
                A-
              </button>
              <span className="px-1 opacity-70 text-[11px] min-w-[20px] text-center">{fontSize}</span>
              <button 
                onClick={() => setFontSize(Math.min(28, fontSize + 1))} 
                className="px-2 py-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors font-bold"
                title="Tăng cỡ chữ"
              >
                A+
              </button>
            </div>

            {/* Reading themes */}
            <div className="flex items-center gap-1.5 border border-current/20 rounded-lg p-1">
              <button
                onClick={() => setReaderTheme('dark')}
                className={`w-4 h-4 rounded-full bg-[#0E1118] border border-white/40 transition-transform ${readerTheme === 'dark' ? 'scale-125 ring-2 ring-[#E5B54F]' : 'hover:scale-110'}`}
                title="Chế độ Tối"
              />
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`w-4 h-4 rounded-full bg-[#F4EBD9] border border-amber-900/40 transition-transform ${readerTheme === 'sepia' ? 'scale-125 ring-2 ring-[#E5B54F]' : 'hover:scale-110'}`}
                title="Chế độ Giấy Điệp (Sepia)"
              />
              <button
                onClick={() => setReaderTheme('paper')}
                className={`w-4 h-4 rounded-full bg-[#FAF8F5] border border-slate-400 transition-transform ${readerTheme === 'paper' ? 'scale-125 ring-2 ring-[#E5B54F]' : 'hover:scale-110'}`}
                title="Chế độ Giấy Sáng (Paper)"
              />
            </div>

            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Floating Toggle Nút Cài Đặt Chi Tiết */}
        <button
          onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
          className={`absolute bottom-6 right-6 z-30 p-3 rounded-full shadow-2xl border transition-all ${
            showSettingsDrawer 
              ? 'bg-[#E5B54F] text-black border-[#E5B54F]' 
              : 'bg-black/80 text-white border-white/20 hover:scale-110'
          }`}
          title="Tùy biến giãn dòng & căn lề"
        >
          <Sliders className="w-5 h-5" />
        </button>

        {/* Settings Drawer */}
        {showSettingsDrawer && (
          <div className="absolute bottom-20 right-6 z-30 w-72 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 bg-inherit border-current/20 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-current/10">
              <span className="font-bold text-xs font-mono uppercase tracking-wider text-[#E5B54F]">Cấu Hình Đọc Sách</span>
              <button onClick={() => setShowSettingsDrawer(false)} className="opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Giãn dòng */}
            <div>
              <span className="block text-[11px] font-mono opacity-70 mb-1.5">Giãn dòng (Line Height)</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setLineHeight(1.7)}
                  className={`py-1.5 rounded border transition-all ${lineHeight === 1.7 ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  Gọn
                </button>
                <button
                  onClick={() => setLineHeight(2.1)}
                  className={`py-1.5 rounded border transition-all ${lineHeight === 2.1 ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  Chuẩn
                </button>
                <button
                  onClick={() => setLineHeight(2.5)}
                  className={`py-1.5 rounded border transition-all ${lineHeight === 2.5 ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  Rộng
                </button>
              </div>
            </div>

            {/* Căn lề hai bên */}
            <div>
              <span className="block text-[11px] font-mono opacity-70 mb-1.5">Căn lề trang (Margins)</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setPaddingX('compact')}
                  className={`py-1.5 rounded border transition-all ${paddingX === 'compact' ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  Hẹp
                </button>
                <button
                  onClick={() => setPaddingX('normal')}
                  className={`py-1.5 rounded border transition-all ${paddingX === 'normal' ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  Tiêu chuẩn
                </button>
                <button
                  onClick={() => setPaddingX('wide')}
                  className={`py-1.5 rounded border transition-all ${paddingX === 'wide' ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15 hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  Rộng
                </button>
              </div>
            </div>

            {/* Phông chữ cho mobile */}
            <div className="sm:hidden pt-2 border-t border-current/10">
              <span className="block text-[11px] font-mono opacity-70 mb-1.5">Phông chữ</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setFontFamily('bookerly')}
                  className={`py-1.5 rounded border ${fontFamily === 'bookerly' ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15'}`}
                >
                  Bookerly
                </button>
                <button
                  onClick={() => setFontFamily('libron')}
                  className={`py-1.5 rounded border ${fontFamily === 'libron' ? 'bg-[#E5B54F] text-black font-bold border-[#E5B54F]' : 'border-current/15'}`}
                >
                  Libron
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Chapter Selection Drawer (Mục lục trượt) */}
        {showChapterDrawer && (
          <div className="absolute inset-y-12 left-0 w-72 sm:w-80 bg-inherit border-r border-current/15 shadow-2xl z-30 flex flex-col backdrop-blur-xl animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-current/10 flex items-center justify-between">
              <span className="font-bold text-sm font-mono">Mục Lục Các Chương</span>
              <button onClick={() => setShowChapterDrawer(false)} className="p-1 hover:opacity-75">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
              {book.chapters.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setShowChapterDrawer(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    idx === currentChapterIndex 
                      ? 'bg-[#E5B54F] text-black font-semibold' 
                      : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
                  }`}
                >
                  <span className="truncate">{chap.title}</span>
                  <span className="text-[10px] opacity-70 font-mono">#{chap.id}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reading Body */}
        {(() => {
          const paddingClass = 
            paddingX === 'compact' ? 'px-3 sm:px-8' :
            paddingX === 'wide' ? 'px-8 sm:px-24' : 'px-5 sm:px-16';

          return (
            <div 
              className={`flex-1 overflow-y-auto py-10 selection:bg-[#E5B54F] selection:text-black ${paddingClass} ${
                fontFamily === 'bookerly' ? 'font-bookerly' : 'font-libron'
              }`}
              style={{ fontSize: `${fontSize}px` }}
            >
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center pb-8 border-b border-current/15 mb-8">
                  <span className="font-sans text-xs tracking-widest uppercase opacity-60">
                    {book.title}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                    {currentChapter.title}
                  </h1>
                  <div className="flex items-center justify-center gap-3 font-sans text-xs opacity-60 mt-2 font-mono flex-wrap">
                    <span>Tác giả: {book.author}</span>
                    <span>•</span>
                    <span className="text-[#E5B54F]">Phông: {fontFamily === 'bookerly' ? 'Bookerly' : 'Libron'}</span>
                    <span>•</span>
                    <span>Chương {currentChapterIndex + 1}/{book.chapters.length}</span>
                  </div>
                </div>

                {renderChapterContent()}

                {/* Bottom Chapter Switcher Navigation */}
                <div className="pt-12 border-t border-current/10 flex items-center justify-between font-sans text-xs mt-12">
                  <button
                    disabled={currentChapterIndex === 0}
                    onClick={() => setCurrentChapterIndex(prev => prev - 1)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-current/15 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Chương trước</span>
                  </button>
                  <span className="opacity-60 font-mono text-[11px]">
                    {currentChapterIndex + 1} / {book.chapters.length}
                  </span>
                  <button
                    disabled={currentChapterIndex === book.chapters.length - 1}
                    onClick={() => setCurrentChapterIndex(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-current/15 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono"
                  >
                    <span>Chương sau</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
