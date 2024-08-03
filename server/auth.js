const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token

const User = require('../server/models/userModel');


router.get('/login', (req, res) => {
    console.log(`Logged in for get: ${req}`);
    res.send("Login");
});

router.post('/login', (req, res) => {
    console.log(`Logged in for mail: ${req.body.email}`);
    res.send("Login");
});

router.post('/register', async (req, res) => {
    try{
    console.log(`Register for Name: ${req.body.name}`);
    const {name, email, password} = req.body;
        // Encrypting password 
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', {
        expiresIn: '1d', // Token expiration time (adjust as needed)
        });

        // Send the token back to the client
        res.status(201).json({ message: "User Successfully registered, Login", user: newUser });
    }catch(error){
        console.error('Error creating User:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

router.get('/register', (req, res) => {
    res.send("Register");
});

module.exports = router;
