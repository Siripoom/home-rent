import { useState, useEffect } from "react";
import { db } from "../firebase_config"; // Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeRentList = () => {
  const [homes, setHomes] = useState([]);
  const [loadingHomes, setLoadingHomes] = useState(true);
  const [selectedHome, setSelectedHome] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the list of homes from Firestore
  const fetchHomes = async () => {
    setLoadingHomes(true);
    try {
      const querySnapshot = await getDocs(collection(db, "homes"));
      const homeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHomes(homeList);
      setLoadingHomes(false);
    } catch (error) {
      console.error("Error fetching homes: ", error);
      setLoadingHomes(false);
    }
  };

  // Load homes on component mount
  useEffect(() => {
    fetchHomes();
  }, []);

  // Handle opening the modal and setting the selected home
  const handleOpenModal = (home) => {
    setSelectedHome(home);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHome(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      {/* <h2 className="text-3xl font-bold mb-5">Home Rental Listings</h2> */}

      {loadingHomes ? (
        <p>Loading homes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {homes.map((home) => (
            <div
              key={home.id}
              className="card bg-base-100 shadow-lg p-5 cursor-pointer"
              onClick={() => handleOpenModal(home)} // Open modal on click
            >
              <div className="w-full h-48 overflow-hidden rounded-lg">
                {home.images && home.images.length > 0 && (
                  <img
                    src={home.images[0]} // Only show the first image
                    alt={home.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold mt-3">{home.title}</h3>
              <p className="mt-2">{home.description.substring(0, 100)}...</p>
              <p className="text-sm mt-2 font-light">{home.address}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal for showing details and image carousel */}
      {isModalOpen && selectedHome && (
        <div className="modal modal-open">
          <div className="modal-box max-w-5xl">
            <h3 className="text-3xl font-bold mb-4">{selectedHome.title}</h3>
            <h4 className="text-4xl font-bold mb-4">Description</h4>
            <p className="mb-4">{selectedHome.description}</p>
            <h4 className="text-4xl font-bold mb-4">Address</h4>
            <p className="text-sm mb-4">{selectedHome.address}</p>

            {/* Swiper carousel for images */}
            {selectedHome.images && selectedHome.images.length > 0 && (
              <Swiper spaceBetween={10} slidesPerView={1}>
                {selectedHome.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-[500px] object-cover rounded-lg" // Increased image size
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <div className="modal-action">
              <button onClick={handleCloseModal} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeRentList;
