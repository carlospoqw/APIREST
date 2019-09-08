const { Router } = require('express');
const router = Router();
const _ = require('underscore');
var movies = require('../sample.json');

//Get the array
router.get('/', (req, res) => {
    res.status(200).json(movies);
});

//Add one
router.post('/', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        var id = 1;
        _.each(movies, (movie, i) => {
            if (id == parseInt(movie.id)) {
                id += 1;
            }
        });
        id = id.toString();
        const newMovie = { id, ...req.body };
        movies.push(newMovie);
        res.status(200).json(movies);
    } else {
        res.status(400).json({ error: 'You miss something.' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    var exist = false;
    _.each(movies, (movie, i) => {
        if (movie.id == id) {
            exist = true;
            movies.splice(i, 1);
            res.status(200).json(movies);
        }
    });
    if (!exist) {
        res.status(400).json({ error: 'ID Not Found.' });
    };
    res.status(200).json(movies);
});

//Update one
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    //If Exist
    var exist = false;
    _.each(movies, (movie, i) => {
        if (movie.id == id) {
            exist = true;
        }
    });
    //Change things
    if (title && director && year && rating) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
                res.status(200).json(movies);
            }
        })
    } else {
        res.status(400).json({ error: 'You miss something.' });
    }
    if (!exist) {
        res.status(400).json({ error: 'Not Exist.' });
    };
});

module.exports = router;