const generateJWT = require('../helpers/generateJWT');
const googleVerify = require('../helpers/googleVerify');

module.exports = {
    ...generateJWT,
    ...googleVerify,
}