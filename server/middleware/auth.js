import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Needed for JWT Secret
dotenv.config();

const auth = async (req, res, next) => {
	try {
		// Step 1: Extracting token from request header
		const token = req.headers.authorization.split(" ")[1];

		//  Step 2: Checking token: Custom from manual auth or Google token
		const isCustomAuth = token.length < 500;

		//  Step 3: This is the data we want to extract from the token
		let decodedData;

		//  Step 4: If we have token and f it's custom
		if (token && isCustomAuth) {
			// Step 4a: Decoding username and user id
			decodedData = jwt.verify(token, process.env.JWT_SECRET);
			// Step 4b: Now we can set the user id to every request:
			req.userId = decodedData?.id;
		} else {
			// Step 4a: If it's Google token
			decodedData = jwt.decode(token);
			// Step 4b: Now we can set (populate) the user id to every request:
			req.userId = decodedData?.sub; // sub is the unigue id for every single Google user
		}

		next(); //  Step 5: Passing request to controller action
	} catch (error) {
		console.log(error);
	}
};

export default auth;
