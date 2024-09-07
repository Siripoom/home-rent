import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-[#1A2145] text-white py-5">
      <div className="container mx-auto flex justify-between items-center">
        <p>© Pool villa Ao Nang Home พูลวิลล่า กระบี่ อ่าวนาง</p>
        <div className="space-x-4">
          <Link to="acc" className="link link-hover">
            Accommodation
          </Link>
          <Link to="contact" href="#contact" className="link link-hover">
            Contact
          </Link>
          <Link to="about" className="link link-hover">
            About us
          </Link>
        </div>
      </div>
    </footer>
  );
}
