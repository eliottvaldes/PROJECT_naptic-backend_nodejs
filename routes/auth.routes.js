const { Router } = require('express');
const { check } = require('express-validator');

// use middelwares to validate request
const { validateFields } = require('../middlewares');

// use controllers to handle the request
const { signIn, signInGoogle } = require('../controllers/auth.controller');


const router = Router();

/**
 * @route POST api/auth/signin
 * @desc Sign in a user in the database
 * @access Public
 * @param {string} email - required
 * @param {string} password - required
 * @returns {object} 200 - User logged in | 400 - Bad request | 500 - Server error
 * @return {token}
 */
router.post('/signin',
    [
        check('email', 'The password is required').not().isEmpty(),
        validateFields,
        check('email', 'The email is required').isEmail(),
        validateFields,
        check('password', 'The password is required').not().isEmpty(),
        validateFields
    ],
    signIn
);


/**
 * @route POST api/auth/signin-google
 * @desc Sign in a user in the database with google account
 * @access Public
 * @param {string} id_token - required
 * @returns {object} 200 - User logged in | 400 - Bad request | 500 - Server error
 * @return {token}
 */
router.post('/signin-google',
    [
        check('id_token', 'Google id_token is required').not().isEmpty(),
        validateFields
    ],
    signInGoogle
);


module.exports = router;