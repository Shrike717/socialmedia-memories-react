import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	FETCH_BY_SEARCH,
} from "../src/constants/actionTypes";

import * as api from "../src/api"; // Redux 13a. Importing everything from api file

// Redux 13b. Creating Action Creators:
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts(); // Fetches all posts from BE through axios call in api/index.js

		dispatch({ type: FETCH_ALL, payload: data }); // Action that gets dispatched
	} catch (error) {
		console.log(error);
	}
};

// Text Search 10: Creating action for getting all posts matching search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		const {
			data: { data },
		} = await api.getPostsBySearch(searchQuery); // Axios request sending search query to BE triggert from here. Response gets saved

		// Text Search 16: Dispatching the response data to postsReducer
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post); // Axios request sending new post to BE triggert from here. Response gets saved

		dispatch({ type: CREATE, payload: data }); // Action that gets dispatched. Sends response data to postsReducer
	} catch (error) {
		console.log(error);
	}
};

// Edit 12:
export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post); // Axios request sending new post to BE triggert from here. Response gets saved

		dispatch({ type: UPDATE, payload: data }); // Action that gets dispatched. Sends response data to postsReducer
	} catch (error) {
		console.log(error);
	}
};

// Delete 4:
export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);

		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};

// Like 4:
export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id); // Axios request sending Id to BE triggert from here. Response gets saved

		dispatch({ type: LIKE, payload: data }); // Action that gets dispatched. Sends response data to postsReducer
	} catch (error) {
		console.log(error);
	}
};
