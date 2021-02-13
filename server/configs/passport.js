import { Strategy as LocalStrategy } from 'passport-local'
import Users from '../models/Users.js'

export default (passport) => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
			},
			async (email, password, done) => {
				try {
					const user = await Users.findOne({ email })

					if (!user) {
						return done(null, false)
					}
					if (!user.verifyPassword(password)) {
						return done(null, false)
					}

					return done(null, user)
				} catch (error) {
					console.error(error)
					return done(error)
				}
			},
		),
	)

	passport.serializeUser((user, callback) => {
		callback(null, user.id)
	})

	passport.deserializeUser((id, callback) => {
		Users.findById(id, (err, user) => {
			const userInfo = {
				_id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
			}
			callback(err, userInfo)
		})
	})
}
