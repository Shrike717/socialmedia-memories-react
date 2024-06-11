import { AUTH } from "../constants/actionTypes";

import * as api from "../api"; // Man Auth 5a: Importing API

// Man Auth 5b: Writing actions with async thunks. Gets the data we dispatched wth the action in Auth.js
export const signin = (formData, navigate) => async (dispatch) => {
	try {
		// Sign in the user....
		const { data } = await api.signIn(formData); // Man Auth 15a: Calling API endpoint and recieving data from BE

		dispatch({ type: AUTH, data }); // Man Auth 15b: Then dispatching action to authReducer

		navigate("/");
	} catch (error) {
		console.log(error);
	}
};

export const signup = (formData, navigate) => async (dispatch) => {
	try {
		// Sign up the user....
		const { data } = await api.signUp(formData); // Man Auth 15a: Calling API endpoint and recieving data from BE

		dispatch({ type: AUTH, data }); // Man Auth 15b: Then dispatching action to authReducer

		navigate("/");
	} catch (error) {
		console.log(error);
	}
};
