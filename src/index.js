const express = require ('express');
const app = express();
const morgan = require('morgan');

const port = process.env.PORT || 3000;
//Middlewares
app.use(morgan('combined'));
app.use(express.json);



app.listen(port, () => {
    console.log('App listening on port '+port);
});
