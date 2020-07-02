const axios = require('axios');

exports.getMeaning = (req, res, next) =>{
    const wordName = req.params.name;
    const uri = `https://wordsapiv1.p.rapidapi.com/words/${wordName}/definitions`
    axios({
        "method":"GET",
        "url":uri,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":process.env.WORD_API_USER,
        "x-rapidapi-key":process.env.WORD_API_KEY,
        "useQueryString":true
        }
        })
        .then((response)=>{
          const defs = response.data.definitions.map(ele => ele.definition);
          console.log(defs);
          res.json({meanings:defs})
        })
        .catch((error)=>{
          res.status(403).json({message:`${wordName} is not defined. Please use a valid word.`});
    });
}



