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

// #region Sign Up function
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
const login = async (req, res, next) => {
	try {
		passport.authenticate('local', (err, user, info) => {
			if (err) return res.status(500).json(info)
			if (!user) {
				return res.status(404).json({ error: 'No user found' })
			}
			req.login(user, (error) => {
				if (error) throw error
				return res.status(200).json(req.user)
			})
			return next()
		})(req, res, next)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: 'Error logging in' })
	}
	return next()
}
// #endregion

// #region exports
export { signUp, login }
// #endregion

// #endregion
