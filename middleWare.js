const ExpressError = require('./views/utils/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schema');
const Campground = require('./models/template');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed In First');
        return res.redirect('/login')
    }
    next();
}

module.exports.validateCampgrounds = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg)
    } else {
        next()
    }
}
module.exports.isAuth = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'Sorry!! You have not permission to edit this :(')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

//--------Review------------

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg)
    } else {
        next()
    }
}

module.exports.isReviewAuth = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Sorry!! You have not permission to Delete Review :(')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}