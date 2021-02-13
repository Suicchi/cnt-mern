/**
 * todo: Nothing
 */

// #region imports
import {
	Paper,
	Typography,
	TextField,
	Button,
	Container,
	InputAdornment,
	IconButton,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Swal from 'sweetalert2'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { signup } from '../../Actions/user'
import { Redirect } from 'react-router-dom'

// #endregion

// #region Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
	},
	form: {
		marginTop: theme.spacing(3),
	},
	TextField: {
		marginTop: 'auto',
		marginBottom: theme.spacing(2),
	},
}))
// #endregion

// #region Component Signup
const Signup = () => {
	// Check if someone is logged in
	const currentUser = useSelector((state) => state.user)
	// #region Methods and States
	const styles = useStyles()
	// The error state
	const [error, setError] = useState()

	// Redirect on successful signup
	const [redirectToLogin, setRedirectToLogin] = useState(false)

	// Show password
	const [showPassword, setShowPassword] = useState(false)
	const [showValidatePass, setShowValidatePass] = useState(false)

	// The user state
	const [user, setUser] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		validatePass: '',
	})

	// This handles what happens when Textfield in the form changes
	const handleChange = (key) => (event) => {
		setUser({ ...user, [key]: event.target.value })
	}

	// Clears all the states
	const clear = () => {
		setUser({
			name: '',
			username: '',
			email: '',
			password: '',
			validatePass: '',
		})
		setError()
	}

	// Handles what happens when form is submitted
	const handleSubmit = (event) => {
		event.preventDefault()

		// Call signup action
		signup(user)
			.then((data) => {
				Swal.fire({
					title: data,
					icon: 'success',
					showCancelButton: true,
					focusConfirm: true,
					cancelButtonText: 'close',
					confirmButtonText: 'Login',
				}).then((result) => {
					if (result.isConfirmed) {
						setRedirectToLogin(true)
					}
				})
				clear()
			})
			.catch((error) => {
				setError(error.response.data)
				console.error(error.response.data)
			})
	}
	//#endregion

	// #region JSX
	return currentUser ? (
		<Redirect to="/" />
	) : redirectToLogin ? (
		<Redirect to="/login" />
	) : (
		<Container maxWidth="xs">
			<Paper className={styles.paper} elevation={5}>
				<Typography variant="h6"> Sign Up</Typography>
				<form className={styles.form} onSubmit={handleSubmit}>
					<TextField
						className={styles.TextField}
						name="name"
						variant="outlined"
						label="Name"
						required
						onChange={handleChange('name')}
						value={user.name}
						autoFocus
						fullWidth
					/>
					<TextField
						className={styles.TextField}
						name="username"
						variant="outlined"
						label="Username"
						required
						onChange={handleChange('username')}
						value={user.username}
						fullWidth
					/>
					<TextField
						className={styles.TextField}
						name="email"
						variant="outlined"
						label="Email"
						type="email"
						required
						onChange={handleChange('email')}
						value={user.email}
						fullWidth
					/>
					<TextField
						className={styles.TextField}
						name="password"
						variant="outlined"
						label="Password"
						type={showPassword ? 'text' : 'password'}
						required
						onChange={handleChange('password')}
						value={user.password}
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
					<TextField
						className={styles.TextField}
						name="validatePass"
						variant="outlined"
						label="Validate Password"
						type={showValidatePass ? 'text' : 'password'}
						required
						onChange={handleChange('validatePass')}
						value={user.validatePass}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() =>
											setShowValidatePass(
												!showValidatePass
											)
										}
										edge="end"
									>
										{showValidatePass ? (
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
						Sign Up
					</Button>
					<Button
						className={styles.TextField}
						variant="contained"
						fullWidth
						onClick={clear}
					>
						Clear
					</Button>
				</form>
			</Paper>
		</Container>
	)
	// #endregion
}

export default Signup

// #endregion
