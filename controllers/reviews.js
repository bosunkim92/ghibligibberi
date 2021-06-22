const Movie = require('../models/movie');

module.exports = {
  create,
  new: newReview
};

function create(req, res) {
    req.body.author = {
        _id: req.user._id,
        name: req.user.name,
        googleId: req.user.googleId
    }
    
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