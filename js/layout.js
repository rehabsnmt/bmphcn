document.addEventListener("DOMContentLoaded", function () {
    // 1. MÃ HTML CỦA HEADER (Đã xóa phần chữ cạnh logo)
    const headerHTML = `
        <style>
            /* Cố định phần chứa Header */
            #header-placeholder {
                position: sticky;
                top: 0;
                z-index: 1000;
            }

            /* Cố định thẻ header và thêm hiệu ứng mượt mà */
            header {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                transition: box-shadow 0.3s ease, background-color 0.3s ease;
            }

            /* Đổ bóng tự động khi cuộn trang xuống */
            header.scrolled {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                background: rgba(255, 255, 255, 0.98);
            }
        </style>
        <header id="site-header">
            <a href="index.html" class="logo-link">
                <div class="logo" style="margin: 0; border: none; padding: 0;">
                    <img src="images/logo_Bộ môn.png" alt="Logo Bộ môn Phục hồi chức năng">
                </div>
            </a>
            
            <div class="menu-toggle" id="mobile-menu" aria-label="Menu">
                <i class="fas fa-bars"></i>
            </div>

            <nav class="nav-links" id="nav-links">
                <a href="gioi-thieu.html" class="nav-item" data-path="gioi-thieu.html">Giới thiệu</a>
                <a href="tuyen-sinh.html" class="nav-item" data-path="tuyen-sinh.html">Tuyển sinh</a>
                <a href="luan-van.html" class="nav-item" data-path="luan-van.html">Luận văn & Khóa luận</a>
                <a href="tai-nguyen.html" class="nav-item" data-path="tai-nguyen.html">Tài nguyên</a>
                <a href="thong-bao.html" class="nav-item" data-path="thong-bao.html">Thông báo</a>
                <!-- Đổi href thành # để JS bên dưới xử lý luồng đi -->
                <a href="#" class="btn-login" id="btnAuthNav">Đăng nhập giảng viên</a>
            </nav>
        </header>
    `;

    // 2. MÃ HTML CỦA FOOTER
    const footerHTML = `
        <footer>
            <p>&copy; 2026 Bộ môn Phục hồi chức năng. Mọi quyền được bảo lưu.</p>
        </footer>
    `;

    // 3. CHÈN VÀO TRANG HTML
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // 4. XỬ LÝ MENU MOBILE
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // 5. TỰ ĐỘNG BÔI ĐẬM MENU ĐANG XEM
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('data-path') === currentPath) {
            item.style.color = 'var(--primary)';
            item.style.fontWeight = '600';
        }
    });

    // 6. TẠO HIỆU ỨNG ĐỔ BÓNG KHI CUỘN TRANG (Sticky Scroll Effect)
    const siteHeader = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            siteHeader?.classList.add('scrolled');
        } else {
            siteHeader?.classList.remove('scrolled');
        }
    });

    // 7. ĐIỀU HƯỚNG THÔNG MINH CHO NÚT "TÀI KHOẢN / ĐĂNG NHẬP"
    const btnAuthNav = document.getElementById('btnAuthNav');
    if (btnAuthNav) {
        btnAuthNav.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn trình duyệt tự động chuyển trang theo thẻ href mặc định
            
            const currentText = this.innerText.toLowerCase();
            
            // Nếu chữ trên nút có chứa từ "đăng nhập" -> Chuyển sang trang Login
            if (currentText.includes('đăng nhập')) {
                window.location.href = 'login.html';
            } 
            // Nếu chữ đã đổi (Thành tên giảng viên) -> Chuyển sang trang Dashboard
            else {
                window.location.href = 'dashboard.html';
            }
        });
    }
});
