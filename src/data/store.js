export const cartStorageKey = "mmtt-cart";

export const categories = [
  { name: "Mỹ phẩm", image: "photo-1596462502278-27bfdc403348", count: "05 sản phẩm" },
  { name: "Quần áo nữ", image: "photo-1483985988355-763728e1935b", count: "05 sản phẩm" },
];

export const products = [
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

export function readSavedCart() {
  try {
    const savedCart = JSON.parse(window.localStorage.getItem(cartStorageKey) || "[]");
    if (!Array.isArray(savedCart)) return [];
    return savedCart.reduce((items, item) => {
      if (!item || !Number.isInteger(item.quantity) || item.quantity <= 0) return items;
      const product = products.find((entry) => entry.name === item.name);
      if (!product) return items;
      const size = product.category === "Quần áo nữ"
        ? (["S", "M", "L", "XL"].includes(item.size) ? item.size : "M")
        : "";
      const existing = items.find((entry) => entry.name === product.name && entry.size === size);
      if (existing) {
        return items.map((entry) => entry === existing
          ? { ...entry, quantity: Math.min(product.stock, entry.quantity + item.quantity) }
          : entry);
      }
      return [...items, { name: product.name, quantity: Math.min(product.stock, item.quantity), size }];
    }, []);
  } catch (error) {
    console.error("Không thể đọc giỏ hàng đã lưu:", error);
    return [];
  }
}

export function priceValue(price) {
  return Number(price.replace(/\D/g, ""));
}

export function formatPrice(value) {
  return `${value.toLocaleString("vi-VN")}đ`;
}
