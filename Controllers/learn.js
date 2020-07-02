const Word = require('../Models/word');
const RandGen = require('../utils/randomDoc');

exports.getWords = (req, res, next) => {
  words = { wordList: [] };
  RandGen.generateRandom()
    .then((wordLst) => {
      words.wordList = wordLst;
      res.json(words);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(403)
        .json({ message: "Can't fetch the any word. Something went wrong." });
    });
};

exports.postWord = (req, res, next) => {
  const wordName = req.body.word.toUpperCase();
  const meanings = req.body.meanings;
  const result = {};
  let inStatus = false;

  Word.findOne({ name: wordName })
    .then((word) => {
      if (!word) {
        return Word.create({ name: wordName, meanings });
      }
      inStatus = true;
      return word;
    })
    .then((reps) => {
      if (reps && !inStatus) {
        result.message = 'Added the word in the list';
        res.status(200).json(result);
      } else {
        result.message = `${req.body.word} is already in your word list`;
        res.status(400).json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({ message: "Can't add to the Database" });
    });
};
