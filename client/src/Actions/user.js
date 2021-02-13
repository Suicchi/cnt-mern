/**
 * todo: Make login Action work
 */

// #region imports
import * as api from '../API/auth'
//#endregion

// #region Action creators

// #region Action: Signup the user
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

// #region Action: Login the userSelect:

export const login = async (credentials) => {
	try {
		const { data } = await api.login(credentials)
		return data
		// dispatch({ type: 'LOGGED_IN', payload: data })
	} catch (error) {
		throw error
	}
}

// #endregion

// #region Action: Fetches the user from server if logged in

export const getUser = () => async (dispatch) => {
	try {
		const { data } = await api.getUser()
		if (data) {
			dispatch({ type: 'LOGGED_IN', payload: data })
		}
	} catch (error) {
		console.log(error)
	}
}

// #endregion

export const logout = () => async (dispatch) => {
	try {
		const { data } = await api.logout()
		if (data === 'success') {
			dispatch({ type: 'LOGGED_OUT', payload: null })
		}
	} catch (error) {
		console.error(error)
	}
}

// #endregion
