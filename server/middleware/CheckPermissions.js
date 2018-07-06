const jwt    = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user.model');

function checkPermissions(req, res, next) {

  User.findById(req.userId, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    if (user.isSuperuser !== true) {
      return res.status(403).send("Permission denied.");
    }

    next();
  });

}

module.exports = checkPermissions;