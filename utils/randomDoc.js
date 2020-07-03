const Word = require("../Models/word");

exports.generateRandom = (n) => {
  return new Promise(function (resolve, reject) {
    Word.findRandom()
      .limit(n)
      .exec((err, wordLst) => {
        if (err) {
          reject();
        }
          resolve(wordLst);
      });
  });
};
