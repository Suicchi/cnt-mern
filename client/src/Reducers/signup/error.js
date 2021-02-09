const error = (error = null, action) => {
	switch (action.type) {
		case 'Error':
			return action.payload
		default:
			return error
	}
}
export default error
