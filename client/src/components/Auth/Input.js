import React from "react";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Reusable component.
function Input({
	name,
	label,
	type,
	autoFocus,
	handleChange,
	handleShowPassword,
	half,
}) {
	return (
		// Bigger than mobile: Shows 2 input fields beside each other
		<Grid mobile={12} tablet={half ? 6 : 12}>
			<TextField
				required
				variant="outlined"
				fullWidth
				name={name}
				onChange={handleChange}
				label={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={
					// Shows passwword as plain text or redacted
					name === "password"
						? {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={handleShowPassword} // Sets PoS showPassword true or false
										>
											{type === "password" ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								),
						  }
						: null
				}
			/>
		</Grid>
	);
}

export default Input;
