//This scripts is only use for first time lunch for a user

const fs = require("fs");
const Word = require("../Models/word");

exports.populateDB = () => {
  const wordList = JSON.parse(
    fs.readFileSync(__dirname + `/../Resources/startWords.json`, "utf-8")
  );
  return Word.insertMany(wordList);
};
