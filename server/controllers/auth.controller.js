const User = require('../models/user.model');

const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');


module.exports = {

  login: (req, res) => {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err) return res.status(500).send({auth: false, message: 'Error on the server.'});
      if (!user) return res.status(404).send({auth: false, message: 'No user found.'});

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({auth: false, token: null});

      const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({auth: true, token: token});
    });
  },

  // logout: (req, res) => {
  //   res.status(200).send({auth: false, token: null});
  // },

  register: (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.findOne({email: req.body.email}, (err, user) => {
      console.log('user', user);
    });

    User.create({
        email: req.body.email,
        password: hashedPassword
      },
      function (err, user) {
        if (err) {
          if (err.code === 11000) {
            return res.status(400).send({auth: false, message: 'User with such email already exists.'});
          }
          return res.status(500).send({auth: false, message: 'There was a problem registering the user.'});
        }

        const token = jwt.sign({id: user._id}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({auth: true, token: token});
      });
  },

  me: (req, res) => {
    User.findById(req.userId, {password: 0}, function (err, user) {
      if (err) return res.status(500).send({auth: false, message: 'There was a problem finding the user.'});
      if (!user) return res.status(404).send({auth: false, message: 'No user found.'});
      res.status(200).send(user);
    });
  },

};

