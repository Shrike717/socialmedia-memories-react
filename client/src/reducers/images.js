import { CREATE_IMAGE, FETCH_ALL_IMAGES } from "../constants/actionTypes";

const imagesReducer = (images = [], action) => {
	switch (
		action.type // i..e "CREATE"...
	) {
		case FETCH_ALL_IMAGES:
			return action.payload;
		case CREATE_IMAGE:
			return [...images, action.payload]; // Updating the state in store
		default:
			return images;
	}
};

export default imagesReducer;
