const router = require('express').Router();

const authRoute = require('../Controllers/auth');

router.get("/count", authRoute.getUserCount);

router.post("/signup", authRoute.postRegister);
router.post("/login", authRoute.postLogin);

module.exports = router;