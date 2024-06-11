import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// After establishing auth flow with tokens:
// We now must set athorization header with bearer token to every request BEFORE making endpoint calls underneath
API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}

	return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// Text Search 11: Sending dynamically generated url with searchQuery and tags to BE
export const getPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
			searchQuery.tags || 'none'
		} `
	);

export const fetchPost = (postId) => API.get(`/posts/${postId}`);

export const createPost = (newPost) =>
	API.post('/posts', newPost, {
		headers: { 'Content-Type': 'multipart/form-data' },
	}); // Data from formfield sent to BE

// // Axios requuest before multer
// export const updatePost = (id, updatedPost) =>
// 	API.patch(`/posts/${id}`, updatedPost); // Edit 11: Dynamic url with id and updatedPost data as body sent to BE

// Axios requuest with multer
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost, {
		headers: { 'Content-Type': 'multipart/form-data' },
	}); // Edit 11: Dynamic url with id and updatedPost data as body sent to BE

export const deletePost = (id) => API.delete(`/posts/${id}`); // Delete 3: Dynamic url with id. Nothing else needed.
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); // Like 3: Only Id and route needed.
export const commentPost = (comment, id) =>
	API.post(`/posts/${id}/commentPost`, { comment }); //

export const signIn = (formData) => API.post('/user/signin', formData); // Man Auth 14: Signin credentials sent to BE
export const signUp = (formData) => API.post('/user/signup', formData); // Man Auth 14: Signin credentials sent to BE

// Test images:
export const fetchImages = () => API.get('/api/images');

export const createImage = (newImage) =>
	API.post('/api/images', newImage, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
