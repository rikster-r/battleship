import { Gameboard } from './gameboard';

class Player {
  constructor() {
    this.enemy = undefined;
    this.board = new Gameboard();
  }

  makeMove(x, y) {
    this.enemy.board.receiveAttack(x, y);
  }
}

class ComputerPlayer extends Player {
  constructor() {
    super();
    this.attacks = new Set();
  }

  makeMove() {
    const [x, y] = this.#generateCoords();
    super.makeMove(x, y);
  }

  #generateCoords() {
    let x, y;

    do {
      x = this.#randomNumInRange(1, 10);
      y = this.#randomNumInRange(1, 10);
    } while (this.attacks.has([x, y]));

    this.attacks.add([x, y]);
    return [x, y];
  }

  #randomNumInRange(min, max) { //min, max included
    Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class HumanPlayer extends Player {
  constructor() {
    super();
  }
}

const human = new HumanPlayer();
const computer = new ComputerPlayer();
human.enemy = computer;
computer.enemy = human;

export { human, computer };