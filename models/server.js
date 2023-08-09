const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // connection
        this.connectDB();

        // middlewares
        this.middlewares();

        // routes for my app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // Cross-origin resource sharing (CORS)
        this.app.use(cors());

        // read and paser from body
        this.app.use( express.json() );

        // directory public
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usersPath, require('../routes/users') );
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('App running in port', this.port);
        });
    }
}

module.exports = Server;