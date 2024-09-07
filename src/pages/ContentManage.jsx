import { useState, useEffect } from "react";
import { db, storage } from "../firebase_config"; // Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // To generate unique file names

const ContentManage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Preview image before upload
  };

  // Fetch the list of posts from Firestore
  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postList);
  };

  // Submit form to create a new post or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editingPost ? editingPost.imageUrl : "";

      // Upload image if a new one was selected
      if (image) {
        const imageRef = ref(storage, `posts/${uuidv4()}-${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (editingPost) {
        // Update existing post
        const postRef = doc(db, "posts", editingPost.id);
        await updateDoc(postRef, { content, imageUrl });
        alert("Post updated successfully");
      } else {
        // Create a new post
        await addDoc(collection(db, "posts"), { content, imageUrl });
        alert("Post created successfully");
      }

      // Reset form and fetch updated posts
      setContent("");
      setImage(null);
      setImagePreview("");
      setEditingPost(null);
      setLoading(false);
      fetchPosts();
    } catch (error) {
      console.error("Error creating or updating post:", error);
      setLoading(false);
    }
  };

  // Handle editing a post
  const handleEdit = (post) => {
    setEditingPost(post);
    setContent(post.content);
    setImagePreview(post.imageUrl);
  };

  // Handle deleting a post
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        alert("Post deleted successfully");
        fetchPosts(); // Refresh posts after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5">
        {editingPost ? "Edit Post" : "Create Post"}
      </h2>

      {/* Form for creating or editing a post */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Content</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Upload Image</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : editingPost
            ? "Update Post"
            : "Create Post"}
        </button>
      </form>

      <hr className="my-10" />

      {/* List of posts for editing or deleting */}
      <div>
        <h3 className="text-2xl font-bold mb-5">Post List</h3>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="mb-5 p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <p className="flex-1">{post.content}</p>
                  <button
                    onClick={() => handleEdit(post)}
                    className="btn btn-sm btn-secondary mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContentManage;
