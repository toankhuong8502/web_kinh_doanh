import { useMemo, useState } from "react";

const categories = [
  { name: "Mỹ phẩm", image: "photo-1596462502278-27bfdc403348", count: "05 sản phẩm" },
  { name: "Quần áo nữ", image: "photo-1483985988355-763728e1935b", count: "05 sản phẩm" },
];

const products = [
  { name: "Serum Dưỡng Ẩm Hyaluronic MMTT", category: "Mỹ phẩm", price: "299.000đ", oldPrice: "390.000đ", rating: "120", image: "photo-1608248543803-ba4f8c70ae0b", badge: "Bán chạy", description: "Serum cấp ẩm chuyên sâu giúp làn da mềm mại, căng mướt và tươi sáng. Kết cấu mỏng nhẹ, thấm nhanh, phù hợp cho chu trình chăm sóc da hằng ngày.", detail: "30ml · Mọi loại da · Xuất xứ: Hàn Quốc", stock: 24 },
  { name: "Kem Chống Nắng Daily UV SPF50+", category: "Mỹ phẩm", price: "259.000đ", oldPrice: "320.000đ", rating: "98", image: "photo-1556229010-6c3f2c9ca5f8", badge: "Bán chạy", description: "Kem chống nắng phổ rộng SPF50+ bảo vệ da trước tia UVA và UVB. Chất kem nhẹ, dễ tán, phù hợp sử dụng mỗi ngày.", detail: "50ml · SPF50+ PA++++ · Mọi loại da", stock: 18 },
  { name: "Sữa Rửa Mặt Dịu Nhẹ Rau Má", category: "Mỹ phẩm", price: "189.000đ", oldPrice: "230.000đ", rating: "76", image: "photo-1556228720-195a672e8a03", badge: "Mới về", description: "Làm sạch bụi bẩn và dầu thừa một cách dịu nhẹ, không gây cảm giác khô căng. Chiết xuất rau má giúp làn da luôn dễ chịu sau khi rửa.", detail: "120ml · Da nhạy cảm · Dùng sáng và tối", stock: 32 },
  { name: "Son Tint Lì Mịn Môi", category: "Mỹ phẩm", price: "179.000đ", oldPrice: "220.000đ", rating: "145", image: "photo-1586495777744-4413f21062fa", badge: "Bán chạy", description: "Son tint lên màu chuẩn với lớp finish mịn nhẹ, dễ tán và thoải mái suốt ngày dài. Bảng màu trẻ trung phù hợp nhiều phong cách.", detail: "4g · 6 màu thời thượng · Lâu trôi", stock: 41 },
  { name: "Kem Dưỡng Ẩm Phục Hồi Da", category: "Mỹ phẩm", price: "329.000đ", oldPrice: "399.000đ", rating: "64", image: "photo-1571781926291-c477ebfd024b", badge: "Giảm giá", description: "Kem dưỡng ẩm giúp củng cố hàng rào bảo vệ da và duy trì độ ẩm mềm mịn. Kết cấu êm dịu, thích hợp dùng trong quy trình dưỡng da buổi tối.", detail: "50g · Phục hồi và dưỡng ẩm · Mọi loại da", stock: 15 },
  { name: "Áo Thun Nữ Cotton Basic", category: "Quần áo nữ", price: "149.000đ", oldPrice: "199.000đ", rating: "89", image: "photo-1483985988355-763728e1935b", badge: "Bán chạy", description: "Áo thun nữ phom basic dễ phối đồ, phù hợp đi học, đi làm hay dạo phố. Chất vải cotton mềm mại, thoáng mát và thoải mái.", detail: "Cotton mềm · Màu trắng, đen, be · Phom regular", stock: 20 },
  { name: "Đầm Midi Hoa Nhí Dịu Dàng", category: "Quần áo nữ", price: "369.000đ", oldPrice: "459.000đ", rating: "76", image: "photo-1595777457583-95e059d581b8", badge: "Giảm giá", description: "Đầm midi họa tiết hoa nhí với thiết kế nữ tính, nhẹ nhàng. Dáng váy bay, tôn vẻ thanh lịch trong những buổi hẹn và dịp dạo phố.", detail: "Vải voan mềm · Họa tiết hoa · Dáng midi", stock: 12 },
  { name: "Áo Sơ Mi Nữ Thanh Lịch", category: "Quần áo nữ", price: "289.000đ", oldPrice: "350.000đ", rating: "58", image: "photo-1539109136881-3be0616acf4b", badge: "Mới về", description: "Áo sơ mi nữ tối giản với đường cắt tinh tế, dễ kết hợp cùng quần âu hoặc chân váy. Lựa chọn thanh lịch cho tủ đồ công sở.", detail: "Vải mềm ít nhăn · Trắng, xanh nhạt · Cổ đức", stock: 17 },
  { name: "Quần Ống Rộng Cạp Cao", category: "Quần áo nữ", price: "329.000đ", oldPrice: "399.000đ", rating: "43", image: "photo-1483985988355-763728e1935b", badge: "Mới về", description: "Quần ống rộng cạp cao giúp tôn dáng và tạo cảm giác thoải mái khi di chuyển. Dễ phối cùng áo thun, sơ mi hoặc áo kiểu.", detail: "Vải tuyết mưa · Đen, kem · Cạp cao", stock: 14 },
  { name: "Áo Khoác Cardigan Len Mỏng", category: "Quần áo nữ", price: "399.000đ", oldPrice: "499.000đ", rating: "51", image: "photo-1529139574466-a303027c1d8b", badge: "Bán chạy", description: "Cardigan len mỏng nhẹ nhàng khoác ngoài áo thun hoặc váy. Thiết kế tiện dụng, giữ ấm vừa phải và dễ phối đồ quanh năm.", detail: "Len dệt mềm · Kem, nâu · Dáng suông", stock: 9 },
];

function Photo({ id, alt, className = "" }) {
  return (
    <img
      className={className}
      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`}
      alt={alt}
      loading="lazy"
    />
  );
}

function Icon({ name, size = 19 }) {
  const paths = {
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    cart: <><path d="M3 4h2l2.2 11h10.9l2-8H6" /><circle cx="9" cy="19" r="1" /><circle cx="17" cy="19" r="1" /></>,
    truck: <><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.5 9a7 7 0 0 1 11.6-2L20 12M4 12l2.9 5a7 7 0 0 0 11.6-2" /></>,
    headset: <><path d="M3 13v-2a9 9 0 0 1 18 0v2" /><rect x="3" y="12" width="4" height="7" rx="2" /><rect x="17" y="12" width="4" height="7" rx="2" /><path d="M17 19a5 5 0 0 1-5 3h-1" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    play: <path d="m9 6 10 6-10 6z" />,
    facebook: <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function CategoryGrid({ onSelect }) {
  return (
    <div className="category-grid">
      {categories.map((item) => (
        <button className="category-card" key={item.name} onClick={() => onSelect(item.name)}>
          <Photo id={item.image} alt={item.name} />
          <span><strong>{item.name}</strong><small>{item.count}</small></span>
        </button>
      ))}
    </div>
  );
}

function ProductGrid({ items, onAddToCart, onFavorite, onOpenProduct }) {
  if (!items.length) return <div className="no-products">Không tìm thấy sản phẩm phù hợp. Hãy thử từ khóa khác.</div>;
  return (
    <div className="product-grid">
      {items.map((product) => (
        <article className="shop-product" key={product.name}>
          <div className="product-photo-wrap">
            <button className="product-open-image" aria-label={`Xem chi tiết ${product.name}`} onClick={() => onOpenProduct(product)}><Photo id={product.image} alt={product.name} /></button>
            <span className={`product-badge ${product.badge === "Giảm giá" ? "sale" : product.badge === "Mới về" ? "new" : ""}`}>{product.badge}</span>
            <button className="favorite-button" aria-label={`Yêu thích ${product.name}`} onClick={onFavorite}><Icon name="heart" size={16} /></button>
          </div>
          <div className="product-details">
            <p className="product-category">{product.category}</p>
            <h3><button className="product-title-button" onClick={() => onOpenProduct(product)}>{product.name}</button></h3>
            <div className="rating"><span>★★★★★</span><small>({product.rating})</small></div>
            <div className="product-buy-row">
              <div><strong>{product.price}</strong><del>{product.oldPrice}</del></div>
              <button className="add-cart" aria-label={`Thêm ${product.name} vào giỏ hàng`} onClick={() => onAddToCart(product)}><Icon name="cart" size={16} /></button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const filteredProducts = useMemo(
    () => products.filter((product) => {
      const matchesCategory = category === "Tất cả" || product.category === category;
      const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    }),
    [category, query],
  );

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function chooseCategory(name) {
    setQuery("");
    setCategory(name);
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showAllProducts() {
    setQuery("");
    setCategory("Tất cả");
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showCategories() {
    setCurrentPage("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showHome() {
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function searchProducts(value) {
    setQuery(value);
    setCategory("Tất cả");
    setCurrentPage("products");
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("M");
    setCurrentPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addProductToCart(product, amount = 1, checkout = false) {
    setCartCount((count) => count + amount);
    showNotice(checkout
      ? `${product.name} đã sẵn sàng trong giỏ hàng để thanh toán.`
      : `Đã thêm ${product.name} × ${amount} vào giỏ hàng.`);
  }

  function returnToProducts() {
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="storefront">
      <div className="announcement">
        <div className="announcement-inner">
          <span><Icon name="truck" size={14} /> Miễn phí vận chuyển cho đơn từ 299K</span>
          <div><a href="#don-hang">Theo dõi đơn hàng</a><i /> <a href="#ho-tro">Hỗ trợ</a><i /> <a href="tel:0399999999">Hotline: 039 999 9999</a></div>
        </div>
      </div>

      <header className="shop-header">
        <a className="shop-logo" href="#trang-chu" aria-label="MMTT - Trang chủ" onClick={showHome}>
          <span className="logo-symbol"><Icon name="bag" size={23} /></span>
          <span><strong>MMTT</strong><small>ĐẸP HƠN MỖI NGÀY</small></span>
        </a>
        <nav className="shop-nav" aria-label="Điều hướng cửa hàng">
          <a className={currentPage === "home" ? "current" : ""} href="#trang-chu" onClick={showHome}>Trang chủ</a>
          <a className={currentPage === "products" || currentPage === "detail" ? "current" : ""} href="#san-pham" onClick={showAllProducts}>Sản phẩm <span>⌄</span></a>
          <a className={currentPage === "categories" ? "current" : ""} href="#danh-muc" onClick={showCategories}>Danh mục <span>⌄</span></a>
          <a href="#uu-dai" onClick={showHome}>Ưu đãi</a>
          <a href="#ho-tro">Liên hệ</a>
        </nav>
        <div className="shop-actions">
          <label className="shop-search">
            <input
              value={query}
              onChange={(event) => searchProducts(event.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              aria-label="Tìm kiếm sản phẩm"
            />
            <span className="shop-search-toggle"><Icon name="search" size={16} /></span>
          </label>
          <button className="header-icon" aria-label="Tài khoản" onClick={() => showNotice("Chào mừng bạn đến với MMTT!")}><Icon name="user" /></button>
          <button className="header-icon cart-button" aria-label={`Giỏ hàng, ${cartCount} sản phẩm`} onClick={() => showNotice(cartCount ? `Giỏ hàng của bạn có ${cartCount} sản phẩm.` : "Giỏ hàng của bạn đang trống.")}><Icon name="cart" /><span>{cartCount}</span></button>
        </div>
      </header>

      <main id={currentPage === "categories" ? "danh-muc" : currentPage === "products" ? "san-pham" : "trang-chu"} className="store-main">
        {currentPage === "home" && <>
        <section className="hero">
          <Photo id="photo-1483985988355-763728e1935b" alt="Bộ sưu tập thời trang mới của MMTT" className="hero-photo" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="hero-kicker">BỘ SƯU TẬP MỚI 2025</p>
            <p className="hero-script">Tỏa sáng cùng</p>
            <h1>Mỹ phẩm &amp; Quần áo nữ</h1>
            <p className="hero-description">Đẹp hơn mỗi ngày, tự tin hơn mỗi khoảnh khắc!</p>
            <a className="hero-button" href="#san-pham">Mua ngay <Icon name="arrow" size={15} /></a>
          </div>
          <div className="hero-pagination"><span className="selected" /><span /><span /></div>
        </section>

        <section className="benefits" aria-label="Dịch vụ cửa hàng">
          <article><span className="benefit-icon"><Icon name="truck" /></span><div><strong>Giao hàng toàn quốc</strong><small>Nhanh chóng</small></div></article>
          <i />
          <article><span className="benefit-icon"><Icon name="shield" /></span><div><strong>Thanh toán an toàn</strong><small>Bảo mật</small></div></article>
          <i />
          <article><span className="benefit-icon"><Icon name="refresh" /></span><div><strong>Đổi trả dễ dàng</strong><small>Trong 7 ngày</small></div></article>
          <i />
          <article id="ho-tro"><span className="benefit-icon"><Icon name="headset" /></span><div><strong>Tư vấn tận tâm</strong><small>Hỗ trợ 24/7</small></div></article>
        </section>

        <section id="danh-muc" className="section-block categories-section">
          <div className="section-heading"><div><h2>Danh mục nổi bật</h2><span className="heading-underline" /></div><button className="section-link" onClick={showCategories}>Xem tất cả <Icon name="arrow" size={13} /></button></div>
          <CategoryGrid onSelect={chooseCategory} />
        </section>

        <section id="san-pham" className="section-block products-section">
          <div className="section-heading"><div><h2>Sản phẩm nổi bật</h2><span className="heading-underline" /></div><button className="section-link" onClick={showAllProducts}>Xem tất cả <Icon name="arrow" size={13} /></button></div>
          <ProductGrid items={products.slice(0, 4)} onOpenProduct={openProduct} onAddToCart={(product) => addProductToCart(product)} onFavorite={() => showNotice("Đã thêm vào danh sách yêu thích.")} />
        </section>

        <section id="uu-dai" className="deal-banner">
          <div className="deal-copy"><p>ƯU ĐÃI ĐẶC BIỆT</p><h2>Giảm đến <strong>50<sup>%</sup></strong></h2><a href="#san-pham" onClick={showAllProducts}>Mua ngay <Icon name="arrow" size={14} /></a></div>
          <div className="deal-art" aria-hidden="true"><span className="deal-spark">✦</span><div className="gift-box"><span /><i /></div><span className="deal-confetti">✦</span></div>
        </section>
        </>}

        {currentPage === "categories" && <section className="catalog-page categories-page">
          <div className="page-breadcrumb"><button onClick={showHome}>Trang chủ</button><span>/</span><strong>Danh mục</strong></div>
          <div className="catalog-title"><div><p className="catalog-eyebrow">KHÁM PHÁ MMTT</p><h1>Danh mục sản phẩm</h1><p>Chọn danh mục yêu thích để khám phá bộ sưu tập dành riêng cho bạn.</p></div><span className="catalog-count">02 danh mục</span></div>
          <CategoryGrid onSelect={chooseCategory} />
          <div className="category-note">MMTT tuyển chọn các sản phẩm làm đẹp và thời trang nữ cho phong cách mỗi ngày.</div>
        </section>}

        {currentPage === "products" && <section className="catalog-page products-page">
          <div className="page-breadcrumb"><button onClick={showHome}>Trang chủ</button><span>/</span><strong>Sản phẩm</strong>{category !== "Tất cả" && <><span>/</span><strong>{category}</strong></>}</div>
          <div className="catalog-title"><div><p className="catalog-eyebrow">BỘ SƯU TẬP MMTT</p><h1>{category === "Tất cả" ? "Tất cả sản phẩm" : category}</h1><p>{category === "Tất cả" ? "Khám phá các sản phẩm mỹ phẩm và quần áo nữ được yêu thích." : `Khám phá bộ sưu tập ${category.toLowerCase()} được chọn lọc dành cho bạn.`}</p></div><span className="catalog-count">{filteredProducts.length} sản phẩm</span></div>
          <div className="product-filters" aria-label="Lọc sản phẩm theo danh mục">
            {["Tất cả", ...categories.map((item) => item.name)].map((item) => {
              const count = item === "Tất cả" ? products.length : products.filter((product) => product.category === item).length;
              return <button key={item} className={category === item ? "selected" : ""} onClick={() => { setCategory(item); setQuery(""); }}>{item}<span>{count}</span></button>;
            })}
          </div>
          <ProductGrid items={filteredProducts} onOpenProduct={openProduct} onAddToCart={(product) => addProductToCart(product)} onFavorite={() => showNotice("Đã thêm vào danh sách yêu thích.")} />
        </section>}

        {currentPage === "detail" && selectedProduct && <section className="catalog-page detail-page">
          <div className="page-breadcrumb"><button onClick={showHome}>Trang chủ</button><span>/</span><button onClick={returnToProducts}>Sản phẩm</button><span>/</span><button onClick={() => chooseCategory(selectedProduct.category)}>{selectedProduct.category}</button><span>/</span><strong>Chi tiết sản phẩm</strong></div>
          <button className="back-to-products" onClick={returnToProducts}>← Quay lại danh sách sản phẩm</button>
          <div className="product-detail-layout">
            <div className="detail-image-wrap">
              <Photo id={selectedProduct.image} alt={selectedProduct.name} />
              <span className={`product-badge ${selectedProduct.badge === "Giảm giá" ? "sale" : selectedProduct.badge === "Mới về" ? "new" : ""}`}>{selectedProduct.badge}</span>
            </div>
            <div className="product-detail-info">
              <p className="product-category">{selectedProduct.category}</p>
              <h1>{selectedProduct.name}</h1>
              <div className="detail-rating"><span>★★★★★</span><strong>{selectedProduct.rating} đánh giá</strong><i /> <span className="stock-status">Còn {selectedProduct.stock} sản phẩm</span></div>
              <div className="detail-price"><strong>{selectedProduct.price}</strong><del>{selectedProduct.oldPrice}</del><span>Tiết kiệm khi mua hôm nay</span></div>
              <p className="detail-description">{selectedProduct.description}</p>
              <div className="detail-spec"><strong>Thông tin sản phẩm</strong><span>{selectedProduct.detail}</span></div>
              {selectedProduct.category === "Quần áo nữ" && <div className="size-picker"><strong>Kích cỡ</strong><div>{["S", "M", "L", "XL"].map((size) => <button key={size} className={selectedSize === size ? "selected" : ""} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>}
              <div className="detail-quantity"><strong>Số lượng</strong><div><button aria-label="Giảm số lượng" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button><span>{quantity}</span><button aria-label="Tăng số lượng" onClick={() => setQuantity((value) => Math.min(selectedProduct.stock, value + 1))}>+</button></div><small>Còn {selectedProduct.stock} sản phẩm</small></div>
              <div className="detail-actions"><button className="detail-add-button" onClick={() => addProductToCart(selectedProduct, quantity)}><Icon name="cart" size={18} /> Thêm vào giỏ hàng</button><button className="detail-buy-button" onClick={() => addProductToCart(selectedProduct, quantity, true)}>Mua ngay <Icon name="arrow" size={16} /></button></div>
              <div className="detail-promises"><span><Icon name="truck" size={17} /> Giao hàng toàn quốc</span><span><Icon name="refresh" size={17} /> Đổi trả trong 7 ngày</span></div>
            </div>
          </div>
        </section>}
      </main>

      <footer className="shop-footer">
        <div className="footer-main">
          <a className="shop-logo footer-logo" href="#trang-chu" onClick={showHome}><span className="logo-symbol"><Icon name="bag" size={23} /></span><span><strong>MMTT</strong><small>ĐẸP HƠN MỖI NGÀY</small></span></a>
          <div className="footer-column"><strong>Chính sách</strong><a href="#ho-tro">Chính sách đổi trả</a><a href="#ho-tro">Chính sách bảo mật</a><a href="#ho-tro">Điều khoản sử dụng</a></div>
          <div className="footer-column"><strong>Hỗ trợ khách hàng</strong><a href="#ho-tro">Hướng dẫn mua hàng</a><a href="#ho-tro">Phương thức thanh toán</a><a href="#ho-tro">Liên hệ hỗ trợ</a></div>
          <div className="footer-column social-column"><strong>Kết nối với chúng tôi</strong><div><a href="#ho-tro" aria-label="Facebook"><Icon name="facebook" size={16} /></a><a href="#ho-tro" aria-label="Instagram"><Icon name="instagram" size={16} /></a><a href="#ho-tro" aria-label="TikTok"><Icon name="play" size={15} /></a></div></div>
        </div>
        <div className="copyright"><span>© 2025 MMTT. Tất cả quyền được bảo lưu.</span><a href="#trang-chu" aria-label="Lên đầu trang">↑</a></div>
      </footer>
      {notice && <div role="status" className="store-toast">{notice}</div>}
    </div>
  );
}

export default App;
