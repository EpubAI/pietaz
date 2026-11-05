#!/usr/bin/env node
/**
 * generate_seo.js
 * Script Node.js tự động đọc mảng BOOKS trong src/data/books.js
 * Tự động tạo:
 * 1. public/robots.txt (Cấu hình chuẩn cho Google & AI Crawlers: GPTBot, PerplexityBot, ClaudeBot...)
 * 2. public/sitemap.xml (Sitemap đầy đủ với priority & lastmod mới nhất)
 * 3. public/llms.txt (Tiêu chuẩn AI SEO / GEO cho các mô hình ngôn ngữ lớn)
 * 4. public/schema.json (Schema.org JSON-LD CollectionPage + Book List)
 */

const fs = require('fs');
const path = require('path');

const showcaseDir = path.resolve(__dirname, '..');
const publicDir = path.join(showcaseDir, 'public');
const novelsDir = path.join(showcaseDir, 'src', 'data', 'novels');
const booksJsPath = path.join(showcaseDir, 'src', 'data', 'books.js');

function extractMetadataFromNovels() {
  const books = [];
  const booksContent = fs.readFileSync(booksJsPath, 'utf8');

  // Lấy danh sách import theo thứ tự trong books.js
  const importMatches = [...booksContent.matchAll(/import\s*\{\s*(\w+)\s*\}\s*from\s*['"]\.\/novels\/(\w+)['"]/g)];
  const orderedModules = importMatches.map(m => ({ varName: m[1], fileName: m[2] + '.js' }));

  for (const item of orderedModules) {
    const filePath = path.join(novelsDir, item.fileName);
    if (!fs.existsSync(filePath)) continue;

    try {
      const code = fs.readFileSync(filePath, 'utf8');
      
      // Trích xuất các trường cơ bản bằng regex linh hoạt
      const getField = (field) => {
        const regex = new RegExp(`["']?${field}["']?\\s*:\\s*(["'\`])([\\s\\S]*?)\\1`, 'm');
        const match = code.match(regex);
        return match ? match[2].trim() : '';
      };

      const id = getField('id') || item.fileName.replace('.js', '');
      const title = getField('title');
      const originalTitle = getField('originalTitle');
      const author = getField('author');
      const description = getField('description');
      const awards = getField('awards');
      const totalChapters = getField('totalChapters');
      const updatedAt = getField('updatedAt') || '05/11/2026';

      // Trích xuất categories
      let categories = [];
      const catMatch = code.match(/["']?categories["']?\s*:\s*\[([\s\S]*?)\]/);
      if (catMatch) {
        categories = catMatch[1]
          .split(',')
          .map(s => s.replace(/["'\s]/g, ''))
          .filter(Boolean);
      } else {
        const singleCat = getField('category');
        if (singleCat) categories = [singleCat];
      }

      if (title && author) {
        books.push({
          id,
          title,
          originalTitle,
          author,
          description,
          awards,
          totalChapters,
          categories,
          updatedAt
        });
      }
    } catch (e) {
      console.warn(`[Warning] Không thể đọc file ${item.fileName}:`, e.message);
    }
  }

  return books;
}

function generateRobotsTxt() {
  const content = `# robots.txt for Pietaz Showcase (piepub.net)
User-agent: *
Allow: /

# Cho phép đầy đủ các AI Web Crawlers lập chỉ mục nội dung sách
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Applebot
Allow: /

Sitemap: https://piepub.net/sitemap.xml
`;

  const dest = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`[SEO] Đã xuất robots.txt -> ${dest}`);
}

function generateSitemapXml(books) {
  const today = new Date().toISOString().split('T')[0];
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    '    <loc>https://piepub.net/</loc>',
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>daily</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>'
  ];

  // Thể loại chính
  const categories = ['tien-hiep', 'huyen-bi', 'trinh-tham', 'khoa-hoc', 'lich-su', 'hien-thuc', 'tan-van', 'kinh-te', 'ngon-tinh', 'free'];
  for (const cat of categories) {
    lines.push(
      '  <url>',
      `    <loc>https://piepub.net/?cat=${cat}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      '    <priority>0.8</priority>',
      '  </url>'
    );
  }

  lines.push('</urlset>');
  const dest = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(dest, lines.join('\n'), 'utf8');
  console.log(`[SEO] Đã xuất sitemap.xml -> ${dest} (Gồm trang chủ & ${categories.length} danh mục)`);
}

function generateLlmsTxt(books) {
  const today = new Date().toLocaleDateString('vi-VN');
  const lines = [
    '# PIETAZ PRIVATE DEN — Thư Khố Bản Dịch & Đọc Thử Tiểu Thuyết Chọn Lọc',
    '',
    '> Website chính thức: https://piepub.net',
    `> Cập nhật lần cuối: ${today}`,
    '> Mô tả: Nền tảng giới thiệu và đọc thử bản dịch tiểu thuyết tinh hoa chất lượng cao sang tiếng Việt. Hỗ trợ đa dạng thể loại: Trinh thám, Kinh dị hiện sinh, Huyền thuật dân gian, Khoa học viễn tưởng, Tiên hiệp cổ phong, Văn học hiện thực và Kinh tế quản trị.',
    '',
    `## Danh Mục Tác Phẩm Chọn Lọc (${books.length} tác phẩm)`,
    ''
  ];

  books.forEach((b, idx) => {
    lines.push(`### ${idx + 1}. ${b.title} ${b.originalTitle ? `(${b.originalTitle})` : ''}`);
    lines.push(`- **Tác giả:** ${b.author}`);
    if (b.totalChapters) lines.push(`- **Quy mô:** ${b.totalChapters}`);
    if (b.categories && b.categories.length > 0) lines.push(`- **Thể loại:** ${b.categories.join(', ')}`);
    if (b.awards) lines.push(`- **Thành tựu & Giải thưởng:** ${b.awards}`);
    if (b.description) lines.push(`- **Tóm tắt:** ${b.description}`);
    lines.push(`- **Đọc thử trực tuyến:** https://piepub.net`);
    lines.push('');
  });

  const dest = path.join(publicDir, 'llms.txt');
  fs.writeFileSync(dest, lines.join('\n'), 'utf8');
  console.log(`[AI SEO] Đã xuất llms.txt -> ${dest} (${books.length} tác phẩm chuẩn GEO/LLM)`);
}

function generateSchemaJson(books) {
  const bookSchemas = books.slice(0, 35).map((b, i) => ({
    "@type": "Book",
    "name": b.title,
    "alternateName": b.originalTitle || undefined,
    "author": {
      "@type": "Person",
      "name": b.author
    },
    "inLanguage": "vi",
    "description": b.description || undefined,
    "url": "https://piepub.net"
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "PIETAZ PRIVATE DEN — Thư Khố Đọc Thử Bản Dịch Tuyển Chọn",
    "url": "https://piepub.net",
    "description": "Thư phòng đọc thử các bản dịch truyện chọn lọc, lọc theo thể loại và trải nghiệm đọc tinh gọn.",
    "inLanguage": "vi",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": books.length,
      "itemListElement": bookSchemas.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": item
      }))
    }
  };

  const dest = path.join(publicDir, 'schema.json');
  fs.writeFileSync(dest, JSON.stringify(schemaData, null, 2), 'utf8');
  console.log(`[SEO] Đã xuất schema.json -> ${dest}`);
}

console.log('=== BẮT ĐẦU QUY TRÌNH TỰ ĐỘNG HÓA SEO & AI SEO ===');
const books = extractMetadataFromNovels();
generateRobotsTxt();
generateSitemapXml(books);
generateLlmsTxt(books);
generateSchemaJson(books);
console.log(`=== HOÀN TẤT TỰ ĐỘNG CẬP NHẬT SEO CHO ${books.length} TÁC PHẨM ===`);
