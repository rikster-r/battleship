import { human, computer } from './player';
import { display } from './display';

export class Game {
  constructor() {
    this.human = human;
    this.computer = computer;
    this.currentPlayer = human;
  }

  start() {
    if (display.dragsContainer.firstElementChild) return;

    display.startGameButton.classList.add('hidden');
    display.randomPlaceButton.classList.add('hidden');
    document.querySelector('.computer-side').classList.remove('hidden');
  }

  attackComputer(cell) {
    if (cell.classList.length > 0) return;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    this.currentPlayer.makeMove(x, y);

    if (this.checkWin()) {
      this.end();
    }

    display.update(this.currentPlayer.enemy);
    this.currentPlayer = computer;
    this.attackHuman();
  }

  attackHuman() {
    this.currentPlayer.makeMove();
    display.update(this.currentPlayer.enemy);
    this.currentPlayer = human;
  }

  checkWin() {
    return this.currentPlayer.enemy.board.areShipsSunk();
  }

  end() {
    display.endgameStatus.innerText = (this.currentPlayer === human) ? 'won' : 'lost';
    display.endgameModal.showModal();
  }
}