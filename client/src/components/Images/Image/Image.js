// import React, { useEffect } from "react";
// import {
// 	Box,
// 	Card,
// 	CardActions,
// 	CardContent,
// 	CardMedia,
// 	Button,
// 	Typography,
// } from "@mui/material";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import moment from "moment";
// import { useDispatch } from "react-redux"; // Delete 6a: importing useDispatch
// import { useLocation } from "react-router-dom";

// import { deletePost, likePost } from "../../../actions/posts"; // Delete 6c: importing deletePost action | Like 6a

// const BASE_URL = "http://localhost:5000/";

// const Image = ({ image }) => {
// 	// Edit 6: Destructure State Setter for currentId

// 	const dispatch = useDispatch(); // Delete 6b: initialising dispach hook

// 	const location = useLocation();

// 	// After Auth flow: Loggd in User now needed for conditional rendering of likes, edit and delete buttons
// 	const user = JSON.parse(localStorage.getItem("profile"));

// 	useEffect(() => {}, [location]); // Forces Post component to rerender after logout

// 	// Util component wih logic for the like functionality:
// 	const Likes = () => {
// 		if (image.likes.length > 0) {
// 			return image.likes.find(
// 				(like) => like === (user?.result?.sub || user?.result?._id)
// 			) ? (
// 				<>
// 					<ThumbUpAltIcon fontSize="small" />
// 					&nbsp;{" "}
// 					{/* // This was too long for card
//                     {post.likes.length > 2
// 						? `You and ${post.likes.length - 1} others`
// 						: `${post.likes.length} like${
// 								post.likes.length > 1 ? "s" : ""
// 						  }`} */}
// 					{/* instead i did this: */}
// 					{image.likes.length > 1
// 						? `${image.likes.length} like${"s"}`
// 						: `${image.likes.length} like`}
// 				</>
// 			) : (
// 				<>
// 					<ThumbUpAltOutlinedIcon fontSize="small" />
// 					&nbsp; {image.likes.length}{" "}
// 					{image.likes.length === 1 ? "like" : "likes"}
// 				</>
// 			);
// 		}
// 		return (
// 			<>
// 				{" "}
// 				<ThumbUpAltOutlinedIcon fontSize="small" />
// 				&nbsp; Like
// 			</>
// 		);
// 	};

// 	return (
// 		<Card
// 			sx={{
// 				display: "flex",
// 				flexDirection: "column",
// 				justifyContent: "space-between",
// 				borderRadius: "15px",
// 				height: "100%",
// 				position: "relative",
// 			}}
// 		>
// 			<CardMedia
// 				image={`${BASE_URL}${image.imageUrl}`}
// 				title={image.title}
// 				sx={{
// 					height: 0,
// 					paddingTop: "56.25%",
// 					backgroundColor: "rgba(0, 0, 0, 0.3)",
// 					backgroundBlendMode: "darken",
// 				}}
// 			/>
// 			<Box
// 				sx={{
// 					position: "absolute",
// 					top: "20px",
// 					left: "20px",
// 					color: "white",
// 				}}
// 			>
// 				<Typography variant="h6">{image.name}</Typography>
// 				<Typography variant="body2">
// 					{moment(image.createdAt).locale("en").fromNow()}
// 				</Typography>
// 			</Box>
// 			{/* Only creator sees element when logged in */}
// 			{(user?.result?.sub === image?.creator ||
// 				user?.result?._id === image?.creator) && (
// 				<Box
// 					sx={{
// 						position: "absolute",
// 						top: "25px",
// 						right: "20px",
// 						color: "white",
// 					}}
// 				>
// 					{/* Edit 8: Sending the currentId up to App component. State changes from null tto id */}
// 					<Button
// 						size="small"
// 						sx={{ color: "white" }}
// 						onClick={() => {}}
// 					>
// 						<MoreHorizIcon />
// 					</Button>
// 				</Box>
// 			)}
// 			<Box
// 				sx={{
// 					display: "flex",
// 					justifyContent: "space-between",
// 					margin: "20px 20px 8px 20px",
// 				}}
// 			>
// 				<Typography sx={{ color: "#525252" }} variant="body2">
// 					{image.tags.map((tag) => `#${tag} `)}
// 				</Typography>
// 			</Box>
// 			<CardContent sx={{ paddingTop: "0px", paddingBottom: "10px" }}>
// 				<Typography
// 					variant="body1"
// 					sx={{ fontWeight: 600, paddingBottom: "10px" }}
// 				>
// 					{image.title}
// 				</Typography>
// 				<Typography
// 					sx={{
// 						color: "#525252",
// 						height: "60px",
// 						overflow: "scroll",
// 					}}
// 					component="p"
// 					variant="body2"
// 				>
// 					{image.message}
// 				</Typography>
// 			</CardContent>
// 			<CardActions
// 				sx={{
// 					padding: "0 16px 8px 16px",
// 					display: "flex",
// 					justifyContent: "space-between",
// 				}}
// 			>
// 				<Button
// 					size="small"
// 					color="primary"
// 					disabled={!user?.result}
// 					onClick={() => dispatch(likePost(image._id))} // Like 6b: Dispatching the action on Like button
// 				>
// 					<Likes />
// 				</Button>
// 				{/* Only creator sees element when logged in */}
// 				{(user?.result?.sub === image?.creator ||
// 					user?.result?._id === image?.creator) && (
// 					<Button
// 						size="small"
// 						color="primary"
// 						onClick={() => dispatch(deletePost(image._id))} // Delete 6c: Dispatching the action on Delete button
// 					>
// 						<DeleteIcon
// 							fontSize="small"
// 							sx={{ marginRight: "5px" }}
// 						/>
// 						Delete
// 					</Button>
// 				)}
// 			</CardActions>
// 		</Card>
// 	);
// };

// export default Image;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const images = [
	{
		url: "/static/images/buttons/breakfast.jpg",
		title: "Breakfast",
		width: "40%",
	},
	{
		url: "/static/images/buttons/burgers.jpg",
		title: "Burgers",
		width: "30%",
	},
	{
		url: "/static/images/buttons/camera.jpg",
		title: "Camera",
		width: "30%",
	},
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
	position: "relative",
	height: 200,
	[theme.breakpoints.down("sm")]: {
		width: "100% !important", // Overrides inline-style
		height: 100,
	},
	"&:hover, &.Mui-focusVisible": {
		zIndex: 1,
		"& .MuiImageBackdrop-root": {
			opacity: 0.15,
		},
		"& .MuiImageMarked-root": {
			opacity: 0,
		},
		"& .MuiTypography-root": {
			border: "4px solid currentColor",
		},
	},
}));

const ImageSrc = styled("span")({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: "cover",
	backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: theme.palette.common.black,
	opacity: 0.4,
	transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
	height: 3,
	width: 18,
	backgroundColor: theme.palette.common.white,
	position: "absolute",
	bottom: -2,
	left: "calc(50% - 9px)",
	transition: theme.transitions.create("opacity"),
}));

export default function ButtonBaseDemo() {
	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				minWidth: 300,
				width: "100%",
			}}
		>
			{images.map((image) => (
				<ImageButton
					focusRipple
					key={image.title}
					style={{
						width: image.width,
					}}
				>
					<ImageSrc
						style={{ backgroundImage: `url(${image.url})` }}
					/>
					<ImageBackdrop className="MuiImageBackdrop-root" />
					<Image>
						<Typography
							component="span"
							variant="subtitle1"
							color="inherit"
							sx={{
								position: "relative",
								p: 4,
								pt: 2,
								pb: (theme) =>
									`calc(${theme.spacing(1)} + 6px)`,
							}}
						>
							{image.title}
							<ImageMarked className="MuiImageMarked-root" />
						</Typography>
					</Image>
				</ImageButton>
			))}
		</Box>
	);
}
