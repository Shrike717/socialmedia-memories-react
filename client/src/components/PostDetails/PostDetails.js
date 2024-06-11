import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import { getPost, getPostsBySearch } from "../../actions/posts";

import CommentSection from "./CommentSection";

import {
	Box,
	Paper,
	Typography,
	CircularProgress,
	Divider,
	CardMedia,
} from "@mui/material";
import { themeApp } from "../../appStyles";

const BASE_URL = "http://localhost:5000/";

function PostDetails() {
	const { post, isLoading } = useSelector((state) => state.posts);
	const posts = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	let { id } = useParams();

	// This is the id from the URL.
	// console.log("This is the id from the URL in PostDetails beginning:", id);

	console.log(
		"This is the POST arra in PostDetail component before dispatching:",
		post
	);

	console.log(
		"This is the POSTS arra in PostDetail component before dispatching:",
		posts
	);

	// Gets featured post from DB when id changes
	useEffect(() => {
		dispatch(getPost(id));
	}, [id]);

	// Gets all posts with same tags from DB when post changes. This popuulates posts.
	useEffect(() => {
		dispatch(
			getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
		);
	}, [post]);

	if (!post) return null;

	if (isLoading) {
		return (
			<Paper
				elevation={6}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: "20px",
					borderRadius: "15px",
					height: "39vh",
				}}
			>
				<CircularProgress size="7em" />
			</Paper>
		);
	}

	// Filters out the post that is featured. Should not be in recommendedPosts. Keeps all other posts.
	const recommendedPosts = posts.posts
		.filter(({ _id }) => _id !== post._id)
		// .sort((a, b) => 0.5 - Math.random()) // As we show only 3 recPosts: Quick and dirty shuffle to not show always the same posts:
		.slice(0, 3); // My idea: 3 is the number of recommended posts. Otherwise a slider wouuld be needed

	// Opens selected post from the recommendedPosts array.
	const openPost = (_id) => navigate(`/posts/${_id}`);

	return (
		<>
			<Paper
				elevation={6}
				sx={{ padding: "0.8rem", borderRadius: "20px" }}
			>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						borderRadius: "20px",
						[themeApp.breakpoints.down("sm")]: {
							flexWrap: "wrap",
							flexDirection: "column",
						},
					}}
				>
					<Box
						sx={{
							borderRadius: "20px",
							margin: "1rem 1rem 1rem 1rem",
							flex: 1,
						}}
					>
						<Typography
							variant="h5"
							component="h2"
							sx={{ marginBottom: "1rem", fontSize: "1.7rem" }}
						>
							<strong>{post.title}</strong>
						</Typography>
						<Typography
							gutterBottom
							variant="body1"
							color="textSecondary"
							component="h2"
							sx={{ marginBottom: "1rem" }}
						>
							{post.tags.map((tag) => `#${tag} `)}
						</Typography>
						<Typography
							gutterBottom
							variant="body1"
							component="p"
							sx={{ marginBottom: "1rem" }}
						>
							{post.message}
						</Typography>
						<Typography variant="body1" sx={{}}>
							Created by: {post.name}
						</Typography>
						<Typography variant="body1">
							{moment(post.createdAt).fromNow()}
						</Typography>
						{/* <Divider style={{ margin: "20px 0" }} /> */}
						{/* <Typography variant="body1">
							<strong>Realtime Chat - coming soon!</strong>
						</Typography> */}
						<Divider style={{ margin: "20px 0" }} />
						<CommentSection post={post} />
						<Divider style={{ margin: "20px 0" }} />
					</Box>
					<CardMedia
						component="img"
						image={`${BASE_URL}${post.imageUrl}`}
						title={post.title}
						sx={{
							borderRadius: "2rem",
							padding: "20px",
							objectFit: "cover",
							width: "50%",
							maxHeight: "500px",
							marginLeft: "20px",
							[themeApp.breakpoints.down("sm")]: {
								marginLeft: 0,
							},
						}}
					></CardMedia>
				</Box>
				{recommendedPosts.length > 0 && (
					<Box
						sx={{
							borderRadius: "20px",
							margin: "1rem 1rem 1rem 1rem",
							flex: 1,
						}}
					>
						<Typography variant="h6" gutterBottom>
							You might also like:
						</Typography>
						<Divider />
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								[themeApp.breakpoints.down("sm")]: {
									flexDirection: "column",
								},
							}}
						>
							{recommendedPosts.map(
								({
									title,
									message,
									name,
									likes,
									imageUrl,
									_id,
								}) => {
									return (
										<Box
											key={_id}
											style={{
												margin: "20px",
												cursor: "pointer",
											}}
											onClick={() => openPost(_id)}
										>
											<Typography
												variant="h6"
												gutterBottom
											>
												{title}
											</Typography>
											<Typography
												variant="subtitle2"
												gutterBottom
											>
												{name}
											</Typography>
											<Typography
												variant="subtitle2"
												gutterBottom
												sx={{
													height: "60px",
													overflow: "scroll",
												}}
											>
												{message}
											</Typography>
											<Typography
												variant="subtitle1"
												gutterBottom
											>
												Likes: &nbsp;
												{likes.length}
											</Typography>
											<CardMedia
												sx={{
													width: "100%",
													height: "50%",
												}}
												component="img"
												image={`${BASE_URL}${imageUrl}`}
												width="200px"
											></CardMedia>
										</Box>
									);
								}
							)}
						</Box>
					</Box>
				)}
			</Paper>
		</>
	);
}

export default PostDetails;
