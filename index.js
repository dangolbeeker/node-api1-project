// implement your API here

const express = require('express');

const cors = require('cors');

const users = require('./data/db');

const server = express();

//middleware
server.use(express.json());
server.use(cors());



server.get('/', (req, res) => {
	res.send('Welcome To Express');
});

// create user
server.post('/api/users', (req, res) => {
	const userData = req.busers
	if (!userData.name || !userData.bio) {
		res.status(400).json({ ERROR: 'Must add name and bio' });
		return;
	}
	users
		.insert(userData)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.status(500).json({
				ERROR: 'There was an error while saving the user to the database'
			});
			return;
		});
});

server.get('/api/users', (req, res) => {
	// db.find() returns a promise and we need then and catch
	users 
		.find()
		.then(users => {
			// .json will convert data passed to json
			// Tells the client we're sending JSON through and HTTP header
			res.status(200).json(users);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The users information could not be retrieved.' });
		});
});

// Get user by Id
server.get('/api/users/:id', (req, res) => {
	const id = req.params.id;

	users
		.findById(id)
		.then(user => {
			if (user) {
				res.status(200).json({
					user
				});
			} else {
				res.status(404).json({
					message: 'The user with the specified ID does not exist.'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				error: 'The user information could not be retrieved.'
			});
		});
});

// Delete a user
server.delete('/api/users/:id', (req, res) => {
	const userId = req.params.id;
	if (userId === 0) {
		res.status(404).json({ ERROR: 'User with this ID does not exist' });
	}

	users
		.remove(userId)
		.then(user => {
			res.status(200).json({ message: 'user deleted' });
		})
		.catch(err => {
			res.status(500).json({ ERROR: 'The user could not be removed' });
		});
});

// update a user

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	if (!changes.name || !changes.bio) {
		res.status(400).json({ ERROR: 'Provide name and bio for user' });
	}

	users
		.update(id, changes)
		.then(updated => {
			if (updated === 0) {
				res.status(404).json({ ERROR: 'User with that ID does not exist' });
				return;
			}
		})
		.then(user => {
			res.status(200).json({ user });
		})
		.catch(err => {
			res
				.status(500)
				.json({ ERROR: 'The user information could not be modified.' });
		});
});


const port = 8000;
server.listen(port, () => console.log('API Good To Go!'));