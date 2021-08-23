import * as Middleware from './middleware';
import * as Routes from './routes/index';
import * as dotEnv from 'dotenv'
import express, { Application } from 'express';

dotEnv.config();

const app: Application = express();

Middleware.configure(app);
Routes.init(app);
Middleware.initErrorHandler(app);

export default app;
