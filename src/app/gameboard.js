import { Ship } from './ship.js';

export class Gameboard {
  constructor() {
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
    this.missed = new Set();
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

    for (let [shipId, ship] of this.ships.entries()) {
      if (shipId === id) continue; //skip if checking for our ship itself
      if (ship.length === undefined) continue;

      for (let i = 0; i <= length; i++) { //loop for every cell of our ship
        if (vertical) {
          if (ship.hasCell(x, y + i)) return false;
        } else {
          if (ship.hasCell(x + i, y)) return false;
        }
      }
    }

    return true;
  }

  receiveAttack(x, y) {
    if (x < 1 || x > 10) return;
    if (y < 1 || y > 10) return;
    let notFound = true;

    for (const ship of this.ships.values()) { //used for because i needed break
      if (ship.hasCell(x, y)) {
        const index = (ship.vertical) ? y - ship.y : x - ship.x;
        ship.hit(index);
        notFound = false;

        if (ship.isSunk()) this.#missSurroundingCells(ship);
        break;
      }
    }

    if (notFound) {
      this.missed.add([x, y]);
    }
  }

  #missSurroundingCells(ship) {
    if (ship.vertical) {
      for (let i = -1; i <= ship.length; i++) {
        this.missed.add([ship.x - 1, ship.y + i]);
        this.missed.add([ship.x + 1, ship.y + i]);
      }

      this.missed.add([ship.x, ship.y - 1]);
      this.missed.add([ship.x, ship.endY + 1]);

    } else {
      for (let i = -1; i <= ship.length; i++) {
        this.missed.add([ship.x + i, ship.y - 1]);
        this.missed.add([ship.x + i, ship.y + 1]);
      }

      this.missed.add([ship.x - 1, ship.y]);
      this.missed.add([ship.endX + 1, ship.y]);
    }
  }

  areShipsSunk() {
    return this.ships.every(ship => {
      ship.isSunk();
    })
  }
}