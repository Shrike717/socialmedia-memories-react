import React from "react";
import { Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
	"&.MuiPaper-root": {
		paddingTop: theme.spacing(1.25),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
}));

function LoginMessage() {
	return (
		<StyledPaper elevation={2} sx={{ marginBottom: "1rem" }}>
			<Typography
				variant="h6"
				textAlign="center"
				fontWeight="600"
				sx={{ marginBottom: "5px" }}
			>
				Welcome to Memories!
			</Typography>
			<Typography variant="body1" align="center">
				Please sign in to create your own memories and like other
				memories.
			</Typography>
		</StyledPaper>
	);
}

export default LoginMessage;
