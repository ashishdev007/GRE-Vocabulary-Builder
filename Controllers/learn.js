const Word = require('../Models/word');
const RandGen = require('../utils/randomDoc');

<<<<<<< HEAD
exports.getWord = (req, res, next)=>{
    words = {wordList:[]};
    const number_of_questions =  Number(req.params.questions);
    const total_retrival = number_of_questions * 3 + number_of_questions;
    Word.countDocuments().then((docNum)=>{
        if(docNum >= total_retrival){
            RandGen.generateRandom(total_retrival)
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
||||||| f871bda
exports.getWord = (req, res, next)=>{
    words = {wordList:[]};
    const number_of_questions = req.body.questions;
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
=======
exports.getWord = (req, res, next) => {
  words = { wordList: [] };
  const number_of_questions = req.params.questions;
  RandGen.generateRandom(number_of_questions)
    .then((wordLst) => {
      const questionList = wordLst.slice(0, number_of_questions);
      const optionList = wordLst.slice(number_of_questions);
      let i = 0;
      let index = [0, 1, 2, 3];
      const opts = ['', '', '', ''];
      words.wordList = questionList.map((wrd) => {
        const rt =
          wrd.meanings[Math.floor(Math.random() * wrd.meanings.length)];
>>>>>>> 0135cc81a4b0e3ca58ffbee3c6d3c7de9c0d6576

<<<<<<< HEAD
                    opts[k] = rt;
||||||| f871bda
            opts[k] = rt;
=======
        //generates a random index to put the option in the opt array
        let ind = Math.floor(Math.random() * index.length);
        let k = index.splice(ind, 1);
>>>>>>> 0135cc81a4b0e3ca58ffbee3c6d3c7de9c0d6576

<<<<<<< HEAD
                    let count = 1;
                    while(count <= 3){
                        const tempObj = optionList[i].meanings;
||||||| f871bda
            let count = 1;
            while(count <= 3){
                const tempObj = optionList[i].meanings;
=======
        opts[k] = rt;
>>>>>>> 0135cc81a4b0e3ca58ffbee3c6d3c7de9c0d6576

<<<<<<< HEAD
                        let ind = Math.floor(Math.random()*index.length)
                        let k = index.splice(ind, 1);
||||||| f871bda
                let ind = Math.floor(Math.random()*index.length)
                let k = index.splice(ind, 1);
=======
        let count = 1;
        while (count <= 3) {
          const tempObj = optionList[i].meanings;
>>>>>>> 0135cc81a4b0e3ca58ffbee3c6d3c7de9c0d6576

<<<<<<< HEAD
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
        }else{
            throw "err";
        }
||||||| f871bda
                opts[k] = tempObj[Math.floor(Math.random()*tempObj.length)];
                i++;
                count++;
            }
            index = [0,1,2,3];
            return {name: wrd.name, right:rt, options:[...opts]}
        });
        res.json(words);
=======
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
>>>>>>> 0135cc81a4b0e3ca58ffbee3c6d3c7de9c0d6576
    })
<<<<<<< HEAD
    .catch(err=>{
        res.status(403).json({message:`You need at least ${total_retrival} words saved in your list to proceed for ${number_of_questions} questions`})
||||||| f871bda
    .catch(err=>{
        console.log(err);
        res.status(403).json({message: "Can't fetch the any word. Something went wrong."})
=======
    .catch((err) => {
      console.log(err);
      res
        .status(403)
        .json({ message: "Can't fetch the any word. Something went wrong." });
>>>>>>> 0135cc81a4b0e3ca58ffbee3c6d3c7de9c0d6576
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
