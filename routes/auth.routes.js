const { Router } = require('express');
const { check } = require('express-validator');

// use middelwares to validate request
const { validateFields } = require('../middlewares');

const router = Router();


module.exports = router;