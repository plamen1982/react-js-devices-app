const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  //TODO, change the hard-coded string for the password to be loaded from more secure place, -> decode the token using a secret key-phrase
  return jwt.verify(token, 's0m3 r4nd0m str1ng', (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }
    const userId = decoded.sub;
    console.log("userId", userId);
    User
      .findById(userId)
      .then(user => {
        if (!user) {
          return res.status(401).end();
        }

        req.user = user;

        return next();
      });
  });
}
