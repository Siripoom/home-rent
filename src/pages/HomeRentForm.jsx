import { useState, useEffect } from "react";
import { db, storage } from "../firebase_config"; // Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // To generate unique file names

const HomeRentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [homes, setHomes] = useState([]);
  const [loadingHomes, setLoadingHomes] = useState(true);

  // State for editing
  const [editHome, setEditHome] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handle image selection and create previews for multiple images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Append new images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]); // Append new previews
  };

  // Handle form submission for creating
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Upload images to Firebase Storage and get their URLs
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `homes/${uuidv4()}-${image.name}`);
          await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        })
      );

      // Step 2: Add home details to Firestore
      await addDoc(collection(db, "homes"), {
        title,
        description,
        address,
        images: imageUrls, // Save the uploaded image URLs
      });

      // Reset the form after submission
      setTitle("");
      setDescription("");
      setAddress("");
      setImages([]);
      setImagePreviews([]);
      setLoading(false);
      alert("Home rental listing added successfully!");

      // Fetch updated home list after adding a new one
      fetchHomes();
    } catch (error) {
      console.error("Error uploading files: ", error);
      setLoading(false);
    }
  };

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

  // Handle deleting a home
  const handleDelete = async (homeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this home?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "homes", homeId));
        alert("Home deleted successfully!");
        fetchHomes(); // Refresh home list after deletion
      } catch (error) {
        console.error("Error deleting home: ", error);
      }
    }
  };

  // Handle opening the edit modal and setting the home data
  const openEditModal = (home) => {
    setEditHome(home);
    setIsEditModalOpen(true);
    setTitle(home.title);
    setDescription(home.description);
    setAddress(home.address);
    setImagePreviews(home.images);
    setImages([]); // Clear previous selected images
  };

  // Handle editing the home listing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: If there are new images, upload them to Firebase Storage
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `homes/${uuidv4()}-${image.name}`);
          await uploadBytes(imageRef, image);
          const downloadURL = await getDownloadURL(imageRef);
          return downloadURL;
        })
      );

      // Step 2: Update home details in Firestore
      const homeRef = doc(db, "homes", editHome.id);
      await updateDoc(homeRef, {
        title,
        description,
        address,
        images:
          imageUrls.length > 0
            ? [...editHome.images, ...imageUrls]
            : editHome.images, // Append new images to existing ones
      });

      // Reset and close modal
      setEditHome(null);
      setIsEditModalOpen(false);
      setLoading(false);
      alert("Home rental listing updated successfully!");
      fetchHomes(); // Refresh home list after editing
    } catch (error) {
      console.error("Error editing home: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form to add home rental */}
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-5">
            Create Home Rental Listing
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium">Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Address</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Upload Images</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Display list of homes */}
        <div>
          <h2 className="text-3xl font-bold mb-5">Home Rental Listings</h2>

          {loadingHomes ? (
            <p>Loading homes...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {homes.map((home) => (
                <div key={home.id} className="card bg-base-100 shadow-lg p-5">
                  <div className="w-full h-48 overflow-hidden rounded-lg">
                    {/* Display the first image as the cover image */}
                    {home.images && home.images.length > 0 && (
                      <img
                        src={home.images[0]}
                        alt={home.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mt-3">{home.title}</h3>
                  {/* <p className="mt-2">{home.description}</p>
                  <p className="text-sm mt-2 font-light">{home.address}</p> */}

                  {/* Additional images */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {home.images &&
                      home.images
                        .slice(1)
                        .map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Additional ${home.title}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => openEditModal(home)}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(home.id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Edit Home Rental Listing</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-medium">Title</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium">Description</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium">Address</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium">
                  Upload New Images
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className={`btn btn-primary w-46 ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeRentForm;
