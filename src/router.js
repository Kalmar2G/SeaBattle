import Router from 'express';
import controller from './controller.js';

const router = new Router();

router.get('/connect', controller.connect);

router.get('/isAllConnected', controller.isAllConnected);

router.post('/setField', controller.setField);

router.get('/isFieldsReady', controller.isFieldsReady);

router.get('/getGameState', controller.getGameState);

router.get('/makeHit', controller.makeHit);

router.get('/checkUsers', controller.checkUsers);

export default router;
