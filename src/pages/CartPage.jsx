import { Icon, Photo } from "../components/StoreUi";
import { formatPrice, products } from "../data/store";

export default function CartPage({ cartItems, cartCount, cartSubtotal, onHome, onProducts, onUpdateQuantity, onRemoveItem, onCheckout }) {
  return (
    <section className="catalog-page cart-page">
      <div className="page-breadcrumb"><button onClick={onHome}>Trang chủ</button><span>/</span><strong>Giỏ hàng</strong></div>
      <div className="catalog-title"><div><p className="catalog-eyebrow">MMTT SHOPPING BAG</p><h1>Giỏ hàng của bạn</h1><p>{cartCount} sản phẩm trong giỏ hàng</p></div></div>
      {cartItems.length === 0 ? <div className="cart-empty">
        <span className="cart-empty-icon"><Icon name="cart" size={30} /></span>
        <h2>Giỏ hàng đang trống</h2>
        <p>Hãy khám phá các sản phẩm yêu thích của bạn tại MMTT.</p>
        <button className="cart-continue-button" onClick={onProducts}>Tiếp tục mua sắm</button>
      </div> : <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => {
            const product = products.find((entry) => entry.name === item.name);
            if (!product) return null;
            return <article className="cart-item" key={`${item.name}-${item.size}`}>
              <Photo id={product.image} alt={product.name} className="cart-item-image" />
              <div className="cart-item-info">
                <span className="product-category">{product.category}</span>
                <h2>{product.name}</h2>
                {item.size && <small>Kích cỡ: {item.size}</small>}
                <strong>{product.price}</strong>
                <div className="cart-item-controls">
                  <div className="cart-quantity">
                    <button aria-label={`Giảm số lượng ${product.name}`} disabled={item.quantity <= 1} onClick={() => onUpdateQuantity(item.name, item.size, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Tăng số lượng ${product.name}`} disabled={item.quantity >= product.stock} onClick={() => onUpdateQuantity(item.name, item.size, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-remove" onClick={() => onRemoveItem(item.name, item.size)}>Xóa</button>
                </div>
              </div>
              <strong className="cart-item-total">{formatPrice(Number(product.price.replace(/\D/g, "")) * item.quantity)}</strong>
            </article>;
          })}
        </div>
        <aside className="cart-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div><span>Tạm tính</span><strong>{formatPrice(cartSubtotal)}</strong></div>
          <div><span>Vận chuyển</span><strong>{cartSubtotal >= 299000 ? "Miễn phí" : "Tính khi xác nhận"}</strong></div>
          <div className="cart-total"><span>Tổng cộng</span><strong>{formatPrice(cartSubtotal)}</strong></div>
          <button className="cart-checkout-button" onClick={onCheckout}>Tiến hành đặt hàng</button>
          <button className="cart-continue-link" onClick={onProducts}>Tiếp tục mua sắm</button>
        </aside>
      </div>}
    </section>
  );
}
