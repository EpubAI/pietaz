import React, { useState } from 'react';
import { Info, X, BookOpen, Award, FileText } from 'lucide-react';
import { getBookPrice } from '../data/pricing';

export function BookDetailModal({ book, isOpen, onClose, onRead, onReadBook, isDarkMode }) {
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  // Hỗ trợ cả trường hợp truyền isOpen (boolean) lẫn truyền thẳng book (khi detailBook != null)
  const isModalVisible = typeof isOpen === 'boolean' ? isOpen : Boolean(book);
  if (!isModalVisible || !book) return null;

  const handleRead = onRead || onReadBook || (() => {});
  const coverSrc = book.cover || book.coverImage || './covers/ban-tron-chi-mang.jpg';
  const pricing = getBookPrice(book);

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className={`relative max-w-2xl w-full max-h-[90vh] rounded-2xl border flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${
            isDarkMode ? 'bg-[#0D1017] text-[#E4E7EB] border-white/15' : 'bg-white text-[#1A1F2C] border-black/15'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header popup */}
          <div className="p-4 sm:p-5 border-b border-current/10 flex items-center justify-between sticky top-0 bg-inherit backdrop-blur-md z-10">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#E5B54F]" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">Hồ Sơ Tác Phẩm</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nội dung chi tiết cuộn */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            
            {/* Khối thông tin cơ bản: Bìa + Tiêu đề + Quy mô */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
              <div 
                className="relative group shrink-0 cursor-pointer"
                onClick={() => setIsCoverModalOpen(true)}
                title="Bấm để xem ảnh bìa lớn"
              >
                <img 
                  src={coverSrc} 
                  alt={book.title}
                  className="w-28 sm:w-36 h-40 sm:h-52 object-cover rounded-xl shadow-lg border border-white/10 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity">
                  <span className="text-[10px] font-mono bg-black/80 px-2 py-1 rounded text-white border border-white/20">Xem bìa</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <h2 className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-[#E5B54F]">
                  {book.title}
                </h2>
                {book.originalTitle && (
                  <p className="text-xs font-mono opacity-60 italic">
                    Tên gốc: {book.originalTitle}
                  </p>
                )}
                <p className="text-sm font-semibold">
                  Tác giả: <span className="text-[#E5B54F]">{book.author}</span>
                </p>

                {/* Các thông số */}
                <div className="text-xs space-y-1 opacity-80 pt-1 font-mono">
                  <div>• Cập nhật: {book.updatedAt || '03/11/2026'}</div>
                  <div>• Quy mô: {book.totalChapters || `${book.chapters?.length || 0} chương`}</div>
                </div>

                {/* Nút Đọc Demo */}
                <div className="pt-3">
                  <button
                    onClick={() => {
                      onClose();
                      handleRead(book);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#E5B54F] text-black font-mono text-xs font-bold hover:bg-[#F2C76A] transition-all flex items-center gap-1.5 shadow-md active:scale-95 mx-auto sm:mx-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Bắt đầu đọc demo ({book.chapters?.length || 0} chương)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Giải thưởng & Thành tựu */}
            {book.awards && (
              <div className="p-3.5 rounded-xl border border-[#E5B54F]/25 bg-[#E5B54F]/5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E5B54F] font-bold uppercase mb-1">
                  <Award className="w-4 h-4" />
                  <span>Giải thưởng & Thành tựu</span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed font-sans">{book.awards}</p>
              </div>
            )}

            {/* Bài Review Chuyên Sâu Toàn Văn */}
            {(book.extendedReview || book.description) && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold mb-2">
                  <FileText className="w-4 h-4 text-[#E5B54F]" />
                  <span>Đánh Giá Chuyên Sâu & Tóm Tắt Tác Phẩm</span>
                </div>
                <div className="text-xs sm:text-[13px] leading-relaxed opacity-90 space-y-3 font-sans whitespace-pre-line border-t border-current/10 pt-3 text-justify">
                  {book.extendedReview || book.description}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* POPUP PHÓNG TO ẢNH BÌA */}
      {isCoverModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={() => setIsCoverModalOpen(false)}
        >
          <div className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsCoverModalOpen(false)}
              className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={coverSrc} 
              alt={book.title} 
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl object-contain border border-white/20"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="text-center mt-3 text-white/80 font-mono text-xs font-bold">
              {book.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
