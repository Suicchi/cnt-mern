// #region imports
import axios from 'axios'
//#endregion

// #region back end link
const url = 'http://localhost:5000'
// #endregion

// #region API methods
export const signup = (newUser) => axios.post(`${url}/auth/signup`, newUser)

export const login = (credentials) =>
	axios.post(`${url}/auth/login`, credentials, { withCredentials: true })

export const getUser = () =>
	axios.post(`${url}/auth/getUser`, {}, { withCredentials: true })

export const logout = () =>
	axios.post(`${url}/auth/logout`, {}, { withCredentials: true })

// #endregion
