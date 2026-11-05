// Module quản lý tương tác và xếp hạng truyện Hot theo Tuần / Tháng
// Hỗ trợ đồng bộ đám mây qua Cloudflare Worker (Edge API) & Fallback LocalStorage

const STORAGE_KEY = 'piepub_book_clicks_v1';
const REMOTE_API_ENDPOINT = 'https://api.piepub.net/api';

// Lấy toàn bộ dữ liệu clicks cục bộ từ localStorage
export function getStoredClicks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Ghi nhận 1 lượt tương tác (click xem chi tiết hoặc đọc demo)
export async function recordBookInteraction(bookId) {
  if (!bookId) return;

  // 1. Lưu cục bộ (để phản hồi ngay lập tức cho người dùng)
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

  // 2. Gửi đồng bộ lên Cloudflare Worker (không chặn luồng UI)
  try {
    fetch(`${REMOTE_API_ENDPOINT}/interact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    }).catch(() => {
      // Tự động bỏ qua lỗi nếu Cloudflare Worker chưa triển khai
    });
  } catch (e) {
    // ignore
  }
}

// Tính toán điểm tương tác cục bộ của 1 cuốn sách trong khoảng thời gian (days)
export function getLocalBookScore(bookId, days = 7) {
  const data = getStoredClicks();
  const list = data[bookId];
  if (!Array.isArray(list) || list.length === 0) return 0;
  
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  return list.filter(ts => ts >= threshold).length;
}

// Bảng số lượt đọc ban đầu (Base Popularity) để khi chưa có nhiều click thì trang vẫn có Top đẹp
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
export function getTrendingBooks(books, timeframe = 'week', remoteViews = {}, limit = 6) {
  if (!Array.isArray(books) || books.length === 0) return [];
  const days = timeframe === 'week' ? 7 : 30;

  const scored = books.map(book => {
    const localClicks = getLocalBookScore(book.id, days);
    // Ưu tiên số lượt click thật lấy từ Cloudflare KV (nếu có)
    const remoteCount = typeof remoteViews[book.id] === 'number' ? remoteViews[book.id] : 0;
    const base = BASE_POPULARITY[book.id] ? BASE_POPULARITY[book.id][timeframe] || 20 : 15;
    
    // Tổng điểm: Số click từ Cloudflare + click cục bộ + base ban đầu
    const totalScore = base + remoteCount + localClicks;

    return {
      book,
      score: totalScore,
      remoteCount,
      localClicks
    };
  });

  // Sắp xếp giảm dần theo tổng điểm tương tác
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

// Fetch số lượt view từ Cloudflare Worker API
export async function fetchRemoteViews(timeframe = 'week') {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s timeout để không trễ web
    
    const res = await fetch(`${REMOTE_API_ENDPOINT}/trending?timeframe=${timeframe}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      return json.views || {};
    }
  } catch (e) {
    // Không thể kết nối API hoặc API chưa online -> trả về rỗng để fallback
  }
  return {};
}
