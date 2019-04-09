const express = require('express');
const authCheck = require('../config/auth-check');
const Device = require('../models/Device');
const User = require('../models/User');

const router = new express.Router();

function validateDeviceCreateForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  payload.price = parseFloat(payload.price);

  if (!payload || typeof payload.model !== 'string' || payload.model.length < 1) {
    isFormValid = false;
    errors.name = 'Device model must be at least 1 symbols.';
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false;
    errors.description = 'Description must be at least 10 symbols and less than 200 symbols.';
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false;
    errors.price = 'Price must be a positive number.';
  }

  if (!payload || typeof payload.image !== 'string' || payload.image.length < 10) {
    isFormValid = false;
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message: errors,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const deviceObj = req.body;
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateDeviceCreateForm(deviceObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    Device
      .create(deviceObj)
      .then((createdDevice) => {
        res.status(200).json({
          success: true,
          message: 'Device added successfully.',
          data: createdDevice
        });
      })
      .catch((err) => {
        console.log(err);
        let message = 'Something went wrong :( Check the form for errors.';
        if (err.code === 11000) {
          message = 'Device with the given model already exists.';
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {

  if (req.user.roles.indexOf('Admin') > -1) {
    const deviceId = req.params.id;
    const deviceObj = req.body;
    const validationResult = validateDeviceCreateForm(deviceObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    // TO DO double check all properties
    Device
      .findById(deviceId)
      .then(existingDevice => {
        existingDevice.model = deviceObj.model;
        existingDevice.creator = deviceObj.creator;
        existingDevice.typeDevice = deviceObj.typeDevice;
        existingDevice.description = deviceObj.description;
        existingDevice.price = deviceObj.price;
        existingDevice.image = deviceObj.image;

        existingDevice
          .save()
          .then(editedDevice => {
            res.status(200).json({
              success: true,
              message: 'Device edited successfully.',
              data: editedDevice
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.';
            if (err.code === 11000) {
              message = 'Device with the given name already exists.';
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err);
        const message = 'Something went wrong :( Check the form for errors.';
        return res.status(200).json({
          success: false,
          message: message
        });
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Device
    .find()
    .then(devices => {
      res.status(200)
        .json(devices);
    })
})

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const review = req.body.review;
  const username = req.user.username;

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.';
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Device
    .findById(id)
    .then(device => {
      if (!device) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = device.reviews
      reviews.push(reviewObj)
      device.reviews = reviews
      device
        .save()
        .then((device) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: device
          })
        })
        .catch((err) => {
          console.log(err);
          const message = 'Something went wrong :( Check the form for errors.';
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err);
      const message = 'Something went wrong :( Check the form for errors.';
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  Device
    .findById(id)
    .then(device => {
      if (!device) {
        const message = 'Product not found.';
        return res.status(200).json({
          success: false,
          message: message
        });
      }
      
      //TO DO double check this logic
      let likes = device.likes
      if (!likes.includes(username)) {
        likes.push(username);
      }
      device.likes = likes;
      device
        .save()
        .then((device) => {
          res.status(200).json({
            success: true,
            message: 'Device liked successfully.',
            data: device
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Device
    .findById(id)
    .then(device => {
      if (!device) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = device.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      device.likes = likes
      device
        .save()
        .then((device) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: device
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id;
  if (req.user.roles.indexOf('Admin') > -1) {
    Device
      .findById(id)
      .then((device) => {
        device
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Device deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/submit/:deviceId', authCheck, async (req, res) => {
  const userId = req.user._id;

  const { deviceId } = req.params;
  try {
    if(deviceId) {
      const currentDevice = await Device.findById(deviceId);
      const currentUser = await User.findById(userId);
      currentDevice.user = userId;
      currentDevice.isBorrowed = true;
      currentDevice.date = Date.now();
      if(!currentUser.borrowDevices.includes(currentDevice)) {
        currentUser.borrowDevices.push(currentDevice);
      }
  
      await currentUser.save();
      await currentDevice.save();
  
      res.status(200).json({
        currentUser,
        currentDevice,
        success: true,
        message: 'Borrowed device created successfully.',
      });
    }
  } catch(error) {
    console.log(error);
  }
});

router.get('/user', authCheck, (req, res) => {
  const userId = req.user._id.toString();
  User
    .findById(userId)
    .populate('borrowDevices')
    .then(user => {
      res
        .status(200)
        .json(user.borrowDevices);
    });
});

router.delete('/return/:deviceId', authCheck, (req, res) => {
  const { deviceId } = req.params;
  const userId = req.user._id.toString();

  User
    .findById(userId)
    .then(async (user) => {
      const index = user.borrowDevices.indexOf(deviceId);
      if(index > -1) {
        user.borrowDevices.splice(index, 1);
        Device
          .findById(deviceId)
          .then(async device => {
            device.isBorrowed = false;
            await device.save();
          })
      }
      await user.save();
      res
        .status(200);
    })
});

router.get('/:deviceId', (req, res) => {

  const { deviceId } = req.params;
  Device
    .findById(deviceId)
    .populate('user')
    .then(device => {
      res
        .status(200)
        .json(device)
    });
});

module.exports = router;
