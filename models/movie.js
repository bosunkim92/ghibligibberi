const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    author: {
        _id: String,
        name: String,
        googleId: String
    },
    content_title: String,
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    // comments: [commentsSchema]
  }, {
    timestamps: true
});

const movieSchema = new Schema({
    title: String,
    original_title: String,
    original_title_romanised: String,
    description: String,
    director: String,
    producer: String,
    release_date: String,
    running_time: String,
    reviews:[reviewSchema],
    url: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema);
// Create your User Model