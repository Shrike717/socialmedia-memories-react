import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Google 4d: Importing navigate hook to forward to homepage
import { GoogleLogin } from "@react-oauth/google"; // Google 4a: Importing button component
import jwt_decode from "jwt-decode"; // Google 4c: // Importing jwt-decode

import {
	Box,
	Container,
	Button,
	Typography,
	Paper,
	Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { themeApp } from "../../appStyles";

import Input from "./Input";
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/auth"; // Man Auth 4b: Importing the actions

// Man Auth 1a:
const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmedPassword: "",
};

const Auth = () => {
	const [isSignup, setIsSignUp] = useState(false); // PoS what input fields are shown with conditional rendering
	const [showPassword, setShowPassword] = useState(false); // Sets if password is visible or redacted
	const [formData, setFormData] = useState(initialState); // Man Auth 1b::

	const dispatch = useDispatch(); // Google 4e: Initalising hooks
	const navigate = useNavigate();

	// const isSignup = false; // Dummy variable during construcion of component

	// Man Auth 2: Writing functon and check form is wired up to this
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);

		// Man Auth 4a:
		if (isSignup) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};

	// Man Auth 3: Retrieve the field values in PoS formData
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Toggles PoS to show or hide password
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// Toggles PoS to show either Sign In or Sign Up functionality
	const switchMode = () => {
		setIsSignUp(!isSignup);
		setShowPassword(false);
	};

	const googleSuccess = async (res) => {
		// Google 4f: Function to decode end dispatch user credentials and token
		const token = res?.credential; // ?. Does not throw error if obj does not exist it throws undefined
		const result = jwt_decode(token);
		// console.log(result);

		try {
			dispatch({ type: AUTH, data: { result, token } });

			navigate("/"); // Forwarding to homepage after login. This causes Navbar component to rerender
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container component="main" maxWidth="xm">
			<Paper
				elevation={3}
				sx={{
					marginTop: themeApp.spacing(8),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: themeApp.spacing(2),
				}}
			>
				<Avatar // Makes a round form to show icon inside
					sx={{
						margin: themeApp.spacing(1),
						backgroundColor: themeApp.palette.secondary.main,
					}}
				>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">
					{isSignup ? "Sign up" : "Sign In"}
				</Typography>
				<Box
					sx={{
						width: "100%", // Fix IE 11 issue.
						marginTop: themeApp.spacing(3),
					}}
				>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							{isSignup && (
								<>
									<Input
										name="firstName"
										label=" First Name"
										handleChange={handleChange}
										autoFocus
										half
									/>
									<Input
										name="lastName"
										label=" Last Name"
										handleChange={handleChange}
										half
									/>
								</>
							)}
							<Input
								name="email"
								label="Email Address"
								handleChange={handleChange}
								autoFocus
								type="email"
							/>
							<Input
								name="password"
								label="Password"
								handleChange={handleChange}
								type={showPassword ? "text" : "password"} // Passes PoS to Input wether to show pw or not
								handleShowPassword={handleShowPassword}
							/>
							{isSignup && (
								<Input
									name="confirmedPassword"
									label="Repeat Passsword"
									handleChange={handleChange}
									type="password"
								/>
							)}
						</Grid>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							sx={{ margin: themeApp.spacing(3, 0, 2) }}
						>
							{isSignup ? "SIGN UP" : "SIGN IN"}
						</Button>
						{!isSignup && (
							<Box
								fullwidth="true"
								sx={{
									margin: themeApp.spacing(0, 0, 2),
									display: "flex",
									justifyContent: "center",
								}}
							>
								<GoogleLogin // Google 4b: Setting button
									size="large"
									onSuccess={(credentialResponse) => {
										// console.log(credentialResponse);
										googleSuccess(credentialResponse);
									}}
									onError={() => {
										console.log("Login Failed");
									}}
								/>
							</Box>
						)}

						<Grid container justifyContent="flex-end">
							<Grid>
								{/* Toggles PoS isSignup */}
								<Button onClick={switchMode}>
									{isSignup
										? "Already have an account? Sign In"
										: "Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Paper>
		</Container>
	);
};

export default Auth;
