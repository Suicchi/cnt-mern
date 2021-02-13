// #region imports

import express from 'express'

// Import controllers
import { signUp, login, getUser, logout } from '../controllers/auth.js'
// Passport authentication checker
import { ensureAuth, ensureGuest } from '../controllers/middlewares/auth.js'

// #endregion

const router = express.Router()

router.route('/signup').post(ensureGuest, signUp)
router.route('/login').post(ensureGuest, login)
router.route('/getUser').post(getUser)
router.route('/logout').post(logout)

export default router
