import { CategoryGrid, Icon, Photo, ProductGrid } from "../components/StoreUi";
import { products } from "../data/store";

export default function HomePage({ onSelectCategory, onOpenProduct, onAddToCart, onFavorite, onShowCategories, onShowProducts }) {
  return (
    <>
      <section className="hero">
        <Photo id="photo-1483985988355-763728e1935b" alt="Bộ sưu tập thời trang mới của MMTT" className="hero-photo" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-kicker">BỘ SƯU TẬP MỚI 2025</p>
          <p className="hero-script">Tỏa sáng cùng</p>
          <h1>Mỹ phẩm &amp; Quần áo nữ</h1>
          <p className="hero-description">Đẹp hơn mỗi ngày, tự tin hơn mỗi khoảnh khắc!</p>
          <a className="hero-button" href="#san-pham" onClick={onShowProducts}>Mua ngay <Icon name="arrow" size={15} /></a>
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
        <div className="section-heading"><div><h2>Danh mục nổi bật</h2><span className="heading-underline" /></div><button className="section-link" onClick={onShowCategories}>Xem tất cả <Icon name="arrow" size={13} /></button></div>
        <CategoryGrid onSelect={onSelectCategory} />
      </section>

      <section id="san-pham" className="section-block products-section">
        <div className="section-heading"><div><h2>Sản phẩm nổi bật</h2><span className="heading-underline" /></div><button className="section-link" onClick={onShowProducts}>Xem tất cả <Icon name="arrow" size={13} /></button></div>
        <ProductGrid items={products.slice(0, 4)} onOpenProduct={onOpenProduct} onAddToCart={onAddToCart} onFavorite={onFavorite} />
      </section>

      <section id="uu-dai" className="deal-banner">
        <div className="deal-copy"><p>ƯU ĐÃI ĐẶC BIỆT</p><h2>Giảm đến <strong>50<sup>%</sup></strong></h2><a href="#san-pham" onClick={onShowProducts}>Mua ngay <Icon name="arrow" size={14} /></a></div>
        <div className="deal-art" aria-hidden="true"><span className="deal-spark">✦</span><div className="gift-box"><span /><i /></div><span className="deal-confetti">✦</span></div>
      </section>
    </>
  );
}
