import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      const response = await fetch("/api/posts"); // Proxy will route this to http://localhost:3000/api/posts
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts = await response.json();
      return { posts }; // Pass the fetched posts to the Home component
    },
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
    loader: async ({ params }) => {
      const response = await fetch(`/api/posts/${params.id}`); // Proxy handles this
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      const post = await response.json();
      return { post }; // Pass the fetched post to the Edit component
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
