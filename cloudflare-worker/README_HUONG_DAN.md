# HƯỚNG DẪN KÍCH HOẠT CLOUDFLARE WORKER ĐẾM VIEW TỰ ĐỘNG CHO PIEPUB.NET

API này sẽ giúp đồng bộ 100% lượt click "Đọc demo" và "Xem chi tiết" của tất cả độc giả trên toàn thế giới vào một cơ sở dữ liệu chung, tự động tính Top truyện Hot theo Tuần / Tháng mà hoàn toàn miễn phí.

---

### BƯỚC 1: TẠO KV NAMESPACE (NƠI LƯU SỐ LƯỢT CLICK)
1. Đăng nhập vào [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Ở thanh menu bên trái, chọn **Storage & Databases** ➔ **KV**.
3. Bấm **Create namespace**.
4. Đặt tên: `PIETAZ_VIEWS` rồi bấm **Add**.

---

### BƯỚC 2: TẠO VÀ DÁN CODE CHO WORKER
1. Ở thanh menu bên trái, chọn **Compute (Workers & Pages)** ➔ Bấm **Create application** (hoặc **Create Worker**).
2. Đặt tên Worker là: `piepub-views-api` rồi bấm **Deploy**.
3. Sau khi deploy xong, bấm vào nút **Edit code** (hoặc **Quick Edit**).
4. Xóa hết code mặc định và **Copy toàn bộ nội dung trong file `cloudflare-worker/worker.js` dán vào**.
5. Bấm **Save and deploy** (ở góc trên bên phải).

---

### BƯỚC 3: LIÊN KẾT KV VỚI WORKER (BINDING)
1. Trong trang quản lý Worker `piepub-views-api`, chọn tab **Settings** ➔ chọn mục **Bindings** (hoặc **Variables & Secrets** tùy giao diện mới).
2. Cuộn xuống mục **KV Namespace Bindings** ➔ Bấm **Add binding**.
3. Điền:
   - **Variable name**: `PIETAZ_VIEWS` (chính xác từng chữ in hoa).
   - **KV namespace**: Chọn namespace `PIETAZ_VIEWS` đã tạo ở Bước 1.
4. Bấm **Save and deploy**.

---

### BƯỚC 4: GẮN TÊN MIỀN PHỤ (CUSTOM DOMAIN / ROUTE)
Để website gọi được API mượt mà không bị chặn:
1. Vẫn trong mục **Settings** của Worker, chọn tab **Domains & Routes**.
2. Bấm **Add** ➔ Chọn **Custom Domain**.
3. Điền: `api.piepub.net` ➔ Bấm **Add Custom Domain** (Cloudflare sẽ tự động tạo SSL và trỏ DNS chỉ trong 10 giây).

*(Lúc này endpoint của bạn sẽ là: `https://api.piepub.net/api/interact` và `https://api.piepub.net/api/trending`)*.
