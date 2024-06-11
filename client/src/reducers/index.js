import { combineReducers } from "redux"; // Redux 4a. import this

import posts from "./posts"; // Redux 4b. Import what is needed for a single reducer
import auth from "./auth"; // Google 6a

import images from "./images";

export default combineReducers({
	// Redux 4c. Set combineReducer with single reducer inside
	posts,
	// Google 6bs: Set Single reducer auth
	auth,
	images,
});
