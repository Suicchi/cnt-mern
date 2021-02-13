function ensureGuest(req, res, next) {
	if (req.isAuthenticated()) {
		return res.json(req.user)
	}
	return next()
}

function ensureAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	return res.json(null)
}

export { ensureAuth, ensureGuest }
