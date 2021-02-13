const user = (user = null, action) => {
	switch (action.type) {
		case 'LOGGED_IN':
			return action.payload
		case 'LOGGED_OUT':
			return null
		default:
			return user
	}
}
export default user
