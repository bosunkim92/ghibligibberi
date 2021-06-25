const Movie = require('../models/movie');

module.exports = {
    index,
}

function index(req, res) {
  const user = req.user;
  Movie.find({}, function(err, movies) {
      res.render('movies/myActivities', { movies, user });
    });
  }