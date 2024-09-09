import { FaWhatsappSquare } from "react-icons/fa";
export default function RentingPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Short-term and Long-term Accommodation Management Services
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          Service fee: <span className="font-bold">3500 Baht</span>
        </p>

        <h2 className="text-xl font-semibold mb-2">Our Service:</h2>
        <ul className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
          <li>
            Providing an accommodation rental by your requirement:
            <ul className="list-disc list-inside ml-6">
              <li>Budget</li>
              <li>Location</li>
              <li>Pet friendly</li>
              <li>Others</li>
            </ul>
          </li>
          <li>
            Viewing process:
            <p className="ml-6">
              We send all details of properties to clients and you can select
              the ones you like.
            </p>
          </li>
          <li>
            Helping for paperwork:
            <ul className="list-disc list-inside ml-6">
              <li>Lease agreement</li>
              <li>Suggestion for Thai visa</li>
            </ul>
          </li>
          <li>
            After-sales service included:
            <p className="ml-6">
              We are the bridge between you and the landlord until the end of
              your lease period.
            </p>
          </li>
        </ul>

        {/* Contact Section */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Contact Us for More Information
          </h3>
          <div className="flex items-center space-x-2 text-2xl mx-3">
            <a href="https://wa.me/qr/6GSWZWQGTUNGO1">
              <FaWhatsappSquare style={{ backgroundColor: "whatsapp" }} />
            </a>
            <span>+356 99978739, +66633292823</span>
          </div>
        </div>
      </div>
    </div>
  );
}
