const User = require('../models/user')

//-----------------------------------------
module.exports.renderRegisterForm = (req, res) => {
    res.render('userAuth/register')
}
//-----------------------------------------
module.exports.newRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email });
        const newUser = await User.register(user, password)
        req.login(newUser, (err) => {
            if (err) return next(err)
            req.flash('success', 'Wellcome To Campgrounds')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }

}
//-----------------------------------------
module.exports.renderLoginForm = (req, res) => {
    res.render('userAuth/login')
}
//-----------------------------------------
module.exports.login = (req, res) => {
    req.flash('success', 'Wellcome to Yelp Camp')
    res.redirect(req.session.returnTo || '/campgrounds')
}
//-----------------------------------------
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success', 'GoodBye :)')
        res.redirect('/');
    });
}