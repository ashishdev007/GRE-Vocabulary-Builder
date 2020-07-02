const Word = require('../Models/word');
const RandGen = require('../utils/randomDoc');

exports.getWords = (req, res, next)=>{
    words = {wordList:[]};
    RandGen.generateRandom()
    .then(wordLst=>{
        words.wordList = wordLst;
        res.json(words);
    })
    .catch(err=>{
        console.log(err);
        res.status(403).json({message: "Can't fetch the any word. Something went wrong."})
    });
}

exports.postWord = (req, res, next) => {
    const wordName = req.body.word.toUpperCase();
    const meanings = req.body.meanings;
    const result = {};
    const inStatus = false

    Word.findOne({name: wordName})
    .then(word=>{
        if(!word){
            return Word.create({name: wordName, meanings});
        }
        inStatus = true;
        return word;
    })
    .then(reps=>{
        if(reps && !inStatus){
            result.message = "Added the word in the list";
        }else{
            result.message = "Already in your word list";
        }
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
        result.Success = false;
        res.status(403).json({message: "Can't add to the Database"})
    });
}