import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Palette, ArrowLeft } from 'lucide-react';

export default function ReaderModal({ book, onClose, isDarkMode }) {
  const [fontSize, setFontSize] = useState(18);
  const [readerTheme, setReaderTheme] = useState('dark'); // 'dark' | 'sepia' | 'paper'

  useEffect(() => {
    // sync initial theme with global dark mode
    setReaderTheme(isDarkMode ? 'dark' : 'paper');
  }, [isDarkMode]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!book) return null;

  const themeClasses = {
    dark: 'bg-[#12151D] text-slate-200 border-white/10',
    sepia: 'bg-[#F4EBD9] text-[#2C241D] border-amber-900/20',
    paper: 'bg-[#FAF8F5] text-[#1E232A] border-slate-300'
  };

  const headerThemeClasses = {
    dark: 'border-white/10 bg-[#0C0E14]/80 text-slate-300',
    sepia: 'border-amber-900/10 bg-[#E8DCB8]/80 text-[#2C241D]',
    paper: 'border-slate-200 bg-[#EFECE6]/80 text-[#1E232A]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-4xl h-[94vh] rounded-xl border flex flex-col shadow-2xl overflow-hidden transition-colors duration-200 ${themeClasses[readerTheme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar */}
        <header className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 ${headerThemeClasses[readerTheme]}`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              title="Quay lại danh sách"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-sm font-semibold truncate max-w-[200px] sm:max-w-md">{book.title}</h2>
              <p className="text-xs opacity-75">{book.sampleChapter.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Font scale buttons */}
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

            {/* Reading theme toggles */}
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

        {/* Reading Content */}
        <div 
          className="flex-1 overflow-y-auto px-6 sm:px-16 py-10 font-serif-reading leading-relaxed selection:bg-amber-500 selection:text-black"
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center pb-8 border-b border-current/15 mb-8">
              <span className="font-sans text-xs tracking-widest uppercase opacity-60">Chương đọc thử</span>
              <h1 className="text-2xl sm:text-3xl font-bold mt-2">{book.sampleChapter.title}</h1>
              <p className="font-sans text-xs opacity-60 mt-2 font-mono">Nguyên tác: {book.originalTitle} • Dịch giả: Pietaz</p>
            </div>

            {book.sampleChapter.content.map((paragraph, index) => (
              <p key={index} className="text-justify indent-7 leading-[2]">
                {paragraph}
              </p>
            ))}

            <div className="pt-12 text-center font-sans">
              <div className="inline-block p-6 rounded-xl border border-current/15 bg-black/5 dark:bg-white/5 max-w-lg">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Hết chương đọc thử 1
                </span>
                <p className="text-xs opacity-75 mt-2 leading-relaxed">
                  Để đọc các chương tiếp theo hoặc tải toàn văn định dạng EPUB/PDF chuẩn cho máy đọc sách Kindle/Kobo, vui lòng liên hệ nhóm dịch.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <a 
                    href="https://t.me/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400 transition-colors"
                  >
                    Liên hệ Telegram
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-current/20 text-xs font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    Đóng lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
