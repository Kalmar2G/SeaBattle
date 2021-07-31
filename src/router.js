import Router from 'express';
import controller from './controller.js';

const router = new Router();

/**
 * @swagger
 * /connect:
 *  get:
 *      summary: Connection to the game (assignment ID to user)
 *      responses:
 *          "200":
 *              description: user ID and successful status or negative status
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: number
 *                              status:
 *                                  type: number
 *                      examples:
 *                          success:
 *                              summary: New user connected and got ID
 *                              value:
 *                                  id: 54053762
 *                                  status: 1
 *                          error:
 *                              summary: A lot of users (2+)
 *                              value:
 *                                  status: 2
 */
router.get('/connect', controller.connect);

/**
 * @swagger
 * /isAllConnected:
 *  get:
 *      summary: Check 2 users are connected
 *      responses:
 *          "200":
 *              description: Can to start game ( true / false)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              started:
 *                                  type: boolean
 *                      examples:
 *                          success:
 *                              summary: Game can be started (2 users connected)
 *                              value:
 *                                  started: true
 *                          error:
 *                              summary: Not enough users
 *                              value:
 *                                  started: false
 */
router.get('/isAllConnected', controller.isAllConnected);

/**
 * @swagger
 * /setField:
 *   post:
 *     summary: Setting user field
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
 *                                  hit:
 *                                      type: boolean
 *                                      example: false
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
 *                          example: field set
 *       400:
 *         description: Error message
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      msg:
 *                          type: string
 *              examples:
 *                  1:
 *                      summary: User is not found
 *                      value:
 *                          msg: User is not found
 *                  2:
 *                      summary: Not enough ships
 *                      value:
 *                          msg: Not enough ships
 */
router.post('/setField', controller.setField);

/**
 * @swagger
 * /isFieldsReady:
 *  get:
 *      summary: Both users set their fields
 *      responses:
 *          "200":
 *              description: Success or error message
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ready:
 *                                  type: boolean
 *                      examples:
 *                          success:
 *                              summary: Set 2 fields
 *                              value:
 *                                  ready: true
 *                          error:
 *                              summary: Set <2 fields
 *                              value:
 *                                  ready: false
 */
router.get('/isFieldsReady', controller.isFieldsReady);

/**
 * @swagger
 * /getGameState:
 *  get:
 *      summary: State of your field
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
 *                              fieldState:
 *                                  type: object
 *                                  properties:
 *                                      ships:
 *                                          type: array
 *                                          items:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      x:
 *                                                          type: number
 *                                                          example: 5
 *                                                      y:
 *                                                          type: number
 *                                                          example: 7
 *                                                      hit:
 *                                                          type: boolean
 *                                                          example: false
 *                                      hitCells:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  x:
 *                                                      type: number
 *                                                      example: 6
 *                                                  y:
 *                                                      type: number
 *                                                      example: 2
 *                              isYourTurn:
 *                                  type: boolean
 *                                  example: true
 */
router.get('/getGameState', controller.getGameState);

/**
 * @swagger
 * /makeHit:
 *  get:
 *      summary: Hit on the enemy field
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
 *                              fieldState:
 *                                  type: object
 *                                  properties:
 *                                      ships:
 *                                          type: array
 *                                          items:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      x:
 *                                                          type: number
 *                                                          example: 5
 *                                                      y:
 *                                                          type: number
 *                                                          example: 7
 *                                                      hit:
 *                                                          type: boolean
 *                                                          example: true
 *                                      hitCells:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  x:
 *                                                      type: number
 *                                                      example: 6
 *                                                  y:
 *                                                      type: number
 *                                                      example: 2
 *          "400":
 *              description: Now is not your turn
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: Now is not your turn
 */
router.get('/makeHit', controller.makeHit);

/**
 * @swagger
 * /checkUsers:
 *  get:
 *      summary: TESTING ONLY, not used in the game. Shows the state of both users
 *      responses:
 *          200:
 *              description: Array of users
 */
router.get('/checkUsers', controller.checkUsers);

/**
 * @swagger
 * /restart:
 *  get:
 *      summary: TESTING ONLY, endpoint not used in the game. Nullifies user objects
 *      responses:
 *          200:
 *              description: success message
 */
router.get('/restart', controller.restart);

export default router;
