import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, List, 
  ArrowLeft, BookOpen, Sun, Moon 
} from 'lucide-react';

export default function ReaderModal({ book, onClose, isDarkMode }) {
  const [fontSize, setFontSize] = useState(18);
  const [readerTheme, setReaderTheme] = useState('dark');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showChapterDrawer, setShowChapterDrawer] = useState(false);

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
    dark: 'bg-[#12151D] text-slate-200 border-white/10',
    sepia: 'bg-[#F4EBD9] text-[#2C241D] border-amber-900/20',
    paper: 'bg-[#FAF8F5] text-[#1E232A] border-slate-300'
  };

  const headerThemeClasses = {
    dark: 'border-white/10 bg-[#0C0E14]/85 text-slate-300',
    sepia: 'border-amber-900/10 bg-[#E8DCB8]/85 text-[#2C241D]',
    paper: 'border-slate-200 bg-[#EFECE6]/85 text-[#1E232A]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-4xl h-[95vh] rounded-2xl border flex flex-col shadow-2xl overflow-hidden relative transition-colors duration-200 ${themeClasses[readerTheme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Toolbar */}
        <header className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-20 ${headerThemeClasses[readerTheme]}`}>
          <div className="flex items-center gap-3">
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-current/20 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs font-mono"
              title="Mục lục các chương"
            >
              <List className="w-3.5 h-3.5" />
              <span>Chương ({currentChapterIndex + 1}/{book.chapters.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Font scale */}
            <div className="flex items-center border border-current/20 rounded-lg p-0.5 text-xs font-mono">
              <button 
                onClick={() => setFontSize(Math.max(14, fontSize - 1))} 
                className="px-2 py-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
                title="Giảm cỡ chữ"
              >
                A-
              </button>
              <span className="px-1.5 opacity-70 text-[11px]">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(Math.min(26, fontSize + 1))} 
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
                className={`w-4 h-4 rounded-full bg-[#12151D] border border-white/40 transition-transform ${readerTheme === 'dark' ? 'scale-125 ring-2 ring-amber-500' : 'hover:scale-110'}`}
                title="Chế độ Tối"
              />
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`w-4 h-4 rounded-full bg-[#F4EBD9] border border-amber-900/40 transition-transform ${readerTheme === 'sepia' ? 'scale-125 ring-2 ring-amber-500' : 'hover:scale-110'}`}
                title="Chế độ Giấy Điệp (Sepia)"
              />
              <button
                onClick={() => setReaderTheme('paper')}
                className={`w-4 h-4 rounded-full bg-[#FAF8F5] border border-slate-400 transition-transform ${readerTheme === 'paper' ? 'scale-125 ring-2 ring-amber-500' : 'hover:scale-110'}`}
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

        {/* Chapter Selection Drawer (Mục lục trượt) */}
        {showChapterDrawer && (
          <div className="absolute inset-y-12 left-0 w-72 sm:w-80 bg-inherit border-r border-current/15 shadow-2xl z-30 flex flex-col backdrop-blur-xl animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-current/10 flex items-center justify-between">
              <span className="font-bold text-sm">Mục Lục Các Chương</span>
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
                      ? 'bg-amber-500 text-black font-semibold' 
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
        <div 
          className="flex-1 overflow-y-auto px-6 sm:px-16 py-10 font-serif-reading leading-relaxed selection:bg-amber-500 selection:text-black"
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
              <p className="font-sans text-xs opacity-60 mt-2 font-mono">
                Tác giả: {book.author} • Chương {currentChapterIndex + 1}/{book.chapters.length}
              </p>
            </div>

            {currentChapter.content.map((paragraph, index) => (
              <p key={index} className="text-justify indent-7 leading-[2]">
                {paragraph}
              </p>
            ))}

            {/* Bottom Chapter Switcher Navigation */}
            <div className="pt-12 border-t border-current/10 flex items-center justify-between font-sans text-xs mt-12">
              <button
                disabled={currentChapterIndex === 0}
                onClick={() => setCurrentChapterIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl border border-current/20 flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Chương trước</span>
              </button>

              <button
                onClick={() => setShowChapterDrawer(true)}
                className="font-mono text-amber-500 hover:underline"
              >
                Mục lục chương
              </button>

              <button
                disabled={currentChapterIndex >= book.chapters.length - 1}
                onClick={() => setCurrentChapterIndex(prev => Math.min(book.chapters.length - 1, prev + 1))}
                className="px-4 py-2.5 rounded-xl border border-current/20 flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span>Chương sau</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
