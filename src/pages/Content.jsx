import { useState, useEffect } from "react";
import { db } from "../firebase_config"; // Firebase configuration
import { collection, getDocs } from "firebase/firestore";

const ContentList = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch the list of posts from Firestore
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
      setLoadingPosts(false);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* <h2 className="text-3xl font-bold mb-5">Content List</h2> */}
      {loadingPosts ? (
        <p>Loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div key={post.id} className="card bg-base-100 shadow-lg p-5">
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;
