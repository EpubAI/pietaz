import React, { useState } from 'react';
import { Info, X, BookOpen, Award, FileText } from 'lucide-react';
import { getBookPrice } from '../data/pricing';

export function BookDetailModal({ book, isOpen, onClose, onRead, isDarkMode }) {
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  if (!isOpen || !book) return null;

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
            
            {/* Cụm thông tin chính */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <div 
                onClick={() => setIsCoverModalOpen(true)}
                className="w-36 flex-shrink-0 aspect-[3/4.4] rounded-lg overflow-hidden border border-white/20 shadow-xl cursor-pointer hover:opacity-90"
                title="Xem ảnh bìa lớn"
              >
                <img src={coverSrc} alt={book.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="text-xs font-mono opacity-60 uppercase tracking-widest">{book.author}</div>
                <h2 className="text-2xl font-title-book font-bold text-[#E5B54F] mt-0.5">{book.title}</h2>
                {book.originalTitle && (
                  <div className="text-sm font-serif italic opacity-75 mt-0.5">{book.originalTitle}</div>
                )}

                <div className="mt-3 space-y-1 text-xs font-mono opacity-80">
                  <div>• <span className="font-semibold">Quy mô:</span> {book.totalChapters || `${book.chapters?.length || 0} chương`}</div>
                  {book.wordCount && (
                    <div>• <span className="font-semibold">Tổng số chữ:</span> <span className="text-[#E5B54F] font-bold">{book.wordCount}</span></div>
                  )}
                  {pricing && (
                    <div className="p-2.5 rounded-lg border border-[#E5B54F]/30 bg-[#E5B54F]/10 mt-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-zinc-300">Định mức giá:</span>
                        <span className={`font-bold px-2 py-0.5 rounded ${pricing.isFree ? 'bg-emerald-500 text-white' : 'bg-[#E5B54F] text-black'}`}>
                          {pricing.priceDisplay}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-1 flex justify-between">
                        <span>Text gốc: {pricing.rawWordCountFormatted}</span>
                        <span>Phân tầng: {pricing.priceTier}</span>
                      </div>
                    </div>
                  )}
                  {book.updatedAt && <div>• <span className="font-semibold">Cập nhật:</span> {book.updatedAt}</div>}
                  {(book.authorBio || book.authorInfo?.bio) && (
                    <div>• <span className="font-semibold">Tác giả:</span> {book.authorBio || book.authorInfo?.bio}</div>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      onClose();
                      onRead(book);
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
                <div className="flex items-center gap-2 text-xs font-mono text-[#E5B54F] font-bold uppercase mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Bài Đánh Giá & Phân Tích Chuyên Sâu</span>
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
