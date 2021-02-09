/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/**
 *
 * @param {Object} errorObject
 * @returns {String} errorMessage
 */
const getSignUpError = (error) => {
	try {
		let errorMessage = ''
		const { errors } = error
		const errorTypes = Object.keys(errors)
		// * Construct the error message
		errorTypes.some((item, index) => {
			// console.log('Errors from db')
			// console.log(errors[item].kind)
			if (errors[item].kind === 'user defined') {
				errorMessage += `${errors[item].value}`
				return false
			}
			errorMessage += `${item}`
			if (index < errorTypes.length - 1) {
				errorMessage += ' & '
			} else {
				errorMessage += ' already exists'
			}
		})

		return errorMessage
	} catch (err) {
		// console.log(err)
		return null
	}
}

export default { getSignUpError }
