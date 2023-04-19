const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const { generateJWT, googleVerify } = require('../helpers');


// function to sign in a user using email and password and return a token to use in the frontend-app
const signIn = async (req = request, res = response) => {


    // get only the email and password from the request body
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: true,
                msg: 'User or Password are incorrect - email'
            });
        }

        if (!user.active) {
            return res.status(400).json({
                ok: true,
                msg: 'User or Password are incorrect - active:false'
            });
        }


        // verify password with bcryptjs compareSync
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                ok: true,
                msg: 'User or Password are incorrect - password'
            });
        }


        // in case of success, generate JWT using the user id as a payload
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong!'
        });
    }



}


const signInGoogle = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {

        // get the user data from google using the id_token
        const { name, email, avatar } = await googleVerify(id_token);

        // if id_token is valid, we search the user in our db
        let user = await User.findOne({ email });


        // if user no exist in our db, we create
        if (!user) {
            // define the default values for google users that doesn't have an account in our db    
            // password
            const salt = bcryptjs.genSaltSync();
            const password = bcryptjs.hashSync('12345678', salt);
            // set the default role as 'User' with id '643fe15abd5baa7409314651'
            const role = '643fe15abd5baa7409314651';
            // set the default plan as 'Free' with id '643fe1babd5baa7409314656'
            const plan = '643fe1babd5baa7409314656';

            const dataUser = {
                name,
                email,
                password,
                img: avatar,
                google: true,
                role,
                plan,
            }
            // create user
            user = new User(dataUser);
            // save user in db
            await user.save();
        }

        // if user has false active value in our db means that the user is blocked
        if (!user.active) {
            return res.status(401).json({
                ok: true,
                msg: 'User is blocked and cannot login - contact the system administrator'
            });
        }

        // if everythig is okay we generate the jwt based on user _id
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token,            
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified'
        });
    }



}


module.exports = {
    signIn,
    signInGoogle,
}