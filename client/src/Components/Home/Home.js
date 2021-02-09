import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<Container
			justifyContent="center"
			maxWidth="md"
			style={{
				display: 'flex',
				alignContent: 'center',
				paddingTop: '30px',
				background: '#eee',
			}}
		>
			<Container>
				<Typography variant="h3"> Welcome to CNT</Typography>
				<br />
				<Typography variant="p">
					Welcome to this project by Switch. Here you can make todos, notes and share them with either your
					team or everyone. If you want you can keep it to yourself as well. Don't worry, we won't tell
					anyone. Have some free time? Head to the chat. Logged in users only. :)
				</Typography>{' '}
				<br />
				<br />
				<Typography>
					Curious? Please <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>
				</Typography>
			</Container>
		</Container>
	)
}

export default Home
