import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';

const arr = [];

const app = express();

app.use(express.json());
const logger = morgan('combined');
app.use(logger);
app.set('view engine', 'pug');

/**
 * @swagger
 * /viewUsers:
 *  get:
 *      summary: Use to view user list
 *      responses:
 *          "200":
 *              description: Array of users
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                          example: Dima
 *                                      age:
 *                                          type: number
 *                                          example: 5
 *                                      height:
 *                                          type: number
 *                                          example: 18
 */
app.get('/viewUsers', (req, res) => {
    res.status(200).json(arr);
});

/**
 * @swagger
 * /addUser:
 *   post:
 *     summary: Use to add a new user
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: Dima
 *                      age:
 *                          type: number
 *                          example: 0
 *                      height:
 *                          type: number
 *                          example: 18
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      msg:
 *                          type: string
 *                          example: User added successfully
 */

app.post('/addUser', (req, res) => {
    const user = { name: req.body.name, age: req.body.age, height: req.body.height };
    arr.push(user);
    res.status(200).json({ msg: 'User added successfully' });
});

const options = {
    definition: {
        openapi: '3.0.0',
    },
    apis: ['index.js'],
};

const specs = swaggerJsdoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.send('<h1>Poshel gulatb</h2>');
});

export default app;