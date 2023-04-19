const { Router } = require('express');
const { check } = require('express-validator');

// use the helpers to validate request
const { isEmailRegistered } = require('../helpers/dbValidators');

// use middelwares to validate request
const { validateFields } = require('../middlewares');

// use controllers to handle the request
const { registerUser } = require('../controllers/users.controller');


const router = Router();

// Define all users-routes

/** 
 * @route POST api/users/register
 * @desc Register a new user in the database
 * @access Public
 * @param {string} name - required 
 * @param {string} email - required
 * @param {string} password - required
 * @returns {object} 201 - User created | 400 - Bad request | 500 - Server error
*/
router.post('/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        validateFields,
        check('email', 'Email is required').not().isEmpty(),
        validateFields,
        check('email', 'Email is not valid').isEmail(),
        validateFields,
        check('email').custom(isEmailRegistered),
        validateFields,
        check('password', 'Password is required and must be at least 8 characters').isLength({ min: 8 }),
        validateFields
    ],
    registerUser
);

module.exports = router;