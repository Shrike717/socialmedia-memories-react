// Image test 9: Creating a model
import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
	{
		title: String,
		message: String,
		name: String,
		creator: String,
		tags: [String],
		imageUrl: String,
		likes: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
