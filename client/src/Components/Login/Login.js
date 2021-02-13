/**
 * todo: When login button is clicked
 * todo: Make request to the server
 * todo: Make user login and change the navbar
 */

//#region Imports
import {
	Typography,
	TextField,
	Button,
	Paper,
	Container,
	makeStyles,
	InputAdornment,
	IconButton,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../Actions/user'

//#endregion

// #region Styles
const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	TextField: {
		marginBottom: theme.spacing(2),
	},
}))
//#endregion

// #region Component Login
const Login = () => {
	const styles = useStyles()
	const history = useHistory()

	const currentUser = useSelector((state) => state.user)

	const dispatch = useDispatch()

	const [error, setError] = useState()

	// Stores our login credentials
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})

	// Should password be shown or not
	const [showPassword, setShowPassword] = useState(false)

	// tracks changes in TextField
	const handleChange = (key) => (event) => {
		setCredentials({ ...credentials, [key]: event.target.value })
	}

	// When you need to clear everything
	const clear = () => {
		setCredentials({
			email: '',
			password: '',
		})
		setError()
	}

	// * When login button is clicked
	const handleSubmit = (event) => {
		event.preventDefault()

		// Dispatch login with credentials
		login(credentials)
			.then((data) => {
				console.log(data)
				dispatch({ type: 'LOGGED_IN', payload: data })
				Swal.fire({
					title: 'Logged in',
					icon: 'success',
					focusConfirm: true,
				}).then(() => {
					history.push('/')
				})
				clear()
			})
			.catch((error) => {
				setError(error.response.data)
			})
	}

	// #region JSX
	return currentUser ? (
		<Redirect to="/" />
	) : (
		<Container maxWidth="xs">
			<Paper className={styles.paper} elevation={5}>
				<Typography variant="h6">Login</Typography>
				<form className={styles.form} onSubmit={handleSubmit}>
					<TextField
						autoFocus
						name="email"
						variant="outlined"
						label="Email"
						type="email"
						required
						fullWidth
						onChange={handleChange('email')}
						value={credentials.email}
						className={styles.TextField}
					/>
					<TextField
						className={styles.TextField}
						name="password"
						variant="outlined"
						label="Password"
						type={showPassword ? 'text' : 'password'}
						required
						onChange={handleChange('password')}
						value={credentials.password}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() =>
											setShowPassword(!showPassword)
										}
										edge="end"
									>
										{showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{error && (
						<Typography
							align="center"
							variant="body1"
							color="error"
							style={{ marginBottom: '5px' }}
						>
							{error}
						</Typography>
					)}
					<Button
						className={styles.TextField}
						color="primary"
						variant="contained"
						fullWidth
						type="submit"
					>
						Login
					</Button>
					<Button variant="contained" fullWidth onClick={clear}>
						clear
					</Button>
				</form>
			</Paper>
		</Container>
	)
	// #endregion
}

export default Login
// #endregion
