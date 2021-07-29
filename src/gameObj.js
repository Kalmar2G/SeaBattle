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
    let hasChanged = false;
    hit.x = Number(hit.x);
    hit.y =  Number(hit.y);
    this.fieldState.ships.map((ship) => ship.forEach(cell => {
      if ((cell.x === hit.x) && (cell.y ===  hit.y)) {
        cell.hit = true;
        hasChanged = true;
      }
    }));
    if (!hasChanged) {
      this.fieldState.hitCells.push(hit);
    }
  }

  makeHitFilter() {
    const filteredShips = this.fieldState.ships.map((ship) => ship.filter((cell) => cell.hit === true));
    return  {
      fieldState: {
        ships: filteredShips,
        hitCells: this.fieldState.hitCells,
      }
    }
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
