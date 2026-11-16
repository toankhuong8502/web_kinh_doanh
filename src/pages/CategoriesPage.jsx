import { CategoryGrid } from "../components/StoreUi";

export default function CategoriesPage({ onHome, onSelectCategory }) {
  return (
    <section className="catalog-page categories-page">
      <div className="page-breadcrumb"><button onClick={onHome}>Trang chủ</button><span>/</span><strong>Danh mục</strong></div>
      <div className="catalog-title"><div><p className="catalog-eyebrow">KHÁM PHÁ MMTT</p><h1>Danh mục sản phẩm</h1><p>Chọn danh mục yêu thích để khám phá bộ sưu tập dành riêng cho bạn.</p></div><span className="catalog-count">02 danh mục</span></div>
      <CategoryGrid onSelect={onSelectCategory} />
      <div className="category-note">MMTT tuyển chọn các sản phẩm làm đẹp và thời trang nữ cho phong cách mỗi ngày.</div>
    </section>
  );
}
