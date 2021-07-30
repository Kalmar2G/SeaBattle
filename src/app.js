import express from 'express';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './router.js';

const app = express();

app.use(express.json());

const logger = morgan('combined');
app.use(logger);

app.use('/', router);

const options = {
  definition: {
    openapi: '3.0.0',
  },
  apis: ['src/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('<h1>Welcome!</h1>');
});

export default app;
