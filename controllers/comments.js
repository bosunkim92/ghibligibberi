const Movie = require('../models/movie');

module.exports = {
    create,
    update,
    delete: deleteComment
}

function create(req, res){
    if(typeof req.user=== 'undefined'){
        res.render('movies/error');
    } else {
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
}

function update(req, res){
    const baseUrl = req.baseUrl;
    const urlArray = baseUrl.split('/');
    const movieId = urlArray[2];
    const reviewId = urlArray[4];
    const commentId = req.params.id;
    Movie
        .findOne({'reviews._id':reviewId})
        .populate('reviews')
        .exec(function(err,movie){
            const review = movie.reviews.id(reviewId);
            const comment = review.comments.id(commentId);
            if(typeof req.user === 'undefined' || comment.author._id != req.user._id) return res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
            comment.content = req.body.content;
            movie.save(function(err){
                res.redirect(`/movies/${movieId}/reviews/${reviewId}`);
            })
        });  
}


function deleteComment(req, res) {
    const baseUrl = req.baseUrl;
    const urlArray = baseUrl.split('/');
    const movieId = urlArray[2];
    const reviewId = urlArray[4];
    const commentId = req.params.id;
    Movie
        .findOne({'reviews._id':reviewId})
        .populate('reviews')
        .exec(function(err,movie){
            const review = movie.reviews.id(reviewId);
            const comment = review.comments.id(commentId);
            console.log(req.user._id + ' user id should printout');
            console.log(comment.author._id + 'comment author');
            if(typeof req.user === 'undefined' || comment.author._id != req.user._id) return res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
            review.comments.pull(commentId);
            movie.save(function(err){
                res.redirect(`/movies/${movieId}/reviews/${reviewId}`);
            })
        });  
}