const router = require('express').Router();

const authRoute = require('../Controllers/auth');

router.post("/signup", authRoute.postRegister);
router.post("/login", authRoute.postLogin);

router.get("/verify/:token", authRoute.verifyRegister);

module.exports = router;