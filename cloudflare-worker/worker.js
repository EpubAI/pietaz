/**
 * Cloudflare Worker: API Đếm và Xếp Hạng Lượt Tương Tác Sách Theo Tuần / Tháng cho Pietaz Showcase
 * Hỗ trợ CORS cho https://piepub.net và localhost
 * Lưu trữ bằng Cloudflare KV (Namespace: PIETAZ_VIEWS)
 */

export default {
  async fetch(request, env, ctx) {
    // Xử lý CORS Preflight
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    // Helper tính tuần hiện tại (YYYY-WW) và tháng hiện tại (YYYY-MM)
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    
    // Tính số tuần theo chuẩn ISO
    const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
    const pastDaysOfYear = (now - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getUTCDay() + 1) / 7);
    const weekStr = `${year}-W${String(weekNumber).padStart(2, '0')}`;
    const monthStr = `${year}-${month}`;

    // 1. ENDPOINT GHI NHẬN TƯƠNG TÁC: POST /api/interact
    if (request.method === 'POST' && (pathname === '/api/interact' || pathname === '/interact')) {
      try {
        const body = await request.json();
        const bookId = body.bookId;
        if (!bookId || typeof bookId !== 'string') {
          return new Response(JSON.stringify({ error: 'bookId is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Tăng đếm cho tuần và tháng trong KV
        const keyWeek = `v:w:${weekStr}:${bookId}`;
        const keyMonth = `v:m:${monthStr}:${bookId}`;
        const keyTotal = `v:t:${bookId}`;

        // Lấy giá trị hiện tại và tăng 1 (nếu có KV)
        if (env.PIETAZ_VIEWS) {
          const [curW, curM, curT] = await Promise.all([
            env.PIETAZ_VIEWS.get(keyWeek),
            env.PIETAZ_VIEWS.get(keyMonth),
            env.PIETAZ_VIEWS.get(keyTotal)
          ]);

          const valW = (parseInt(curW, 10) || 0) + 1;
          const valM = (parseInt(curM, 10) || 0) + 1;
          const valT = (parseInt(curT, 10) || 0) + 1;

          // Lưu lại với TTL: tuần lưu 14 ngày, tháng lưu 60 ngày
          await Promise.all([
            env.PIETAZ_VIEWS.put(keyWeek, valW.toString(), { expirationTtl: 14 * 86400 }),
            env.PIETAZ_VIEWS.put(keyMonth, valM.toString(), { expirationTtl: 60 * 86400 }),
            env.PIETAZ_VIEWS.put(keyTotal, valT.toString())
          ]);

          return new Response(JSON.stringify({ success: true, bookId, week: valW, month: valM }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } else {
          // Fallback nếu chưa bind KV
          return new Response(JSON.stringify({ success: true, message: 'KV not bound, fallback mode' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 2. ENDPOINT LẤY TOÀN BỘ SỐ LIỆU: GET /api/trending?timeframe=week|month
    if (request.method === 'GET' && (pathname === '/api/trending' || pathname === '/trending' || pathname === '/api/views')) {
      const timeframe = url.searchParams.get('timeframe') || 'week';
      const prefix = timeframe === 'month' ? `v:m:${monthStr}:` : `v:w:${weekStr}:`;

      const results = {};
      if (env.PIETAZ_VIEWS) {
        try {
          const list = await env.PIETAZ_VIEWS.list({ prefix });
          const keys = list.keys.map(k => k.name);

          for (const key of keys) {
            const val = await env.PIETAZ_VIEWS.get(key);
            const bookId = key.replace(prefix, '');
            results[bookId] = parseInt(val, 10) || 0;
          }
        } catch (e) {
          // ignore
        }
      }

      return new Response(JSON.stringify({
        timeframe,
        period: timeframe === 'month' ? monthStr : weekStr,
        views: results
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60' // Cache Edge 60 giây
        }
      });
    }

    return new Response(JSON.stringify({ message: 'Pietaz Views API is running' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
