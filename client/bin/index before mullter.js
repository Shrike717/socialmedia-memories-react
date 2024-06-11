import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// After establishing auth flow with tokens:
// We now must set athorization header with bearer token to every request BEFORE making endpoint calls underneath
API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const fetchPosts = () => API.get("/posts");
// Text Search 11: Sending dynamically generated url with searchQuery and tags to BE
export const getPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.searchTerm || "none"}&tags=${
			searchQuery.tags || "none"
		} `
	);
export const createPost = (newPost) => API.post("/posts", newPost); // Data from formfield sent to BE
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost); // Edit 11: Dynamic url with id and updatedPost data as body sent to BE
export const deletePost = (id) => API.delete(`/posts/${id}`); // Delete 3: Dynamic url with id. Nothing else needed.
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); // Like 3: Only Id and route needed.

export const signIn = (formData) => API.post("/user/signin", formData); // Man Auth 14: Signin credentials sent to BE
export const signUp = (formData) => API.post("/user/signup", formData); // Man Auth 14: Signin credentials sent to BE
