import { Icon } from "./StoreUi";

export default function StoreFooter({ onHome }) {
  return (
    <footer className="shop-footer">
      <div className="footer-main">
        <a className="shop-logo footer-logo" href="#trang-chu" onClick={onHome}><span className="logo-symbol"><Icon name="bag" size={23} /></span><span><strong>MMTT</strong><small>ĐẸP HƠN MỖI NGÀY</small></span></a>
        <div className="footer-column"><strong>Chính sách</strong><a href="#ho-tro">Chính sách đổi trả</a><a href="#ho-tro">Chính sách bảo mật</a><a href="#ho-tro">Điều khoản sử dụng</a></div>
        <div className="footer-column"><strong>Hỗ trợ khách hàng</strong><a href="#ho-tro">Hướng dẫn mua hàng</a><a href="#ho-tro">Phương thức thanh toán</a><a href="#ho-tro">Liên hệ hỗ trợ</a></div>
        <div className="footer-column social-column"><strong>Kết nối với chúng tôi</strong><div><a href="#ho-tro" aria-label="Facebook"><Icon name="facebook" size={16} /></a><a href="#ho-tro" aria-label="Instagram"><Icon name="instagram" size={16} /></a><a href="#ho-tro" aria-label="TikTok"><Icon name="play" size={15} /></a></div></div>
      </div>
      <div className="copyright"><span>© 2025 MMTT. Tất cả quyền được bảo lưu.</span><a href="#trang-chu" aria-label="Lên đầu trang">↑</a></div>
    </footer>
  );
}
