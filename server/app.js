const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4545;

app.use(express.json());

mongoose.connect('mongodb+srv://system:system@cluster0.xpwsaco.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    app.listen(port, ()=>{
        console.log("Listening to Port Now");
    });
    console.log('connected');
}).catch((error) =>{
    console.log(error);
});

app.get('/', (req, res) => {
    console.log("hit");
    res.send("Hello World!");
});

app.get('/login', (req, res) => {
    res.send("Login");
});

app.get('/register', (req, res) => {
    res.send("Register");
});

app.get('/index', (req, res) => {
    console.log("index");
    res.send("Hello Index!");
});

