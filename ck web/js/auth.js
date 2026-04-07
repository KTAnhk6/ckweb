// ===== DỮ LIỆU NGƯỜI DÙNG MẪU =====
const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Admin',
        email: 'admin@sneakerstore.com',
        phone: '0901234567',
        address: 'TP.HCM',
        avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
        id: 2,
        username: 'user1',
        password: 'user123',
        role: 'user',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0912345678',
        address: 'Hà Nội',
        avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
        id: 3,
        username: 'user2',
        password: 'user123',
        role: 'user',
        name: 'Trần Thị B',
        email: 'tranthib@email.com',
        phone: '0923456789',
        address: 'Đà Nẵng',
        avatar: 'https://i.pravatar.cc/150?u=3'
    }
];

// ===== KIỂM TRA ĐĂNG NHẬP KHI LOAD TRANG =====
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra remember me
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const user = JSON.parse(rememberedUser);
        redirectUser(user);
    }
    
    // Kiểm tra session
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser) {
        const user = JSON.parse(sessionUser);
        updateUIBasedOnLogin(user);
    }
});

// ===== XỬ LÝ FORM ĐĂNG NHẬP =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember')?.checked || false;
        const errorMessage = document.getElementById('errorMessage');

        // Tìm user
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Xóa mật khẩu trước khi lưu
            const { password, ...userWithoutPassword } = user;
            
            // Lưu vào session
            sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            
            // Lưu remember nếu được chọn
            if (remember) {
                localStorage.setItem('rememberedUser', JSON.stringify(userWithoutPassword));
            }
            
            // Chuyển hướng
            redirectUser(user);
        } else {
            if (errorMessage) {
                errorMessage.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng!';
                errorMessage.style.display = 'block';
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        }
    });
}

// ===== CHUYỂN HƯỚNG THEO ROLE =====
function redirectUser(user) {
    if (user.role === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'user.html';
    }
}

// ===== KIỂM TRA QUYỀN TRUY CẬP =====
function checkAuth(requiredRole = null) {
    const sessionUser = sessionStorage.getItem('currentUser');
    const rememberedUser = localStorage.getItem('rememberedUser');
    
    let user = null;
    if (sessionUser) {
        user = JSON.parse(sessionUser);
    } else if (rememberedUser) {
        user = JSON.parse(rememberedUser);
        sessionStorage.setItem('currentUser', rememberedUser);
    }
    
    if (!user) {
        // Chưa đăng nhập, chuyển về login
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return null;
    }
    
    // Kiểm tra role nếu cần
    if (requiredRole && user.role !== requiredRole) {
        // Sai role, chuyển về trang phù hợp
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user.html';
        }
        return null;
    }
    
    return user;
}

// ===== CẬP NHẬT GIAO DIỆN THEO TRẠNG THÁI ĐĂNG NHẬP =====
function updateUIBasedOnLogin(user) {
    // Cập nhật header
    const loginLink = document.querySelector('.login-link');
    const userMenu = document.querySelector('.user-menu');
    
    if (user && loginLink && userMenu) {
        // Đã đăng nhập
        const header = document.querySelector('.header-content');
        if (header) {
            // Thay login link bằng user menu
            const userMenuHTML = `
                <div class="user-menu">
                    <div class="cart-icon" onclick="window.location.href='cart.html'">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </div>
                    <div class="user-dropdown">
                        <div class="user-info" onclick="toggleDropdown()">
                            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                            <span>${user.name}</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="dropdown-menu" id="dropdownMenu">
                            <a href="${user.role === 'admin' ? 'admin.html' : 'user.html'}?tab=profile">
                                <i class="fas fa-user"></i> Hồ sơ
                            </a>
                            <a href="${user.role === 'admin' ? 'admin.html' : 'user.html'}?tab=cart">
                                <i class="fas fa-shopping-cart"></i> Giỏ hàng
                            </a>
                            <a href="${user.role === 'admin' ? 'admin.html' : 'user.html'}?tab=orders">
                                <i class="fas fa-history"></i> Lịch sử
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="#" onclick="logout()">
                                <i class="fas fa-sign-out-alt"></i> Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            const searchCart = document.querySelector('.search-cart');
            if (searchCart) {
                searchCart.innerHTML = userMenuHTML;
            }
        }
    }
}

// ===== ĐĂNG XUẤT =====
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        window.location.href = 'index.html';
    }
}

// ===== TOGGLE DROPDOWN =====
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// ===== ĐÓNG DROPDOWN KHI CLICK RA NGOÀI =====
window.onclick = function(event) {
    if (!event.target.closest('.user-dropdown')) {
        const dropdown = document.getElementById('dropdownMenu');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
}

// --- ĐOẠN CODE THÊM MỚI CHO CHỨC NĂNG ĐĂNG KÝ TRÊN LOGIN.HTML ---
document.addEventListener('DOMContentLoaded', function() {
    // Tìm form trong trang login.html (nơi bạn đang để giao diện đăng ký)
    const loginForm = document.querySelector('.right-side form');
    const agreeCheckbox = document.getElementById('agree-terms');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // 1. Kiểm tra nếu chưa tích ô vuông
            if (!agreeCheckbox.checked) {
                event.preventDefault(); // Ngăn gửi form
                alert('Vui lòng tích vào ô xác nhận để có thể đăng ký!');
                return;
            }

            // 2. Kiểm tra mật khẩu và xác nhận mật khẩu
            const allPasswords = loginForm.querySelectorAll('input[type="password"]');
            const password = allPasswords[0].value;
            const confirmPass = allPasswords[1].value;

            if (password !== confirmPass) {
                event.preventDefault();
                alert('Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại!');
                return;
            }

            // 3. Nếu mọi thứ hợp lệ
            alert('Đăng ký thành công tài khoản SneakerStore!');
            // Bạn có thể thêm dòng dưới nếu muốn chuyển trang sau khi đăng ký thành công:
            // window.location.href = 'index.html'; 
        });
    }
});