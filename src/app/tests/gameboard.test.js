import { Gameboard } from '../gameboard.js';
import { Ship } from '../ship.js'

let game;

beforeEach(() => {
  game = new Gameboard();
})

describe('Gameboard ships tests', () => {
  test('should change coords of a ship', () => {
    game.changeShipCoords(4, 8, 7)
    let ship = new Ship(2, 8, 7);

    expect(game.ships.get(4)).toEqual(ship);
  });

  test('should change coords of multiple ships', () => {
    game.changeShipCoords(4, 8, 7);
    game.changeShipCoords(8, 5, 2, true);
    game.changeShipCoords(1, 2, 7);

    let ship1 = new Ship(2, 8, 7);
    let ship2 = new Ship(4, 5, 2, true);
    let ship3 = new Ship(1, 2, 7);
    
    expect(game.ships.get(4)).toEqual(ship1);
    expect(game.ships.get(8)).toEqual(ship2);
    expect(game.ships.get(1)).toEqual(ship3);
  });

  test('should not change coords if they are forbidden', () => {
    game.changeShipCoords(4, 100, 100);
    game.changeShipCoords(4, 0, 0);
    game.changeShipCoords(4, 'Pete', 'John');

    expect(game.ships.get(4).x).toEqual(undefined);
    expect(game.ships.get(4).y).toEqual(undefined);
  });

  test('should not change coords if they conflict with other ship', () => {
    game.changeShipCoords(5, 5, 5);

    game.changeShipCoords(4, 4, 5);
    game.changeShipCoords(4, 5, 5);
    game.changeShipCoords(4, 6, 5);
    game.changeShipCoords(4, 7, 5);
    game.changeShipCoords(4, 5, 4, true);
    game.changeShipCoords(4, 6, 4, true);
    game.changeShipCoords(4, 7, 4, true);

    
    expect(game.ships.get(4).x).toEqual(undefined);
    expect(game.ships.get(4).y).toEqual(undefined);
  });

  
})

