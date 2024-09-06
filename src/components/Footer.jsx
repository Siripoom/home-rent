export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-5">
      <div className="container mx-auto flex justify-between items-center">
        <p>© Pool villa Ao Nang Home พูลวิลล่า กระบี่ อ่าวนาง</p>
        <div className="space-x-4">
          <a href="#accommodation" className="link link-hover">
            Accommodation
          </a>
          <a href="#contact" className="link link-hover">
            Contact
          </a>
          <a href="#about" className="link link-hover">
            About us
          </a>
        </div>
      </div>
    </footer>
  );
}
