const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ykdgy.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const learnRoute = require("./Routers/learnRoute");
const authRoute = require("./Routers/authRoute");
const populateData = require("./utils/startPopulate");

const Word = require("./Models/word");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", authRoute);
app.use("/", learnRoute);

//Database connection and server listener
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((connect) => {
    //return Word.find().remove(); //empty words collection
    return Word.countDocuments();
  })
  .then((count) => {
    if (count < 120) {
      return populateData.populateDB();
    } else {
      return "Already populated!";
    }
  })
  .then((success) => {
    app.listen(8000, () => {
      console.log("Running in 8000!");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database!");
  });
