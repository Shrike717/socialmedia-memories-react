// Man Auth 8: Setng up router for user
import express from "express";

import { postSignin, postSignup } from "../controllers/user.js";

// Setting up router
const router = express.Router();

router.post("/signin", postSignin);
router.post("/signup", postSignup);

export default router;
