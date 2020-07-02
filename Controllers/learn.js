const Word = require('../Models/word');
const RandGen = require('../utils/randomDoc');

exports.getWord = (req, res, next)=>{
    words = {wordList:[]};
    RandGen.generateRandom()
    .then(wordLst=>{
        let index = 0;
        words.wordList = wordLst.map(wrd=>{
            const rt = wrd.meanings[Math.floor(Math.random()*wrd.meanings.length)];
            const opts = [rt];
            let i = 1;
            while(i <= 3){
                j = (index + i) % wordLst.length;
                const tempObj = wordLst[j].meanings
                opts.push(tempObj[Math.floor(Math.random()*tempObj.length)]);
                i++;
            }
            index++;
            return {name: wrd.name, right:rt, options:opts}
        });
        res.json(words);
    })
    .catch(err=>{
        console.log(err);
        res.status(403).json({message: "Can't fetch the any word. Something went wrong."})
    });
}

exports.postWord = (req, res, next) => {
    const wordName = req.body.word.trim().toUpperCase();
    const meanings = req.body.meanings;
    const result = {};
    let inStatus = false

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
            res.status(200).json(result);
        }else{
            result.message = "Already in your word list";
            res.status(403).json(result);
        }
    })
    .catch(err=>{
        console.log(err);
        result.Success = false;
        res.status(403).json({message: "Can't add to the Database"})
    });
}