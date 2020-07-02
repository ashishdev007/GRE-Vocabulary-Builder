const router = require('express').Router();

const learnerRoute = require('../Controllers/learn');
const fetchApi = require('../Controllers/fetchApi');

router.get('/practise/:questions', learnerRoute.getWord);
router.post('/word',learnerRoute.postWord);

router.get('/word/:name', fetchApi.getMeaning);

module.exports = router;