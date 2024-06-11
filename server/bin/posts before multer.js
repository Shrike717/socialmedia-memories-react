import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
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

	const newPost = new PostMessage({
		...post,
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
	console.log(req.body);
	// Edit 2. Controller action. Then go  to FE
	// /posts/123 => is filling the value of  { id }
	const { id } = req.params; // Destructuring it
	const _id = id; // Renaming it => Mongoosse syntax
	const post = req.body; // Extracting updated post from body

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
	const _id = id; // Renaming it => Mongoosse syntax

	// If not a valid MG _id send back error Message
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id!");

	try {
		// Finding and deleting post from DB:
		await PostMessage.findByIdAndRemove(_id);

		res.status(200).json({ message: "Posst deleted successfully!" });
	} catch (error) {
		res.status(409).json({ message: error });
	}
};

export const likePost = async (req, res) => {
	// Like 2; Controller action. Then go to FE
	// /posts/123 => is filling the value of { id }
	const { id } = req.params; // Destructuring it
	const _id = id; // Renaming it => Mongoosse syntax

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
