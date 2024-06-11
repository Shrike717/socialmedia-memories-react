import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./App.css";
import { themeApp } from "./appStyles";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Image from "./components/Images/Images";

function App() {
	const user = JSON.parse(localStorage.getItem("profile")); // Needed to only see /auth when not logged in
	// console.log("This is the user at the beginning of the App component", user);

	return (
		// Google 2. and 3.: Getting clientId and wrapping App in GoogleOAuthProvider
		<GoogleOAuthProvider
			clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}
		>
			<Router>
				<ThemeProvider theme={themeApp}>
					{/* Container centers everything */}
					<Container maxWidth="xl">
						<Navbar />
						<Routes>
							<Route
								path="/auth"
								exact
								element={
									!user ? (
										<Auth />
									) : (
										<Navigate replace to="/posts" /> // Ensures that logged in user can't reach /auth manually. NOT working correctly after timeout
									)
								}
							/>
							<Route path="/image" exact element={<Image />} />
							<Route
								path="/"
								exact
								element={<Navigate replace to="/posts" />} // Redirects to /posts
							/>
							{/* But then we have to render sth for the redirect path */}
							<Route path="/posts" exact element={<Home />} />
							<Route
								path="/posts/search"
								exact
								element={<Home />}
							/>
							<Route
								path="/posts/:id"
								exact
								element={<PostDetails />}
							/>
						</Routes>
					</Container>
				</ThemeProvider>
			</Router>
		</GoogleOAuthProvider>
	);
}

export default App;
