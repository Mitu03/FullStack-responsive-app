import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3000;
const API_URL = "http://localhost:5000"; // Server1 API URL

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route to fetch all posts from Server1
app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.json(response.data); // Forward the response data from Server1
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to fetch a specific post by ID from Server1
app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.json(response.data); // Forward the specific post from Server1
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Route to create a new post (forward to Server1)
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    res.json(response.data); // Forward the new post data from Server1
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Route to update a post (forward to Server1)
app.patch("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    res.json(response.data); // Forward the updated post data from Server1
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Route to delete a post (forward to Server1)
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

// Start Server2
app.listen(port, () => {
  console.log(`Server2 is running on http://localhost:${port}`);
});
