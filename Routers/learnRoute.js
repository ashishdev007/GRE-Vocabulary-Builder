const router = require('express').Router();

const learnerRoute = require('../controller/learn');

router.get('/', learnerRoute.getWords);

module.exports = router;