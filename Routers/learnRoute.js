const router = require("express").Router();

const learnerRoute = require("../Controllers/learn");
const fetchApi = require("../Controllers/fetchApi");

router.get("/practise/:questions", learnerRoute.getWord);
router.get("/word/:name", fetchApi.getMeaning);
router.get("/meaning/:word", learnerRoute.getMeaning)

router.post("/word", learnerRoute.postWord);
router.post("/word/attempt", learnerRoute.postAttempt);

module.exports = router;
