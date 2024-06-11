import React from "react";

import { CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useSelector } from "react-redux"; // Redux 15a: Importing useSelector hook

import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
	// Edit 6: Destructure State Setter for currentId
	const { posts, isLoading } = useSelector((state) => state.posts); // Redux 15b: Initialising hook to fetch the data from redux store
	// console.log(posts);

	if (!posts.length && !isLoading) return "No posts to display";

	return isLoading ? (
		<Box justifyContent="center" sx={{ display: "flex" }}>
			<CircularProgress />
		</Box>
	) : (
		<Grid
			container
			alignItems="stretch"
			spacing={{ mobile: 2, tablet: 2, laptop: 3 }}
			sx={{
				display: "flex",
				// alignItems: "center"
				alignItems: "stretch",
			}}
		>
			{posts.map((post) => {
				return (
					// No Grid item anymore => Grid version 2
					// Setting number of cards n row
					<Grid key={post._id} mobile={12} tablet={6} lg={4}>
						{/* Edit 7: Pass State Setter for currentId */}
						<Post post={post} setCurrentId={setCurrentId} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default Posts;
