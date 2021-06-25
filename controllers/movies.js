let request = require('request');
const Movie = require('../models/movie');

module.exports = {
    index,
    create,
    show
}

const rootURL = 'https://ghibliapi.herokuapp.com';
const filmURL = rootURL+'/films';

function index(req, res) {
    Movie.find({}, function(err, movies) {
      res.render('movies/movies', { movies });
    });
  }

function create(req, res){
    request(filmURL, function(error, response, body){
        let data = JSON.parse(body);
        if(!error && (response.statusCode >= 200 && response.statusCode < 400)){
            data.forEach(movie => {
                const movieData = new Movie(movie);
                movieData.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    };
                })
            });
        } else {
            console.log('error has occured while loading ghibli API');
        }
    })
    res.redirect('back');
}

function show(req, res){
    Movie.findById(req.params.id, function(err, movie){
        console.log(movie);
        res.render('movies/show', {movie});
    });
}