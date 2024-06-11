import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

function useQuery() {
	// Used to get search query from URL
	return new URLSearchParams(useLocation().search);
}

function Paginate({ page }) {
	const { totalNumberOfPages } = useSelector((state) => state.posts);
	// console.log(
	// 	"This is total pages in Pagination Component",
	// 	totalNumberOfPages
	// );

	const dispatch = useDispatch();
	const query = useQuery(); // Initialising as hook

	const searchQuery = query.get("searchQuery") || ""; // Needed in this component To prevent reload of pagination page after search was fired
	// console.log("This is search query from pagination component", searchQuery);

	useEffect(() => {
		if (!searchQuery && page > 0) {
			// To prevent reload of pagination page after search was fired
			dispatch(getPosts(page));
		}
	}, [page]);

	return (
		<Pagination
			sx={{
				ul: { justifyContent: "space-around" },
			}}
			size="small"
			showFirstButton
			showLastButton
			// hideNextButton
			// hidePrevButton
			count={totalNumberOfPages} // Number of pages. Now dynamic
			page={Number(page) || 1} // Current page. Now dynamic
			variant="outlined"
			color="primary"
			renderItem={(item) => {
				// return ( // Try to solve firing next button on last page. Not working
				// 	<Link to={`/posts?page=${item.page}`}>
				// 		<PaginationItem {...item} />
				// 	</Link>
				// );

				if (item.page <= totalNumberOfPages) {
					// Hides next button on last page. Not optimal but better than nothing
					return (
						<Link to={`/posts?page=${item.page}`}>
							<PaginationItem {...item} />
						</Link>
					);
				}
			}}
		/>
	);
}

export default Paginate;

// function Paginate({page}) {
//     const dispatch = useDispatch();
//     const query = useQuery(); // Initialising as hook

//     const searchQuery = query.get("searchQuery") || "";

//      const { totalNumberOfPages } = useSelector((state) => state.posts);

//      useEffect(() => {
// 		if (!searchQuery) {
// 			// To prevent reload of pagination page after search was fired
// 			dispatch(getPosts(page));
// 		}
// 	}, [page]);

//     const handleChange = (event, value) => {
//         <Link to={`/posts?page=${item.page}`}>
//         <PaginationItem {...item} />
//     </Link>
//     };

//     return (

//         <Pagination count={totalNumberOfPages} page={Number(page) || 1} onChange={handleChange} />

//     );
// }

// export default Paginate;

// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// export default function PaginationControlled() {
//   const [page, setPage] = React.useState(1);
//   const handleChange = (event, value) => {
//     setPage(value);
//   };

//   return (
//     <Stack spacing={2}>
//       <Typography>Page: {page}</Typography>
//       <Pagination count={10} page={page} onChange={handleChange} />
//     </Stack>
//   );
// }
