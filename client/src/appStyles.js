import { createTheme } from "@mui/material/styles";

export const themeApp = createTheme({
	breakpoints: {
		values: {
			desktop: 1280,
			laptop: 1024,
			tablet: 870,
			mobile: 0,
			xs: 0,
			xm: 500,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});
