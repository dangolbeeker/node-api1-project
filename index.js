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

//Get /api/users
server.get('/api/users', (req, res) => {
    //.find() returns a promise 
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved."});
    });
});

//Get /api/users/:id
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    db.findById(id)
      .then(id => {
        res.status(200).json({
          success: Yahtzee,
          id
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: `Unable to locate user with id ${id}`
        });
      });
  });



const port = 8000;
server.listen(port, () => console.log('API ONLINE'));