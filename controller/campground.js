const Campground = require('../models/template');
const { cloudinary } = require('../cloudinary/cloudinary')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds })
}
//-------------------------------------------------------
module.exports.renderNewForm = (req, res) => {
    res.render('campground/new')
}
//-------------------------------------------------------
module.exports.newCampground = async (req, res) => {
    const campground = new Campground(req.body.campground)
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id;
    await campground.save();
    console.log(campground)
    req.flash('success', 'Successfully created new Campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}
//-------------------------------------------------------
module.exports.detailCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground cannot found!');
        return res.redirect('/campgrounds')
    }
    res.render('campground/details', { campground })
}
//-------------------------------------------------------
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground cannot found!');
        return res.redirect('/campgrounds')
    }
    res.render('campground/edit', { campground })
}
//-------------------------------------------------------
module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    // console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.images.push(...imgs)
    await campground.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        // console.log(campground)
    }
    req.flash('success', 'Successfully Update Campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}
//-------------------------------------------------------
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully Delete Campground!');
    res.redirect('/campgrounds')
}