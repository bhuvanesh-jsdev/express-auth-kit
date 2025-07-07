var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

var bcrypt = require('bcrypt');
var user = require('../models/user'); // Make sure the path is correct

// Render register form
router.get('/', function(req, res, next) {
  res.sendFile( path.join(__dirname, '../public/register.html' 

  ) );
});

// Handle registration
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  console.log(`details: 
    username: ${username}
    email: ${email}
    password: ${password}`);

  try {
    // ✅ Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).send( "User already registered" );
    }

    // ✅ Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new user({
      username,
      email,
      password: hashpassword
    });

    // ✅ Save to DB
    await newUser.save();
    res.sendFile( path.join(__dirname, '../public/login.html'  ) );
    console.log( 'User registered successfully' );


  } catch (err) {
    console.error(err);
    res.status(500).send( 'Registration failed' );
  }
});

module.exports = router;
