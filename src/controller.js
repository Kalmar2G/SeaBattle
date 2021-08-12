import { validationResult } from 'express-validator';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import GameObj from './gameObj.js';

const user1 = new GameObj(true);
const user2 = new GameObj(false);

const getCurrentUser = () => {
  if (user1.getUserTurn()) {
    return user1;
  }
  return user2;
};

const getInactiveUser = () => {
  if (user1.getUserTurn()) {
    return user2;
  }
  return user1;
};

const getUserById = (id = 0) => {
  if (user1.userId === id) {
    return user1;
  }
  if (user2.userId === id) {
    return user2;
  }
  return 0;
};

const changeTurns = () => {
  user1.changeTurn();
  user2.changeTurn();
};

const isGameOver = () => (user1.isAllShipsDestroyed() || user2.isAllShipsDestroyed());

const restartGame = () => {
  GameObj.nullifyUsers();
  user1.restart(true);
  user2.restart(false);
};

class Controller {
  connect(req, res) {
    try {
      if (GameObj.usersCount() >= 2) {
        res.status(200).json({ code: 2 });
        return;
      }
      const currentUser = getCurrentUser();
      currentUser.userId = Math.random().toString().slice(2, 10);
      GameObj.addUser();
      changeTurns();
      res.status(200).json({ id: currentUser.userId, code: 1 });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  isAllConnected(req, res) {
    try {
      if (GameObj.usersCount() === 2) {
        res.status(200).json({ isAllConnected: true, code: 1 });
        return;
      }
      res.status(200).json({ isAllConnected: false, code: 2 });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  setField(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const arr = [];
        errors.array().forEach((e) => arr.push(e.msg));
        res.status(400).json({ msg: 'validation error', errors: arr, code: 3 });
        return;
      }
      const currentUser = getUserById(req.query.id);
      if (currentUser === 0) {
        res.status(400).json({ msg: 'User is not found', code: 2 });
        return;
      }
      currentUser.field = req.body;
      res.status(200).json({ code: 1 });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  isFieldsReady(req, res) {
    try {
      const { ships: ships1 } = user1.field.fieldState;
      const { ships: ships2 } = user2.field.fieldState;
      if ((ships1.length !== 0) && (ships2.length !== 0)) {
        res.status(200).json({ isFieldsReady: true, code: 1 });
        return;
      }
      res.status(200).json({ isFieldsReady: false, code: 2 });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  getGameState(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const arr = [];
        errors.array().forEach((e) => arr.push(e.msg));
        res.status(400).json({ msg: 'validation error', errors: arr, code: 3 });
        return;
      }
      const { id } = req.query;
      const currentUser = getUserById(id);
      if (currentUser === 0) {
        res.status(400).json({ msg: 'User is not found', code: 2 });
        return;
      }
      const actualField = currentUser.field;
      const { isGameOverFlag } = GameObj;
      res.status(200).json({ actualField, isGameOverFlag, code: 1 });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  makeHit(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const arr = [];
        errors.array().forEach((e) => arr.push(e.msg));
        res.status(400).json({ msg: 'validation error', errors: arr, code: 3 });
        return;
      }
      const currentUser = getCurrentUser();
      const inactiveUser = getInactiveUser();
      const { id, x, y } = req.query;
      if (currentUser.userId !== id) {
        res.status(400).json({ msg: 'Now is not your turn', code: 2 });
        return;
      }
      const isChangeTurns = inactiveUser.addHit({ x, y });
      if (isChangeTurns) {
        changeTurns();
      }
      if (isGameOver()) {
        GameObj.gameOver();
        setTimeout(restartGame, 10000);
      }
      const { isGameOverFlag } = GameObj;
      const enemyField = inactiveUser.makeHitFilter();
      res.status(200).json({ enemyField, isGameOverFlag, code: 1 });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  checkUsers(req, res) {
    try {
      const arr = [user1, user2];
      res.status(200).json(arr);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  restart(req, res) {
    restartGame();
    res.status(200).json({ msg: 'game restarted' });
  }
}

export default new Controller();
