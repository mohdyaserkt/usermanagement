import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Request, Response, NextFunction } from 'express';
import routes from './frameworks/expressSpecific/routes';
import dependencies from './config/dependencies';
import ErrorHandler from './frameworks/expressSpecific/ErrorHandler';
import { connect as connectToMongo } from './frameworks/database/mongo';
import cors from 'cors'

dotenv.config({path:'../.env'});

const app: Express = express();

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const API_PREFIX: string = process.env.API_PREFIX || '/api/v1';


const start = (): void => {
    // Middlewares
    app.use(cors())

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use(API_PREFIX, routes(dependencies));

    // Common Error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler(err, req, res, next);
    });

    app.listen(PORT, () => {
        console.log(`WOHOOO our server is running under port ${PORT}`);
        connectToMongo();
    });
};

export { start };
