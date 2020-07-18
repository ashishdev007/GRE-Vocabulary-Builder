const jwt = require('jsonwebtoken');
const User = require('../Models/user');

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    User.findById(decoded.id)
      .then(user => {
        if (!user) {
          throw new Error("No users found!");
        }
        next();
      }).catch(err => {
        res.status(403).json({ message: err.message });
      });
  }else{
    res.status(403).json({message: "No authentication token found!"});
  }
}