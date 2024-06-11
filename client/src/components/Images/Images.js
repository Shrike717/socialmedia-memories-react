import React, { useEffect } from "react";
// import { Grid, CircularProgress, createTheme } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"; // Importing useSelector hook

import { getImages } from "../../actions/image";
import Image from "./Image/Image";

const Images = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getImages());
	}, [dispatch]);

	const images = useSelector((state) => state.images); // Initialising hook to fetch the data from redux store
	console.log(images);

	return !images.length ? (
		<CircularProgress />
	) : (
		<Grid
			container
			alignItems="stretch"
			spacing={{ mobile: 2, tablet: 2, laptop: 3 }}
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<>
				{images.map((image) => {
					return (
						// No Grid item anymore => Grid version 2
						<Grid key={image._id} mobile={12} tablet={6}>
							<Image image={image} />
						</Grid>
					);
				})}
			</>
		</Grid>
	);
};

export default Images;
