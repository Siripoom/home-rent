import { useState } from "react";
import logo from "../assets/images/logo.jpg";
export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* This is the modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          {/* This is the modal dialog */}
          <div className="modal modal-open">
            <div className="modal-box text-center">
              {/* Decrease the size and add rounded border */}
              <img
                src={logo}
                alt="Pool villa in Aonang"
                className="w-40 h-40 rounded-full mb-4 mx-auto border border-gray-300"
              />
              <h2 className="font-bold text-lg">
                Welcome to Pool Villa Aonang Home!
              </h2>
              <p className="py-4">
                Always ready to answer to your real estate needs.
              </p>
              <div className="modal-action">
                <button className="btn" onClick={handleClose}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
