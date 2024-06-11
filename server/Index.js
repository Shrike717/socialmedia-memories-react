import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// 1. Test images import multer
import multer from "multer";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js"; // Man Auth 7: Importing routes.
import imageRoutes from "./routes/images.js";

const app = express();

// Test images 2: Configuration object for storing files:
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (reg, file, cb) => {
		cb(null, new Date().toISOString() + "-" + file.originalname);
	},
});

// Test images 3: Filter for accepting only certain file mimetypes
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

// MW Parsing bodies:
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// MW for CORS:
app.use(cors()); // Has to be before the routes!

// Test images 4: Middleware multer initialised:
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// Test images 5: serving images statically:
app.use("/images", express.static("images"));

// Test images 6: Test images routes:
app.use("/api", imageRoutes); // Test images make use of routes:

// MW Connecting posts routes to app with prefix "/posts":
app.use("/posts", postRoutes);
// MW Connecting user routes to app with prefix "/user": Man Auth 6: Make routes
app.use("/user", userRoutes);

// connecting to db with mongoose:
mongoose
	.connect(process.env.CONNECTION_URL)
	.then(() =>
		app.listen(process.env.PORT, () =>
			console.log(
				`Server running on port: ${process.env.PORT} -----------------------------------------`
			)
		)
	)
	.catch((error) => console.log(error));
