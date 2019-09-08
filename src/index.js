const express = require ('express');
const app = express();
const morgan = require('morgan');

// server Settings
app.set('port',process.env.PORT || 8080);
app.set('json spaces',2);

// middlewares
app.use(morgan('combined'));
app.use(express.urlencoded({extended:false}));
app.use(express.json);

// routes
app.use(require('./routes/index'));

// starting the server
app.listen(app.get('port'), () => {
    console.log('App listening on port '+app.get('port'));
});