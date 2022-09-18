import { human, computer } from './player';

export class Display {
  constructor() {
    this.startGameButton = document.querySelector('[data-start-game]');
    this.humanField = document.querySelector('[data-human-field]');
    this.computerField = document.querySelector('[data-computer-field]');
    this.dragndrops = document.querySelectorAll('[draggable="true"]');

    this.currentPlayer = human;
    this.gameGoing = false;
  }

  startGame() {
    // this.startGameButton.classList.add('hidden');
    // this.document.querySelector('.computer-side').classList.remove('hidden');
    // this.populateField(this.humanField);
    // this.populateField(this.computerField);
    // this.gameGoing = true;
  }

  update(player) {
    const field = (player.name === 'human') ? this.humanField : this.computerField;

    player.board.ships.forEach((ship, shipId) => {
      if (!ship.x) return;

      for (let i = 0; i < ship.length; i++) {
        let shipCell;

        if (ship.vertical) {
          shipCell = field.querySelector(`[data-x="${ship.x}"][data-y="${ship.y + i}"]`);
        } else {
          shipCell = field.querySelector(`[data-x="${ship.x + i}"][data-y="${ship.y}"]`);
        }

        shipCell.dataset.id = shipId;

        if (ship.isSunk()) {
          shipCell.className = 'sunk';
          document.querySelector(`[data-${player.name}-ship][data-ship-id="${shipId}"]`).classList.remove('active')
        } else if (ship.hits[i]) {
          shipCell.className = 'hit';
        }
      }
    });

    player.board.missed.forEach((coords) => {
      field.querySelector(`[data-x="${coords[0]}"][data-y="${coords[1]}"]`).className = 'missed';
    });
  }

  populateField(field, func) {
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        let cell = document.createElement('button');
        cell.dataset.y = i;
        cell.dataset.x = j;
        if (func) {
          cell.addEventListener('click', (e) => func(e.target))
        };
        field.append(cell);
      }
    }
  }
}