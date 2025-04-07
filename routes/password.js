const express = require('express');
const router = express.Router();
const User = require('../modules/user-model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

/**
 *  @desc    Send Forgot Password Link
 *  @route   /password/forgot-password
 *  @method  POST
 *  @access  public
 */

router.post('/forgot-password', asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    console.log(user.email)
    const secret = process.env.JWT_SECRET+user.password;
    const token = jwt.sign({id: user.username }, secret, {
      expiresIn: "1h",
    });
   
    const link = `http://localhost:3000/page/reset-password/?username=${user.username}&token=${token}`;
    
    const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
       }
    });
  
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `<div>
                <h4>Click on the link below to reset your password</h4>
                <p>${link}</p>
            </div>`
    }
  
    transporter.sendMail(mailOptions, function(error, success){
      if(error){
        console.log(error);
        if (!res.headersSent) {
          return res.status(500).json({message: "something went wrong"});
        }
      } else {
        console.log("Email sent: " + success.response);
        return res.status(200).json({message: "email sent successfully"});
      }
    });
  }));
  
  // update password
  router.put('/reset-password', asyncHandler(async (req, res) => {
    const { username, password ,token} = req.body;

    console.log(username + password + token);

    const user = await User.findOneAndUpdate({username: username}, {password: password});
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json({ message: "password updated successfully" });
  }));

  

module.exports = router;