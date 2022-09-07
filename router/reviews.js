const express = require('express');
const router = express.Router({ mergeParams: true });

const reviews = require('../controller/review')
const { isLoggedIn, validateReview, isReviewAuth } = require('../middleWare')

const catchError = require('../views/utils/catchError');

//--------------------------------------------------------


router.post('/', isLoggedIn, validateReview, catchError(reviews.addReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuth, catchError(reviews.deleteReview))

module.exports = router;