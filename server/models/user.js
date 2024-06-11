// Man Auth 10:
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		id: { type: String },
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
	}
	// { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
