document.addEventListener("DOMContentLoaded", function () {
    // 1. MÃ HTML CỦA HEADER (Giải pháp CSS thuần: Thẳng đều 2 mép, chống nhảy chữ)
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
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 5%;
                gap: clamp(1rem, 2vw, 3rem); /* Co giãn khoảng cách giữa Logo và Menu */
            }

            /* Đổ bóng tự động khi cuộn trang xuống */
            header.scrolled {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                background: rgba(255, 255, 255, 0.98);
            }

            /* LOGO & CHỮ: Kỹ thuật Typography căn đều 2 bên hoàn hảo */
            .logo-link {
                display: flex;
                align-items: center;
                gap: 15px;
                text-decoration: none;
                cursor: pointer;
                flex-shrink: 1; /* Cho phép co lại nếu cần */
            }

            .logo img {
                height: 48px;
                width: auto;
                object-fit: contain;
                flex-shrink: 0;
            }

            .logo-text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: max-content; /* Chiều ngang ăn theo dòng dài nhất (Dòng 3) */
            }

            .logo-text div {
                text-align: justify;
                text-align-last: justify; /* Lệnh thần thánh: Ép các chữ giãn đều ra 2 sát mép */
                width: 100%;
            }

            /* Tinh chỉnh size chữ để các dòng có độ dài tự nhiên gần bằng nhau, giúp khoảng trắng giãn ra đẹp hơn */
            #logo-line-1 { font-weight: 700; color: var(--text-dark); font-size: 1.15rem; }
            #logo-line-2 { font-weight: 600; color: var(--text-body); font-size: 0.88rem; margin-top: 2px; }
            #logo-line-3 { font-weight: 500; color: var(--text-body); font-size: 0.8rem; margin-top: 2px; }

            /* MENU ĐIỀU HƯỚNG */
            .nav-links {
                display: flex;
                align-items: center;
                gap: clamp(0.5rem, 1.5vw, 2.5rem); /* Co giãn khoảng cách menu linh hoạt */
                flex-shrink: 0;
            }

            .nav-item {
                text-decoration: none;
                color: var(--text-body);
                font-weight: 500;
                font-size: clamp(0.85rem, 1vw, 0.95rem);
                transition: var(--transition);
                position: relative;
                padding: 0.5rem 0;
                white-space: nowrap; /* SỬA LỖI: Cấm tuyệt đối việc "Giới thiệu" bị bẻ xuống 2 dòng */
            }

            .nav-item::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: var(--primary);
                transition: var(--transition);
                border-radius: 2px;
            }

            .nav-item:hover { color: var(--text-dark); }
            .nav-item:hover::after { width: 100%; }

            .menu-toggle { display: none; font-size: 1.5rem; color: var(--text-dark); cursor: pointer; }

            /* NÚT ĐĂNG NHẬP */
            .btn-login {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background-color: var(--primary);
                color: white;
                padding: 0.6rem 1.2rem;
                border-radius: 50px;
                font-weight: 500;
                font-size: clamp(0.8rem, 1vw, 0.9rem);
                text-decoration: none;
                border: none;
                white-space: nowrap;
                transition: var(--transition);
            }
            .btn-login:hover {
                background-color: var(--primary-hover);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
            }

            /* Responsive: Ẩn chữ logo trên iPad hẹp / Điện thoại để dành chỗ cho Menu */
            @media (max-width: 1100px) {
                .logo-text { display: none; } 
            }

            @media (max-width: 900px) {
                .menu-toggle { display: block; }
                .nav-links {
                    position: absolute; top: 100%; left: 0; width: 100%;
                    background: white; flex-direction: column; padding: 1rem 0; gap: 0;
                    box-shadow: 0 10px 15px rgba(0,0,0,0.05); border-top: 1px solid var(--border);
                    opacity: 0; visibility: hidden; transform: translateY(-10px); transition: 0.3s;
                }
                .nav-links.active { opacity: 1; visibility: visible; transform: translateY(0); }
                .nav-item { padding: 1rem 2rem; width: 100%; }
                .nav-item::after { display: none; }
                .btn-login { margin: 1rem 2rem; width: calc(100% - 4rem); text-align: center; }
            }
        </style>
        <header id="site-header">
            <a href="index.html" class="logo-link">
                <div class="logo">
                    <img src="images/logo_Bộ môn.png" alt="Logo Bộ môn Phục hồi chức năng">
                </div>
                <!-- 3 Dòng chữ được phục hồi và căn đều 2 bên (Justify) -->
                <div class="logo-text">
                    <div id="logo-line-1">Bộ môn Phục hồi chức năng</div>
                    <div id="logo-line-2">Trường Điều dưỡng - Kỹ thuật Y học</div>
                    <div id="logo-line-3">Đại học Y Dược Thành phố Hồ Chí Minh</div>
                </div>
            </a>
            
            <div class="menu-toggle" id="mobile-menu">
                <i class="fas fa-bars"></i>
            </div>

            <nav class="nav-links" id="nav-links">
                <a href="gioi-thieu.html" class="nav-item" data-path="gioi-thieu.html">Giới thiệu</a>
                <a href="tuyen-sinh.html" class="nav-item" data-path="tuyen-sinh.html">Tuyển sinh</a>
                <a href="luan-van.html" class="nav-item" data-path="luan-van.html">Luận văn & Khóa luận</a>
                <a href="tai-nguyen.html" class="nav-item" data-path="tai-nguyen.html">Tài nguyên</a>
                <a href="thong-bao.html" class="nav-item" data-path="thong-bao.html">Thông báo</a>
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

    // 6. TẠO HIỆU ỨNG ĐỔ BÓNG KHI CUỘN TRANG
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
            e.preventDefault(); 
            const currentText = this.innerText.toLowerCase();
            
            if (currentText.includes('đăng nhập')) {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        });
    }
});
