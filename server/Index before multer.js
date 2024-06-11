import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js"; // Man Auth 7: Importing routes

const app = express();

// MW Parsing bodies:
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// MW for CORS:
app.use(cors()); // Has to be before the routes!

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
