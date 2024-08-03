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

app.use('/api/auth', require('../server/auth'));

app.get('/index', (req, res) => {
    console.log("index");
    res.send("Hello Index!");
});

