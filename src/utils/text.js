// Hàm chuẩn hóa chuỗi tiếng Việt: loại bỏ dấu thanh, chuyển về chữ thường
export function normalizeVietnamese(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}
