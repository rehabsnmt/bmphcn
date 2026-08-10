document.addEventListener("DOMContentLoaded", function () {
    // 1. MÃ HTML CỦA HEADER (Đã thêm CSS cố định Header khi cuộn)
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

            /* CSS Ẩn chữ bên cạnh logo khi màn hình <= 768px (Điện thoại) */
            @media (max-width: 768px) {
                .logo-text { display: none !important; }
            }
        </style>
        <header id="site-header">
            <a href="index.html" class="logo-link">
                <div class="logo" style="margin: 0; border: none; padding: 0;">
                    <img src="images/logo_Bộ môn.png" alt="Logo Bộ môn Phục hồi chức năng">
                </div>
                <div class="logo-text">
                    <div id="logo-line-1">Bộ môn Phục hồi chức năng</div>
                    <div id="logo-line-2">Trường Điều dưỡng - Kỹ thuật Y học</div>
                    <div id="logo-line-3">Đại học Y Dược Thành phố Hồ Chí Minh</div>
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
                <a href="login.html" class="btn-login" id="btnAuthNav">Đăng nhập giảng viên</a>
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

    // 7. CĂN CHỈNH KÍCH THƯỚC CHỮ LOGO TỰ ĐỘNG
    function perfectAlignLogo() {
        const l1 = document.getElementById('logo-line-1');
        const l2 = document.getElementById('logo-line-2');
        const l3 = document.getElementById('logo-line-3');
        const logoImg = document.querySelector('.logo-link img');
        const logoText = document.querySelector('.logo-text');
        
        if (!l1 || !l2 || !l3 || !logoImg || !logoText) return;

        // Dừng việc tính toán chữ trên màn hình điện thoại (vì chữ đã bị CSS ẩn đi)
        if (window.innerWidth <= 768) return;

        if (logoImg.complete === false || logoImg.naturalHeight === 0) {
            logoImg.onload = perfectAlignLogo; return;
        }

        const baseFontSize = 22.4; 
        l1.style.fontSize = '20px'; l2.style.fontSize = '20px'; l3.style.fontSize = '20px';
        
        const w1 = l1.getBoundingClientRect().width;
        const w2 = l2.getBoundingClientRect().width;
        const w3 = l3.getBoundingClientRect().width;
        
        let targetWidth = (w1 / 20) * baseFontSize;
        const applySizes = (width) => {
            l1.style.fontSize = (20 * width / w1) + 'px';
            l2.style.fontSize = (20 * width / w2) + 'px';
            l3.style.fontSize = (20 * width / w3) + 'px';
        };
        applySizes(targetWidth);
        
        const imgHeight = logoImg.getBoundingClientRect().height || 48; 
        const textHeight = logoText.getBoundingClientRect().height; 
        if (textHeight > imgHeight && imgHeight > 0) {
            targetWidth = targetWidth * (imgHeight / textHeight);
            applySizes(targetWidth); 
        }
    }
    
    // Đợi một chút để ảnh render xong rồi mới căn chỉnh
    setTimeout(perfectAlignLogo, 50); 
    window.addEventListener('resize', perfectAlignLogo);
});
