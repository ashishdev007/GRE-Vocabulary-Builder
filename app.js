const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ykdgy.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const learnRoute = require('./Routers/learnRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/', learnRoute);

//Database connection and server listener
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false})
.then(connection=>{
    app.listen(8000, ()=>{
        console.log("Running in 8000!");
    });
})
.catch(err=>{
    console.log("Error connecting to database!");
})
