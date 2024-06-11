import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Typography } from "@mui/material";

import { commentPost } from "../../actions/posts";

function CommentSection({ post }) {
	const user = JSON.parse(localStorage.getItem("profile")); // Needed to send  wiith a comment
	const [comments, setComments] = useState(post?.comments); // Getting the comments from this post
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();
	// const commentRef = useRef();

	const handleClickComment = async () => {
		// Setting comment with username
		const finalComment = `${user.result.name}: ${comment}`;

		const newComments = await dispatch(commentPost(finalComment, post._id));

		setComments(newComments);
		setComment("");

		// commentRef.current.scrollIntoView({
		// 	behaviour: "smoothScroll",
		// 	inline: "center",
		// });
	};
	return (
		<Box>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box
					sx={{
						height: "200px",
						overflowY: "auto", // Makes div scrollable.. Disable Apple hiding scrollbars
						marginRight: "30px",
						width: "50%",
					}}
				>
					<Typography variant="h6" gutterBottom>
						Comments:
					</Typography>
					{[...comments].reverse().map((comment, index) => {
						// console.log(comments);
						return (
							<Typography
								key={index}
								variant="subtitle2"
								gutterBottom
							>
								<strong>{comment.split(":")[0]}:</strong>
								{comment.split(":")[1]}
							</Typography>
						);
					})}
					{/* <Box ref={commentRef} /> */}
				</Box>
				{user?.result?.name && (
					<Box
						style={{ width: "50%" }}
						sx={{ display: "flex", flexDirection: "column" }}
					>
						<Typography variant="h6" gutterBottom>
							Write a Comment:
						</Typography>
						<TextField
							fullWidth
							rows={4}
							variant="outlined"
							label="Your Comment"
							multiline
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<Button
							style={{ marginTop: "10px" }}
							fullWidth
							disabled={!comment}
							variant="contained"
							onClick={handleClickComment}
						>
							Comment
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default CommentSection;
