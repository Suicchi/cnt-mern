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

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser((id, done) => {
		Users.findById(id, (err, user) => {
			const userInfo = {
				name: user.name,
				username: user.username,
				email: user.email,
			}
			done(err, userInfo)
		})
	})
}
