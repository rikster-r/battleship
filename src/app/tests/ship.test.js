import {Ship} from '../ship.js'
let ship = new Ship(4);


test('should create ship with defined length', () => {
  expect(ship.length).toEqual(4);
})

test('should create hits array', () => {
  expect(ship.hits).toEqual([false, false, false, false]);
})

test('should not be sunk', () => {
  expect(ship.isSunk()).toEqual(false);
})

test('should register a hit', () => {
  ship.hit(0)

  expect(ship.hits).toEqual([true, false, false, false])
})

test('should register multiple hits', () => {
  ship.hit(0);
  ship.hit(2);

  expect(ship.hits).toEqual([true, false, true, false])
})

test('should register getting sunk', () => {
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);

  expect(ship.isSunk()).toEqual(true);
})