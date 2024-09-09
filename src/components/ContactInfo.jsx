import { FaWhatsappSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
export default function ContactInfo() {
  return (
    <>
      <div className="container text-center mt-3 mb-3 mx-6">
        <h2 className="text-4xl font-semibold mb-4">Pool villa Aonang home</h2>
        <div className="space-y-4">
          {/* WhatsApp Contact */}
          <div className="flex items-center space-x-2 text-2xl mx-3">
            <a href="https://wa.me/qr/6GSWZWQGTUNGO1">
              <FaWhatsappSquare style={{ backgroundColor: "whatsapp" }} />
            </a>
            <span>+356 99978739, +66633292823</span>
          </div>

          {/* Facebook Contact */}
          <div className="flex items-center space-x-2 text-2xl mx-3">
            <FaFacebookSquare />
            <span>Pool villa Aonang home พูลวิลล่า กระบี่ อ่าวนาง</span>
          </div>

          {/* Phone Contact */}
          <div className="flex items-center space-x-2 text-2xl mx-3">
            <FaPhoneAlt />
            <span>063 747 0077</span>
          </div>
        </div>
      </div>
    </>
  );
}
