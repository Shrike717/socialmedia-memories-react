import React, { useState, useEffect } from "react"; // Google 7a: Import hooks
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Google 7a: Import hooks
import decode from "jwt-decode"; // Needed to check JWT Token expiry date
import {
	Box,
	AppBar,
	Typography,
	Toolbar,
	Avatar,
	Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { LOGOUT } from "../../constants/actionTypes";
import memories from "../../assets/images/photography-icon-png-2392.png";
import { themeApp } from "../../appStyles";

function Navbar() {
	const dispatch = useDispatch(); // Google 7b: Initialise hooks
	const navigate = useNavigate();
	const location = useLocation();

	// Google 7c: Setting user in PoS
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);

	// console.log(user);
	// const user = null; // Dummy variable used during construction JSX

	const handleLogout = () => {
		// Google 7d: Writing logout funcion
		dispatch({ type: LOGOUT });

		navigate("/"); // This changes location state and triggers Navbar rerender

		setUser(null);
	};

	useEffect(() => {
		// Google 7f: Prep for custom Signup process.. Setting user again from localStorage.
		const token = user?.token;

		// Loggic for checking oken expiry date
		if (token) {
			// decoding token to check expiry date
			const decodedToken = decode(token);

			// Checks the two dates in milliseconds and logs out when expired
			if (decodedToken?.exp * 1000 < new Date().getTime()) handleLogout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]); // Triggers rerender to show user in navbar

	return (
		<AppBar
			position="static"
			color="inherit"
			sx={{
				borderRadius: 15,
				margin: "30px 0",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "10px 50px",
				[themeApp.breakpoints.down("sm")]: {
					flexDirection: "column",
				},
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Link to={"/"}>
					<Typography
						variant="h3"
						align="center"
						sx={{
							color: "#1665C0",
							marginRight: "15px",
						}}
					>
						Memories
					</Typography>
				</Link>
				<Link to={"/"}>
					<img src={memories} alt="memories" height="50" />
				</Link>
			</Box>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					width: "400px",
					[themeApp.breakpoints.down("tablet")]: {
						width: "auto",
						justifyContent: "center",
					},
				}}
			>
				{user ? (
					<Box
						sx={{
							display: "flex",
							gap: "0.5em",
							justifyContent: "flex-end",
							width: "400px",
							alignItems: "center",
							[themeApp.breakpoints.down("mobile")]: {
								width: "auto",
								marginTop: 20,
								justifyContent: "flex-start",
							},
						}}
					>
						<Avatar
							sx={{
								color: themeApp.palette.getContrastText(
									deepPurple[500]
								),
								backgroundColor: deepPurple[500],
							}}
							alt={user.result.name}
							// src={user.picture}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography
							variant="h6"
							sx={{
								display: "flex",
								alignItems: "center",
								textAlign: "center",
							}}
						>
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							color="secondary"
							onClick={handleLogout} // Google 7e: Wireing up logot function
							sx={{ marginLeft: "10px" }}
						>
							LOGOUT
						</Button>
					</Box>
				) : (
					<Link to="/auth">
						<Button
							variant="contained"
							color="primary"
							sx={{ marginLeft: "20px" }}
						>
							SIGN IN
						</Button>
					</Link>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
