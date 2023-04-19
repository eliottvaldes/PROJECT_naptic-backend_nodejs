const express = require('express');
const cors = require('cors');

// require the db connection
const { databaseConnection } = require('../databases/naptic.config');

// Define the server class
class Server {
    constructor() {
        // create the express server
        this.app = express();
        this.port = process.env.PORT || 5000;        

        // call connection to the database
        this.connectDB();

        // call middlewares
        this.middlewares();

        // call routes
        this.routes();
    }


    // Database -> here we can define begening of the connection to the database
    async connectDB() {
        await databaseConnection();
    }

    // Middlewares -> here we can define all the functions that will be executed when the server is running
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    // Routes -> here we can define all the routes for the server
    routes() {
        // 404 error
        this.app.use('*', (req, res) => {
            res.status(404).json({
                ok: false,
                msg: '404 error | Resource not found'
            });
        });
    }

    // method to start the server
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;