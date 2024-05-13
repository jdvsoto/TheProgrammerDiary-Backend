'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';

import authRoutes from '../src/auth/auth.routes.js';
import publicationRoutes from '../src/publications/publications.routes.js';
import commentRoutes from '../src/comments/comments.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/ProgrammersDiary/v1/auth';
        this.publicationPath = '/ProgrammersDiary/v1/publications';
        this.commentPath = '/ProgrammersDiary/v1/comments';

        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.commentPath, commentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port`, this.port);
        });
    }
}

export default Server;
