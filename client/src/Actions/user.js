// #region imports
import * as api from '../API/auth'
//#endregion

// #region Action creators

// * Signs up the user
// #region Signup the user
export const signup = async (formdata) => {
	try {
		const { data } = await api.signup(formdata)
		return data
		// console.log(data.error)
	} catch (error) {
		throw error
	}
}
//#endregion

// #endregion
