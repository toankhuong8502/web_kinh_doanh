import { useMemo, useState } from "react";
import { categories, products, formatPrice, priceValue } from "../data/store";
import "./admin.css";

const initialProducts = products.map((product, index) => ({
  ...product,
  id: index + 1,
  sku: `MM-${String(index + 1).padStart(3, "0")}`,
  amount: priceValue(product.price),
  oldAmount: priceValue(product.oldPrice),
}));

const initialOrders = [
  { id: "MM20261118-024", customer: "Nguyễn Minh Anh", phone: "090 123 4567", date: "18/11/2026", amount: 628000, status: "Chờ xác nhận", items: 2 },
  { id: "MM20261118-023", customer: "Trần Ngọc Hà", phone: "091 234 5678", date: "18/11/2026", amount: 399000, status: "Đang giao", items: 1 },
  { id: "MM20261117-022", customer: "Lê Thu Trang", phone: "098 765 4321", date: "17/11/2026", amount: 588000, status: "Hoàn thành", items: 2 },
  { id: "MM20261117-021", customer: "Phạm Khánh Linh", phone: "093 456 7890", date: "17/11/2026", amount: 299000, status: "Hoàn thành", items: 1 },
  { id: "MM20261116-020", customer: "Vũ Hoàng Yến", phone: "097 111 2233", date: "16/11/2026", amount: 518000, status: "Đã hủy", items: 2 },
  { id: "MM20261116-019", customer: "Đỗ Mai Phương", phone: "096 222 3344", date: "16/11/2026", amount: 369000, status: "Đang giao", items: 1 },
];

const navigation = [
  { id: "overview", label: "Tổng quan", icon: "grid" },
  { id: "orders", label: "Đơn hàng", icon: "receipt" },
  { id: "products", label: "Sản phẩm", icon: "box" },
  { id: "inventory", label: "Kho hàng", icon: "layers" },
  { id: "customers", label: "Khách hàng", icon: "users" },
];

const pageTitles = {
  overview: ["Tổng quan", "Chào buổi sáng, Admin 👋"],
  orders: ["Đơn hàng", "Theo dõi và xử lý đơn hàng của cửa hàng."],
  products: ["Sản phẩm", "Quản lý danh sách sản phẩm MMTT."],
  inventory: ["Kho hàng", "Theo dõi số lượng tồn kho."],
  customers: ["Khách hàng", "Thông tin khách hàng từ các đơn hàng mẫu."],
  settings: ["Cài đặt", "Tùy chỉnh thông tin cửa hàng."],
};

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    receipt: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" /><path d="M8 8h8M8 12h8M8 16h4" /></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.7-1.4-2.4L7.1 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    minus: <path d="M5 12h14" />,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function StatusBadge({ status }) {
  const statusClass = status === "Hoàn thành"
    ? "done"
    : status === "Đang giao"
      ? "shipping"
      : status === "Đã hủy"
        ? "cancelled"
        : "pending";
  return <span className={`admin-status ${statusClass}`}><i />{status}</span>;
}

function OrdersTable({ orders, onSelect }) {
  return (
    <div className="admin-table-scroll">
      <table className="admin-table">
        <thead><tr><th>Mã đơn hàng</th><th>Khách hàng</th><th>Ngày đặt</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Trạng thái</th><th /></tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><button className="admin-order-link" onClick={() => onSelect(order)}>{order.id}</button></td>
              <td><div className="admin-customer-cell"><span className="admin-avatar">{order.customer.split(" ").slice(-1)[0].charAt(0)}</span><div><strong>{order.customer}</strong><small>{order.phone}</small></div></div></td>
              <td>{order.date}</td>
              <td>{order.items} sản phẩm</td>
              <td className="admin-money">{formatPrice(order.amount)}</td>
              <td><StatusBadge status={order.status} /></td>
              <td><button className="admin-icon-button" aria-label={`Xem đơn ${order.id}`} onClick={() => onSelect(order)}><Icon name="more" size={17} /></button></td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td className="admin-empty" colSpan="7">Không tìm thấy đơn hàng phù hợp.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function ProductThumbnail({ product }) {
  return <img className="admin-product-thumb" src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=120&q=75`} alt="" />;
}

function ProductModal({ product, onClose, onSave }) {
  function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave({
      name: String(formData.get("name")).trim(),
      category: String(formData.get("category")),
      amount: Number(formData.get("price")),
      oldAmount: Number(formData.get("oldPrice")) || 0,
      stock: Number(formData.get("stock")),
    });
  }

  return (
    <div className="admin-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <div className="admin-modal-heading">
          <div><span className="admin-eyebrow">QUẢN LÝ DANH MỤC</span><h2 id="product-modal-title">{product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2></div>
          <button className="admin-icon-button" aria-label="Đóng" onClick={onClose}><Icon name="close" /></button>
        </div>
        <form onSubmit={submit}>
          <label>Tên sản phẩm<input name="name" required maxLength="120" defaultValue={product?.name ?? ""} placeholder="Ví dụ: Serum dưỡng ẩm" /></label>
          <label>Danh mục<select name="category" defaultValue={product?.category ?? categories[0].name}>{categories.map((category) => <option key={category.name}>{category.name}</option>)}</select></label>
          <div className="admin-form-row">
            <label>Giá bán (đ)<input name="price" type="number" min="1000" step="1000" required defaultValue={product?.amount ?? ""} placeholder="299000" /></label>
            <label>Giá gốc (đ)<input name="oldPrice" type="number" min="0" step="1000" defaultValue={product?.oldAmount ?? ""} placeholder="390000" /></label>
          </div>
          <label>Số lượng tồn<input name="stock" type="number" min="0" max="99999" required defaultValue={product?.stock ?? 0} /></label>
          <p className="admin-demo-note">Đây là bản demo. Dữ liệu chỉ được cập nhật trong phiên hiện tại.</p>
          <div className="admin-modal-actions"><button type="button" className="admin-secondary-button" onClick={onClose}>Hủy</button><button type="submit" className="admin-primary-button">{product ? "Lưu thay đổi" : "Thêm sản phẩm"}</button></div>
        </form>
      </section>
    </div>
  );
}

function OrderModal({ order, onClose, onStatusChange }) {
  return (
    <div className="admin-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="admin-modal admin-order-modal" role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
        <div className="admin-modal-heading">
          <div><span className="admin-eyebrow">CHI TIẾT ĐƠN HÀNG</span><h2 id="order-modal-title">{order.id}</h2></div>
          <button className="admin-icon-button" aria-label="Đóng" onClick={onClose}><Icon name="close" /></button>
        </div>
        <div className="admin-order-detail">
          <div><span>Khách hàng</span><strong>{order.customer}</strong></div>
          <div><span>Số điện thoại</span><strong>{order.phone}</strong></div>
          <div><span>Ngày đặt</span><strong>{order.date}</strong></div>
          <div><span>Số sản phẩm</span><strong>{order.items}</strong></div>
          <div><span>Tổng thanh toán</span><strong className="admin-money">{formatPrice(order.amount)}</strong></div>
          <label>Trạng thái<select value={order.status} onChange={(event) => onStatusChange(order.id, event.target.value)}><option>Chờ xác nhận</option><option>Đang giao</option><option>Hoàn thành</option><option>Đã hủy</option></select></label>
        </div>
        <p className="admin-demo-note">Thay đổi trạng thái chỉ có hiệu lực trong phiên demo.</p>
        <div className="admin-modal-actions"><button className="admin-primary-button" onClick={onClose}>Đóng</button></div>
      </section>
    </div>
  );
}

function AdminPage() {
  const [section, setSection] = useState("overview");
  const [query, setQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("Tất cả");
  const [productFilter, setProductFilter] = useState("Tất cả");
  const [productRows, setProductRows] = useState(initialProducts);
  const [orderRows, setOrderRows] = useState(initialOrders);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const matchingProducts = useMemo(() => productRows.filter((product) => {
    const searchMatches = `${product.name} ${product.category} ${product.sku}`.toLowerCase().includes(query.toLowerCase());
    const filterMatches = productFilter === "Tất cả"
      || (productFilter === "Hết hàng" ? product.stock === 0 : productFilter === "Sắp hết" ? product.stock > 0 && product.stock < 10 : product.stock >= 10);
    return searchMatches && filterMatches;
  }), [productFilter, productRows, query]);

  const matchingOrders = useMemo(() => orderRows.filter((order) => {
    const searchMatches = `${order.id} ${order.customer} ${order.phone}`.toLowerCase().includes(query.toLowerCase());
    return searchMatches && (orderFilter === "Tất cả" || order.status === orderFilter);
  }), [orderFilter, orderRows, query]);

  const totalRevenue = orderRows
    .filter((order) => order.status !== "Đã hủy")
    .reduce((sum, order) => sum + order.amount, 0);
  const customers = new Set(orderRows.map((order) => order.phone)).size;
  const pageTitle = pageTitles[section];
  const now = new Date();
  const dateLabel = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now).toUpperCase();
  const greeting = now.getHours() < 12
    ? "Chào buổi sáng"
    : now.getHours() < 18
      ? "Chào buổi chiều"
      : "Chào buổi tối";

  function saveProduct(values) {
    if (editingProduct && !editingProduct.isNew) {
      setProductRows((rows) => rows.map((row) => row.id === editingProduct.id
        ? { ...row, ...values, price: formatPrice(values.amount), oldPrice: values.oldAmount ? formatPrice(values.oldAmount) : "" }
        : row));
    } else {
      const id = Math.max(0, ...productRows.map((row) => row.id)) + 1;
      setProductRows((rows) => [{
        id,
        sku: `MM-${String(id).padStart(3, "0")}`,
        ...values,
        price: formatPrice(values.amount),
        oldPrice: values.oldAmount ? formatPrice(values.oldAmount) : "",
        rating: "0",
        image: products[0].image,
        badge: "Mới về",
        description: "",
        detail: "",
      }, ...rows]);
    }
    setEditingProduct(null);
  }

  function updateOrderStatus(orderId, status) {
    setOrderRows((rows) => rows.map((row) => row.id === orderId ? { ...row, status } : row));
    setSelectedOrder((order) => order ? { ...order, status } : order);
  }

  function updateStock(productId, delta) {
    setProductRows((rows) => rows.map((row) => row.id === productId
      ? { ...row, stock: Math.max(0, row.stock + delta) }
      : row));
  }

  function renderProducts(inventoryOnly = false) {
    return (
      <>
        <div className="admin-panel-toolbar">
          <div className="admin-filter-pills">
            {(inventoryOnly ? ["Tất cả", "Sắp hết", "Hết hàng"] : ["Tất cả", "Còn hàng", "Sắp hết", "Hết hàng"]).map((filter) => (
              <button key={filter} className={productFilter === filter ? "active" : ""} onClick={() => setProductFilter(filter)}>{filter}</button>
            ))}
          </div>
          {!inventoryOnly && <button className="admin-primary-button" onClick={() => setEditingProduct({ isNew: true })}><Icon name="plus" size={16} />Thêm sản phẩm</button>}
        </div>
        <div className="admin-table-scroll">
          <table className="admin-table admin-product-table">
            <thead><tr><th>Sản phẩm</th><th>Mã SKU</th><th>Danh mục</th>{!inventoryOnly && <th>Giá bán</th>}<th>Tồn kho</th><th>Trạng thái</th>{inventoryOnly && <th>Điều chỉnh</th>}{!inventoryOnly && <th />}</tr></thead>
            <tbody>
              {matchingProducts.map((product) => (
                <tr key={product.id}>
                  <td><div className="admin-product-cell"><ProductThumbnail product={product} /><strong>{product.name}</strong></div></td>
                  <td className="admin-sku">{product.sku}</td>
                  <td>{product.category}</td>
                  {!inventoryOnly && <td className="admin-money">{formatPrice(product.amount)}</td>}
                  <td><span className={product.stock < 10 ? "admin-low-stock" : ""}>{product.stock}</span></td>
                  <td><span className={`admin-status ${product.stock === 0 ? "cancelled" : product.stock < 10 ? "pending" : "done"}`}><i />{product.stock === 0 ? "Hết hàng" : product.stock < 10 ? "Sắp hết" : "Còn hàng"}</span></td>
                  {inventoryOnly
                    ? <td><div className="admin-stock-adjust"><button aria-label={`Giảm tồn ${product.name}`} onClick={() => updateStock(product.id, -1)}><Icon name="minus" size={14} /></button><button aria-label={`Tăng tồn ${product.name}`} onClick={() => updateStock(product.id, 1)}><Icon name="plus" size={14} /></button></div></td>
                    : <td><button className="admin-icon-button" aria-label={`Chỉnh sửa ${product.name}`} onClick={() => setEditingProduct(product)}><Icon name="more" size={17} /></button></td>}
                </tr>
              ))}
              {matchingProducts.length === 0 && <tr><td className="admin-empty" colSpan={inventoryOnly ? 7 : 6}>Không tìm thấy sản phẩm phù hợp.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="admin-table-footer">Hiển thị {matchingProducts.length} trên {productRows.length} sản phẩm <span>Demo · dữ liệu không lưu sau khi tải lại</span></div>
      </>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href={import.meta.env.BASE_URL} aria-label="Quay lại cửa hàng"><span className="admin-brand-mark">M</span><span><strong>MỘC MÂY</strong><small>QUẢN TRỊ CỬA HÀNG</small></span></a>
        <div className="admin-nav-label">MENU CHÍNH</div>
        <nav className="admin-navigation" aria-label="Điều hướng quản trị">
          {navigation.map((item) => (
            <button key={item.id} className={section === item.id ? "active" : ""} aria-label={item.label} onClick={() => { setSection(item.id); setQuery(""); }}>
              <Icon name={item.icon} /><span>{item.label}</span>{item.id === "orders" && <small>{orderRows.length}</small>}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <button className={section === "settings" ? "active" : ""} onClick={() => setSection("settings")}><Icon name="settings" /><span>Cài đặt</span></button>
          <div className="admin-profile"><span className="admin-profile-avatar">A</span><div><strong>Admin MMTT</strong><small>Quản trị viên · Demo</small></div><Icon name="more" size={16} /></div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb"><span>MMTT</span><Icon name="chevron" size={14} /><strong>{pageTitle[0]}</strong></div>
          <div className="admin-topbar-actions">
            <label className="admin-search"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm..." aria-label="Tìm kiếm" /><kbd>⌘ K</kbd></label>
            <button className="admin-notification" aria-label="Thông báo"><Icon name="bell" size={18} /><i /></button>
            <span className="admin-demo-chip">BẢN DEMO</span>
          </div>
        </header>

        <div className="admin-page-content">
          <div className="admin-page-heading">
            <div><span className="admin-eyebrow">{dateLabel}</span><h1>{pageTitle[0]}</h1><p>{section === "overview" ? `${greeting}, Admin 👋` : pageTitle[1]}</p></div>
            {section === "overview" && <button className="admin-secondary-button" onClick={() => setSection("orders")}>Xem báo cáo <Icon name="arrow" size={15} /></button>}
          </div>

          {section === "overview" && (
            <>
              <div className="admin-stat-grid">
                <article className="admin-stat-card"><div className="admin-stat-top"><span>Doanh thu</span><i className="mint"><Icon name="trend" size={17} /></i></div><strong>{formatPrice(totalRevenue)}</strong><small className="admin-stat-trend">↗ 12,8% <span>so với tháng trước</span></small><div className="admin-sparkline teal"><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
                <article className="admin-stat-card"><div className="admin-stat-top"><span>Đơn hàng</span><i className="blue"><Icon name="receipt" size={17} /></i></div><strong>{String(orderRows.length + 18).padStart(2, "0")}</strong><small className="admin-stat-trend">↗ 8,2% <span>so với tháng trước</span></small><div className="admin-sparkline blue-line"><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
                <article className="admin-stat-card"><div className="admin-stat-top"><span>Sản phẩm</span><i className="peach"><Icon name="box" size={17} /></i></div><strong>{productRows.length}</strong><small className="admin-stat-neutral">Trong 2 danh mục</small><div className="admin-sparkline orange-line"><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
                <article className="admin-stat-card"><div className="admin-stat-top"><span>Khách hàng</span><i className="lavender"><Icon name="users" size={17} /></i></div><strong>{customers + 124}</strong><small className="admin-stat-trend">↗ 4,6% <span>so với tháng trước</span></small><div className="admin-sparkline purple-line"><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
              </div>

              <div className="admin-overview-grid">
                <section className="admin-panel admin-revenue-panel">
                  <div className="admin-panel-heading"><div><h2>Doanh thu bán hàng</h2><p>Thống kê doanh thu trong tuần này</p></div><select aria-label="Chọn khoảng thời gian"><option>7 ngày qua</option><option>30 ngày qua</option></select></div>
                  <div className="admin-chart-summary"><strong>{formatPrice(totalRevenue)}</strong><span>↗ 12,8%</span></div>
                  <div className="admin-chart">
                    {[["T2", 38], ["T3", 62], ["T4", 48], ["T5", 78], ["T6", 55], ["T7", 92], ["CN", 69]].map(([day, height]) => <div className="admin-chart-column" key={day}><div className="admin-chart-track"><i style={{ height: `${height}%` }} /></div><small>{day}</small></div>)}
                  </div>
                </section>
                <section className="admin-panel admin-stock-panel">
                  <div className="admin-panel-heading"><div><h2>Tình trạng kho</h2><p>Số lượng sản phẩm hiện có</p></div><button className="admin-text-button" onClick={() => setSection("inventory")}>Chi tiết <Icon name="arrow" size={14} /></button></div>
                  <div className="admin-stock-total"><strong>{productRows.reduce((sum, product) => sum + product.stock, 0)}</strong><span>sản phẩm trong kho</span></div>
                  {productRows.filter((product) => product.stock < 15).slice(0, 4).map((product) => <div className="admin-stock-row" key={product.id}><ProductThumbnail product={product} /><span>{product.name}</span><strong className={product.stock < 10 ? "warning" : ""}>{product.stock} còn</strong></div>)}
                </section>
              </div>

              <section className="admin-panel admin-recent-panel">
                <div className="admin-panel-heading"><div><h2>Đơn hàng gần đây</h2><p>Cập nhật các đơn hàng mới nhất của cửa hàng</p></div><button className="admin-text-button" onClick={() => setSection("orders")}>Tất cả đơn hàng <Icon name="arrow" size={14} /></button></div>
                <OrdersTable orders={matchingOrders.slice(0, 5)} onSelect={setSelectedOrder} />
              </section>
            </>
          )}

          {section === "orders" && (
            <section className="admin-panel admin-list-panel">
              <div className="admin-panel-toolbar">
                <div className="admin-filter-pills">{["Tất cả", "Chờ xác nhận", "Đang giao", "Hoàn thành", "Đã hủy"].map((filter) => <button key={filter} className={orderFilter === filter ? "active" : ""} onClick={() => setOrderFilter(filter)}>{filter}</button>)}</div>
                <button className="admin-secondary-button"><Icon name="arrow" size={15} />Xuất danh sách</button>
              </div>
              <OrdersTable orders={matchingOrders} onSelect={setSelectedOrder} />
              <div className="admin-table-footer">Hiển thị {matchingOrders.length} trên {orderRows.length} đơn hàng <span>Demo · dữ liệu minh họa</span></div>
            </section>
          )}

          {section === "products" && <section className="admin-panel admin-list-panel">{renderProducts()}</section>}
          {section === "inventory" && <section className="admin-panel admin-list-panel">{renderProducts(true)}</section>}

          {section === "customers" && (
            <section className="admin-panel admin-list-panel">
              <div className="admin-panel-heading"><div><h2>Khách hàng gần đây</h2><p>Khách hàng được tổng hợp từ đơn hàng mẫu.</p></div></div>
              <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Khách hàng</th><th>Số điện thoại</th><th>Số đơn</th><th>Tổng chi tiêu</th><th>Khách hàng từ</th></tr></thead><tbody>
                {Array.from(new Map(orderRows.map((order) => [order.phone, order])).values()).filter((order) => `${order.customer} ${order.phone}`.toLowerCase().includes(query.toLowerCase())).map((order) => <tr key={order.phone}><td><div className="admin-customer-cell"><span className="admin-avatar">{order.customer.split(" ").slice(-1)[0].charAt(0)}</span><div><strong>{order.customer}</strong><small>{order.customer.toLowerCase().replaceAll(" ", ".")}@email.com</small></div></div></td><td>{order.phone}</td><td>{1 + order.items % 3} đơn hàng</td><td className="admin-money">{formatPrice(order.amount * 2)}</td><td>{order.date}</td></tr>)}
              </tbody></table></div>
            </section>
          )}

          {section === "settings" && (
            <section className="admin-panel admin-settings-panel"><span className="admin-settings-icon"><Icon name="settings" size={24} /></span><h2>Cài đặt cửa hàng</h2><p>Thông tin cửa hàng trong giao diện demo.</p><label>Tên cửa hàng<input value="Mộc Mây Store" readOnly /></label><label>Email hỗ trợ<input value="hello@mocmay.vn" readOnly /></label><div className="admin-demo-note">Bản demo chỉ hiển thị giao diện, cài đặt không được lưu.</div></section>
          )}
        </div>
      </main>

      {editingProduct && <ProductModal product={editingProduct.isNew ? null : editingProduct} onClose={() => setEditingProduct(null)} onSave={saveProduct} />}
      {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onStatusChange={updateOrderStatus} />}
    </div>
  );
}

export default AdminPage;
