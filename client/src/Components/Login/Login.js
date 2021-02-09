import {
	Typography,
	TextField,
	Button,
	Paper,
	Container,
	makeStyles,
} from '@material-ui/core'
import React from 'react'
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
const Login = () => {
	const styles = useStyles()

	return (
		<Container maxWidth="xs">
			<Paper className={styles.paper} elevation={5}>
				<Typography variant="h6">Login</Typography>
				<form className={styles.form}>
					<TextField
						autoFocus
						name="email"
						variant="outlined"
						label="Email"
						type="email"
						required
						fullWidth
						className={styles.TextField}
					/>
					<TextField
						className={styles.TextField}
						name="password"
						variant="outlined"
						label="Password"
						type="password"
						required
						fullWidth
					/>
					<Button
						className={styles.TextField}
						color="primary"
						variant="contained"
						fullWidth
					>
						Login
					</Button>
					<Button variant="contained" fullWidth>
						clear
					</Button>
				</form>
			</Paper>
		</Container>
	)
}

export default Login
