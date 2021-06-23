const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        _id: String,
        name: String,
        googleId: String
    },
    reviewId: String,
    content: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema);