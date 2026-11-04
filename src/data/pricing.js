// Danh mục cấu hình giá sách dựa trên số chữ text gốc từ file .lg
// Đơn giá chuẩn: 75.000 đ / 1 triệu chữ.
// Dưới 1 triệu chữ: 50.000 đ (< 500k chữ) hoặc 75.000 đ (500k - 1M chữ).
// Danh sách sách Miễn phí có thể tùy chỉnh dễ dàng trong FREE_BOOK_IDS.

export const FREE_BOOK_IDS = new Set([
  // Điền id tác phẩm muốn đặt Miễn phí (Free) vào đây, ví dụ:
  // 'dia-cau-lang-thang',
  // 'phuong-chuot-cho'
]);

export const BOOK_PRICING = {
  "dia-cau-lang-thang": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 216644,
    "rawWordCountFormatted": "216.644 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "phuong-chuot-cho": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 227634,
    "rawWordCountFormatted": "227.634 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "mon-linh-quai-dam": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 135515,
    "rawWordCountFormatted": "135.515 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "duoi-con-phat-gia": {
    "price": 115000,
    "priceDisplay": "115.000 đ",
    "isFree": false,
    "rawWordCount": 1528598,
    "rawWordCountFormatted": "1.528.598 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (1.53M chữ)"
  },
  "phap-y-quoc-dan": {
    "price": 279000,
    "priceDisplay": "279.000 đ",
    "isFree": false,
    "rawWordCount": 3722084,
    "rawWordCountFormatted": "3.722.084 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (3.72M chữ)"
  },
  "vang-rong-me-hoac": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 137886,
    "rawWordCountFormatted": "137.886 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "danh-de": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 252815,
    "rawWordCountFormatted": "252.815 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "nang-nang-va-nang": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 232356,
    "rawWordCountFormatted": "232.356 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "dao-si-khong-de-choc": {
    "price": 264000,
    "priceDisplay": "264.000 đ",
    "isFree": false,
    "rawWordCount": 3525177,
    "rawWordCountFormatted": "3.525.177 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (3.53M chữ)"
  },
  "tang-phong": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 191952,
    "rawWordCountFormatted": "191.952 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "tam-xoa-kich": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 211822,
    "rawWordCountFormatted": "211.822 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "chung-ta-song-tai-nam-kinh": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 439826,
    "rawWordCountFormatted": "439.826 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "the-worldatwork-handbook": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 152884,
    "rawWordCountFormatted": "152.884 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "< 500k chữ"
  },
  "trung-khanh-me-thanh": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 225413,
    "rawWordCountFormatted": "225.413 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "chet-tren-sao-hoa": {
    "price": 75000,
    "priceDisplay": "75.000 đ",
    "isFree": false,
    "rawWordCount": 679950,
    "rawWordCountFormatted": "679.950 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "500k - 1M chữ"
  },
  "the-bat": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 100712,
    "rawWordCountFormatted": "100.712 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "< 500k chữ"
  },
  "sat-thien": {
    "price": 75000,
    "priceDisplay": "75.000 đ",
    "isFree": false,
    "rawWordCount": 530434,
    "rawWordCountFormatted": "530.434 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "500k - 1M chữ"
  },
  "chu-cam-son-hai": {
    "price": 195000,
    "priceDisplay": "195.000 đ",
    "isFree": false,
    "rawWordCount": 2605319,
    "rawWordCountFormatted": "2.605.319 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (2.61M chữ)"
  },
  "hau-da-loi-hinh-trinh": {
    "price": 76000,
    "priceDisplay": "76.000 đ",
    "isFree": false,
    "rawWordCount": 1014509,
    "rawWordCountFormatted": "1.014.509 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (1.01M chữ)"
  },
  "lady-joker-tap-1": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 197820,
    "rawWordCountFormatted": "197.820 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "< 500k chữ"
  },
  "lady-joker-tap-2": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 206395,
    "rawWordCountFormatted": "206.395 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "< 500k chữ"
  },
  "benh-vien-so-444": {
    "price": 124000,
    "priceDisplay": "124.000 đ",
    "isFree": false,
    "rawWordCount": 1654712,
    "rawWordCountFormatted": "1.654.712 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (1.65M chữ)"
  },
  "tiep-thi-7-0": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 48029,
    "rawWordCountFormatted": "48.029 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "< 500k chữ"
  },
  "dao-tu-chu": {
    "price": 75000,
    "priceDisplay": "75.000 đ",
    "isFree": false,
    "rawWordCount": 668732,
    "rawWordCountFormatted": "668.732 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "500k - 1M chữ"
  },
  "hau-ve-dong-quan-truong-ky": {
    "price": 223000,
    "priceDisplay": "223.000 đ",
    "isFree": false,
    "rawWordCount": 2979194,
    "rawWordCountFormatted": "2.979.194 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (2.98M chữ)"
  },
  "khieu-dai-than": {
    "price": 80000,
    "priceDisplay": "80.000 đ",
    "isFree": false,
    "rawWordCount": 1063517,
    "rawWordCountFormatted": "1.063.517 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (1.06M chữ)"
  },
  "goc-nho-altay": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 153029,
    "rawWordCountFormatted": "153.029 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "tuyet-trung-han-dao-hanh": {
    "price": 354000,
    "priceDisplay": "354.000 đ",
    "isFree": false,
    "rawWordCount": 4720967,
    "rawWordCountFormatted": "4.720.967 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (4.72M chữ)"
  },
  "bach-vien-khach-san": {
    "price": 75000,
    "priceDisplay": "75.000 đ",
    "isFree": false,
    "rawWordCount": 596560,
    "rawWordCountFormatted": "596.560 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "500k - 1M chữ"
  },
  "altay-cua-toi": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 130314,
    "rawWordCountFormatted": "130.314 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "ngung-uyen-chi-mau": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 154927,
    "rawWordCountFormatted": "154.927 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  },
  "mieu-cuong-dao-su": {
    "price": 269000,
    "priceDisplay": "269.000 đ",
    "isFree": false,
    "rawWordCount": 3591422,
    "rawWordCountFormatted": "3.591.422 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (3.59M chữ)"
  },
  "co-su-mieu-cuong": {
    "price": 327000,
    "priceDisplay": "327.000 đ",
    "isFree": false,
    "rawWordCount": 4355558,
    "rawWordCountFormatted": "4.355.558 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (4.36M chữ)"
  },
  "ban-tron-chi-mang": {
    "price": 75000,
    "priceDisplay": "75.000 đ",
    "isFree": false,
    "rawWordCount": 530435,
    "rawWordCountFormatted": "530.435 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "500k - 1M chữ"
  },
  "kiem-lai": {
    "price": 981000,
    "priceDisplay": "981.000 đ",
    "isFree": false,
    "rawWordCount": 13086472,
    "rawWordCountFormatted": "13.086.472 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "> 1M (13.09M chữ)"
  },
  "dai-kich-doi": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 183019,
    "rawWordCountFormatted": "183.019 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "< 500k chữ"
  }
};

/**
 * Hàm lấy thông tin giá chuẩn cho từng tác phẩm
 * @param { id: string } book 
 * @returns { price: number, priceDisplay: string, isFree: boolean, rawWordCountFormatted: string, priceTier: string }
 */
export function getBookPrice(book) {
  if (!book || !book.id) return null;
  const pricing = BOOK_PRICING[book.id];
  const isFree = FREE_BOOK_IDS.has(book.id) || (pricing && pricing.isFree);
  
  if (isFree) {
    return {
      price: 0,
      priceDisplay: 'Miễn phí',
      isFree: true,
      rawWordCountFormatted: pricing ? pricing.rawWordCountFormatted : '',
      priceTier: 'Miễn phí'
    };
  }
  
  if (pricing) {
    return pricing;
  }
  
  return {
    price: 50000,
    priceDisplay: '50.000 đ',
    isFree: false,
    rawWordCountFormatted: 'Đang cập nhật',
    priceTier: '< 500k chữ'
  };
}
