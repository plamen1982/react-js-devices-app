const express = require('express');
const Device = require('../models/Device');
const User = require('../models/User');

const router = new express.Router();

router.get('/', (req, res) => {
  User
    .count({})
    .then(users => {
      Device
        .count({})
        .then(products => {
          res.status(200).json({
            products,
            users
          });
        });
    });
});

module.exports = router;
