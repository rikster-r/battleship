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
    this.missed = [];
  }

  changeShipCoords(id, x, y, vertical = false) {
    const ship = this.ships.get(id);

    const valid = this.#validateCoords(x, y, ship.length, vertical, id);
    if (valid) {
      this.ships.set(id, new Ship(ship.length, x, y, vertical));
    };
  }

  #validateCoords(x, y, length, vertical, id) {
    let valid = true;

    if (x + length - 1 > 10) valid = false;
    if (y > 10) valid = false;
    if (vertical && y + length - 1 > 10) valid = false;
    if (x < 1 || y < 1) valid = false;
    if (typeof x != 'number' || typeof y != 'number') valid = false;

    this.ships.forEach((ship, shipId) => { //check if coords conflict with other ships
      if (shipId === id) return; //skip if checking for our ship itself
      if (ship.length === undefined) return;

      for (let i = 0; i < length; i++) { //loop for every cell of our ship
        if (vertical) {
          if (ship.hasCell(x, y + i)) valid = false;
        } else {
          if (ship.hasCell(x + i, y)) valid = false;
        }
      }
    })

    return valid;
  }

  receiveAttack(x, y) {
    this.ships.forEach(ship => {
      if (ship.hasCell(x, y)) {
        const index = (ship.vertical) ? x - ship.x : y - ship.y;
        ship.hit(index);
      } else {
        this.missed.push([x, y]);
      }
    });
  }

  areShipsSunk() {
    return this.ships.every(ship => {
      ship.isSunk();
    })
  }
}