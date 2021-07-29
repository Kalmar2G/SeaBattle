import express from 'express';
import morgan from 'morgan';
import router from './router.js';

const app = express();

app.use(express.json());

const logger = morgan('combined');
app.use(logger);

app.use('/', router);

export default app;
