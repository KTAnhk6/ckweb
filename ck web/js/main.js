// ===== 1. CÁC BIẾN CẤU HÌNH SLIDE =====
const sliderImages = [
    'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1950',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1950',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1950'
];
let currentSlide = 0;

// ===== 2. HÀM XỬ LÝ CHUYỂN TRANG CHI TIẾT =====
function goToProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// ===== 3. HÀM CHẠY SLIDE TỰ ĐỘNG =====
function autoPlayBanner() {
    const hero = document.querySelector('.hero');
    if (hero) {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        hero.style.transition = "background-image 1s ease-in-out";
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${sliderImages[currentSlide]}')`;
    }
}

// Chạy slide mỗi 5 giây
setInterval(autoPlayBanner, 5000);

// ===== 4. CÁC SỰ KIỆN KHI TRANG ĐÃ LOAD XONG =====
document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll cho các liên kết #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Xử lý tìm kiếm
    const searchBtn = document.querySelector('.search-box button');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchInput = document.querySelector('.search-box input');
            if (searchInput && searchInput.value.trim()) {
                alert('Tìm kiếm: ' + searchInput.value);
            }
        });
    }

    // Hiệu ứng Sticky Header khi cuộn chuột
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, #5a4fcf 0%, #663a8c 100%)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        }
    });
});