const { OAuth2Client } = require('google-auth-library');

// create a new client using the google client id as a parameter
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// function to verify the token sent by google and return the user data
async function googleVerify(token = '') {

    // verify the token using the client created above
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    // get the user data from the ticket
    const { email, name, picture } = ticket.getPayload();

    // return the user data
    return {
        name,
        email,
        avatar: picture
    }
}

module.exports = {
    googleVerify
}