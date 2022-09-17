import { human, computer } from '../player';

test('should initialize enemy', () => {
  expect(human.enemy).toEqual(computer);
  expect(computer.enemy).toEqual(human);
})

test('should create gameboard', () => {
  expect(human.board).not.toEqual(undefined);
  expect(computer.board).not.toEqual(undefined);
})

test('human should be able to make a move', () => {
  human.makeMove(10, 10);

  expect(Array.from(computer.board.missed)).toEqual([[10, 10]]);
})

test('computer should generate a move', () => {
  computer.makeMove();

  expect(human.board.missed.size).not.toEqual(0);
})

