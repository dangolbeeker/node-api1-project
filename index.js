// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();

// server.use(express.json());



server.get('/', (req, res) => {
    res.send('')
});

server.post('/api/users', (req, res) => {
    res.send();
});


server.get('/api/users', (req, res) => {
    //.find() returns a promise 
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: 'error getting users'});
    });
});



const port = 8000;
server.listen(port, () => console.log('API ONLINE'));