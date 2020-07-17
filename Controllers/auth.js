const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");


exports.postRegister = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
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
            "Succefully registered! Please check your email for verifying.",
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
        const token = jwt.sign({id : usr._id}, process.env.JWT_SEC);
        return res.status(200).json({ message: "Successfully logged in!", tkn : token });
      } else {
        throw new Error("Password doesn't match");
      }
    })
    .catch((err) => {
      res.status(402).json({ message: err.message });
    });
};

exports.verifyRegister = (req, res, next) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SEC);

    User.findById(decoded.id)
    .then(user => {
        if(!user){
            throw new Error("Something went wrong!");
        }
        user.authenticated = true;
        return user.save();
    })
    .then(usr=>{
        res.status(200).json({message: "User verified!"});
    })
    .catch(err=>{
        res.status(403).json({message: "Something went wrong!"});
    })
}
