// Kiểm tra quyền admin
const user = checkAuth('admin');
if (user) {
    displayAdminInfo(user);
}

// Hiển thị thông tin admin
function displayAdminInfo(user) {
    const adminInfo = document.getElementById('adminInfo');
    adminInfo.innerHTML = `
        <img src="${user.avatar || 'https://i.pravatar.cc/150?img=1'}" alt="Admin" class="admin-avatar">
        <div class="admin-details">
            <h4>${user.name}</h4>
            <p>${user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</p>
        </div>
    `;
}

// Dữ liệu sản phẩm mẫu
const inventory = [
    { id: 'SP001', name: 'Nike Air Max 270', category: 'Nike', cost: 1800000, price: 2599000, stock: 45, sold: 120, status: 'in-stock' },
    { id: 'SP002', name: 'Adidas Ultraboost 22', category: 'Adidas', cost: 2400000, price: 3499000, stock: 32, sold: 89, status: 'in-stock' },
    { id: 'SP003', name: 'Air Jordan 1 Mid', category: 'Jordan', cost: 3000000, price: 4299000, stock: 15, sold: 234, status: 'low-stock' },
    { id: 'SP004', name: 'Puma RS-X³', category: 'Puma', cost: 1900000, price: 2899000, stock: 28, sold: 67, status: 'in-stock' },
    { id: 'SP005', name: 'Nike Air Force 1', category: 'Nike', cost: 2000000, price: 2999000, stock: 0, sold: 156, status: 'out-of-stock' },
    { id: 'SP006', name: 'Adidas NMD', category: 'Adidas', cost: 2200000, price: 3299000, stock: 8, sold: 45, status: 'low-stock' },
];

// Dữ liệu đơn hàng mẫu
const recentOrders = [
    { id: '#ORD001', customer: 'Nguyễn Văn A', product: 'Nike Air Max 270', total: 2599000, status: 'completed' },
    { id: '#ORD002', customer: 'Trần Thị B', product: 'Adidas Ultraboost', total: 3499000, status: 'pending' },
    { id: '#ORD003', customer: 'Lê Văn C', product: 'Air Jordan 1', total: 4299000, status: 'completed' },
    { id: '#ORD004', customer: 'Phạm Thị D', product: 'Puma RS-X³', total: 2899000, status: 'processing' },
    { id: '#ORD005', customer: 'Hoàng Văn E', product: 'Nike Air Force 1', total: 2999000, status: 'completed' },
];

// Load dữ liệu khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initSampleOrders();  // Khởi tạo dữ liệu orders mẫu
    updateStats();
    loadInventory();
    loadRecentOrders();
    loadTopProducts();
    initializeCharts();
    updateDateTime();
    
    // Interval cập nhật thời gian
    setInterval(updateDateTime, 1000);
});

// Cập nhật thống kê
function updateStats() {
    document.getElementById('totalProducts').textContent = inventory.length;
    
    const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
    document.getElementById('totalInventory').textContent = totalStock;
    
    // Lấy số người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    document.getElementById('totalUsers').textContent = users.length;
    
    // Lấy doanh thu thực tế từ localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' ? o.total : 0), 0);
    document.getElementById('totalRevenue').textContent = formatPrice(totalRevenue);
    
    // Cập nhật số đơn hàng
    document.getElementById('totalOrders').textContent = orders.length;
}

// Load bảng tồn kho
function loadInventory() {
    const tbody = document.getElementById('inventoryTable');
    if (!tbody) return;
    
    tbody.innerHTML = inventory.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${formatPrice(item.cost)}</td>
            <td>${formatPrice(item.price)}</td>
            <td>${item.stock}</td>
            <td>${item.sold}</td>
            <td><span class="status-badge ${item.status}">${getStatusText(item.status)}</span></td>
            <td>
                <button class="action-btn" onclick="editProduct('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="viewProduct('${item.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Load đơn hàng gần đây
function loadRecentOrders() {
    const tbody = document.getElementById('recentOrdersTable');
    if (!tbody) return;
    
    // Lấy orders từ localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Nếu không có orders, dùng dữ liệu mẫu nhưng lưu vào localStorage
    if (orders.length === 0) {
        orders = recentOrders;
        localStorage.setItem('orders', JSON.stringify(orders));
    }
    
    // Hiển thị 10 đơn hàng gần nhất
    const recentList = orders.slice(-10).reverse();
    
    tbody.innerHTML = recentList.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
        </tr>
    `).join('');
}

// Load top sản phẩm bán chạy
function loadTopProducts() {
    const tbody = document.getElementById('topProductsTable');
    if (!tbody) return;
    
    const topProducts = [...inventory]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);
    
    tbody.innerHTML = topProducts.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.sold}</td>
            <td>${item.stock}</td>
            <td>${formatPrice(item.sold * item.price)}</td>
        </tr>
    `).join('');
}

// Khởi tạo dữ liệu mẫu nếu chưa có
function initSampleOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        // Tạo dữ liệu orders mẫu cho 7 ngày gần đây
        const sampleOrders = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
            
            // Tạo 3-5 orders mỗi ngày
            const orderCount = Math.floor(Math.random() * 3) + 3;
            
            for (let j = 0; j < orderCount; j++) {
                const random = Math.floor(Math.random() * recentOrders.length);
                sampleOrders.push({
                    id: '#ORD' + String(1000 + sampleOrders.length).padStart(3, '0'),
                    customer: recentOrders[random].customer,
                    product: recentOrders[random].product,
                    total: recentOrders[random].total,
                    status: ['completed', 'processing', 'pending'][Math.floor(Math.random() * 3)],
                    date: dateStr
                });
            }
        }
        
        localStorage.setItem('orders', JSON.stringify(sampleOrders));
        console.log('Đã khởi tạo ' + sampleOrders.length + ' orders mẫu');
    }
}
    // Biểu đồ tồn kho theo danh mục
    const inventoryCtx = document.getElementById('inventoryChart')?.getContext('2d');
    if (inventoryCtx) {
        const categories = {};
        inventory.forEach(item => {
            categories[item.category] = (categories[item.category] || 0) + item.stock;
        });
        
        new Chart(inventoryCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: ['#667eea', '#764ba2', '#ffd700', '#28a745']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Biểu đồ doanh thu - tính từ orders thực tế
    const revenueCtx = document.getElementById('revenueChart')?.getContext('2d');
    if (revenueCtx) {
        const orders = JSON.parse(localStorage.getItem('orders')) || recentOrders;
        const today = new Date();
        const last7Days = [];
        const revenueData = [];
        
        // Tính doanh thu 7 ngày gần đây
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
            const dayName = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
            
            last7Days.push(dayName);
            
            // Tính tổng doanh thu của ngày
            const dayRevenue = orders
                .filter(o => o.date === dateStr && o.status === 'completed')
                .reduce((sum, o) => sum + o.total, 0);
            
            revenueData.push(dayRevenue);
        }
        
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Doanh thu (VND)',
                    data: revenueData,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('vi-VN') + 'đ';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Biểu đồ bán hàng
    const salesCtx = document.getElementById('salesChart')?.getContext('2d');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'bar',
            data: {
                labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                datasets: [{
                    label: 'Số đơn hàng',
                    data: [12, 19, 15, 25, 22, 30, 28],
                    backgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Format giá
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

// Lấy text trạng thái
function getStatusText(status) {
    const statusMap = {
        'in-stock': 'Còn hàng',
        'low-stock': 'Sắp hết',
        'out-of-stock': 'Hết hàng',
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'completed': 'Hoàn thành'
    };
    return statusMap[status] || status;
}

// Cập nhật thời gian
function updateDateTime() {
    const now = new Date();
    const dateTimeStr = now.toLocaleString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentDateTime').textContent = dateTimeStr;
}

// Xuất báo cáo
function exportInventory() {
    alert('Đang xuất báo cáo tồn kho...');
}

// Tìm kiếm tồn kho
document.getElementById('searchInventory')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('inventoryTable');
    tbody.innerHTML = filtered.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${formatPrice(item.cost)}</td>
            <td>${formatPrice(item.price)}</td>
            <td>${item.stock}</td>
            <td>${item.sold}</td>
            <td><span class="status-badge ${item.status}">${getStatusText(item.status)}</span></td>
            <td>
                <button class="action-btn" onclick="editProduct('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="viewProduct('${item.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
});

// Lọc theo danh mục
document.getElementById('filterCategory')?.addEventListener('change', function(e) {
    const category = e.target.value;
    const filtered = category ? inventory.filter(item => item.category === category) : inventory;
    
    const tbody = document.getElementById('inventoryTable');
    tbody.innerHTML = filtered.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${formatPrice(item.cost)}</td>
            <td>${formatPrice(item.price)}</td>
            <td>${item.stock}</td>
            <td>${item.sold}</td>
            <td><span class="status-badge ${item.status}">${getStatusText(item.status)}</span></td>
            <td>
                <button class="action-btn" onclick="editProduct('${item.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="viewProduct('${item.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
});

// Chuyển tab
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Xóa active khỏi tất cả tab
        document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        
        // Active tab hiện tại
        this.parentElement.classList.add('active');
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
        document.getElementById('pageTitle').textContent = this.textContent.trim();
    });
});

// Các hàm xử lý khác
function editProduct(id) {
    alert(`Chỉnh sửa sản phẩm: ${id}`);
}

function viewProduct(id) {
    alert(`Xem chi tiết sản phẩm: ${id}`);
}