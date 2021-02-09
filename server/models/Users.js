// #region Imports
/* eslint-disable func-names */
import mongoose from 'mongoose'
import crypto from 'crypto'
import uniqueValidator from 'mongoose-unique-validator'
// #endregion

// #region Schema Definition
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: /.+@.+\..+/,
		trim: true,
	},
	password: {
		type: String,
	},
	salt: String,
	provider: {
		type: String,
		default: 'local',
		enum: ['local'],
	},
	created: {
		type: Date,
		default: Date.now,
	},
	updated: {
		type: Date,
	},
})
// #endregion

// #region Schema Methods and pre
UserSchema.methods.verifyPassword = function (password) {
	const hashedPass = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('base64')

	return this.password === hashedPass
}
UserSchema.methods.hashPassword = function (password) {
	this.password = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('base64')
}

UserSchema.pre('validate', function (next) {
	// * Check if password Length is at least 8 characters
	if (this.password.length < 8) {
		const validationError = this.invalidate(
			'password',
			'Password must be 8 characters',
			'Password must be 8 characters',
		)
		next(validationError)
	}
	next()
})

UserSchema.pre('save', function (next) {
	// * Create salt and hash password
	this.salt = crypto.randomBytes(16).toString('base64')
	this.hashPassword(this.password)
	next()
})

// * different type of unique key validator cause
// ! MongoDB's default one sucks
UserSchema.plugin(uniqueValidator)

// #endregion

export default mongoose.model('User', UserSchema)
