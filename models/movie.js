const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    original_title: String,
    original_title_romanised: String,
    description: String,
    director: String,
    producer: String,
    release_date: String,
    running_time: String,
    url: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema);
// Create your User Model