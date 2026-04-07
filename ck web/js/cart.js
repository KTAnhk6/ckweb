let cartCount = 3;

// Cart click
document.querySelector('.cart-icon')?.addEventListener('click', () => {
    alert('Xem giỏ hàng');
});

// Add to cart
document.querySelectorAll('.fa-shopping-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartCount++;
        document.querySelector('.cart-count').textContent = cartCount;
        
        const productName = e.target.closest('.product-card')?.querySelector('.product-name')?.textContent;
        alert('Đã thêm ' + productName + ' vào giỏ!');
    });
});