import express from "express";

import {
	getPostsBySearch, // Text Search 13b: RImporting controller action
	getPosts,
	getPost,
	createPost,
	updatePost, // Edit 1b: Importing controller action
	deletePost, // Delete 1b: Importing controller action
	likePost, // Like 1b: Importing controller action
	commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

// Setting up router
const router = express.Router();

// http://localhost:5000/posts -> Prefix!
router.get("/search", getPostsBySearch); // Text Search 13a: Route
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); // Edit 1a: Route
router.delete("/:id", auth, deletePost); // Delete 1a: Route
router.patch("/:id/likePost", auth, likePost); // Like 1a: Route
router.post("/:id/commentPost", auth, commentPost); // Comment route

export default router;
