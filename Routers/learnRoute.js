const router = require('express').Router();

const learnerRoute = require('../Controllers/learn');

router.get('/', learnerRoute.getWords);
router.post('/word',learnerRoute.postWord);

module.exports = router;