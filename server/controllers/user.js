import bcrypt from "bcrypt"; // Hashes pw before sending it to DB
import jwt from "jsonwebtoken"; // Creates a token. With that user is stored in the browser for some time
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv"; // Needed for JWT Secret
dotenv.config();

import User from "../models/user.js"; // Man Auth 11

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // SG API Key

// Man Auth 12: Signin Action
export const postSignin = async (req, res) => {
	const { email, password } = req.body; // Man Auth 12a: First get email and pw

	try {
		const existingUser = await User.findOne({ email }); // Man Auth 12b: If user exists find him by email

		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist." }); // Man Auth 12c: If no user message back

		// Man Auth 12d: Compare pw coming in wiith pw from user in DBs
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid credentials" }); // Man Auth 12e: If wrong pw message back

		// Man Auth 12f: If user exists and credentials are valid we create JWT.
		// Param 1: In the obj we provide all the info we want to store in the token
		// Param 2: The secret
		// Param 3: Expiration time
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		// Man Auth 12g: Then sending back user and token
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};

// Man Auth 13: Signup Action
export const postSignup = async (req, res) => {
	// Man Auth 13a: First get all needed data
	const { email, password, confirmedPassword, firstName, lastName } =
		req.body;

	try {
		const existingUser = await User.findOne({ email }); // Man Auth 13b: If already user exists find him by email

		if (existingUser)
			return res.status(400).json({ message: "User already exist." }); // Man Auth 13c: If already user message back

		if (password !== confirmedPassword)
			return res.status(400).json({ message: "Passwords don't match." }); // Man Auth 13d: If pw doesn't match message back

		const hashedPassword = await bcrypt.hash(password, 12); // Man Auth 13e: Hashing pw before DB.  Salt=12

		// Man Auth 13f: Now we can create a user in DB and store him in result
		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		// Man Auth 13f: If user exists and credentials are valid we create JWT.
		// Param 1: In the obj we provide all the info we want to store in the token
		// Param 2: The secret
		// Param 3: Expiration time
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		// Man Auth 13g: Then sending back user and token
		res.status(200).json({ result, token });

		// Sending Registration Confirmation with Sendgrid:
		// Configurating Message and calling the send function on sgMail object with message afterwards
		const msg = {
			to: result.email, // Change to your recipient -> when user is signing up dan717@gmx.de
			from: "dbauer.webdev@gmail.com", // Change to your verified sender -> Node Training App
			subject: "Signup succeeded!",
			text: "You successfully signed up!",
			html: "This is from Memory App: <strong>You successfully signed up!</strong>", // WARNING: Error n html causes email not to be send
		};
		sgMail
			.send(msg)
			.then((response) => {
				console.log(response[0].statusCode);
				console.log(response[0].headers);
			})
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};
