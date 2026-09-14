console.log("Hệ thống Layout đang khởi động...");

function initLayout() {
    try {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        // Chống chạy lặp
        if (headerPlaceholder && headerPlaceholder.innerHTML.includes('site-header')) return;

        // ==========================================
        // 1. MÃ HTML CỦA HEADER
        // ==========================================
        const headerHTML = `
            <style>
                #header-placeholder { position: sticky; top: 0; z-index: 1000; }
                header {
                    position: sticky; top: 0; z-index: 1000; background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
                    transition: box-shadow 0.3s ease, background-color 0.3s ease;
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 1rem 5%; gap: clamp(1rem, 2vw, 3rem);
                }
                header.scrolled { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); background: rgba(255, 255, 255, 0.98); }
                .logo-link { display: flex; align-items: center; gap: 15px; text-decoration: none; cursor: pointer; flex-shrink: 1; }
                .logo img { height: 48px; width: auto; object-fit: contain; flex-shrink: 0; }
                .logo-text { display: flex; flex-direction: column; justify-content: center; width: max-content; }
                .logo-text div { text-align: justify; text-align-last: justify; width: 100%; }
                #logo-line-1 { font-weight: 700; color: var(--text-dark); font-size: 1.15rem; }
                #logo-line-2 { font-weight: 600; color: var(--text-body); font-size: 0.88rem; margin-top: 2px; }
                #logo-line-3 { font-weight: 500; color: var(--text-body); font-size: 0.8rem; margin-top: 2px; }
                .nav-links { display: flex; align-items: center; gap: clamp(0.5rem, 1.5vw, 2.5rem); flex-shrink: 0; }
                .nav-item {
                    text-decoration: none; color: var(--text-body); font-weight: 500;
                    font-size: clamp(0.85rem, 1vw, 0.95rem); transition: var(--transition);
                    position: relative; padding: 0.5rem 0; white-space: nowrap;
                }
                .nav-item::after {
                    content: ''; position: absolute; width: 0; height: 2px; bottom: 0; left: 0;
                    background-color: var(--primary); transition: var(--transition); border-radius: 2px;
                }
                .nav-item:hover { color: var(--text-dark); }
                .nav-item:hover::after { width: 100%; }
                .menu-toggle { display: none; font-size: 1.5rem; color: var(--text-dark); cursor: pointer; }
                .btn-login {
                    display: inline-flex; align-items: center; justify-content: center;
                    background-color: var(--primary); color: white; padding: 0.6rem 1.2rem;
                    border-radius: 50px; font-weight: 500; font-size: clamp(0.8rem, 1vw, 0.9rem);
                    text-decoration: none; border: none; white-space: nowrap; transition: var(--transition);
                }
                .btn-login:hover {
                    background-color: var(--primary-hover); transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
                }
                @media (max-width: 1100px) { .logo-text { display: none; } }
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
                    <a href="#" class="btn-login" id="btnAuthNav">Đăng nhập</a>
                </nav>
            </header>
        `;

        // ==========================================
        // 2. MÃ HTML CỦA FOOTER
        // ==========================================
        const footerHTML = `
            <footer>
                <p>&copy; 2026 Bộ môn Phục hồi chức năng. Mọi quyền được bảo lưu.</p>
            </footer>
        `;

        // Chèn vào DOM
        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

        // ==========================================
        // 3. XỬ LÝ SỰ KIỆN MENU & CUỘN TRANG
        // ==========================================
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

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('data-path') === currentPath) {
                item.style.color = 'var(--primary)';
                item.style.fontWeight = '600';
            }
        });

        const siteHeader = document.getElementById('site-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                siteHeader?.classList.add('scrolled');
            } else {
                siteHeader?.classList.remove('scrolled');
            }
        });

        // ==========================================
        // 4. FIREBASE AUTH & BẢO VỆ TRANG
        // ==========================================
        const btnAuthNav = document.getElementById('btnAuthNav');

        Promise.all([
            import('https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'),
            import('https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js'),
            import('https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js')
        ]).then(([appModule, authModule, fsModule]) => {
            const firebaseConfig = {
                apiKey: "AIzaSyDVT4akTw65Uj6KHymwWtQ9xyHVyfTlXIY",
                authDomain: "bmphcn-aa9c6.firebaseapp.com",
                projectId: "bmphcn-aa9c6",
                storageBucket: "bmphcn-aa9c6.firebasestorage.app",
                messagingSenderId: "749494392719",
                appId: "1:749494392719:web:f220c751ff541620045dfa"
            };
            
            const app = appModule.getApps().length === 0 ? appModule.initializeApp(firebaseConfig) : appModule.getApps()[0];
            const auth = authModule.getAuth(app);
            const db = fsModule.getFirestore(app);

            authModule.onAuthStateChanged(auth, async (user) => {
                
                // === BẢO VỆ TRANG (AUTH GUARD) ===
                const publicPages = [
                    'login.html', 'index.html', 'gioi-thieu.html', 
                    'thong-tin-giang-vien.html', 'tuyen-sinh.html', '', '/'
                ];
                const currentPageName = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';

                // Nếu chưa đăng nhập VÀ trang hiện tại nằm ngoài danh sách public -> Chặn!
                if (!user && !publicPages.includes(currentPageName)) {
                    alert("Vui lòng đăng nhập để truy cập trang này!");
                    window.location.replace('login.html');
                    return; 
                }

                // === HIỂN THỊ NÚT ĐĂNG NHẬP / TÊN ===
                const btn = document.getElementById('btnAuthNav');
                if (!btn) return;

                if (user) {
                    if (user.email === 'ths.phcn26@ump.edu.vn') {
                        setInterval(() => {
                            if (!btn.innerText.toLowerCase().includes('đăng xuất')) {
                                btn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Đăng xuất';
                                btn.style.backgroundColor = '#be123c'; 
                                btn.style.color = 'white';
                            }
                        }, 500);
                    } else {
                        try {
                            const userDoc = await fsModule.getDoc(fsModule.doc(db, "users", user.uid));
                            if (userDoc.exists()) {
                                btn.innerHTML = `<i class="fas fa-user-circle" style="margin-right:5px;"></i> ${userDoc.data().fullName || 'Tài khoản'}`;
                            } else {
                                btn.innerHTML = `<i class="fas fa-user-circle" style="margin-right:5px;"></i> ${user.email.split('@')[0]}`;
                            }
                        } catch(err) {
                            btn.innerHTML = `<i class="fas fa-user-circle" style="margin-right:5px;"></i> Tài khoản`;
                        }
                    }
                } else {
                    btn.innerHTML = 'Đăng nhập';
                    btn.style.backgroundColor = 'var(--primary)';
                }
            });
        }).catch(e => console.log("Lỗi tải module Firebase Auth tĩnh:", e));

        if (btnAuthNav) {
            btnAuthNav.addEventListener('click', function(e) {
                e.preventDefault(); 
                const currentText = this.innerText.toLowerCase();
                
                if (currentText.includes('đăng xuất')) {
                    if(confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?")) {
                        import('https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js').then((appModule) => {
                            import('https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js').then((authModule) => {
                                const app = appModule.getApps()[0];
                                if(app) {
                                    authModule.signOut(authModule.getAuth(app)).then(() => window.location.href = "login.html");
                                } else window.location.href = "login.html";
                            });
                        });
                    }
                } else if (currentText.includes('đăng nhập')) {
                    window.location.href = 'login.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            });
        }
    } catch (error) {
        console.error("Lỗi khi render Layout:", error);
    }
}

// BƯỚC QUAN TRỌNG: GỌI HÀM KHI DOM SẴN SÀNG
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLayout);
} else {
    initLayout();
}

// ==========================================
// 5. GHI NHẬN NHẬT KÝ TRUY CẬP (ACCESS LOGGER)
// ==========================================
async function recordAccessLog(userEmail = "Khách (Chưa đăng nhập)") {
    try {
        const [fsModule, appModule] = await Promise.all([
            import("https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"),
            import("https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js")
        ]);
        
        const app = appModule.getApps()[0];
        if (!app) return;
        const db = fsModule.getFirestore(app);
        
        let ip = "Không xác định";
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            if (ipResponse.ok) ip = (await ipResponse.json()).ip;
        } catch (e) {}

        const lastLogTime = sessionStorage.getItem("lastLogTime");
        const now = Date.now();
        if (lastLogTime && (now - parseInt(lastLogTime) < 60000)) return;

        await fsModule.addDoc(fsModule.collection(db, "access_logs"), {
            timestamp: new Date().toISOString(),
            path: window.location.pathname.split('/').pop() || 'index.html',
            userAgent: navigator.userAgent,
            ip: ip,
            userEmail: userEmail
        });
        sessionStorage.setItem("lastLogTime", now.toString());
    } catch (error) {}
}

setTimeout(() => {
    import('https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js').then((appModule) => {
        import('https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js').then((authModule) => {
            try {
                const app = appModule.getApps()[0];
                if(app) {
                    authModule.onAuthStateChanged(authModule.getAuth(app), (user) => {
                        recordAccessLog(user ? user.email : "Khách (Chưa đăng nhập)");
                    });
                } else recordAccessLog("Khách (Chưa đăng nhập)");
            } catch (e) { recordAccessLog("Khách (Chưa đăng nhập)"); }
        });
    }).catch(() => recordAccessLog("Khách (Chưa đăng nhập)"));
}, 2000);
