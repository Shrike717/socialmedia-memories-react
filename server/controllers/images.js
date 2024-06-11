// Test images 8: Creating controller

import Image from "../models/image.js";

export const getImages = async (req, res) => {
	try {
		const images = await Image.find();

		res.status(200).json(images);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

export const createImage = async (req, res) => {
	// 4
	const image = req.body;
	console.log(req.body);
	const imageUrl = req.file.path;

	const tags = req.body.tags.split(","); // Splitting tags into array

	// Save this data to a database
	const newImage = new Image({
		...image,
		tags,
		imageUrl,
		creator: req.userId, // After Auth is in place we add the useId to creator property
	});
	try {
		await newImage.save();

		res.status(201).json(newImage);
	} catch (error) {
		res.status(409).json({ message: error });
	}
};
