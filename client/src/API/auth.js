// #region imports
import axios from 'axios'
//#endregion

// #region back end link
const url = 'http://localhost:5000'
// #endregion

// #region API methods
export const signup = (newUser) => axios.post(`${url}/auth/signup`, newUser)
export const login = (credentials) =>
	axios.post(`${url}/auth/signup`, credentials)

// #endregion
