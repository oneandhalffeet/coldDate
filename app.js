const express = require('express');
const app = express();
const port = 4545;

app.get('/', (req, res) => {
    console.log("hit");
    res.send("Hello World!");
});

app.get('/index', (req, res) => {
    console.log("index");
    res.send("Hello Index!");
});

app.listen(port, ()=>{
    console.log("haha");
})
