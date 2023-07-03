exports.ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {

        return next()
    }
    return res.json({ login: false, msg: "user don't login" })
}

exports.ensureAuthAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next()
    }
    return res.json({ login: false, msg: "user don't login" })
}