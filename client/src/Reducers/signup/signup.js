const signup = (formData = {}, action) => {
	switch (action.type) {
		case 'Success':
			return action.payload
		default:
			return formData
	}
}
export default signup
