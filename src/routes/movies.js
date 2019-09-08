const { Router } = require('express');
const router = Router();

const movies = require('../sample.json');

router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {
    const { title, director, year, rating} = req.body;
    if(title && director && year && rating){
        var id = movies.length + 1;
        id=id.toString();
        const newMovie ={id,...req.body};
        movies.push(newMovie);
        res.json(movies);
    }else{
        res.status(500).json({error:'You miss something.'});
    }
});

router.delete('/', (req, res) => {
    res.json(movies);
});

module.exports = router;