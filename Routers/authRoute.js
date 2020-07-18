const router = require('express').Router();

const authRoute = require('../Controllers/auth');
const auth = require('../Middlewares/auth');

router.get("/count", authRoute.getUserCount);
router.get("/prevLog", auth.isAuthenticated, authRoute.prevLogin);

router.post("/signup", authRoute.postRegister);
router.post("/login", authRoute.postLogin);

module.exports = router;