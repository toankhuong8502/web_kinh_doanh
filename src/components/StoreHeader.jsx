import { Icon } from "./StoreUi";

export default function StoreHeader({
  currentPage,
  cartCount,
  query,
  onHome,
  onProducts,
  onCategories,
  onOffers,
  onContact,
  onCart,
  onSearch,
  onNotice,
}) {
  const activePage = currentPage === "detail" ? "products" : currentPage;

  return (
    <>
      <div className="announcement">
        <div className="announcement-inner">
          <span><Icon name="truck" size={14} /> Miễn phí vận chuyển cho đơn từ 299K</span>
          <div><a href="#don-hang">Theo dõi đơn hàng</a><i /> <a href="#ho-tro">Hỗ trợ</a><i /> <a href="tel:0399999999">Hotline: 039 999 9999</a></div>
        </div>
      </div>
      <header className="shop-header">
        <a className="shop-logo" href="#trang-chu" aria-label="MMTT - Trang chủ" onClick={onHome}>
          <span className="logo-symbol"><Icon name="bag" size={23} /></span>
          <span><strong>MMTT</strong><small>ĐẸP HƠN MỖI NGÀY</small></span>
        </a>
        <nav className="shop-nav" aria-label="Điều hướng cửa hàng">
          <a className={activePage === "home" ? "current" : ""} href="#trang-chu" onClick={onHome}>Trang chủ</a>
          <a className={activePage === "products" ? "current" : ""} href="#san-pham" onClick={onProducts}>Sản phẩm</a>
          <a className={activePage === "categories" ? "current" : ""} href="#danh-muc" onClick={onCategories}>Danh mục</a>
          <a className={activePage === "offers" ? "current" : ""} href="#uu-dai" onClick={onOffers}>Ưu đãi</a>
          <a className={activePage === "contact" ? "current" : ""} href="#lien-he" onClick={onContact}>Liên hệ</a>
        </nav>
        <div className="shop-actions">
          <form
            className="shop-search"
            onSubmit={(event) => {
              event.preventDefault();
              onSearch(query);
              event.currentTarget.querySelector("input")?.blur();
            }}
          >
            <input value={query} onChange={(event) => onSearch(event.target.value)} placeholder="Tìm kiếm sản phẩm..." aria-label="Tìm kiếm sản phẩm" />
            <button type="submit" className="shop-search-toggle" aria-label="Tìm kiếm"><Icon name="search" size={16} /></button>
          </form>
          <button className="header-icon" aria-label="Tài khoản" onClick={() => onNotice("Chào mừng bạn đến với MMTT!")}><Icon name="user" /></button>
          <button className="header-icon cart-button" aria-label={`Mở giỏ hàng, ${cartCount} sản phẩm`} onClick={onCart}><Icon name="cart" /><span>{cartCount}</span></button>
        </div>
      </header>
    </>
  );
}
