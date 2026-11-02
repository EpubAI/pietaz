export const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'huyen-bi', label: 'Huyền bí / Ma quái' },
  { id: 'lich-su', label: 'Lịch sử / Mưu lược' },
  { id: 'trinh-tham', label: 'Trinh thám / Hình sự' },
  { id: 'tien-hiep', label: 'Tiên hiệp / Cổ phong' }
];

export const BOOKS = [
  {
    id: 'quai-dam-thuc-luc',
    title: 'Quái Đàm Thực Lục: Bách Quỷ Dạ Hành',
    originalTitle: '怪谈实录：百鬼夜行',
    author: 'Nam Sơn Cố Nhân',
    category: 'huyen-bi',
    status: 'Hoàn thành',
    totalChapters: '32 chương',
    cover: './covers/book1.jpg',
    description: 'Tuyển tập những câu chuyện kỳ dị chốn thâm sơn cùng cốc. Giữa ngôi chùa cổ hoang phế trăm năm trong đêm mưa xối xả, vị lão tăng lần chuỗi hạt và bí mật kinh hoàng rình rập dưới bóng nến.',
    tags: ['Liêu trai', 'Dị ký', 'Kỳ ảo cổ phong'],
    downloadUrl: './covers/book1.jpg', // Demo path or direct epub
    sampleChapter: {
      chapterNumber: 1,
      title: 'Đêm Mưa Cổ Tự Ngộ Dị Tăng',
      content: [
        'Tiết trời sang thu, rặng núi Lạc Hồn chìm trong màn sương mù bảng lảng. Cơn mưa đầu mùa sầm sập đổ xuống như xé toạc bầu trời đêm u tịch.',
        'Lữ khách phong trần kéo vội chiếc nón tơi sũng nước, bước chân dồn dập men theo bậc đá rêu phong mà tiến vào sơn môn. Ngôi chùa cổ này vốn đã hoang phế trăm năm, pho tượng hộ pháp trước tiền đình đứt gãy một cánh tay, trơ trọi nhìn màn mưa lạnh buốt.',
        '“Người đời qua lại chốn nhân gian, mấy ai thấu được đâu là thực tướng, đâu là huyễn mộng?”',
        'Đẩy nhẹ cánh cửa gỗ mọt kêu kẽo kẹt, mùi hương trầm mục nát cùng mùi ẩm mốc phả vào sống mũi. Thế nhưng, giữa gian chính điện lạnh tanh, lại có một đốm nến leo lét tỏa sáng. Dưới ánh nến bập bùng, một vị lão tăng mặc chiếc tăng bào vá trăm mảnh đang nhắm mắt ngồi thiền, tràng hạt gỗ bồ đề trong tay khẽ lần từng hạt một, phát ra tiếng chạm lách cách đều đặn.',
        'Lữ khách thở phào cất lời: “Bạch thầy, vãn bối lỡ bước trong đêm mưa, xin tá túc qua đêm đợi trời hửng sáng.”',
        'Lão tăng không mở mắt, khóe môi khẽ cong lên một nụ cười kỳ quái: “Thí chủ lỡ bước, hay là oan hồn dưới chân người dẫn lối đưa đường?”',
        'Một tia chớp trắng lóa xé rách bóng tối, rọi sáng bóng lưng lão tăng. Dưới sàn gạch loang lổ nước mưa, bóng đen của vị tăng nhân kia... lại mang hình hài của một con hồ ly chín đuôi đang ngóc đầu rình rập.'
      ]
    }
  },
  {
    id: 'sau-tram-nam-nuoc-tan',
    title: 'Sáu Trăm Năm Nước Tấn',
    originalTitle: '晋国六百年',
    author: 'Lý Thạc',
    category: 'lich-su',
    status: 'Đang dịch',
    totalChapters: '120/450 chương',
    cover: './covers/book2.jpg',
    description: 'Biên niên sử hào hùng về 600 năm thăng trầm của bá chủ Trung Nguyên thời Xuân Thu. Tái hiện trọn vẹn hào khí tranh bá của Tấn Văn Công cùng sự hưng suy của các thế gia khanh đại phu.',
    tags: ['Sử ký', 'Xuân Thu Liệt Quốc', 'Mưu lược'],
    downloadUrl: './covers/book2.jpg',
    sampleChapter: {
      chapterNumber: 1,
      title: 'Khởi Đầu Của Bá Nghiệp Phong Vân',
      content: [
        'Năm Chu Bình Vương dời đô về đông, vương thất suy vi, chư hầu bắt đầu nổi lên tranh đoạt thiên hạ.',
        'Đất Tấn khi ấy nằm nơi hiểm trở của sông Hoàng Hà và dãy Thái Hàng sơn, đất rộng người đông, kỵ binh tinh nhuệ. Thế nhưng nội bộ lại liên tiếp xảy ra các cuộc thanh trừng đẫm máu giữa các công tộc.',
        'Trong đêm tuyết rơi trắng xóa thành Giáng Đô, khúc khải hoàn của quân vương chưa kịp dứt thì tiếng đao kiếm của mưu thần đã vang lên sau bức rèm nhung.',
        'Một triều đại rực rỡ kéo dài sáu thế kỷ chính thức mở màn trong máu lửa và những mưu lược kinh thiên động địa.'
      ]
    }
  },
  {
    id: 'ky-su-dai-an',
    title: 'Ký Sự Đại Án: Hồ Sơ Trọng Án Bất Hủ',
    originalTitle: '重案实录',
    author: 'Chu Hạo',
    category: 'trinh-tham',
    status: 'Hoàn thành',
    totalChapters: 'Trọn bộ 3 tập',
    cover: './covers/book3.jpg',
    description: 'Hồi ức phá án nghẹt thở của các cảnh sát hình sự kỳ cựu. Bút pháp chân thực, dồn dập, bóc tách từng lớp tâm lý tội phạm và hiện trường pháp y chuẩn xác.',
    tags: ['Hình sự', 'Tâm lý tội phạm', 'Chân thực'],
    downloadUrl: './covers/book3.jpg',
    sampleChapter: {
      chapterNumber: 1,
      title: 'Manh Mối Nơi Đầm Lầy Hoang',
      content: [
        'Cơn mưa phùn rả rích kéo dài suốt ba ngày khiến toàn bộ khu đầm lầy ngoại ô phía bắc thành phố biến thành một bãi bùn lầy lội không lối vào.',
        'Khoảng bốn giờ chiều ngày 14 tháng 11, một người dân đi đánh cá hoảng hốt chạy vào đồn công an trình báo việc phát hiện một chiếc vali da màu đen nửa chìm nửa nổi dưới đám bèo tây.',
        'Đội trưởng Đội Trọng án Trần Phong gạt tàn thuốc, khẽ nhíu mày khi nhìn vào kết quả phân tích sơ bộ từ bác sĩ pháp y: “Nạn nhân đã tử vong ít nhất 48 giờ trước. Kẻ thủ ác ra tay cực kỳ chuyên nghiệp, không để lại bất kỳ dấu vân tay hay vết cắt thừa thãi nào.”',
        'Một cuộc đấu trí không khoan nhượng giữa lực lượng điều tra và hung thủ giấu mặt bắt đầu từ đây.'
      ]
    }
  }
];
