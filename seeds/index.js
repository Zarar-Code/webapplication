const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/template');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)}${sample(places)}`,
            author: '630db239048b4f9e1aed2ea3',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia repellendus voluptatibus architecto est! At aperiam labore sapiente animi, eum illo et a deleniti provident. Aut voluptatem eaque dolorum tempora voluptates.',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dozvqwhno/image/upload/v1662193505/Yelp%20Camp/jeddpk4e5n42ev3whwpr.jpg',
                    filename: 'Yelp Camp/jeddpk4e5n42ev3whwpr',
                },
                {
                    url: 'https://res.cloudinary.com/dozvqwhno/image/upload/v1662193502/Yelp%20Camp/p3yuqbwlmvlznzrulure.jpg',
                    filename: 'Yelp Camp/p3yuqbwlmvlznzrulure',
                }
            ]

        })
        await camp.save();
    }
}
seedDb().then(() => {
    mongoose.connection.close();
})
