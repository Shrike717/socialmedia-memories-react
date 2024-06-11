import { AUTH, LOGOUT } from "../constants/actionTypes";

// Google 5: Reducer
const authReducer = (state = { authData: null }, action) => {
	// There has to be an initial state
	switch (action.type) {
		case AUTH:
			// console.log(action?.data);
			localStorage.setItem(
				"profile",
				JSON.stringify({ ...action?.data })
			);
			return { ...state, authData: action?.data };
		case LOGOUT: // Google 8: Clearing and resetting authData
			localStorage.clear();

			return { ...state, authData: null };
		default:
			return state;
	}
};

export default authReducer;
