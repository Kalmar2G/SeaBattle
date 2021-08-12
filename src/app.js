import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import router from './router.js';

const app = express();

app.use(express.json());
app.use(bodyParser.text());
const logger = morgan('combined');
app.use(logger);
app.use(cors());

app.use('/', router);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SeaBattle API',
      version: '1.2.0',
      description: 'GROUP I594. PRACTICE PROJECT API',
    },
  },
  apis: ['src/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('<h1>Welcome!</h1>');
});

export default app;
