// ===== UTILITIES FUNCTIONS =====

// Lưu order vào localStorage
function saveOrder(orderData) {
    // Tạo ID đơn hàng
    const ordersList = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
        id: '#ORD' + String(1000 + ordersList.length).padStart(3, '0'),
        customer: orderData.customer || 'Khách hàng',
        items: orderData.items || [],
        total: orderData.total || 0,
        status: 'completed',
        date: new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0'),
        time: new Date().toLocaleTimeString('vi-VN'),
        shippingAddress: orderData.shippingAddress || '',
        paymentMethod: orderData.paymentMethod || 'COD'
    };
    
    ordersList.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(ordersList));
    
    console.log('Order saved:', newOrder);
    return newOrder;
}

// Lấy danh sách orders
function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

// Tính doanh thu theo ngày
function getRevenueByDate(date) {
    const orders = getOrders();
    const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    
    return orders
        .filter(o => o.date === dateStr && o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0);
}

// Tính doanh thu trong khoảng thời gian
function getRevenueBetweenDates(startDate, endDate) {
    const orders = getOrders();
    const startStr = startDate.getFullYear() + '-' + String(startDate.getMonth() + 1).padStart(2, '0') + '-' + String(startDate.getDate()).padStart(2, '0');
    const endStr = endDate.getFullYear() + '-' + String(endDate.getMonth() + 1).padStart(2, '0') + '-' + String(endDate.getDate()).padStart(2, '0');
    
    return orders
        .filter(o => {
            const oDate = o.date;
            return o.status === 'completed' && oDate >= startStr && oDate <= endStr;
        })
        .reduce((sum, o) => sum + o.total, 0);
}

// Tính doanh thu 7 ngày gần đây
function getRevenueLast7Days() {
    const today = new Date();
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        last7Days.push({
            date: date,
            revenue: getRevenueByDate(date)
        });
    }
    
    return last7Days;
}

// Tính doanh thu tháng này
function getRevenueThisMonth() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    return getRevenueBetweenDates(firstDay, today);
}

// Tính doanh thu năm nay
function getRevenueThisYear() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), 0, 1);
    
    return getRevenueBetweenDates(firstDay, today);
}

// Format giá
function formatPrice(price) {
    if (!price) return '0đ';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

// Format ngày
function formatDate(date) {
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Tính tổng doanh thu
function getTotalRevenue() {
    const orders = getOrders();
    return orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0);
}

// Tính số đơn hàng
function getTotalOrders() {
    return getOrders().length;
}

// Tính số đơn hàng hoàn thành
function getCompletedOrders() {
    const orders = getOrders();
    return orders.filter(o => o.status === 'completed').length;
}

// Tính số đơn hàng đang xử lý
function getPendingOrders() {
    const orders = getOrders();
    return orders.filter(o => o.status === 'pending').length;
}
