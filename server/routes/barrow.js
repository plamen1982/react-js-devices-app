const express = require('express');
const authCheck = require('../config/auth-check');
const Barrow = require('../models/Barrow');

const router = new express.Router();

//Create comprehensive documentation JSDocs

//TO DO double check the properties from the model
router.post('/submit', authCheck, (req, res) => {
  const device = req.body;
  const barrowObj = {
    creator: req.user._id,
    device,
  }

  Barrow
    .create(barrowObj)
    .then((createdBarrow) => {
      res.status(200).json({
        success: true,
        message: 'Barrow device created successfully.',
        data: createdBarrow,
      });
    })
    .catch((err) => {
      console.log(err);
      const message = 'Something went wrong :(';
      return res.status(200).json({
        success: false,
        message: message,
      });
    })
})

//TO DO double check the properties from the model
router.get('/user', authCheck, (req, res) => {
  Barrow
    .find({creator: req.user._id})
    .then(barrows => {
      res.status(200).json(barrows);
    })
})

//TO DO double check the properties from the model
//TO DO the route should be changed to /available
router.get('/pending', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    Barrow
      .find({status: 'Pending'})
      .then(barrows => {
        res.status(200).json(barrows);
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

//TO DO double check the all properties from the model Barrow
router.post('/approve/:id', authCheck, (req, res) => {
  const barrowId = req.params.id;
  Barrow
    .findById(barrowId)
    .then(barrow => {
      if (!barrow) {
        const message = 'Barrow not found.'
        return res.status(200).json({
          success: false,
          message: message,
        })
      }

      barrow.status = 'Approved'
      barrow
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Barrowed device approved successfully.'
          })
        })
        .catch((err) => {
          console.log(err);
          const message = 'Something went wrong :(';
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch((err) => {
      console.log(err);
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

module.exports = router;
