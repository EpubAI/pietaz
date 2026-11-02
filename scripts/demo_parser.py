import zipfile, os, re, json, math, sys
from bs4 import BeautifulSoup

def process_epub_for_demo(epub_path, meta=None):
    if not os.path.exists(epub_path):
        raise FileNotFoundError(f"Không tìm thấy file EPUB tại: {epub_path}")

    filename = os.path.basename(epub_path)
    base_name = re.sub(r'\.epub$', '', filename, flags=re.IGNORECASE)
    
    # ID chuẩn hóa slug
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', base_name.lower()).strip('-')

    project_root = r'C:\Users\admin\.gemini\antigravity\scratch\novel-showcase'
    public_covers = os.path.join(project_root, 'public', 'covers')
    novels_data_dir = os.path.join(project_root, 'src', 'data', 'novels')
    os.makedirs(public_covers, exist_ok=True)
    os.makedirs(novels_data_dir, exist_ok=True)

    cover_filename = f"{slug}.jpg"
    cover_dest = os.path.join(public_covers, cover_filename)

    with zipfile.ZipFile(epub_path, 'r') as z:
        # 1. Tìm và trích xuất ảnh bìa
        cover_entry = None
        for name in z.namelist():
            if any(name.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                if 'cover' in name.lower():
                    cover_entry = name
                    break
        if not cover_entry:
            # Lấy ảnh đầu tiên nếu không có tên 'cover'
            for name in z.namelist():
                if any(name.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    cover_entry = name
                    break

        if cover_entry:
            cover_bytes = z.read(cover_entry)
            with open(cover_dest, 'wb') as cf:
                cf.write(cover_bytes)
            print(f"-> Đã trích xuất bìa: {cover_entry} -> {cover_filename} ({len(cover_bytes):,} bytes)")
        else:
            print("! Không tìm thấy ảnh trong EPUB, dùng placeholder.")
            cover_filename = 'dai-kich-doi.jpg'

        # 2. Thu thập toàn bộ chapter HTML/XHTML hợp lệ
        all_entries = z.namelist()
        valid_chap_entries = []
        for name in all_entries:
            nl = name.lower()
            if nl.endswith(('.xhtml', '.html', '.htm')):
                if not any(k in nl for k in ['cover', 'nav', 'toc', 'publishing', 'titlepage', 'copyright', 'about']):
                    valid_chap_entries.append(name)

        # Sắp xếp theo thứ tự số nếu có
        def sort_key(s):
            nums = re.findall(r'\d+', s)
            return int(nums[-1]) if nums else 999999
        valid_chap_entries.sort(key=sort_key)

        total_chapters_count = len(valid_chap_entries)
        total_word_count = 0
        all_chapter_data = []

        for idx, entry in enumerate(valid_chap_entries, 1):
            html = z.read(entry).decode('utf-8', errors='replace')
            soup = BeautifulSoup(html, 'html.parser')

            # Lấy tiêu đề chương
            h = soup.find(['h1', 'h2', 'h3', 'title'])
            title_text = h.get_text().strip() if h else f"Chương {idx}"
            # Xóa các khoảng trắng thừa
            title_text = re.sub(r'\s+', ' ', title_text)

            paragraphs = []
            for p in soup.find_all('p'):
                t = p.get_text().strip()
                if t:
                    paragraphs.append(t)
            
            # Tính số chữ của chương
            chap_words = sum(len(p.split()) for p in paragraphs)
            total_word_count += chap_words

            all_chapter_data.append({
                'id': idx,
                'title': title_text,
                'content': paragraphs, # Toàn văn FULL không cắt cúp
                'words': chap_words
            })

    # 3. Tính số chương demo theo quy tắc: 1/10 số chương, tối thiểu 1 chương, tối đa 50 chương
    demo_count = max(1, min(50, math.ceil(total_chapters_count / 10)))
    demo_chapters = all_chapter_data[:demo_count]

    # Xóa field 'words' trong JSON output để file nhẹ và đồng bộ format
    for c in demo_chapters:
        c.pop('words', None)

    # 4. Định dạng số chữ (Ví dụ: 153.000 chữ hoặc 429.000 chữ)
    if total_word_count >= 10000:
        word_count_str = f"{total_word_count / 10000:.1f} vạn chữ ({total_word_count:,} chữ)".replace('.', ',')
    else:
        word_count_str = f"{total_word_count:,} chữ"

    print(f"-> Thống kê: Tổng {total_chapters_count} chương | Tổng {total_word_count:,} chữ.")
    print(f"-> Xuất demo: {demo_count} chương FULL toàn văn ({len(demo_chapters)} chapters).")

    return {
        'slug': slug,
        'cover': f'./covers/{cover_filename}',
        'total_chapters_count': total_chapters_count,
        'total_word_count': total_word_count,
        'word_count_str': word_count_str,
        'demo_count': demo_count,
        'demo_chapters': demo_chapters
    }

if __name__ == '__main__':
    print("Demo parser loaded successfully.")
