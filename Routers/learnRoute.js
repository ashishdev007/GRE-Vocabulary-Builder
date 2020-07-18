const router = require("express").Router();

const learnerRoute = require("../Controllers/learn");
const fetchApi = require("../Controllers/fetchApi");
const auth = require('../Middlewares/auth');

router.get("/practise/:questions", auth.isAuthenticated, learnerRoute.getWord);
router.get("/word/:name", auth.isAuthenticated, fetchApi.getMeaning);
router.get("/meaning/:word", auth.isAuthenticated, learnerRoute.getMeaning)

router.post("/word", auth.isAuthenticated, learnerRoute.postWord);
router.post("/word/attempt", auth.isAuthenticated, learnerRoute.postAttempt);

module.exports = router;
