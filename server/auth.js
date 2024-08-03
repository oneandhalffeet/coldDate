const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token

const User = require('../server/models/userModel');


router.get('/login', (req, res) => {
    res.send("Login");
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // find user with given email
    const user = await User.findOne({ email: email });
    if (user != undefined) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                // Handle the error (e.g., return an error response)
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (isMatch) {
                // Passwords match! Proceed with further logic (e.g., generate JWT)
                // Send JWT token or perform any other action
                // Generate a JWT token
                const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                    expiresIn: '1d', // Token expiration time (adjust as needed)
                });
                res.status(200).json({ token });
            } else {
                // Incorrect password
                return res.status(401).json({ message: 'Incorrect password' });
            }

        });
    } else {
        return res.status(500).json({ message: "User not found!" });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if User already exist
        const user = User.find({email: email});
        if(user){
            return res.status(500).json({message: 'User already exist, Login!'});
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        })

        await newUser.save();


        // Send the token back to the client
        return res.status(201).json({ message: "User Successfully registered, Login" });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user' });
    }
});

router.get('/register', (req, res) => {
    res.send("Register");
});

module.exports = router;
