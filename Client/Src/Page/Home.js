import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Home = () => {
  const { posts } = useLoaderData(); // Fetch posts from the loader
  const navigate = useNavigate(); // Use navigate instead of Link

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.reload(); // Reload the page after deletion
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <header>
      <h1 className="logo">Make some Note </h1>

      <ul>
        <button onClick={() => navigate("/create")} className="Create-new btn">
          Create New
        </button>
        {posts.map((post) => (
          <li key={post.id} className="container">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p className="author">{post.author}</p>
            <button
              className="btn"
              onClick={() => navigate(`/edit/${post.id}`)}
            >
              Edit
            </button>
            <button className="btn" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Home;
