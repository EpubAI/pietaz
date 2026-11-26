// Danh mục cấu hình giá sách dựa trên số chữ text gốc từ file .lg
// Phân tầng đa bậc tinh tế (Fine-grained Pricing Matrix):
// - Nhóm 1: Truyện ngắn / Chuyên ngành (< 300k chữ): 50k (< 150k) - 70k (150k - 300k)
// - Nhóm 2: Tiểu thuyết trung & Trường thiên vừa (300k - 2.0M chữ): bậc 100k chữ (+10k/bậc)
// - Nhóm 3: Đại trường thiên & Siêu phẩm (>= 2.0M chữ): bậc 50k đến 400k và step đều đặn đến 1 triệu

export const FREE_BOOK_IDS = new Set([
  'vang-rong-me-hoac',
  'mon-linh-quai-dam',
  'nang-nang-va-nang',
  'khieu-dai-than',
  'chet-tren-sao-hoa',
  'chung-ta-song-tai-nam-kinh',
  'bach-vien-khach-san',
  'tam-xoa-kich',
  'ngung-uyen-chi-mau',
  'dia-cau-lang-thang',
  'benh-vien-so-444',
  'altay-cua-toi',
  'goc-nho-altay',
  'nhung-nam-thang-toi-lam-thay-am-duong',
  'cuc-quan-ly-truyen-thuyet',
  'duong-cuu-tam-bo-khuc',
]);

export const BOOK_PRICING = {
  "phat-khoi-cuoi-cung": {
    "price": 80000,
    "priceDisplay": "80.000 đ",
    "isFree": false,
    "rawWordCount": 368762,
    "rawWordCountFormatted": "36.9 vạn chữ gốc (87.8 vạn ký tự · 29 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2A (300k - 400k chữ)"
  },
  "thien-ha-khong-co-bi-kip-vo-dich-bon-dong-ruoi-mot-cuon": {
    "price": 90000,
    "priceDisplay": "90.000 đ",
    "isFree": false,
    "rawWordCount": 401421,
    "rawWordCountFormatted": "40.1 vạn chữ gốc (154.1 vạn ký tự · 76 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2B (400k - 500k chữ)"
  },
  "tuyet-mu": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 278409,
    "rawWordCountFormatted": "27.8 vạn chữ gốc (104.8 vạn ký tự · 69 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "nhung-dieu-quan-trong-khi-lam-cha-me": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 23904,
    "rawWordCountFormatted": "2.4 vạn chữ gốc (9.6 vạn ký tự · 33 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "dong-bac-vang-su-hac-dao-phong-van": {
    "price": 130000,
    "priceDisplay": "130.000 đ",
    "isFree": false,
    "rawWordCount": 850842,
    "rawWordCountFormatted": "85.1 vạn chữ gốc (349.9 vạn ký tự · 334 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2F (800k - 900k chữ)"
  },
  "ta-chinh-la-yeu-quai": {
    "price": 130000,
    "priceDisplay": "130.000 đ",
    "isFree": false,
    "rawWordCount": 876880,
    "rawWordCountFormatted": "87.7 vạn chữ gốc (211.9 vạn ký tự · 209 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2F (800k - 900k chữ)"
  },
  "ban-liep": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 179159,
    "rawWordCountFormatted": "17.9 vạn chữ gốc (63.7 vạn ký tự · 54 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "phuong-phap-tu-duy-he-thong": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 67657,
    "rawWordCountFormatted": "67.657 từ tiếng Anh (52.4 vạn ký tự · 21 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 1A (< 150k từ)"
  },
  "doi-mat-vuc-tham-mua-2-tap-2-lanh-huyet-phi-dang": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 143819,
    "rawWordCountFormatted": "14.4 vạn chữ gốc (48.1 vạn ký tự · 57 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "doi-mat-vuc-tham-mua-2-tap-1-da-thu-chi-ha": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 145000,
    "rawWordCountFormatted": "14.5 vạn chữ gốc (49.6 vạn ký tự · 59 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "doi-mat-vuc-tham-3-toi-du-tan": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 151645,
    "rawWordCountFormatted": "15.2 vạn chữ gốc (51.5 vạn ký tự · 65 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "doi-mat-vuc-tham-2-am-vo-thanh": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 152901,
    "rawWordCountFormatted": "15.3 vạn chữ gốc (51.2 vạn ký tự · 64 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "doi-mat-vuc-tham-1-ac-nhu-cau": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 150998,
    "rawWordCountFormatted": "15.1 vạn chữ gốc (50.3 vạn ký tự · 64 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "ho-so-an-mang-2-rung-thieng-nuoc-doc": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 152313,
    "rawWordCountFormatted": "15.2 vạn chữ gốc (50.9 vạn ký tự · 28 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "son-quy-lai": {
    "price": 80000,
    "priceDisplay": "80.000 đ",
    "isFree": false,
    "rawWordCount": 317735,
    "rawWordCountFormatted": "31.8 vạn chữ gốc (97.8 vạn ký tự · 73 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2A (300k - 400k chữ)"
  },
  "mu-quang": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 230311,
    "rawWordCountFormatted": "23.0 vạn chữ gốc (77.5 vạn ký tự · 59 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "cuoc-doi-quy-di-cua-toi": {
    "price": 470000,
    "priceDisplay": "470.000 đ",
    "isFree": false,
    "rawWordCount": 5078720,
    "rawWordCountFormatted": "507.9 vạn chữ gốc (1.796,6 vạn ký tự · 1.550 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3F (5.0M – 6.0M chữ)"
  },
  "bo-ba-trong-an": {
    "price": 90000,
    "priceDisplay": "90.000 đ",
    "isFree": false,
    "rawWordCount": 479787,
    "rawWordCountFormatted": "48.0 vạn chữ gốc (156.6 vạn ký tự · 118 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2B (400k - 500k chữ)"
  },
  "dien-tich-cam-mat-cua-dorothy": {
    "price": 350000,
    "priceDisplay": "350.000 đ",
    "isFree": false,
    "rawWordCount": 4354042,
    "rawWordCountFormatted": "435.4 vạn chữ gốc (1.310,8 vạn ký tự · 828 chương)",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3D (3.9M - 4.4M chữ)"
  },
  "chua-lanh-luong-tu": {
    "price": 110000,
    "priceDisplay": "110.000 đ",
    "isFree": false,
    "rawWordCount": 147219,
    "rawWordCountFormatted": "66.3 vạn ký tự (147.219 từ · 14 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 2D (600k - 700k chữ)"
  },
  "nho-mot-quen-ba-hai": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 65798,
    "rawWordCountFormatted": "29.1 vạn ký tự (65.798 từ · 38 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "de-che-ma-ca-rong": {
    "price": 165000,
    "priceDisplay": "165.000 đ",
    "isFree": false,
    "rawWordCount": 340055,
    "rawWordCountFormatted": "155.3 vạn ký tự (340.055 từ · 104 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 2I (1.25M - 1.5M chữ)"
  },
  "de-che-nguyen-rua": {
    "price": 165000,
    "priceDisplay": "165.000 đ",
    "isFree": false,
    "rawWordCount": 349881,
    "rawWordCountFormatted": "159.4 vạn ký tự (349.881 từ · 76 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 2J (1.5M - 1.75M chữ)"
  },
  "de-che-binh-minh": {
    "price": 190000,
    "priceDisplay": "190.000 đ",
    "isFree": false,
    "rawWordCount": 396287,
    "rawWordCountFormatted": "185.9 vạn ký tự (396.287 từ · 65 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 2K (1.75M - 2.0M chữ)"
  },
  "da-phong-mon": {
    "price": 190000,
    "priceDisplay": "190.000 đ",
    "isFree": false,
    "rawWordCount": 1751836,
    "rawWordCountFormatted": "175.2 vạn chữ (1.751.836 chữ)",
    "rawUnit": "chữ",
    "priceTier": "Tier 2K (1.75M - 2.0M chữ)"
  },
  "tam-do-chi": {
    "price": 380000,
    "priceDisplay": "380.000 đ",
    "isFree": false,
    "rawWordCount": 1659137,
    "rawWordCountFormatted": "743.4 vạn ký tự (1.659.137 từ - 386 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 3E (5.0M - 7.0M chữ)"
  },
  "nhung-nam-thang-toi-lam-nguoi-chim": {
    "price": 380000,
    "priceDisplay": "380.000 đ",
    "isFree": false,
    "rawWordCount": 1370095,
    "rawWordCountFormatted": "614.0 vạn ký tự (1.370.095 từ - 371 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 3E (5.0M - 7.0M chữ)"
  },
  "thuat-gia-kim": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 142027,
    "rawWordCountFormatted": "142.027 từ (~63.4 vạn ký tự)",
    "rawUnit": "từ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "chim-ruoi-ruc-chay": {
    "price": 280000,
    "priceDisplay": "280.000 đ",
    "isFree": false,
    "rawWordCount": 610088,
    "rawWordCountFormatted": "273.6 vạn ký tự (610.088 từ - Trọn bộ 3 tập)",
    "rawUnit": "từ",
    "priceTier": "Tier 3A (2.0M - 2.8M chữ)"
  },
  "vuon-dia-dang-dau-tien-cua-phong-tu-ky": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 111037,
    "rawWordCountFormatted": "111.037 từ (~48.9 vạn ký tự)",
    "rawUnit": "từ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "can-phong-kin-cua-schrodinger": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 106699,
    "rawWordCountFormatted": "106.699 từ (~48.8 vạn ký tự)",
    "rawUnit": "từ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "co-opetition": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 150531,
    "rawWordCountFormatted": "150.531 từ tiếng Anh",
    "rawUnit": "từ",
    "priceTier": "Tier 1B (150k - 300k từ)"
  },
  "do-lech-nhiet": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 167557,
    "rawWordCountFormatted": "167.557 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "cau-chuyen-vao-ngay-toi-chet": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 160825,
    "rawWordCountFormatted": "160.825 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "tham-tu-dien": {
    "price": 80000,
    "priceDisplay": "80.000 đ",
    "isFree": false,
    "rawWordCount": 350996,
    "rawWordCountFormatted": "350.996 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 2A (300k - 400k chữ)"
  },
  "lam-bach-xa": {
    "price": 250000,
    "priceDisplay": "250.000 đ",
    "isFree": false,
    "rawWordCount": 2779270,
    "rawWordCountFormatted": "2.779.270 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 3B (2.7M - 3.2M chữ)"
  },
  "dem-mai-ai-se-luu-lai-trong-the-xac-nay": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 199757,
    "rawWordCountFormatted": "199.757 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "canh-dong-huong-duong-noi-xa-xam": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 72786,
    "rawWordCountFormatted": "72.786 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "tro-choi-co-on": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 60532,
    "rawWordCountFormatted": "60.532 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "qua-ha-tot": {
    "price": 470000,
    "priceDisplay": "470.000 đ",
    "isFree": false,
    "rawWordCount": 5959571,
    "rawWordCountFormatted": "5.959.571 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 3F (5.0M – 6.0M chữ)"
  },
  "dac-nhiem-chong-lua-dao": {
    "price": 140000,
    "priceDisplay": "140.000 đ",
    "isFree": false,
    "rawWordCount": 924817,
    "rawWordCountFormatted": "924.817 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 2G (900k - 1.0M chữ)"
  },
  "tam-thi-ngu": {
    "price": 130000,
    "priceDisplay": "130.000 đ",
    "isFree": false,
    "rawWordCount": 869235,
    "rawWordCountFormatted": "869.235 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 2F (800k - 900k chữ)"
  },
  "the-cockroaches": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 127210,
    "rawWordCountFormatted": "127.210 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "dai-y-lang-nhien": {
    "price": 250000,
    "priceDisplay": "250.000 đ",
    "isFree": false,
    "rawWordCount": 2946878,
    "rawWordCountFormatted": "2.946.878 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 3B (2.7M - 3.2M chữ)"
  },
  "bach-loc-nguyen": {
    "price": 90000,
    "priceDisplay": "90.000 đ",
    "isFree": false,
    "rawWordCount": 425498,
    "rawWordCountFormatted": "425.498 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 2B (400k - 500k chữ)"
  },
  "phu-du-ba-ngay-dao-sat": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 202540,
    "rawWordCountFormatted": "202.540 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "am-loi": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 262378,
    "rawWordCountFormatted": "262.378 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "chien-dich-san-cao": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 128335,
    "rawWordCountFormatted": "128.335 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "the-mountain-in-the-sea": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 135258,
    "rawWordCountFormatted": "135.258 chừ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1A (< 150k chữ)"
  },

  "nguyen-toi": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 136148,
    "rawWordCountFormatted": "136.148 chữ gốc",
    "rawUnit": "chừ",
    "priceTier": "Tier 1A (< 150k chò)"
  },

  "mo-kim-quyet-quy-mon-thien-su": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 140803,
    "rawWordCountFormatted": "140.803 chừ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 1A (< 150k chữ)"
  },

  "co-su-mieu-cuong-2": {
    "price": 300000,
    "priceDisplay": "300.000 đ",
    "isFree": false,
    "rawWordCount": 3489537,
    "rawWordCountFormatted": "3.489.537 chữ gốc",
    "rawUnit": "chữ",
    "priceTier": "Tier 3C (3.2M - 3.9M chò)"
  },

  "khuc-ca-cua-ke-mo-da-chet-va-grimscribe": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 231244,
    "rawWordCountFormatted": "231.244 chữ",
    "rawUnit": "chỮ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },

  "mua-thu-nam": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 186421,
    "rawWordCountFormatted": "186.421 chữ",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "cong-thach-tru": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 168828,
    "rawWordCountFormatted": "168.828 chữ",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "bau-troi-da": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 172177,
    "rawWordCountFormatted": "172.177 chữ",
    "rawUnit": "chữ",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "nhung-nam-thang-toi-lam-thay-am-duong": {
    "price": 150000,
    "priceDisplay": "150.000 đ",
    "isFree": false,
    "rawWordCount": 1048769,
    "rawWordCountFormatted": "1.048.769 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2H (1.0M - 1.25M chữ)"
  },
  "cuc-quan-ly-truyen-thuyet": {
    "price": 165000,
    "priceDisplay": "165.000 đ",
    "isFree": false,
    "rawWordCount": 1487175,
    "rawWordCountFormatted": "1.487.175 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2I (1.25M - 1.5M chữ)"
  },
  "duong-cuu-tam-bo-khuc": {
    "price": 80000,
    "priceDisplay": "80.000 đ",
    "isFree": false,
    "rawWordCount": 330763,
    "rawWordCountFormatted": "330.763 chữ",
    "rawUnit": "chữ",
    "priceTier": "Tier 2A (300k - 400k chữ)"
  },
  "dia-cau-lang-thang": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 216644,
    "rawWordCountFormatted": "216.644 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "phuong-chuot-cho": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 227634,
    "rawWordCountFormatted": "227.634 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "mon-linh-quai-dam": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 135515,
    "rawWordCountFormatted": "135.515 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "duoi-con-phat-gia": {
    "price": 180000,
    "priceDisplay": "180.000 đ",
    "isFree": false,
    "rawWordCount": 1528598,
    "rawWordCountFormatted": "1.528.598 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2J (1.5M - 1.75M chữ)"
  },
  "phap-y-quoc-dan": {
    "price": 300000,
    "priceDisplay": "300.000 đ",
    "isFree": false,
    "rawWordCount": 3722084,
    "rawWordCountFormatted": "3.722.084 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3C (3.2M - 3.9M chữ)"
  },
  "vang-rong-me-hoac": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 137886,
    "rawWordCountFormatted": "137.886 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "danh-de": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 252815,
    "rawWordCountFormatted": "252.815 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "nang-nang-va-nang": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 232356,
    "rawWordCountFormatted": "232.356 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "dao-si-khong-de-choc": {
    "price": 300000,
    "priceDisplay": "300.000 đ",
    "isFree": false,
    "rawWordCount": 3525177,
    "rawWordCountFormatted": "3.525.177 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3C (3.2M - 3.9M chữ)"
  },
  "tang-phong": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 191952,
    "rawWordCountFormatted": "191.952 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "tam-xoa-kich": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 211822,
    "rawWordCountFormatted": "211.822 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "chung-ta-song-tai-nam-kinh": {
    "price": 90000,
    "priceDisplay": "90.000 đ",
    "isFree": false,
    "rawWordCount": 439826,
    "rawWordCountFormatted": "439.826 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2B (400k - 500k chữ)"
  },
  "the-worldatwork-handbook": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 152884,
    "rawWordCountFormatted": "152.884 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "trung-khanh-me-thanh": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 225413,
    "rawWordCountFormatted": "225.413 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "chet-tren-sao-hoa": {
    "price": 110000,
    "priceDisplay": "110.000 đ",
    "isFree": false,
    "rawWordCount": 679950,
    "rawWordCountFormatted": "679.950 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2D (600k - 700k chữ)"
  },
  "the-bat": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 100712,
    "rawWordCountFormatted": "100.712 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "sat-thien": {
    "price": 100000,
    "priceDisplay": "100.000 đ",
    "isFree": false,
    "rawWordCount": 530434,
    "rawWordCountFormatted": "530.434 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2C (500k - 600k chữ)"
  },
  "chu-cam-son-hai": {
    "price": 200000,
    "priceDisplay": "200.000 đ",
    "isFree": false,
    "rawWordCount": 2605319,
    "rawWordCountFormatted": "2.605.319 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3A (2.0M - 2.7M chữ)"
  },
  "hau-da-loi-hinh-trinh": {
    "price": 300000,
    "priceDisplay": "300.000 đ",
    "isFree": false,
    "rawWordCount": 1681758,
    "rawWordCountFormatted": "760.8 vạn ký tự (1.681.758 từ · 93 chương)",
    "rawUnit": "từ",
    "priceTier": "Tier 3G (7.0M+ chữ) · giá ưu đãi up-sell (Tập 1-5 đã miễn phí)"
  },
  "lady-joker-tap-1": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 197820,
    "rawWordCountFormatted": "197.820 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "lady-joker-tap-2": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 206395,
    "rawWordCountFormatted": "206.395 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "benh-vien-so-444": {
    "price": 180000,
    "priceDisplay": "180.000 đ",
    "isFree": false,
    "rawWordCount": 1654712,
    "rawWordCountFormatted": "1.654.712 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2J (1.5M - 1.75M chữ)"
  },
  "tiep-thi-7-0": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 48029,
    "rawWordCountFormatted": "48.029 từ gốc",
    "rawUnit": "từ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "dao-tu-chu": {
    "price": 110000,
    "priceDisplay": "110.000 đ",
    "isFree": false,
    "rawWordCount": 668732,
    "rawWordCountFormatted": "668.732 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2D (600k - 700k chữ)"
  },
  "hau-ve-dong-quan-truong-ky": {
    "price": 250000,
    "priceDisplay": "250.000 đ",
    "isFree": false,
    "rawWordCount": 2979194,
    "rawWordCountFormatted": "2.979.194 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3B (2.7M - 3.2M chữ)"
  },
  "khieu-dai-than": {
    "price": 150000,
    "priceDisplay": "150.000 đ",
    "isFree": false,
    "rawWordCount": 1063517,
    "rawWordCountFormatted": "1.063.517 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2H (1.0M - 1.25M chữ)"
  },
  "goc-nho-altay": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 153029,
    "rawWordCountFormatted": "153.029 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "tuyet-trung-han-dao-hanh": {
    "price": 400000,
    "priceDisplay": "400.000 đ",
    "isFree": false,
    "rawWordCount": 4720967,
    "rawWordCountFormatted": "4.720.967 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3E (4.4M - 5.0M chữ)"
  },
  "bach-vien-khach-san": {
    "price": 100000,
    "priceDisplay": "100.000 đ",
    "isFree": false,
    "rawWordCount": 596560,
    "rawWordCountFormatted": "596.560 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2C (500k - 600k chữ)"
  },
  "altay-cua-toi": {
    "price": 50000,
    "priceDisplay": "50.000 đ",
    "isFree": false,
    "rawWordCount": 130314,
    "rawWordCountFormatted": "130.314 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1A (< 150k chữ)"
  },
  "ngung-uyen-chi-mau": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 154927,
    "rawWordCountFormatted": "154.927 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  },
  "mieu-cuong-dao-su": {
    "price": 300000,
    "priceDisplay": "300.000 đ",
    "isFree": false,
    "rawWordCount": 3591422,
    "rawWordCountFormatted": "3.591.422 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3C (3.2M - 3.9M chữ)"
  },
  "co-su-mieu-cuong": {
    "price": 350000,
    "priceDisplay": "350.000 đ",
    "isFree": false,
    "rawWordCount": 4355558,
    "rawWordCountFormatted": "4.355.558 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3D (3.9M - 4.4M chữ)"
  },
  "ban-tron-chi-mang": {
    "price": 100000,
    "priceDisplay": "100.000 đ",
    "isFree": false,
    "rawWordCount": 530435,
    "rawWordCountFormatted": "530.435 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 2C (500k - 600k chữ)"
  },
  "kiem-lai": {
    "price": 1000000,
    "priceDisplay": "1.000.000 đ",
    "isFree": false,
    "rawWordCount": 13086472,
    "rawWordCountFormatted": "13.086.472 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 3M (12.0M - 13.5M chữ)"
  },
  "dai-kich-doi": {
    "price": 70000,
    "priceDisplay": "70.000 đ",
    "isFree": false,
    "rawWordCount": 183019,
    "rawWordCountFormatted": "183.019 chữ gốc",
    "rawUnit": "chữ gốc",
    "priceTier": "Tier 1B (150k - 300k chữ)"
  }
};

/**
 * Hàm lấy thông tin giá chuẩn cho từng tác phẩm
 * @param {{ id: string }} book 
 * @returns {{ price: number, priceDisplay: string, isFree: boolean, rawWordCountFormatted: string, priceTier: string }}
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
    priceTier: 'Tiêu chuẩn'
  };
}
