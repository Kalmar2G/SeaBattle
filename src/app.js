import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import router from './router.js';

const app = express();

app.use(express.json());
const logger = morgan('combined');
app.use(logger);
app.use('/', router);
app.set('view engine', 'pug');

export default app;
