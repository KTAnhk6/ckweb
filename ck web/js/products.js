// Dữ liệu 28 sản phẩm
const products = [
    // Giày chạy bộ (4 sản phẩm)
    { id: 'SP001', name: 'Nike Air Zoom Pegasus 40', category: 'running', brand: 'Nike', price: 1290000, oldPrice: 1490000, stock: 15, sold: 45, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
    { id: 'SP002', name: 'Adidas Supernova Ease', category: 'running', brand: 'Adidas', price: 1390000, oldPrice: 0, stock: 22, sold: 38, image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cbe301e2c23440afb067b76516315a47_9366/Supernova_Ease_Shoes_White_IF9563_01_00_standard.jpg' },
    { id: 'SP003', name: 'Hoka Bondi 9', category: 'running', brand: 'Hoka', price: 1450000, oldPrice: 0, stock: 18, sold: 42, image: 'https://dms.deckers.com/hoka/image/upload/f_auto,q_40,dpr_2/b_rgb:f7f7f9/w_1110/v1732554715/1162011-BBLC_6.png' },
    { id: 'SP022', name: 'Puma Velocity Nitro 2', category: 'running', brand: 'Puma', price: 1380000, oldPrice: 0, stock: 18, sold: 28, image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/378529/01/sv01/fnd/SEA/fmt/png/Velocity-NITRO-2-Run-75-Running-Shoes-Men' },
    // Giày tập luyện (4 sản phẩm)
    { id: 'SP004', name: 'Nike Metcon 9', category: 'training', brand: 'Nike', price: 1350000, oldPrice: 0, stock: 20, sold: 35, image: 'https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwb4695d32/nk/5f5/3/a/9/a/0/5f53a9a0_10aa_4da4_a448_ef36dc04cf71.jpg' },
    { id: 'SP005', name: 'Reebok Nano X3', category: 'training', brand: 'Reebok', price: 1250000, oldPrice: 1450000, stock: 25, sold: 32, image: 'https://tse2.mm.bing.net/th/id/OIP.b7lbqAzuTL9LJ30TTWCPYwHaFn?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'SP006', name: 'Under Armour TriBase Reign 4', category: 'training', brand: 'Under Armour', price: 1190000, oldPrice: 0, stock: 16, sold: 28, image: 'https://photo2.i-run.fr/under-armour-tribase-reign-4-m-chaussures-homme-532183-1-sz.jpg' },
    { id: 'SP023', name: 'Nike Free Metcon 5', category: 'training', brand: 'Nike', price: 1320000, oldPrice: 0, stock: 22, sold: 20, image: 'https://tse2.mm.bing.net/th/id/OIP.DJ00EGJxvxr0AhGLp9ae1wHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3' },
    // Giày bóng rổ (4 sản phẩm)
    { id: 'SP007', name: 'Nike LeBron XX', category: 'basketball', brand: 'Nike', price: 1490000, oldPrice: 0, stock: 14, sold: 40, image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8c68dbb8-e288-43de-95ea-d7e887687597/LEBRON+XX+EP.png' },
    { id: 'SP008', name: 'Adidas Harden Vol. 7', category: 'basketball', brand: 'Adidas', price: 1420000, oldPrice: 0, stock: 19, sold: 36, image: 'https://tse1.mm.bing.net/th/id/OIP.nR7znjb9Fy_j90om8T6vzgHaFM?pid=ImgDet&w=474&h=332&rs=1&o=7&rm=3' },
    { id: 'SP009', name: 'Puma MB.02 LaMelo Ball', category: 'basketball', brand: 'Puma', price: 1380000, oldPrice: 1580000, stock: 21, sold: 44, image: 'https://tse1.mm.bing.net/th/id/OIP.OqVn12Q25Ew89h45NelTkAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'SP024', name: 'Jordan Ultra.Fly 3', category: 'basketball', brand: 'Jordan', price: 1440000, oldPrice: 0, stock: 17, sold: 23, image: 'https://image.goat.com/transform/v1/attachments/product_template_pictures/images/105/802/110/original/AO6224_004.png.png?action=crop&width=750' },
    // Giày bóng đá (4 sản phẩm)
    { id: 'SP010', name: 'Nike Phantom GX Elite', category: 'football', brand: 'Nike', price: 1480000, oldPrice: 0, stock: 12, sold: 30, image: 'https://tse3.mm.bing.net/th/id/OIP.Q2NQSapOZvm3jo5cUggLxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'SP011', name: 'Adidas Predator Accuracy.1', category: 'football', brand: 'Adidas', price: 1430000, oldPrice: 0, stock: 17, sold: 33, image: 'https://tse4.mm.bing.net/th/id/OIP.Nit-TYukLe_RHmVXom__vwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'SP012', name: 'Puma Ultra Ultimate', category: 'football', brand: 'Puma', price: 1280000, oldPrice: 1480000, stock: 23, sold: 29, image: 'https://tse1.mm.bing.net/th/id/OIP.Kf9fAeDUAHicsPrXNOShbwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'SP025', name: 'Adidas X Speedportal.1', category: 'football', brand: 'Adidas', price: 1460000, oldPrice: 0, stock: 14, sold: 26, image: 'https://images.prodirectsport.com/ProductImages/Main/281127_Main_Thumb_1372500.jpg' },
    // Giày tennis (4 sản phẩm)
    { id: 'SP013', name: 'NikeCourt Vapor Pro', category: 'tennis', brand: 'Nike', price: 1320000, oldPrice: 1520000, stock: 24, sold: 41, image: 'https://tse4.mm.bing.net/th/id/OIP.7LtRqw1Fs-etUlij5YxJYwAAAA?pid=ImgDet&w=400&h=400&rs=1&o=7&rm=3' },
    { id: 'SP014', name: 'Adidas Ubersonic 4', category: 'tennis', brand: 'Adidas', price: 1370000, oldPrice: 0, stock: 20, sold: 37, image: 'https://assets.adidas.com/images/w_1880,f_auto,q_auto/998f76fc58f140b6a4caa22150037ac5_9366/IF9103_HM3_hover.jpg' },
    { id: 'SP015', name: 'Asics Gel-Resolution 9', category: 'tennis', brand: 'Asics', price: 1340000, oldPrice: 0, stock: 22, sold: 39, image: 'https://cdn.runrepeat.com/i/asics/39589/asics-gel-resolution-9-steel-blue-hazard-green-03d5-main.jpg' },
    { id: 'SP026', name: 'Wilson Rush Pro 3.5', category: 'tennis', brand: 'Wilson', price: 1360000, oldPrice: 0, stock: 21, sold: 29, image: 'https://tse3.mm.bing.net/th/id/OIP.aay7JpDfy00nv9bEmYojuwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    // Giày cầu lông (4 sản phẩm)
    { id: 'SP016', name: 'Yonex Aerus Z', category: 'badminton', brand: 'Yonex', price: 1250000, oldPrice: 1450000, stock: 26, sold: 48, image: 'https://tse4.mm.bing.net/th/id/OIP.hdXgtj13RY8-XjRLOWa_GAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'SP017', name: 'Li-Ning Speed 9', category: 'badminton', brand: 'Li-Ning', price: 1180000, oldPrice: 0, stock: 28, sold: 50, image: 'https://wowsole.com/wp-content/uploads/2022/09/Li-Ning-Speed-9-Fred-VanVleet-Basketball-Shoes-Black-1200x1200.jpg' },
    { id: 'SP018', name: 'Victor Brave Sword 12', category: 'badminton', brand: 'Victor', price: 1220000, oldPrice: 0, stock: 24, sold: 43, image: 'https://badmintondirect.com/cdn/shop/files/SH970ACEC-5_900x.jpg?v=1686501226' },
    { id: 'SP027', name: 'Yonex Astrox 88D Pro', category: 'badminton', brand: 'Yonex', price: 1290000, oldPrice: 0, stock: 19, sold: 35, image: 'https://cdn.shopvnb.com/uploads/gallery/giay-cau-long-taro-tr024-1-den-vang_1723141701.webp' },
    // Giày đi bộ (4 sản phẩm)
    { id: 'SP019', name: 'New Balance Fresh Foam X 1080', category: 'walking', brand: 'New Balance', price: 1150000, oldPrice: 1350000, stock: 30, sold: 52, image: 'https://www.runningshoesguru.com/wp-content/uploads/2022/09/New-Balance-Fresh-Foam-X-1080-v12-14.jpeg' },
    { id: 'SP020', name: 'Skechers Go Walk', category: 'walking', brand: 'Skechers', price: 980000, oldPrice: 0, stock: 35, sold: 67, image: 'https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dwb14bb1e2/images/large/216275-1.jpg' },
    { id: 'SP021', name: 'Adidas Terrex Swift R4', category: 'walking', brand: 'Adidas', price: 1120000, oldPrice: 0, stock: 27, sold: 41, image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cbe301e2c23440afb067b76516315a47_9366/Supernova_Ease_Shoes_White_IF9563_01_00_standard.jpg' },
    { id: 'SP028', name: 'Nike Pegasus Trail 4', category: 'walking', brand: 'Nike', price: 1180000, oldPrice: 0, stock: 21, sold: 38, image: 'https://th.bing.com/th/id/OIP.lIowQIF-lznoVXaNE3T2BAHaFB?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' }
];

// Hàm render sản phẩm dựa trên mảng data truyền vào
function renderProducts(dataToRender = products) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = dataToRender.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'">
                <div class="product-actions">
                    <button class="action-btn" onclick="quickView(${product.id})"><i class="fas fa-eye"></i></button>
                    <button class="action-btn" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <p class="current-price" style="color: #764ba2; font-weight: bold;">${formatPrice(product.price)}</p>
                    <span style="font-size: 11px; color: #888;">Đã bán ${product.sold || 0}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Hàm lọc danh mục
function filterCategory(cat) {
    // Active class cho menu
    document.querySelectorAll('.category-list li').forEach(li => li.classList.remove('active'));
    
    // Lọc dữ liệu
    const filtered = (cat === 'all') ? products : products.filter(p => p.category === cat);
    
    renderProducts(filtered);
}

// Đảm bảo gọi render lần đầu khi trang load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});