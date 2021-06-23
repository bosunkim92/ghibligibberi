const Movie = require('../models/movie');

module.exports = {
    create,
    //update,
    //delete: deleteComment
}

function create(req, res){
    req.body.author = {
        _id: req.user._id,
        name: req.user.name,
        googleId: req.user.googleId
    }
    req.body.reviewId = req.params.id;
    Movie.findOne({reviews: { $elemMatch: {_id: req.params.id}}}, function (err, movie){
        console.log(movie);
        const review = movie.reviews.id(req.params.id);
        review.comments.push(req.body);
        movie.save(function(err){
            res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
        })
    })
}

// function update(req, res){
//     console.log(req.params.id);
//     console.log(req.body);
//     Movie.findOne({reviews: {comments: { $elemMatch: {_id: req.params.id}}}}, function(err, movie){
//         console.log(movie);
//     })
// }

// function deleteComment(req, res) {
//     Movie.findOne({reviews: { $elemMatch: {_id: req.params.id}}}, function (err, movie){
//         const review = movie.reviews.id(req.params.id);
//         if(typeof req.user === 'undefined' || !review.author._id === req.user._id) return res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
//         movie.reviews.pull(req.params.id);
//         movie.save(function(err){
//             res.redirect(`/movies/${movie._id}`);    
//         })
//     })
// }

// function update(req, res){
//     Movie.findOne({reviews: { $elemMatch: {_id: req.params.id}}}, function (err, movie){
//         const review = movie.reviews.id(req.params.id);
//         if(typeof req.user === 'undefined' || !review.author._id === req.user._id) return res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
//         review.content_title = req.body.content_title;
//         review.content = req.body.content;
//         review.rating = req.body.rating;
//         movie.save(function(err) {
//             res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
//         })
//     })
// }