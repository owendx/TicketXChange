// check if user is logged in and authenticated, if not, redirect them to the login page
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = {
    isLoggedIn
}