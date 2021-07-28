export default class GameObj {
  constructor(firstTurn) {
    this.fieldState = {
      ships: [],
      hitCells: [],
    };
    this.isYourTurn = firstTurn;
    this.isGameEnd = false;
  }
  static countUsers = 0;
  id;
  get field() {
    const state = {};
    state.fieldState = this.fieldState;
    state.isYourTurn = this.isYourTurn;
    return state;
  }

  getUserTurn() {
    return this.isYourTurn;
  }

  set field(field) {
    this.fieldState.ships = [...field];
  }

  changeTurn() {
    this.isYourTurn = this.isYourTurn !== true;
  }

  set userId(id) {
    this.id = id;
  }

  addHit(hit) {
    this.fieldState.hitCells.push(hit);
  }

  get userId() {
    return this.id;
  }
  static addUser() {
    GameObj.countUsers += 1;
  }

  static usersCount() {
    return GameObj.countUsers;
  }
}
