const Word = require('../Models/word');
const RandGen = require('../utils/randomDoc');

exports.getWord = (req, res, next)=>{
    words = {wordList:[]};
    const number_of_questions = req.params.questions;
    RandGen.generateRandom(number_of_questions)
    .then(wordLst=>{
        const questionList = wordLst.slice(0, number_of_questions);
        const optionList = wordLst.slice(number_of_questions);
        let i = 0;
        let index = [0,1,2,3];
        const opts = ["", "", "", ""];
        words.wordList = questionList.map(wrd=>{
            const rt = wrd.meanings[Math.floor(Math.random()*wrd.meanings.length)];
            
            //generates a random index to put the option in the opt array
            let ind = Math.floor(Math.random()*index.length);
            let k = index.splice(ind, 1);

            opts[k] = rt;

            let count = 1;
            while(count <= 3){
                const tempObj = optionList[i].meanings;

                let ind = Math.floor(Math.random()*index.length)
                let k = index.splice(ind, 1);

                opts[k] = tempObj[Math.floor(Math.random()*tempObj.length)];
                i++;
                count++;
            }
            index = [0,1,2,3];
            return {name: wrd.name, right:rt, options:[...opts]}
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