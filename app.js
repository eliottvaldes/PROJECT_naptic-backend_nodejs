require('dotenv').config();

const Server = require('./models/server.model');

// Create an instance of the server class
const server = new Server();

// Call the listen method to start the server
server.listen();