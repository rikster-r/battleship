import { Ship } from './ship.js';
import { randomNumInRange } from './modules/randomNumInRange.js';

export class Gameboard {
  constructor() {
    this.resetShipCoords();
    this.missed = new Set();
  }

  resetShipCoords() {
    this.ships = new Map([
      [1, new Ship(1)],
      [2, new Ship(1)],

      [3, new Ship(2)],
      [4, new Ship(2)],

      [5, new Ship(3)],
      [6, new Ship(3)],

      [7, new Ship(4)],
      [8, new Ship(4)],
    ]);
  }

  randomPlace() {
    this.resetShipCoords();

    this.ships.forEach((ship, id) => {
      let x, y, vertical;

      while (this.ships.get(id).x === undefined) {
        x = randomNumInRange(1, 10);
        y = randomNumInRange(1, 10);
        vertical = Math.random() < 0.5 ? true : false;
        this.changeShipCoords(id, x, y, vertical);
      }
    })
  }

  changeShipCoords(id, x, y, vertical = false) {
    const ship = this.ships.get(id);

    const valid = this.#validateCoords(x, y, ship.length, vertical, id);
    if (valid) {
      this.ships.set(id, new Ship(ship.length, x, y, vertical));
    };
  }

  #validateCoords(x, y, length, vertical, id) {
    if (x + length - 1 > 10) return false;
    if (y > 10) return false;
    if (vertical && y + length - 1 > 10) return false;
    if (x < 1 || y < 1) return false;
    if (typeof x != 'number' || typeof y != 'number') return false;

    for (let ship of this.ships.values()) {
      for (let i = 0; i < length; i++) { //loop for every cell of our ship
        if (vertical) {
          if (ship.hasCell(x, y + i, true)) return false;
        } else {
          if (ship.hasCell(x + i, y, true)) return false;
        }
      }
    }

    return true;
  }

  receiveAttack(x, y) {
    if (x < 1 || x > 10) return;
    if (y < 1 || y > 10) return;
    let notFound = true;

    for (const ship of this.ships.values()) { //used for because needed break statement
      if (ship.hasCell(x, y)) {
        const index = (ship.vertical) ? y - ship.y : x - ship.x;
        ship.hit(index);
        notFound = false;

        break;
      }
    }

    if (notFound) {
      this.missed.add([x, y]);
    }
  }

  areShipsSunk() {
    for (let ship of this.ships.values()) {
      if (!ship.isSunk()) return false;
    }

    return true;
  }
}