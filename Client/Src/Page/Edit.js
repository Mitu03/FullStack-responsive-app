import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Edit = () => {
  const { post } = useLoaderData(); // Get the post from the loader
  const [updatedPost, setUpdatedPost] = useState(post);
  const navigate = useNavigate(); // Use navigate instead of Link

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        navigate("/"); // Navigate to Home page after successful update
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <h1 className="edit">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={updatedPost.title}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, title: e.target.value })
          }
          placeholder="Title"
          required
        />
        <textarea
          value={updatedPost.content}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, content: e.target.value })
          }
          placeholder="Content"
          required
        />
        <input
          type="text"
          value={updatedPost.author}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, author: e.target.value })
          }
          placeholder="Author"
          required
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default Edit;
