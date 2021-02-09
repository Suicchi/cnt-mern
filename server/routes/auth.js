import express from 'express'

// Import controllers
import { signUp, login } from '../controllers/auth.js'

const router = express.Router()

router.route('/signup').post(signUp)
router.route('/login').post(login)

export default router
