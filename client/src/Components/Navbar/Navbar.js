/**
 * todo: Check if we have an user by posting to server
 * todo: Show the logout button and hide the login and signup
 */

// #region imports

import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux actions
import { logout } from '../../Actions/user'

// #endregion

// #region Component Navbar

const Navbar = () => {
	const currentUser = useSelector((state) => state.user)

	const dispatch = useDispatch()

	const history = useHistory()

	const handleLogout = () => {
		dispatch(logout())
		history.push('/')
	}

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
					{currentUser ? (
						<Button onClick={handleLogout}>Logout</Button>
					) : (
						<>
							<Button component={Link} to="/login">
								Login
							</Button>
							<Button component={Link} to="/signup">
								Sign up
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar

// #endregion
