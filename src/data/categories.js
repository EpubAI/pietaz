// Danh mục thể loại tinh hoa của Tủ Sách Pietaz
// Được thiết kế theo cấu trúc mở (Open-ended), có thể tự động ánh xạ hoặc mở rộng thêm
export const CATEGORIES = [
  { id: 'all', label: 'Tất cả tác phẩm', icon: 'Library' },
  { id: 'free', label: 'Miễn phí / Free', icon: 'Gift' },
  { id: 'trinh-tham', label: 'Trinh thám / Hình sự', icon: 'Compass' },
  { id: 'huyen-bi', label: 'Huyền bí / Ma dị', icon: 'Ghost' },
  { id: 'tien-hiep', label: 'Tiên hiệp / Cổ phong', icon: 'Sword' },
  { id: 'khoa-hoc', label: 'Khoa học / Viễn tưởng', icon: 'Rocket' },
  { id: 'hien-thuc', label: 'Hiện thực / Xã hội', icon: 'Building' },
  { id: 'tam-ly', label: 'Tâm lý / Giáo dục', icon: 'Brain' },
  { id: 'triet-hoc', label: 'Triết học / Tư tưởng', icon: 'BookOpen' },
  { id: 'kinh-te', label: 'Kinh tế / Quản trị', icon: 'TrendingUp' },
  { id: 'lich-su', label: 'Lịch sử / Mưu lược', icon: 'Castle' },
  { id: 'tan-van', label: 'Tản văn / Phi hư cấu', icon: 'Feather' },
  { id: 'ngon-tinh', label: 'Ngôn tình / Tình cảm', icon: 'Heart' }
];

// Bản đồ từ khóa nhận diện thông minh (Smart Category Mapper)
// Tự động phân loại tác phẩm dựa trên tên truyện, thể loại thô, tag hoặc từ khóa
export const CATEGORY_KEYWORDS_MAP = {
  'kinh-te': [
    'kinh tế', 'tiếp thị', 'marketing', 'quản trị', 'kinh doanh', 'tài chính', 
    'đầu tư', 'chứng khoán', 'công ty', 'doanh nghiệp', 'thương trường', 'khởi nghiệp'
  ],
  'tam-ly': [
    'tâm lý', 'giáo dục', 'gia đình', 'làm cha mẹ', 'nuôi dạy con', 'con cái',
    'kỹ năng sống', 'chữa lành', 'tâm thần', 'nhân cách'
  ],
  'triet-hoc': [
    'triết học', 'tư tưởng', 'lão tử', 'khổng tử', 'heisenberg', 'đạo gia',
    'nho gia', 'nhân sinh quan', 'lượng tử', 'minh triết'
  ],
  'tan-van': [
    'tản văn', 'phi hư cấu', 'hồi ký', 'ký sự', 'thảo nguyên', 'du mục', 
    'chữa lành', 'đời sống', 'tâm bút', 'tạp văn', 'altay'
  ],
  'hien-thuc': [
    'quan trường', 'hiện thực', 'công quyền', 'chính trị', 'cán bộ', 
    'xã hội', 'thế thái', 'hình cảnh', 'đời thường', 'hắc đạo', 'xã hội đen'
  ],
  'ngon-tinh': [
    'ngôn tình', 'tình cảm', 'đam mỹ', 'bách hợp', 'lãng mạn', 
    'thanh xuân', 'hôn nhân', 'tình yêu', 'nữ phụ', 'tổng tài'
  ],
  'huyen-bi': [
    'huyền bí', 'linh dị', 'ma dị', 'tát mãn', 'xuất mã tiên', 'kinh dị', 
    'lệ quỷ', 'ngải', 'vu cổ', 'hồn ma', 'quái đàm', 'huyền nghi', 'cthulhu'
  ],
  'trinh-tham': [
    'trinh thám', 'hình sự', 'trọng án', 'tội phạm', 'phá án', 
    'vô hạn lưu', 'giải đố', 'sinh tồn', 'scp', 'bàn tròn', 'mật thất', 'honkaku'
  ],
  'tien-hiep': [
    'tiên hiệp', 'kiếm hiệp', 'cổ phong', 'huyền huyễn', 'tu chân', 
    'kiếm tu', 'đao khách', 'võ hiệp', 'bắc lương', 'quỷ dị'
  ],
  'lich-su': [
    'lịch sử', 'mưu lược', 'dân quốc', 'chiến quốc', 'vương triều', 
    'hoàng đế', 'chiến tranh', 'đạo mộ', 'cổ đại', 'đại đường', 'khoa cử'
  ],
  'khoa-hoc': [
    'khoa học', 'viễn tưởng', 'sci-fi', 'tương lai', 'vũ trụ', 
    'cyberpunk', 'ai', 'robot', 'đa vũ trụ', 'khoa huyễn'
  ]
};

/**
 * Hàm tự động xác định thể loại chuẩn từ thông tin tác phẩm
 * @param {Object} book - Đối tượng chứa title, category, tags, description...
 * @returns {Array<string>} - Mảng danh sách category id phù hợp
 */
export function detectBookCategories(book) {
  const matched = new Set();

  const searchableText = [
    book.title || '',
    book.category || '',
    (book.tags || []).join(' '),
    book.description || '',
    (book.categories || []).join(' ')
  ].join(' ').toLowerCase();

  for (const [catId, keywords] of Object.entries(CATEGORY_KEYWORDS_MAP)) {
    for (const kw of keywords) {
      if (searchableText.includes(kw.toLowerCase())) {
        matched.add(catId);
        break;
      }
    }
  }

  // Nếu không khớp từ khóa nào, giữ lại category cũ hoặc mặc định là 'hien-thuc'
  if (matched.size === 0) {
    if (book.category && book.category !== 'khoa-hoc') {
      matched.add(book.category);
    } else {
      matched.add('hien-thuc');
    }
  }

  return Array.from(matched);
}
