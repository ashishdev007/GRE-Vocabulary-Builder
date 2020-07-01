const express = require('express');
const bodyParser = require('body-parser');

const learnRoute = require('./router/learnRoute');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', learnRoute);

app.listen(3000, ()=>{
    console.log("Running in 3000!");
});
