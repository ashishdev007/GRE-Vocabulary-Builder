const Word = require('../Models/word');

exports.getWords = (req, res, next)=>{
    words = {wordList:[]};
    
    
    
    res.json(words);
}

exports.postWord = (req, res, next) => {
    const wordName = req.body.word;
    const meaning = req.body.meaning;
    const result = {};

    Word.findOne({name: wordName})
    .then(word=>{
        if(!word){
            return Word.create({name: wordName, meaning: meaning});
        }
        return word;
    })
    .then(reps=>{
        if(reps){
            result.Success = true;
        }else{
            result.Success = false;
        }
        console.log("Word is in the List!");
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(403).json({message:"There is an Error!"})
    })
}