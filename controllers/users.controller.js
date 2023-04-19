const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const registerUser = async (req = request, res = response) => {

    const { name, email, password } = req.body;

    // set the default role as 'User' with id '643fe15abd5baa7409314651'
    const role = '643fe15abd5baa7409314651';
    // set the default plan as 'Free' with id '643fe1babd5baa7409314656'
    const plan = '643fe1babd5baa7409314656';


    // define the fields to save in the user document
    const user = new User({ name, email, password, role, plan });

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // save user
    await user.save();

    // return the user already saved
    res.status(201).json({
        ok: true,
        user
    });
}


module.exports = {
    registerUser
}