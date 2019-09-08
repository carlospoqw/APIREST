const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data={
         "name":carlos,
         "age":22
    };
    res.json(data);
});

module.exports = router;