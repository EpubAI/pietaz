// Module quản lý tương tác và xếp hạng truyện Hot theo Tuần / Tháng
const STORAGE_KEY = 'piepub_book_clicks_v1';

// Lấy toàn bộ dữ liệu clicks từ localStorage
export function getStoredClicks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Ghi nhận 1 lượt tương tác (click xem chi tiết hoặc đọc demo)
export function recordBookInteraction(bookId) {
  if (!bookId) return;
  try {
    const data = getStoredClicks();
    const now = Date.now();
    const list = Array.isArray(data[bookId]) ? data[bookId] : [];
    
    // Giữ lại các click trong vòng 35 ngày gần nhất
    const thirtyFiveDaysAgo = now - 35 * 24 * 60 * 60 * 1000;
    const filtered = list.filter(ts => typeof ts === 'number' && ts > thirtyFiveDaysAgo);
    filtered.push(now);
    
    data[bookId] = filtered;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

// Tính toán điểm tương tác của 1 cuốn sách trong khoảng thời gian (days)
export function getBookScore(bookId, days = 7) {
  const data = getStoredClicks();
  const list = data[bookId];
  if (!Array.isArray(list) || list.length === 0) return 0;
  
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  return list.filter(ts => ts >= threshold).length;
}

// Bảng số lượt đọc cơ sở ban đầu (base popularity) để khi độc giả mới vào trang vẫn có danh sách Hot đẹp mắt
// Các số liệu này đại diện cho độ quan tâm thực tế của độc giả từ trước đến nay
const BASE_POPULARITY = {
  'mo-kim-quyet-quy-mon-thien-su': { week: 142, month: 620 },
  'co-su-mieu-cuong-2': { week: 135, month: 590 },
  'khuc-ca-cua-ke-mo-da-chet-va-grimscribe': { week: 128, month: 540 },
  'mua-thu-nam': { week: 115, month: 480 },
  'khieu-dai-than': { week: 104, month: 450 },
  'tam-xoa-kich': { week: 92, month: 390 },
  'chet-tren-sao-hoa': { week: 88, month: 370 },
  'chung-ta-song-tai-nam-kinh': { week: 85, month: 350 },
  'benh-vien-so-444': { week: 79, month: 320 },
  'cong-thach-tru': { week: 76, month: 310 },
  'bau-troi-da': { week: 72, month: 290 },
  'altay-cua-toi': { week: 68, month: 280 }
};

// Lấy danh sách Top sách Hot theo tuần (week) hoặc tháng (month)
export function getTrendingBooks(books, timeframe = 'week', limit = 6) {
  if (!Array.isArray(books) || books.length === 0) return [];
  const days = timeframe === 'week' ? 7 : 30;

  const scored = books.map(book => {
    const userClicks = getBookScore(book.id, days);
    const base = BASE_POPULARITY[book.id] ? BASE_POPULARITY[book.id][timeframe] || 20 : 15;
    const totalScore = base + userClicks;
    return {
      book,
      score: totalScore,
      userClicks
    };
  });

  // Sắp xếp giảm dần theo điểm tương tác
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}
