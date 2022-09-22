import { Gameboard } from './gameboard';
import { randomNumInRange } from './modules/randomNumInRange';

  class Player {
    constructor(name) {
      this.name = name;
      this.enemy = undefined;
      this.board = new Gameboard();
    }

    makeMove(x, y) {
      this.enemy.board.receiveAttack(x, y);
    }
  }

class ComputerPlayer extends Player {
  constructor() {
    super('computer');
    this.attacks = new Set();
  }

  makeMove() {
    const [x, y] = this.#generateCoords();
    super.makeMove(x, y);
  }

  #generateCoords() {
    let x, y;

    do {
      x = randomNumInRange(1, 10);
      y = randomNumInRange(1, 10);
    } while (this.attacks.has([x, y]));

    this.attacks.add([x, y]);
    return [x, y];
  }
}

class HumanPlayer extends Player {
  constructor() {
    super('human');
  }
}

const human = new HumanPlayer();
const computer = new ComputerPlayer();
human.enemy = computer;
computer.enemy = human;

export { human, computer };