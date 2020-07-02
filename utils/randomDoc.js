const Word = require('../Models/word');

exports.generateRandom = (n)=>{
    const opts = n + 3 * n;
    return new Promise(function(resolve, reject){
        Word.findRandom().limit(opts).exec((err, wordLst)=>{
            if(err){
                reject();
            }
            resolve(wordLst);
        });
    })
};