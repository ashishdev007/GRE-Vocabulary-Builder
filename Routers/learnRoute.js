const router = require('express').Router();

const learnerRoute = require('../Controllers/learn');

router.get('/', learnerRoute.getWords);

module.exports = router;