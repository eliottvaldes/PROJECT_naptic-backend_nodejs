const jwt = require('jsonwebtoken');

// function to generate a JWT using the user id as a payload
const generateJWT = (uid = '') => {

    // return a promise to use async/await
    return new Promise((resolve, reject) => {

        // the data we want to save inside the jwt is the user id
        const payload = { uid };

        // generate the token signing the payload with the secret key and the expiration time (10 days)
        jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '10d'
        }, (err, token) => {
            if (err) {
                // in case of error, reject the promise
                console.log(err);
                reject('The token could not be generated');
            } else {
                // in case of success, resolve the promise with the token
                resolve(token);
            }
        });

    });

}

module.exports = {
    generateJWT
}