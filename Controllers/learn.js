const Word = require('../Models/word');
const RandGen = require('../utils/randomDoc');

exports.getWord = (req, res, next) => {
  words = { wordList: [] };
  const number_of_questions = Number(req.params.questions);
  const total_retrival = number_of_questions * 4;
  Word.countDocuments()
    .then((docNum) => {
      if (docNum >= total_retrival) {
        RandGen.generateRandom(total_retrival)
          .then((wordLst) => {
            const questionList = wordLst.slice(0, number_of_questions);
            const optionList = wordLst.slice(number_of_questions);
            let i = 0;
            let index = [0, 1, 2, 3];
            const opts = ['', '', '', ''];
            words.wordList = questionList.map((wrd) => {
              const rt =
                wrd.meanings[Math.floor(Math.random() * wrd.meanings.length)];

              //generates a random index to put the option in the opt array
              let ind = Math.floor(Math.random() * index.length);
              let k = index.splice(ind, 1);

              opts[k] = rt;

              let count = 1;
              while (count <= 3) {
                const tempObj = optionList[i].meanings;

                let ind = Math.floor(Math.random() * index.length);
                let k = index.splice(ind, 1);

                opts[k] = tempObj[Math.floor(Math.random() * tempObj.length)];
                i++;
                count++;
              }
              index = [0, 1, 2, 3];
              return { name: wrd.name, right: rt, options: [...opts] };
            });
            res.json(words);
          })
          .catch((err) => {
            console.log(err);
            res.status(403).json({
              message: "Can't fetch any word. Something went wrong.",
            });
          });
      } else {
        throw 'err';
      }
    })
    .catch((err) => {
      res.status(403).json({
        message: `You need at least ${total_retrival} words saved in your list to proceed for ${number_of_questions} questions`,
      });
    });
};

exports.getMeaning = (req, res, next) => {
  const word = req.params.word.toUpperCase();

  Word.findOne({ name: word })
    .then((wrd) => {
      res.status(200).json({ meanings: wrd.meanings, id: wrd._id });
    })
    .catch((err) => {
      res
        .status(403)
        .json({ message: `${word} doesn't exist in your word library!` });
    });
};

exports.postWord = (req, res, next) => {
  const wordName = req.body.word.trim().toUpperCase();
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

exports.postAttempt = (req, res, next) => {
  const word = req.body.name.trim().toUpperCase();
  const attempStatus = req.body.success.trim() === 'true';
  console.log(attempStatus);
  Word.findOne({ name: word })
    .then((wrd) => {
      if (wrd) {
        wrd.attempts += 1;
        if (attempStatus) {
          wrd.successAttempts += 1;
        }
        return wrd.save();
      } else {
        throw 'No Word Found';
      }
    })
    .then((result) => {
      res.status(200).json({ message: 'Word Status Updated' });
    })
    .catch((err) => {
      res.status(403).json({
        message: "Word status couldn't be updated! Something went wrong.",
      });
    });
};

exports.delWord = (req, res, next) => {
  Word.findByIdAndRemove(req.body._id)
    .then((result) => {
      res.status(200).json({ message: 'Sucessfully deleted!' });
    })
    .catch((err) => {
      res.status(403).json({ message: 'Somethign went wrong!' });
    });
};
