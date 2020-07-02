const Word = require('../Models/word');

exports.generateRandom = ()=>{
    return new Promise(function(resolve, reject){
        Word.findRandom().limit(5).exec((err, wordLst)=>{
            if(err){
                reject();
            }
            resolve(wordLst);
        });
    })
};