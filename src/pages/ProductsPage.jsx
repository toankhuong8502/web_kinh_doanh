import { ProductGrid } from "../components/StoreUi";
import { categories, products } from "../data/store";

export default function ProductsPage({
  category,
  query,
  filteredProducts,
  onHome,
  onSelectCategory,
  onOpenProduct,
  onAddToCart,
  onFavorite,
}) {
  return (
    <section className="catalog-page products-page">
      <div className="page-breadcrumb"><button onClick={onHome}>Trang chủ</button><span>/</span><strong>Sản phẩm</strong>{category !== "Tất cả" && <><span>/</span><strong>{category}</strong></>}</div>
      <div className="catalog-title"><div><p className="catalog-eyebrow">BỘ SƯU TẬP MMTT</p><h1>{category === "Tất cả" ? "Tất cả sản phẩm" : category}</h1><p>{query ? `Kết quả tìm kiếm cho “${query}”.` : category === "Tất cả" ? "Khám phá các sản phẩm mỹ phẩm và quần áo nữ được yêu thích." : `Khám phá bộ sưu tập ${category.toLowerCase()} được chọn lọc dành cho bạn.`}</p></div><span className="catalog-count">{filteredProducts.length} sản phẩm</span></div>
      <div className="product-filters" aria-label="Lọc sản phẩm theo danh mục">
        {["Tất cả", ...categories.map((item) => item.name)].map((item) => {
          const count = item === "Tất cả" ? products.length : products.filter((product) => product.category === item).length;
          return <button key={item} className={category === item ? "selected" : ""} onClick={() => onSelectCategory(item)}>{item}<span>{count}</span></button>;
        })}
      </div>
      <ProductGrid items={filteredProducts} onOpenProduct={onOpenProduct} onAddToCart={onAddToCart} onFavorite={onFavorite} />
    </section>
  );
}
