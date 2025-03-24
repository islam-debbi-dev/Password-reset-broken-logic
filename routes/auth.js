const express = require('express');
const router = express.Router();
const User = require('../modules/user-model');
const jwt = require('jsonwebtoken');


// create a new user
router.post('/register', async (req, res) => {
    try{
    const user = req.body;
    // check if username is exist
    userExist = await User.findOne({username: user.username});
    if(userExist){
        res.status(400).json({ message: 'Username is already exist'});
        return;
    }
    else{
        console.log(user);
    if(!user){
        res.json({ message: 'All fields are required'});
        return;
    }
      const newuser = new User(user); 
    // add to database
    await newuser.save();
    res.json({ message: 'User created successfully'});


    }
    
}catch(err){
    res.status(400).json({message: 'User not created error  ' + err});
    console.log(err);
}
}); 

// login user
router.post('/login',async (req, res)=> {
    try{
        console.log(req.body);
    if (!req.body) 
    {
        return res.send('All fields are required'); 
    }
    const user = await User.findOne({username: req.body.username});
    console.log(user);
    if(!user){
     return res.status(400).json({ message: 'User not found' });
    }
    if(user.password === req.body.password){
    
        console.log('Logged in successfully');
        // res.render('../pages/my-account.ejs', {
        //     username: req.query.username,
        // });
    
        return res.json({ message: 'Logged in successfully' , redirectUrl: `/page/my-account?username=${req.body.username}` });
    }
    console.log('Invalid password');
    res.status(400).json({ message: 'Invalid password' });
}catch(err){
    res.status(400).send('Login error : ' + err);
    console.log(err);
}
});

// log out
router.post('/logout', (req, res) => {
    res.send('Logged out');
});



// reset password by email and token
router.post('/forget-password', (req, res) => {
   
});

module.exports = router;





