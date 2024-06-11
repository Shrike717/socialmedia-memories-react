// Test images 7: Creating a route
import express from "express";

import { createImage, getImages } from "../controllers/images.js";
import auth from "../middleware/auth.js";

// Setting up router
const router = express.Router();

router.get("/images", getImages);

router.post("/images", auth, createImage);

export default router;
