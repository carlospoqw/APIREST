const { Router } = require('express');
const router = Router();
const _ = require('underscore');
var movies = require('../sample.json');

//Get the array
router.get('/', (req, res) => {
    res.json(movies);
});

//Add one
router.post('/', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        var UsedID = 1;
        _.each(movies, (movie, i) => {
            if (UsedID == parseInt(movie.id)) {
                UsedID += 1;
            }
        });
        UsedID = UsedID.toString();
        const newMovie = { UsedID, ...req.body };
        movies.push(newMovie);
        res.json(movies);
    } else {
        res.status(500).json({ error: 'You miss something.' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id == id) {
            movies.splice(i, 1);
            res.send(movies);
        }
    })
    res.send(movies);
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
                res.json(movies);
            }
        })
    } else {
        res.status(500).json({ error: 'You miss something.' });
    }
    if (!exist) {
        res.status(500).json({ error: 'Not Exist.' });
    };
});

module.exports = router;