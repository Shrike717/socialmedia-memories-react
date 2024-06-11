import { CREATE_IMAGE, FETCH_ALL_IMAGES } from "../constants/actionTypes";

import * as api from "../api";

export const getImages = () => async (dispatch) => {
	try {
		const { data } = await api.fetchImages(); // Fetches all images from BE through axios call in api/index.js

		console.log(
			"This is the retrieved data from BE in action getImages",
			data
		);

		dispatch({ type: FETCH_ALL_IMAGES, payload: data }); // Action that gets dispatched
	} catch (error) {
		console.log(error);
	}
};

export const createImage = (image) => async (dispatch) => {
	console.log(
		"2. This is the formData Object arriving in the action:",
		...image
	);
	try {
		const { data } = await api.createImage(image); // Axios request sending new post to BE triggert from here. Response gets saved

		console.log(
			"4. This is the data in action coming back from the BE before dispaching to reducer:",
			data
		);
		dispatch({ type: CREATE_IMAGE, payload: data }); // Action that gets dispatched. Sends response data to postsReducer
	} catch (error) {
		console.log(error);
	}
};
