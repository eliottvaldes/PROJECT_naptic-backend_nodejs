const { validationResult } = require('express-validator');


// Middleware to validate fields from the request using express-validator package
// The middleware is used in the routes 
// If there are errors, the middleware returns a json with the errors
// If there are no errors, the middleware calls the next() function to continue with the request
const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors
        });
    }

    next();
}

module.exports = { validateFields };