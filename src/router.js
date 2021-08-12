import Router from 'express';
import { idValidator, fieldValidator, hitValidator } from './validator.js';
import controller from './controller.js';

const router = new Router();

/**
 * @swagger
 * tags:
 *  - name: Game routes
 *  - name: Test routes
 */

/**
 * @swagger
 * /connect:
 *  get:
 *      summary: Connection to the game (assignment ID to user)
 *      tags: [Game routes]
 *      responses:
 *          "200":
 *              description: User ID and successful code or error code
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                              code:
 *                                  type: number
 *                      examples:
 *                          success:
 *                              summary: New user connected and got ID
 *                              value:
 *                                  id: 54053762
 *                                  code: 1
 *                          error:
 *                              summary: A lot of users (2+)
 *                              value:
 *                                  code: 2
 */
router.get('/connect', controller.connect);

/**
 * @swagger
 * /isAllConnected:
 *  get:
 *      summary: Checks for two connected users
 *      tags: [Game routes]
 *      responses:
 *          "200":
 *              description: The game can be started(true/false)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isAllConnected:
 *                                  type: boolean
 *                              code:
 *                                  type: number
 *                      examples:
 *                          success:
 *                              summary: The game can be started (2 users connected)
 *                              value:
 *                                  isAllConnected: true
 *                                  code: 1
 *                          error:
 *                              summary: The game can't be started (2 users aren't connected)
 *                              value:
 *                                  isAllConnected: false
 *                                  code: 2
 */
router.get('/isAllConnected', controller.isAllConnected);

/**
 * @swagger
 * /setField:
 *   post:
 *     summary: Setting user field
 *     tags: [Game routes]
 *     parameters:
 *             - in: query
 *               name: id
 *               required: true
 *               schema:
 *                 type: number
 *                 example: 54053762
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      type: array
 *                      items:
 *                              type: object
 *                              properties:
 *                                  x:
 *                                      type: number
 *                                      example: 4
 *                                  y:
 *                                      type: number
 *                                      example: 2
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      code:
 *                          type: number
 *                          example: 1
 *       400:
 *         description: Error message
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      msg:
 *                          type: string
 *                      errors:
 *                          type: array
 *                      code:
 *                          type: number
 *              examples:
 *                  1:
 *                      summary: User is not found
 *                      value:
 *                          msg: User is not found
 *                          code: 2
 *                  2:
 *                      summary: Validation error
 *                      value:
 *                          msg: validation error
 *                          errors: ['Identifier consists of 8 digits', 'You must send array with 2 ships']
 *                          code: 3
 */
router.post('/setField', idValidator, fieldValidator, controller.setField);

/**
 * @swagger
 * /isFieldsReady:
 *  get:
 *      summary: Both users set their fields
 *      tags: [Game routes]
 *      responses:
 *          "200":
 *              description: Success or error message
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isFieldsReady:
 *                                  type: boolean
 *                              code:
 *                                  type: number
 *                      examples:
 *                          success:
 *                              summary: All fields are set
 *                              value:
 *                                  isFieldsReady: true
 *                                  code: 1
 *                          error:
 *                              summary: Fields aren't set
 *                              value:
 *                                  isFieldsReady: false
 *                                  code: 2
 */
router.get('/isFieldsReady', controller.isFieldsReady);

/**
 * @swagger
 * /getGameState:
 *  get:
 *      summary: State of your field
 *      tags: [Game routes]
 *      parameters:
 *             - in: query
 *               name: id
 *               required: true
 *               schema:
 *                 type: number
 *                 example: 54053762
 *      responses:
 *          "200":
 *              description: Full state of user field
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              actualField:
 *                                  type: object
 *                                  properties:
 *                                      fieldState:
 *                                          type: object
 *                                          properties:
 *                                              ships:
 *                                                  type: array
 *                                                  items:
 *                                                      type: array
 *                                                      items:
 *                                                          type: object
 *                                                          properties:
 *                                                              x:
 *                                                                  type: number
 *                                                                  example: 5
 *                                                              y:
 *                                                                  type: number
 *                                                                  example: 7
 *                                                              hit:
 *                                                                  type: boolean
 *                                                                  example: false
 *                                              hitCells:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          x:
 *                                                              type: number
 *                                                              example: 6
 *                                                          y:
 *                                                              type: number
 *                                                              example: 2
 *                                      isYourTurn:
 *                                          type: boolean
 *                                          example: true
 *                              isGameOverFlag:
 *                                  type: boolean
 *                                  example: false
 *                              code:
 *                                  type: number
 *                                  example: 1
 *          "400":
 *              description: User is not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                              errors:
 *                                  type: array
 *                              code:
 *                                  type: number
 *                      examples:
 *                          1:
 *                              summary: User is not found
 *                              value:
 *                                  msg: User is not found
 *                                  code: 2
 *                          2:
 *                              summary: Validation error
 *                              value:
 *                                  msg: validation error
 *                                  errors: ['Identifier consists of 8 digits']
 *                                  code: 3
 */
router.get('/getGameState', idValidator, controller.getGameState);

/**
 * @swagger
 * /makeHit:
 *  get:
 *      summary: Hit on the enemy field
 *      tags: [Game routes]
 *      parameters:
 *             - in: query
 *               name: id
 *               required: true
 *               schema:
 *                 type: number
 *                 example: 54053762
 *             - in: query
 *               name: x
 *               required: true
 *               schema:
 *                 type: number
 *                 example: 3
 *             - in: query
 *               name: y
 *               required: true
 *               schema:
 *                 type: number
 *                 example: 7
 *      responses:
 *          "200":
 *              description: Enemy field state (only hit cells)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              enemyField:
 *                                  type: object
 *                                  properties:
 *                                      fieldState:
 *                                          type: object
 *                                          properties:
 *                                              ships:
 *                                                  type: array
 *                                                  items:
 *                                                      type: array
 *                                                      items:
 *                                                          type: object
 *                                                          properties:
 *                                                              x:
 *                                                                  type: number
 *                                                                  example: 5
 *                                                              y:
 *                                                                  type: number
 *                                                                  example: 7
 *                                                              hit:
 *                                                                  type: boolean
 *                                                                  example: true
 *                                              hitCells:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          x:
 *                                                              type: number
 *                                                              example: 6
 *                                                          y:
 *                                                              type: number
 *                                                              example: 2
 *                              isGameOverFlag:
 *                                  type: boolean
 *                                  example: false
 *                              code:
 *                                  type: number
 *                                  example: 1
 *          "400":
 *              description: Now is not your turn
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                              errors:
 *                                  type: array
 *                              code:
 *                                  type: number
 *                      examples:
 *                          1:
 *                              summary: Now is not your turn
 *                              value:
 *                                  msg: Now is not your turn
 *                                  code: 2
 *                          2:
 *                              summary: Validation error
 *                              value:
 *                                  msg: validation error
 *                                  errors: ['Identifier consists of 8 digits', 'X is a number between 0 and 9', 'Y is a number between 0 and 9']
 *                                  code: 3
 */
router.get('/makeHit', idValidator, hitValidator, controller.makeHit);

/**
 * @swagger
 * /checkUsers:
 *  get:
 *      summary: TESTING ONLY, not used in the game. Shows the state of both users
 *      tags: [Test routes]
 *      responses:
 *          200:
 *              description: Array of users
 */
router.get('/checkUsers', controller.checkUsers);

/**
 * @swagger
 * /restart:
 *  get:
 *      summary: TESTING ONLY, not used in the game. Nullifies user objects
 *      tags: [Test routes]
 *      responses:
 *          200:
 *              description: success message
 */
router.get('/restart', controller.restart);

export default router;
