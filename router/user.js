const express = require('express');
const router = express.Router();

const passport = require('passport');

const users = require('../controller/user')
const catchError = require('../views/utils/catchError');

//---------------------------------------------------------

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchError(users.newRegister))

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout);

module.exports = router;