const express = require('express');
const authCheck = require('../config/auth-check');
const Borrow = require('../models/Borrow');
const User = require('../models/User');
const Device = require('../models/Device');

const router = new express.Router();

//Create comprehensive documentation JSDocs
//route -> borrow/submit
//TO DO double check the properties from the model


//TO DO double check the properties from the model
//TO DO the route should be changed to /available
// router.get('/pending', authCheck, (req, res) => {
//   if (req.user.roles.indexOf('Admin') > -1) {
//     Borrow
//       .find({status: 'Pending'})
//       .then(borrows => {
//         res.status(200).json(borrows);
//       });
//   } else {
//     return res.status(200).json({
//       success: false,
//       message: 'Invalid credentials!',
//     });
//   }
// });

//TO DO double check the all properties from the model Borrow
router.post('/available/:id', authCheck, (req, res) => {
  const borrowId = req.params.id;
  Borrow
    .findById(borrowId)
    .then(borrow => {
      if (!borrow) {
        const message = 'Borrow device not found.';
        return res.status(200).json({
          success: false,
          message: message,
        });
      }

      borrow.status = 'Not Available';
      borrow
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Device has been borrowed successfully.',
          });
        })
        .catch((err) => {
          console.log(err);
          const message = 'Something went wrong :(';
          return res.status(200).json({
            success: false,
            message: message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      const message = 'Something went wrong :(';
      return res.status(200).json({
        success: false,
        message: message,
      });
    });
});

module.exports = router;
