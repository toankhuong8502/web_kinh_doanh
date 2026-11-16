import { Icon, Photo } from "../components/StoreUi";

export default function ProductDetailPage({
  product,
  selectedSize,
  quantity,
  onHome,
  onProducts,
  onSelectCategory,
  onSelectSize,
  onChangeQuantity,
  onAddToCart,
  onBuyNow,
}) {
  if (!product) return null;

  return (
    <section className="catalog-page detail-page">
      <div className="page-breadcrumb"><button onClick={onHome}>Trang chủ</button><span>/</span><button onClick={onProducts}>Sản phẩm</button><span>/</span><button onClick={() => onSelectCategory(product.category)}>{product.category}</button><span>/</span><strong>Chi tiết sản phẩm</strong></div>
      <button className="back-to-products" onClick={onProducts}>← Quay lại danh sách sản phẩm</button>
      <div className="product-detail-layout">
        <div className="detail-image-wrap">
          <Photo id={product.image} alt={product.name} />
          <span className={`product-badge ${product.badge === "Giảm giá" ? "sale" : product.badge === "Mới về" ? "new" : ""}`}>{product.badge}</span>
        </div>
        <div className="product-detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span>★★★★★</span><strong>{product.rating} đánh giá</strong><i /> <span className="stock-status">Còn {product.stock} sản phẩm</span></div>
          <div className="detail-price"><strong>{product.price}</strong><del>{product.oldPrice}</del><span>Tiết kiệm khi mua hôm nay</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-spec"><strong>Thông tin sản phẩm</strong><span>{product.detail}</span></div>
          {product.category === "Quần áo nữ" && <div className="size-picker"><strong>Kích cỡ</strong><div>{["S", "M", "L", "XL"].map((size) => <button key={size} className={selectedSize === size ? "selected" : ""} onClick={() => onSelectSize(size)}>{size}</button>)}</div></div>}
          <div className="detail-quantity"><strong>Số lượng</strong><div><button aria-label="Giảm số lượng" onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button aria-label="Tăng số lượng" onClick={() => onChangeQuantity(Math.min(product.stock, quantity + 1))}>+</button></div><small>Còn {product.stock} sản phẩm</small></div>
          <div className="detail-actions"><button className="detail-add-button" onClick={onAddToCart}><Icon name="cart" size={18} /> Thêm vào giỏ hàng</button><button className="detail-buy-button" onClick={onBuyNow}>Mua ngay <Icon name="arrow" size={16} /></button></div>
          <div className="detail-promises"><span><Icon name="truck" size={17} /> Giao hàng toàn quốc</span><span><Icon name="refresh" size={17} /> Đổi trả trong 7 ngày</span></div>
        </div>
      </div>
    </section>
  );
}
