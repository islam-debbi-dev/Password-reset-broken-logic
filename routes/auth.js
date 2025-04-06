const express = require('express');
const router = express.Router();
const User = require('../modules/user-model');
const jwt = require('jsonwebtoken');


// create a new user
router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        if (!user) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        // check if username is exist
        userExist = await User.findOne({ username: user.username });
        if (userExist) {
            res.status(400).json({ message: 'Username is already exist' });
            return;
        }

        console.log(user);
        const newuser = new User(user);
        // add to database
        await newuser.save();
        res.json({ message: 'User created successfully' });

    } catch (err) {
        res.status(400).json({ message: 'User not created error  ' + err });
        console.log(err);
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username: username });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (user.password === password) {
            return res.json({ message: 'Logged in successfully', redirectUrl: `/page/my-account?username=${username}` });
        }
        console.log('Invalid password');
        res.status(400).json({ message: 'Invalid password' });
    } catch (err) {
        res.status(400).send('Login error : ' + err);
        console.log(err);
    }
});





module.exports = router;





