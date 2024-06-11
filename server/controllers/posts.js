import mongoose from "mongoose";
import fs from "fs";
import path from "path";

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	const page = req.query.page || 1;

	try {
		const LIMIT = 6; // Number of posts per page.
		// Getting index of first post on every page.
		const startIndex = (Number(page) - 1) * LIMIT; // Example: startndex of page 3 would be: 4 * ((3)-1) = 11
		const total = await PostMessage.find().countDocuments({}); // Total number of posts in DB. Needed to know how many pages are there.

		// Gets posts, sorting newest first, skipping previous pages and loading only needed amount of posts per page
		const posts = await PostMessage.find()
			.sort({ createdAt: -1 })
			.skip(startIndex)
			.limit(LIMIT);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			totalNumberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

export const getPost = async (req, res) => {
	const { id } = req.params; // Destructuring it
	const _id = id; // Renaming it => Mongoose syntax

	try {
		const post = await PostMessage.findById(_id);
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

// Text Search 14: Controller action to fetch matching posts
export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;

	try {
		const title = new RegExp(searchQuery, "i"); // i = ignore: Test, test, TEST -> test. RegExp is better for MG to search DB.

		const posts = await PostMessage.find({
			$or: [{ title: title }, { tags: { $in: tags.split(",") } }],
		});

		res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

export const createPost = async (req, res) => {
	// console.log(req.userId);
	const post = req.body;
	// console.log("This is req.body in createPost controller", req.body);
	const imageUrl = req.file.path;
	const fileName = req.file.originalname;
	const tags = req.body.tags.split(","); // Splitting tags into array

	const newPost = new PostMessage({
		...post,
		tags,
		imageUrl,
		fileName,
		creator: req.userId, // After Auth is in place we add the useId to creator property
	});
	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

export const updatePost = async (req, res) => {
	// console.log("This is req.body in updatePost controller", req.body);
	// console.log("This is req.file in updatePost controller", req.file);

	// Edit 2. Controller action. Then go  to FE
	// /posts/123 => is filling the value of  { id }
	const { id } = req.params; // Destructuring it
	const _id = id; // Renaming it => Mongoose syntax

	let post = req.body; // Extracting updated post from body
	const tags = req.body.tags.split(","); // Splitting tags into array
	let imageUrl;
	let oldPost;

	post = { ...post, tags }; // Setting tags as array

	try {
		// Getting the old post from DB:
		oldPost = await PostMessage.findById(_id);
		// console.log("This is oldPost in updatePost controller", oldPost);
	} catch (error) {
		res.status(409).json({ message: error });
	}

	if (req.file) {
		// If a new file was picked, imageUrl will be filled. Only in this case, we need to clear the old image.
		imageUrl = req.file.path;
		post = { ...post, imageUrl };
		// Updating image in images folder:
		clearImage(oldPost.imageUrl);
	}
	// console.log("This is imageUrl in updatePost controller", imageUrl);

	// If not a valid MG _id send back error Message
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id!");

	try {
		// Finding, updating an recieving (new: true) post again.
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
			new: true,
		});

		res.status(200).json(updatedPost); // And sending it back
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

export const deletePost = async (req, res) => {
	// Delete 2; Controller action. Then go to FE
	// /posts/123 => is filling the value of { id }
	const { id } = req.params; // Destructuring it
	const _id = id; // Renaming it => Mongoose syntax
	let post;

	// If not a valid MG _id send back error Message
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id!");

	try {
		post = await PostMessage.findById(_id);
		// console.log("Found post in delete action:", post);

		// Finding and deleting post from DB:
		await PostMessage.findByIdAndRemove(_id);

		res.status(200).json({ message: "Post deleted successfully!" });
	} catch (error) {
		res.status(409).json({ message: error });
	}
	// Deleting image in images folder:
	clearImage(post.imageUrl);
};

export const likePost = async (req, res) => {
	// Like 2; Controller action. Then go to FE
	// /posts/123 => is filling the value of { id }
	const { id } = req.params; // Destructuring it
	const _id = id; // Renaming it => Mongoose syntax

	// With auth flow: Check if user is authenticated. Request is then populated in auth middleware:
	if (!req.userId) return res.json({ message: "Unauthenticated" });

	// If not a valid MG _id send back error Message
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id!");

	try {
		// First we need the post from the DB:
		const post = await PostMessage.findById(_id);

		// With auth flow: Now checking if userId is in likes array or not. Looping over ids
		// If userid is already there, it is gonna be a dislike
		const index = post.likes.findIndex((id) => id === String(req.userId));

		// With auth flow: ONlY if userId was not in array it is gonna be -1
		if (index === -1) {
			// Like a post
			post.likes.push(req.userId); // Adds userId
		} else {
			// Dislike a post
			post.likes = post.likes.filter((id) => id !== String(req.userId)); // Filters out userId
		}

		// With auth flow: Then we update it and store it in updatedPost variable
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
			// Now we update the post including new likes array. No count incrementing anymore
			new: true,
		});
		res.status(200).json(updatedPost); // And sending it back
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

export const commentPost = async (req, res) => {
	const { id } = req.params; // Destructuring it
	const _id = id; // Renaming it => Mongoose syntax
	const { comment } = req.body; // Extracting comment from body

	// First fetching post from DB to put the comment on:
	const post = await PostMessage.findById(_id);

	post.comments.push(comment); // Adds comment to post.comments array

	// And finally we update it and store it in updatedPost variable
	const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
		new: true,
	});

	res.status(200).json(updatedPost);
};

const clearImage = (filePath) => {
	filePath = path.join(filePath);
	fs.unlink(filePath, (err) => console.log(err));
};
