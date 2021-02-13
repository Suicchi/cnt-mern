// #region Module

// #region imports
import passport from 'passport'
import Users from '../models/Users.js'

import { ACCOUNTSUCCESS, UNKNOWNERROR } from '../messages/en.js'
import dbHelper from '../helper/dbHelper.js'

// #endregion

/**
 * TODO: Make Login Functional [Only when everything in signup is working as needed]
 */

// #region Sign Up Function
const signUp = async (req, res) => {
	try {
		const newUser = req.body

		// Check if password and validatePass matches
		if (newUser.password !== newUser.validatePass) {
			throw new Error("Passwords don't match")
		}

		await Users.create(newUser)

		return res.status(200).json(ACCOUNTSUCCESS)
	} catch (error) {
		// console.log(error)
		const message = dbHelper.getSignUpError(error) || error.message
		return message
			? res.status(409).json(message)
			: res.status(500).json(UNKNOWNERROR)
	}
}
// #endregion

// #region Login Function
const login = (req, res, next) => {
	try {
		passport.authenticate('local', (err, user, info) => {
			if (err) throw err
			if (!user) {
				return res.status(404).json('Incorrect email or password')
			}
			req.login(user, (error) => {
				if (error) throw error
				const { _id, name, username, email } = req.user
				return res.status(200).json({ _id, name, username, email })
			})
		})(req, res, next)
	} catch (error) {
		console.log(error)
		return res.status(500).json('Error logging in')
	}
}
// #endregion

//#region logout Function

const logout = (req, res) => {
	try {
		req.logout()
		return res.json('success')
	} catch (error) {
		console.error(error)
		return res.status(500).json('logout error')
	}
}
//#endregion

// #region getUser Function

const getUser = (req, res) => {
	try {
		return res.status(200).json(req.user)
	} catch (error) {
		console.error(error)
		return res.status(404).send('User does not exist')
	}
}

// #endregion

// #region exports
export { signUp, login, getUser, logout }
// #endregion

// #endregion
