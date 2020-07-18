const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");


exports.postRegister = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.countDocuments().
    then(count => {
      if (count > 0) {
        throw new Error("Only one user can sign up!");
      }
      return User.findOne({ email: email });
    })
    .then((user) => {
      if (!user) {
        return bcrypt.hash(password, 12);
      } else {
        throw new Error("User with the email already exists!");
      }
    })
    .then((hashed) => {
      const usr = new User({ name: name, email: email, password: hashed });
      return usr.save();
    })
    .then((result) => {
      return res
        .status(200)
        .json({
          message:
            "Succefully registered!",
        });
    })
    .catch((err) => {
      return res
        .status(403)
        .json({ message: "Something went wrong during sign up!" });
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let usr;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error("This email isn't registered!");
      }
      usr = user;
      return bcrypt.compare(password, user.password);
    })
    .then((doMatch) => {
      if (doMatch) {
        const token = jwt.sign({ id: usr._id }, process.env.JWT_SEC);
        return res.status(200).json({ id: usr._id, tkn: token });
      } else {
        throw new Error("Password doesn't match");
      }
    })
    .catch((err) => {
      res.status(402).json({ message: err.message });
    });
};

exports.getUserCount = (req, res, next) => {
  User.countDocuments()
    .then(count => {
      if (count > 0) {
        return res.status(200).json({ message: false });
      } else {
        return res.status(200).json({ message: true });
      }
    }).catch(err => {
      res.status(500).json({ message: err.message });
    })
}