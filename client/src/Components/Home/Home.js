import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
	const currentUser = useSelector((state) => state.user)

	return (
		<Container
			maxWidth="xl"
			style={{
				paddingTop: '30px',
				background: '#eee',
			}}
		>
			<Container>
				<Typography variant="h3">
					{' '}
					Welcome to CNT{currentUser && `, ${currentUser.username}`}
				</Typography>
				<br />
				<Typography variant="body1">
					Welcome to this project by Switch. Here you can make todos,
					notes and share them with either your team or everyone. If
					you want you can keep it to yourself as well. Don't worry,
					we won't tell anyone. Have some free time? Head to the chat.
					Logged in users only. :)
				</Typography>
				<br />
				<br />
				{!currentUser && (
					<Typography style={{ paddingBottom: '10px' }}>
						Curious? Please <Link to="/login">Login</Link> or{' '}
						<Link to="/signup">Sign up</Link>
					</Typography>
				)}
			</Container>
		</Container>
	)
}

export default Home
