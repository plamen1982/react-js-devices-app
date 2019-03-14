/** Express router providing auth related routes
 * @module auth/login&&auth/signup
 * @requires express
 */

 //TO DO
const express = require('express');
const passport = require('passport');
const validator = require('validator');

const router = new express.Router();

/**
 * @example payload : { email: "myvalidemail@ymail.com", username: "my-unique-user-name", password:"mypassword-at-least-8-symbols"  }
 * @description payload object should have properties: email, username, password
 * @param {Object} payload
 * @returns {Object} { success: isFormValid, message: message, errors: errors }
 * @function validateSignupForm
 */

function validateSignupForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length < 4) {
    isFormValid = false;
    errors.username = 'Username must be at least 4 characters long';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must be at least 8 characters long';
  }

  //TO DO, make more specific this error
  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

/**
 * @example payload : { email: "myvalidemail@ymail.com", password:"mypassword-at-least-8-symbols"  }
 * @description payload object should have properties: email, password
 * @param {Object} payload
 * @returns {Object} { success: isFormValid, message: message, errors: errors }
 * @function validateLoginForm
 */

function validateLoginForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

/**
 * Route serving signup form.
 * @name post/signup
 * @function
 * @memberof module:routers/authUserRouter
 * @inner
 * @param {string} path - Express path auth/signup
 * @param {callback} middleware - Express middleware.
 */
//TO DO optimize quality code
router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(200).json({
        success: false,
        message: err
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
});

/**
 * Route serving signup form.
 * @name post/login
 * @function
 * @memberof module:routers/authUserRouter
 * @inner
 * @param {string} path - Express path -> auth/login
 * @param {callback} middleware - Express middleware.
 */

 //TO DO optimize the quality code
router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(200).json({
          success: false,
          message: err.message
        })
      }

      return res.status(200).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    })
  })(req, res, next);
})

module.exports = router;