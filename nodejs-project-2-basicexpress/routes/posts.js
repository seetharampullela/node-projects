import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
const router = Router();

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:id", getPost);

// Create new Post
router.post("/", createPost);

//Update post
router.put("/:id", updatePost);

//Delete post
router.delete("/:id", deletePost);

export default router;
