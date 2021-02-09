import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const Navbar = () => {
	return (
		<div>
			<AppBar color="default" position="static">
				<Toolbar>
					<Typography variant="h6" color="secondary">
						CNT
					</Typography>{' '}
					&nbsp;&nbsp;
					<Button component={Link} to="/">
						Home
					</Button>
					<Button component={Link} to="/login">
						Login
					</Button>
					<Button component={Link} to="/signup">
						Sign up
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
