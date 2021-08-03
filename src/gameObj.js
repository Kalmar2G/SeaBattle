export default class GameObj {
  constructor(firstTurn) {
    this.fieldState = {
      ships: [],
      hitCells: [],
    };
    this.isYourTurn = firstTurn;
  }
  static countUsers = 0;
  static isGameOverFlag = false;
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
    this.fieldState.ships.forEach((ship) => {
      ship.forEach((cell) => {
       cell['hit'] = false;
      });
    });
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
        this.addHitCellsAfterDestroyShip(ship);
      }
    }));
    if (!hasChanged) {
      this.fieldState.hitCells.push(hit);
      return true;
    }
    return false;
  }
  addHitCellsAfterDestroyShip(ship) {
    const shipCells = ship.length;
    const shipHitCells = ship.reduce((acc, cell) => {
      if (cell.hit === true) {
        return acc + 1;
      }
      return acc;
    }, 0);
    if (shipCells === shipHitCells) {
      ship.forEach((cell) => {
        for (let i = cell.x - 1; i <= cell.x + 1; i += 1) {
          for (let j = cell.y - 1; j <= cell.y + 1; j += 1) {
            if ((i >= 0) && (j >= 0) && (i <= 9) && (j <= 9) && !((i === cell.x) && (j === cell.y))) {
              let cellFlag = false;
              let shipFlag = false;
              this.fieldState.hitCells.forEach((cell) => {
                if ((cell.x === i) && (cell.y === j)) {
                  cellFlag = true;
                }
              });
              ship.forEach((cell) => {
                if ((cell.x === i) && (cell.y === j)) {
                  shipFlag = true;
                }
              });
              if (!cellFlag && !shipFlag) {
              this.fieldState.hitCells.push({ x: i, y: j });
              }
            }
          }
        }
      });
    }
  }

  makeHitFilter() {
    const filteredShips = this.fieldState.ships
        .map((ship) => ship.filter((cell) => cell.hit === true))
        .filter((ship) => ship.length > 0);
    return  {
      fieldState: {
        ships: filteredShips,
        hitCells: this.fieldState.hitCells,
      }
    }
  }

  isAllShipsDestroyed() {
    const hitShips = this.fieldState.ships.map((ship) => ship.filter((cell) => cell.hit === true));
    //пока тестируем на меньшем количестве кораблей пусть будет так, в настоящей игре можно будет просто сравнивать с 20
    const hitCellsCount = hitShips.reduce((acc, ship) => acc + ship.length, 0);
    const cellsCount = this.fieldState.ships.reduce((acc, ship) => acc + ship.length, 0);
    return hitCellsCount === cellsCount;

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

  static nullifyUsers() {
    GameObj.countUsers = 0;
  }
  static gameOver() {
    GameObj.isGameOverFlag = true;
  }
  restart(turn) {
    this.fieldState = {
      ships: [],
      hitCells: [],
    };
    this.isYourTurn = turn;
    this.id = null;
    GameObj.isGameOverFlag = false;
  }
}
