const express = require('express');
const router = express.Router();

const multer = require('multer')
const { storage } = require('../cloudinary/cloudinary')
const upload = multer({ storage })

const campgrounds = require('../controller/campground')
const { isLoggedIn, validateCampgrounds, isAuth } = require('../middleWare');

const catchError = require('../views/utils/catchError');



router.route('/')
    .get(catchError(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampgrounds, catchError(campgrounds.newCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchError(campgrounds.detailCampground))
    .put(isLoggedIn, isAuth, upload.array('image'), validateCampgrounds, catchError(campgrounds.editCampground))
    .delete(isLoggedIn, isAuth, campgrounds.deleteCampground)

router.get('/:id/edit', isLoggedIn, isAuth, catchError(campgrounds.renderEditForm))


module.exports = router;