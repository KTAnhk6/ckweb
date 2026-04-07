// ===== KIỂM TRA ĐĂNG NHẬP =====
// Giả lập user data
const currentUser = {
    id: 2,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    avatar: 'https://i.pravatar.cc/150?u=2',
    role: 'user',
    joinDate: '15/01/2024'
};

// Biến toàn cục
let cartCount = 3;
let isEditing = false;
let userCart = [
    { id: 1, name: 'Nike Air Max 270', price: 2599000, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
    { id: 2, name: 'Adidas Ultraboost 22', price: 3499000, quantity: 2, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=200' }
];

let userWishlist = [
    { id: 1, name: 'Nike Air Max 270', price: 2599000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300' },
    { id: 2, name: 'Adidas Ultraboost 22', price: 3499000, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300' }
];

// ===== KHỞI TẠO TRANG =====
document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị thông tin user
    loadUserData();
    
    // Cập nhật số lượng giỏ hàng
    updateCartCount();
    
    // Load dữ liệu các section
    loadCartItems();
    loadWishlistItems();
    loadOrderHistory();
    
    // Đóng dropdown khi click ra ngoài
    window.onclick = function(event) {
        if (!event.target.closest('.user-dropdown')) {
            const dropdown = document.getElementById('dropdownMenu');
            if (dropdown) dropdown.classList.remove('show');
        }
    };
});

// ===== HIỂN THỊ THÔNG TIN USER =====
function loadUserData() {
    // Cập nhật thông tin cơ bản
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('profileName').textContent = currentUser.name;
    
    // Cập nhật avatar
    const avatars = document.querySelectorAll('.user-avatar, #profileAvatar');
    avatars.forEach(avatar => {
        avatar.src = currentUser.avatar;
    });
    
    // Cập nhật thông tin trong form
    const displayElements = {
        'display-fullname': currentUser.name,
        'display-email': currentUser.email,
        'display-phone': currentUser.phone,
        'display-address': currentUser.address
    };
    
    Object.keys(displayElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = displayElements[id];
    });
    
    // Cập nhật input values
    const inputElements = {
        'input-fullname': currentUser.name,
        'input-email': currentUser.email,
        'input-phone': currentUser.phone,
        'input-address': currentUser.address
    };
    
    Object.keys(inputElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = inputElements[id];
    });
}

// ===== DROPDOWN MENU =====
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

// ===== CHUYỂN SECTION =====
function showSection(sectionId) {
    // Ẩn tất cả sections
    document.querySelectorAll('.user-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Hiện section được chọn
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Đóng dropdown
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) dropdown.classList.remove('show');
    
    // Cập nhật active menu trong profile left
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Tìm và active menu item tương ứng
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (item.querySelector('span')?.textContent.toLowerCase().includes(sectionId)) {
            item.classList.add('active');
        }
    });
    
    // Nếu là section đặc biệt
    if (sectionId === 'profile') {
        // Cập nhật title
        document.querySelector('.profile-header h3').innerHTML = '<i class="fas fa-id-card"></i> Hồ sơ của tôi';
    }
}

// ===== GIỎ HÀNG =====
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount, #menuCartCount');
    cartCountElements.forEach(el => {
        if (el) el.textContent = cartCount;
    });
}

function loadCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (userCart.length === 0) {
        cartItems.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <p style="color: #666;">Giỏ hàng của bạn đang trống</p>
                    <a href="index.html#products" class="btn" style="margin-top: 1rem; display: inline-block;">Mua sắm ngay</a>
                </td>
            </tr>
        `;
        document.getElementById('cartTotal').textContent = '0đ';
        return;
    }
    
    let total = 0;
    let html = '';
    
    userCart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <tr>
                <td>
                    <div class="cart-product">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'">
                        <div>
                            <h4>${item.name}</h4>
                            <p>Mã: SP00${item.id}</p>
                        </div>
                    </div>
                </td>
                <td>${formatPrice(item.price)}</td>
                <td>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>${formatPrice(itemTotal)}</td>
                <td>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    cartItems.innerHTML = html;
    document.getElementById('cartTotal').textContent = formatPrice(total);
}

function updateQuantity(productId, quantity) {
    const item = userCart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        loadCartItems();
        showNotification('Đã cập nhật số lượng!', 'success');
    }
}

function removeFromCart(productId) {
    userCart = userCart.filter(item => item.id !== productId);
    cartCount = userCart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartCount();
    loadCartItems();
    showNotification('Đã xóa sản phẩm khỏi giỏ hàng!', 'success');
}

function checkout() {
    if (userCart.length === 0) {
        showNotification('Giỏ hàng trống!', 'error');
        return;
    }
    showNotification('Đang chuyển đến trang thanh toán...', 'info');
}

// ===== WISHLIST =====
function loadWishlistItems() {
    const wishlistGrid = document.querySelector('#wishlist .wishlist-grid');
    if (!wishlistGrid) return;
    
    if (userWishlist.length === 0) {
        wishlistGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; grid-column: 1/-1;">
                <i class="fas fa-heart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                <p style="color: #666;">Chưa có sản phẩm yêu thích</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    userWishlist.forEach(item => {
        html += `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'">
                <div class="wishlist-info">
                    <h4>${item.name}</h4>
                    <p class="price">${formatPrice(item.price)}</p>
                    <div class="wishlist-actions">
                        <button class="add-to-cart-btn" onclick="addToCartFromWishlist(${item.id})">
                            <i class="fas fa-shopping-cart"></i> Thêm vào giỏ
                        </button>
                        <button class="remove-wishlist-btn" onclick="removeFromWishlist(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    wishlistGrid.innerHTML = html;
}

function addToCartFromWishlist(productId) {
    const item = userWishlist.find(item => item.id === productId);
    if (item) {
        const cartItem = userCart.find(cart => cart.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            userCart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                image: item.image
            });
        }
        
        cartCount = userCart.reduce((sum, item) => sum + item.quantity, 0);
        updateCartCount();
        loadCartItems();
        showNotification('Đã thêm vào giỏ hàng!', 'success');
    }
}

function removeFromWishlist(productId) {
    userWishlist = userWishlist.filter(item => item.id !== productId);
    loadWishlistItems();
    showNotification('Đã xóa khỏi danh sách yêu thích!', 'success');
}

// ===== LỊCH SỬ MUA HÀNG =====
function loadOrderHistory() {
    const orderBody = document.querySelector('#orders tbody');
    if (!orderBody) return;
    
    const orders = [
        { id: 'ORD001', date: '15/03/2024', product: 'Nike Air Max 270', total: 2599000, status: 'completed' },
        { id: 'ORD002', date: '10/03/2024', product: 'Adidas Ultraboost 22', total: 3499000, status: 'pending' },
        { id: 'ORD003', date: '05/03/2024', product: 'Air Jordan 1 Mid', total: 4299000, status: 'completed' },
    ];
    
    let html = '';
    orders.forEach(order => {
        html += `
            <tr>
                <td>#${order.id}</td>
                <td>${order.date}</td>
                <td>${order.product}</td>
                <td>${formatPrice(order.total)}</td>
                <td><span class="order-status ${order.status}">${getStatusText(order.status)}</span></td>
                <td><button class="view-detail-btn" onclick="viewOrderDetail('${order.id}')">Chi tiết</button></td>
            </tr>
        `;
    });
    
    orderBody.innerHTML = html;
}

function viewOrderDetail(orderId) {
    showNotification('Xem chi tiết đơn hàng: #' + orderId, 'info');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xử lý',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

// ===== PROFILE =====
function changeAvatar() {
    showNotification('Chức năng đổi avatar đang được phát triển!', 'info');
}

function toggleEdit() {
    isEditing = !isEditing;
    const rows = document.querySelectorAll('.form-row');
    const editBtn = document.querySelector('.edit-btn');
    const saveBtn = document.getElementById('saveBtn');
    
    rows.forEach(row => {
        if (row.id) {
            if (isEditing) {
                row.classList.add('editing');
            } else {
                row.classList.remove('editing');
            }
        }
    });
    
    if (isEditing) {
        editBtn.style.background = '#28a745';
        if (saveBtn) saveBtn.style.display = 'block';
    } else {
        editBtn.style.background = '#764ba2';
        if (saveBtn) saveBtn.style.display = 'none';
    }
}

function cancelEdit() {
    isEditing = false;
    const rows = document.querySelectorAll('.form-row');
    const editBtn = document.querySelector('.edit-btn');
    const saveBtn = document.getElementById('saveBtn');
    
    // Reset values
    document.getElementById('input-fullname').value = currentUser.name;
    document.getElementById('input-email').value = currentUser.email;
    document.getElementById('input-phone').value = currentUser.phone;
    document.getElementById('input-address').value = currentUser.address;
    
    rows.forEach(row => {
        row.classList.remove('editing');
    });
    
    editBtn.style.background = '#764ba2';
    if (saveBtn) saveBtn.style.display = 'none';
}

// Xử lý submit form profile
document.getElementById('profileForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy giá trị mới
    const newName = document.getElementById('input-fullname').value;
    const newEmail = document.getElementById('input-email').value;
    const newPhone = document.getElementById('input-phone').value;
    const newAddress = document.getElementById('input-address').value;
    
    // Cập nhật currentUser
    currentUser.name = newName;
    currentUser.email = newEmail;
    currentUser.phone = newPhone;
    currentUser.address = newAddress;
    
    // Cập nhật display
    document.getElementById('display-fullname').textContent = newName;
    document.getElementById('display-email').textContent = newEmail;
    document.getElementById('display-phone').textContent = newPhone;
    document.getElementById('display-address').textContent = newAddress;
    document.getElementById('userName').textContent = newName;
    document.getElementById('profileName').textContent = newName;
    
    showNotification('Cập nhật thông tin thành công!', 'success');
    cancelEdit();
});

// ===== CÀI ĐẶT =====
function changePassword(event) {
    event.preventDefault();
    
    const oldPass = document.getElementById('oldPassword')?.value;
    const newPass = document.getElementById('newPassword')?.value;
    const confirmPass = document.getElementById('confirmPassword')?.value;
    
    if (!oldPass || !newPass || !confirmPass) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    if (newPass !== confirmPass) {
        showNotification('Mật khẩu mới không khớp!', 'error');
        return;
    }
    
    if (newPass.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
        return;
    }
    
    showNotification('Đổi mật khẩu thành công!', 'success');
    document.getElementById('changePasswordForm')?.reset();
}

function toggleNotification(type) {
    const emailChecked = document.getElementById('emailNotification')?.checked;
    const smsChecked = document.getElementById('smsNotification')?.checked;
    
    if (type === 'email') {
        showNotification(`Email notification: ${emailChecked ? 'Bật' : 'Tắt'}`, 'info');
    } else {
        showNotification(`SMS notification: ${smsChecked ? 'Bật' : 'Tắt'}`, 'info');
    }
}

// ===== ĐĂNG XUẤT =====
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        // Xóa session
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        // Chuyển về trang login
        window.location.href = 'login.html';
    }
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

function showNotification(message, type = 'success') {
    // Xóa notification cũ
    const oldNotification = document.querySelector('.notification-popup');
    if (oldNotification) oldNotification.remove();
    
    // Tạo notification mới
    const notification = document.createElement('div');
    notification.className = `notification-popup ${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'info') icon = 'fa-info-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Style
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'info' ? '#17a2b8' : '#ffc107'};
        color: ${type === 'warning' ? '#333' : 'white'};
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Thêm CSS cho notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);