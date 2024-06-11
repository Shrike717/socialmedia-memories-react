import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	COMMENT,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
	FETCH_POST,
} from "../constants/actionTypes";

import * as api from "../api"; // Redux 13a. Importing everything from api file

export const getPost = (postId) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPost(postId); // Fetches all posts from BE through axios call in api/index.js

		// console.log(
		// 	"This is data from post action getPost coming back from BE",
		// 	data
		// );
		dispatch({ type: FETCH_POST, payload: data }); // Action that gets dispatched
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

// Redux 13b. Creating Action Creators:
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page); // Fetches all posts from BE through axios call in api/index.js

		// console.log(
		// 	"This is data from post action getPosts coming back from BE",
		// 	data
		// );
		dispatch({ type: FETCH_ALL, payload: data }); // Action that gets dispatched
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

// Text Search 10: Creating action for getting all posts matching search
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.getPostsBySearch(searchQuery); // Axios request sending search query to BE triggert from here. Response gets saved

		// Text Search 16: Dispatching the response data to postsReducer
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post, navigate) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(post); // Axios request sending new post to BE triggert from here. Response gets saved

		// console.log(
		// 	"This is data from createPost in action coming back from BE",
		// 	data
		// );

		// navigate(`/posts/${data._id}`); // Redirect not workings

		dispatch({ type: CREATE, payload: data }); // Action that gets dispatched. Sends response data to postsReducer
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

// Edit 12:
export const updatePost = (id, post) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, post); // Axios request sending new post to BE triggert from here. Response gets saved

		// console.log(
		// 	"This is data from post action updatePosts coming back from BE",
		// 	data
		// );
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

export const commentPost = (comment, id) => async (dispatch) => {
	try {
		const { data } = await api.commentPost(comment, id); // Axios request sending comment andId to BE triggert from here. Response gets saved

		console.log(
			"This is data from commentPost action coming back from BE",
			data
		);

		dispatch({ type: COMMENT, payload: data }); // Action that gets dispatched. Sends response data to postsReducer
		return data.comments; // We also return the newest comment thats coming in
	} catch (error) {
		console.log(error);
	}
};
