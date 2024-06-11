import React, { useState, useEffect } from 'react'; // Redux 9. Import useEffect | Edit 3. impprt useState
import { useNavigate, useLocation } from 'react-router-dom'; // Text Search 1: Navigate for Renavigate to certain pages; Location to know which site we're on
import { useDispatch } from 'react-redux'; // Redux 7. Import this hook
import { useSelector } from 'react-redux'; // Test reload after creating pos

import {
	Container,
	Grow,
	Paper,
	AppBar,
	TextField,
	Button,
} from '@mui/material';

import { themeApp } from '../../appStyles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { MuiChipsInput } from 'mui-chips-input'; // Pkg to use a Chip Input Component. -> Not provided by Mui5

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';

import { getPostsBySearch } from '../../actions/posts'; // Redux 11. Import action file to dispatch. Text Search 12a: Import getPostsBySearch
import LoginMessage from '../Auth/LoginMessage';

// Text Search 2: Util function to know on which page we are currrently on and which searchTerm are we looking for.
// This allows us to use it as a hook
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Home() {
	const [currentId, setCurrentId] = useState(null); // Edit 4. State Keeping track of currentId for post editing. It begins here with null
	const [searchTerm, setSearchTerm] = useState(''); // Text Search 7: State Keeping track of searchTerm
	const [tags, setTags] = useState([]); // State Keeping track of tags
	// console.log(searchTerm);
	console.log(tags);

	const dispatch = useDispatch(); // Redux 8. Create hook
	const query = useQuery(); // Text Search 3a: Initialising as hook
	const navigate = useNavigate(); // Text Search 3b: Initialising as hook
	const page = query.get('page') || 1; // Text Search 4: Reads URL and checks for page param. If yes populates variable.
	const searchQuery = query.get('searchQuery') || ''; // Text Search 5: Reads URL and checks for search query. If yes populates variable.
	// console.log("This is searchQuery  from Home component", searchQuery);

	const user = JSON.parse(localStorage.getItem('profile'));

	const posts = useSelector((state) => state.posts.posts); // Test reload after creating post

	// Text Search 9: Dispatches the search with searchTerm or tags when click on button or press enter
	const searchPost = () => {
		if (!searchTerm && tags.length === 0) {
			navigate('/posts');
		} else if (searchTerm.trim() || tags) {
			// Text Search 12b: dispatch -> fetch search post
			dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));
			// Text Search 15 (coming from BE 14): We route to URL including searchQuery and tags in FE
			navigate(
				`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${
					tags.join(',') || 'none'
				}`
			);
		}
	};

	// Text Search 8: Search posts functionality
	// This navigates to the search page with the search term in the URL
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			searchPost(); // Triggers the search
		}
	};

	// Sets tag in PoS tags array
	const handleAddChip = (tag, tagIndex) => {
		setTags([...tags, tag]);
	};
	// Removes tag from PoS tags array
	const handleDeleteChip = (tagToDelete, tagIndex) => {
		setTags(tags.filter((tag) => tag !== tagToDelete));
	};

	//This was used before finishing Pagination logic
	useEffect(() => {
		// Redux 10. Setup useEffect
		// dispatch(getPosts()); // Redux 12. Evoke action in dispatch (Befor pagination)
	}, [dispatch, currentId, posts]);

	return (
		<Grow in>
			<Container
				maxWidth='xl'
				sx={{
					'& .MuiGrid2-container': {
						[themeApp.breakpoints.down('tablet')]: {
							flexDirection: 'column-reverse',
						},
					},
				}}
			>
				<Grid
					container
					// flexDirection="column-reverse"
					justifyContent='space-between'
					alignItems='stretch'
					spacing={{ mobile: 2, tablet: 2, laptop: 3 }}
				>
					{/* No more Grid items => Grid 2 */}
					<Grid mobile={12} sm={12} md={9}>
						{/* Edit 5. Give State Setter for currentId as prop */}
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid mobile={12} sm={12} md={3}>
						{!user?.result?.name ? (
							<>
								<LoginMessage />
								{/* Text Search 6: Building the Input fields for text search and tag search*/}
								<AppBar
									position='static'
									color='inherit'
									sx={{
										borderRadius: 1,
										marginBottom: '1rem',
										display: 'flex',
										padding: '16px 16px 10px 16px',
									}}
								>
									<TextField
										name='search'
										variant='outlined'
										label='Search Memories'
										fullWidth
										onKeyPress={handleKeyPress}
										value={searchTerm}
										onChange={(e) => {
											setSearchTerm(e.target.value);
										}}
										sx={{ marginBottom: '10px' }}
									/>
									<MuiChipsInput
										value={tags}
										onAddChip={handleAddChip}
										onDeleteChip={handleDeleteChip}
										label='Search Tags'
										sx={{ marginBottom: '10px' }}
									/>
									<Button
										variant='contained'
										color='primary'
										size='large'
										type='submit'
										fullWidth
										sx={{ marginBottom: '10px' }}
										onClick={searchPost}
									>
										Search
									</Button>
								</AppBar>
								{!searchQuery && !tags.length && (
									<Paper
										elevation={6}
										sx={{
											borderRadius: 1,
											marginTop: '1rem',
											padding: '16px',
										}}
									>
										<Pagination page={page} />
									</Paper>
								)}
							</>
						) : (
							<>
								<AppBar
									position='static'
									color='inherit'
									sx={{
										borderRadius: 1,
										marginBottom: '1rem',
										display: 'flex',
										padding: '16px 16px 10px 16px',
									}}
								>
									<TextField
										name='search'
										variant='outlined'
										label='Search Memories'
										fullWidth
										onKeyPress={handleKeyPress}
										value={searchTerm}
										onChange={(e) => {
											setSearchTerm(e.target.value);
										}}
										sx={{ marginBottom: '10px' }}
									/>
									<MuiChipsInput
										value={tags}
										onAddChip={handleAddChip}
										onDeleteChip={handleDeleteChip}
										label='Search Tags'
										sx={{ marginBottom: '10px' }}
									/>
									<Button
										variant='contained'
										color='primary'
										size='large'
										type='submit'
										fullWidth
										sx={{ marginBottom: '10px' }}
										onClick={searchPost}
									>
										Search
									</Button>
								</AppBar>
								{/* Edit 5. Give State Setter for currentId and currentId as prop */}
								<Form
									currentId={currentId}
									setCurrentId={setCurrentId}
								/>
								{!searchQuery && !tags.length && (
									<Paper
										elevation={6}
										sx={{
											borderRadius: 1,
											marginTop: '1rem',
											padding: '16px',
										}}
									>
										<Pagination page={page} />
									</Paper>
								)}
							</>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
}

export default Home;
