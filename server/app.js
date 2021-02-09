// #region Imports
// Imports
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import cookieParser from 'cookie-parser'

// Import from local modules here
import connectDB from './configs/db.js'

// Import Route files here
import authRoute from './routes/auth.js'

// passport config
import passportLocal from './configs/passport.js'

// #endregion

// #region Environment config from .env file
dotenv.config({ path: './configs/configs.env' })
// #endregion

// #region Database
const MongoStore = connectMongo(session)
connectDB()
// #endregion

// #region Middlewares
// Constants to be declared here
const app = express()
const PORT = process.env.PORT || 5000

// Middlewares will go here
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Enable cross origin resource sharing
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
)

// Session middleware
app.use(
	session({
		secret: process.env.SESSIONSECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: parseInt(process.env.SESSIONAGE, 10),
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
	}),
)

// initialize passport
app.use(passport.initialize())
app.use(passport.session())
passportLocal(passport)

// Cookie parser
app.use(cookieParser(process.env.SESSIONSECRET))

// #endregion

// #region Development
// If the environment is development then use Morgan logger
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}
// #endregion

// #region Production
// If the environment is production then set static files
if (process.env.NODE_ENV === 'production') {
	app.use('*', express.static(path.join(process.cwd(), '../client/build')))
}
// #endregion

// #region Routes
// Routes will be defined here
app.use('/auth', authRoute)

// Other routes

// #endregion

// #region Start Server
// App will start here
app.listen(PORT, console.info('Server running on port:', PORT))
// #endregion
