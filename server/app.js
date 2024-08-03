const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 4545;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/')
.then(() => {
    app.listen(port, ()=>{
        console.log("Listening to Port Now");
    });
    console.log(`Server started on port ${port}`);
}).catch((error) =>{
    console.log(error);
});

app.get('/', (req, res) => {
    res.json({message: "This is front page"});
});

app.get('/login', (req, res) => {
    console.log(`Logged in for get: ${req}`);
    res.send("Login");
});

app.post('/login', (req, res) => {
    console.log(`Logged in for mail: ${req.body.email}`);
    res.send("Login");
});

app.post('/register', (req, res) => {
    console.log(`Register for post: ${req.body.name}`);
    res.send("Register");
});

app.get('/register', (req, res) => {
    res.send("Register");
});

app.get('/index', (req, res) => {
    console.log("index");
    res.send("Hello Index!");
});

