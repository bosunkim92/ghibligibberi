const Movie = require('../models/movie');

module.exports = {
  create,
  new: newReview,
  index,
  update,
  delete: deleteReview
};

function deleteReview(req, res) {
    Movie.findOne({reviews: { $elemMatch: {_id: req.params.id}}}, function (err, movie){
        const review = movie.reviews.id(req.params.id);
        if(typeof req.user === 'undefined' || review.author._id != req.user._id) return res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
        movie.reviews.pull(req.params.id);
        movie.save(function(err){
            res.redirect(`/movies/${movie._id}`);    
        })
    })
}

function update(req, res){
    Movie.findOne({reviews: { $elemMatch: {_id: req.params.id}}}, function (err, movie){
        const review = movie.reviews.id(req.params.id);
        if(typeof req.user === 'undefined' || review.author._id != req.user._id) return res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
        review.content_title = req.body.content_title;
        review.content = req.body.content;
        review.rating = req.body.rating;
        movie.save(function(err) {
            res.redirect(`/movies/${movie._id}/reviews/${review._id}`);
        })
    })
}

function index(req, res){
    Movie.findOne({reviews: { $elemMatch: {_id: req.params.id}}}, function (err, movie){
        const review = movie.reviews.id(req.params.id);
        res.render('movies/reviews', {review, movie});
    })
}

function create(req, res) {
    if(req.body.content_title == "" || req.body.content == "") return res.redirect(`/movies/${req.params.id}`);
    req.body.author = {
        _id: req.user._id,
        name: req.user.name,
        googleId: req.user.googleId
    }
    req.body.movieId = req.params.id;
    Movie.findById(req.params.id, function(err, movie) {
        movie.reviews.push(req.body);
        movie.save(function(err) {
            res.redirect(`/movies/${movie._id}`);
        });
    });
}

function newReview(req, res) {
    if(typeof req.user === 'undefined'){
        res.render('movies/error');
    } else {
        Movie.findById(req.params.id, function(err, movie){
            res.render('movies/newReview', {movie});
        })
    }
}