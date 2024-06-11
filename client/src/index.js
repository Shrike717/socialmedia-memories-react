import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Redux 1. Importing Redux stuff
import { createStore, applyMiddleware, compose } from "redux"; // Redux 1. Importing Redux stuff
import thunk from "redux-thunk"; // Redux 1. Importing Redux stuff
import reducers from "./reducers"; // Redux 3. Import reducers

import "./index.css";
import App from "./App";

// Redux 2. Creating store:
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* Redux 6. Wrap in Provider and pass store */}
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
