const mongoose = require('mongoose')
const Review = require('./review');


const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String,
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})
const campSchema = new mongoose.Schema({
    title: String,
    price: Number,
    images: [ImageSchema],
    description: String,
    location: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
})
campSchema.post('findOneAndDelete', async function (rev) {
    if (rev) {
        await Review.deleteMany({
            _id: {
                $in: rev.reviews
            }
        })
    }

})

const Campground = mongoose.model('Campground', campSchema);
module.exports = Campground;