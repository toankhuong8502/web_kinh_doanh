import { categories } from "../data/store";

export function Photo({ id, alt, className = "" }) {
  return (
    <img
      className={className}
      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`}
      alt={alt}
      loading="lazy"
    />
  );
}

export function Icon({ name, size = 19 }) {
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

export function CategoryGrid({ onSelect }) {
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

export function ProductGrid({ items, onAddToCart, onFavorite, onOpenProduct }) {
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
