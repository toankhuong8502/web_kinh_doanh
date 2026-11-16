import { useEffect, useMemo, useState } from "react";
import StoreFooter from "./components/StoreFooter";
import StoreHeader from "./components/StoreHeader";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import OffersPage from "./pages/OffersPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import { cartStorageKey, priceValue, products, readSavedCart } from "./data/store";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState(readSavedCart);
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
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => {
    const product = products.find((entry) => entry.name === item.name);
    return total + (product ? priceValue(product.price) * item.quantity : 0);
  }, 0);

  useEffect(() => {
    try {
      window.localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Không thể lưu giỏ hàng:", error);
      showNotice("Không thể lưu giỏ hàng trên thiết bị này.");
    }
  }, [cartItems]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function showPage(page) {
    setCurrentPage(page);
    scrollToTop();
  }

  function showAllProducts() {
    setQuery("");
    setCategory("Tất cả");
    showPage("products");
  }

  function chooseCategory(name) {
    setQuery("");
    setCategory(name);
    showPage("products");
  }

  function showSearchResults(value) {
    setQuery(value);
    setCategory("Tất cả");
    setCurrentPage("products");
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("M");
    showPage("detail");
  }

  function addProductToCart(product, amount = 1, checkout = false) {
    const size = product.category === "Quần áo nữ" ? selectedSize : "";
    setCartItems((items) => {
      const existing = items.find((item) => item.name === product.name && item.size === size);
      if (existing) {
        return items.map((item) => item === existing
          ? { ...item, quantity: Math.min(product.stock, item.quantity + amount) }
          : item);
      }
      return [...items, { name: product.name, quantity: Math.min(product.stock, amount), size }];
    });
    if (checkout) setCurrentPage("cart");
    showNotice(checkout
      ? `${product.name} đã được thêm vào giỏ hàng.`
      : `Đã thêm ${product.name} × ${amount} vào giỏ hàng.`);
  }

  function updateCartQuantity(name, size, amount) {
    const product = products.find((item) => item.name === name);
    if (!product) return;
    setCartItems((items) => items.map((item) =>
      item.name === name && item.size === size
        ? { ...item, quantity: Math.max(1, Math.min(product.stock, amount)) }
        : item,
    ));
  }

  function removeCartItem(name, size) {
    setCartItems((items) => items.filter((item) => item.name !== name || item.size !== size));
  }

  function returnToProducts() {
    setCurrentPage("products");
    scrollToTop();
  }

  return (
    <div className="storefront">
      <StoreHeader
        currentPage={currentPage}
        cartCount={cartCount}
        query={query}
        onHome={() => showPage("home")}
        onProducts={showAllProducts}
        onCategories={() => showPage("categories")}
        onOffers={() => showPage("offers")}
        onContact={() => showPage("contact")}
        onCart={() => showPage("cart")}
        onSearch={showSearchResults}
        onNotice={showNotice}
      />

      <main
        id={currentPage === "categories" ? "danh-muc" : currentPage === "products" ? "san-pham" : currentPage === "offers" ? "uu-dai" : currentPage === "contact" ? "lien-he" : currentPage === "cart" ? "gio-hang" : "trang-chu"}
        className="store-main"
      >
        {currentPage === "home" && <HomePage
          onSelectCategory={chooseCategory}
          onOpenProduct={openProduct}
          onAddToCart={(product) => addProductToCart(product)}
          onFavorite={() => showNotice("Đã thêm vào danh sách yêu thích.")}
          onShowCategories={() => showPage("categories")}
          onShowProducts={showAllProducts}
        />}
        {currentPage === "categories" && <CategoriesPage onHome={() => showPage("home")} onSelectCategory={chooseCategory} />}
        {currentPage === "products" && <ProductsPage
          category={category}
          query={query}
          filteredProducts={filteredProducts}
          onHome={() => showPage("home")}
          onSelectCategory={(name) => {
            setCategory(name);
            setQuery("");
          }}
          onOpenProduct={openProduct}
          onAddToCart={(product) => addProductToCart(product)}
          onFavorite={() => showNotice("Đã thêm vào danh sách yêu thích.")}
        />}
        {currentPage === "detail" && <ProductDetailPage
          product={selectedProduct}
          selectedSize={selectedSize}
          quantity={quantity}
          onHome={() => showPage("home")}
          onProducts={returnToProducts}
          onSelectCategory={chooseCategory}
          onSelectSize={setSelectedSize}
          onChangeQuantity={setQuantity}
          onAddToCart={() => selectedProduct && addProductToCart(selectedProduct, quantity)}
          onBuyNow={() => selectedProduct && addProductToCart(selectedProduct, quantity, true)}
        />}
        {currentPage === "cart" && <CartPage
          cartItems={cartItems}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
          onHome={() => showPage("home")}
          onProducts={showAllProducts}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeCartItem}
          onCheckout={() => showNotice("Đây là bản mockup; chức năng đặt hàng và thanh toán sẽ được kết nối sau.")}
        />}
        {currentPage === "offers" && <OffersPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>

      <StoreFooter onHome={() => showPage("home")} />
      {notice && <div role="status" className="store-toast">{notice}</div>}
    </div>
  );
}

export default App;
