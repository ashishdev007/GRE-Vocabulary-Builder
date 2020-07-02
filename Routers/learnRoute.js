const router = require('express').Router();

const learnerRoute = require('../Controllers/learn');
const fetchApi = require('../Controllers/fetchApi');

router.get('/practise', learnerRoute.getWords);
router.post('/word',learnerRoute.postWord);

router.get('/word/:name', fetchApi.getMeaning);

module.exports = router;