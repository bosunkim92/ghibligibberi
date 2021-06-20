const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    given_name: String,
    family_name: String,
    email: String,
    picture: String,
    googleID: String
    // favorite_movies: [movieSchema],
    // posts: [postSchema]
}, {
    timestamp: true
})

module.exports = mongoose.model('User', userSchema);