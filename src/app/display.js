class Display {
  constructor() {
    this.startGameButton = document.querySelector('[data-start-game]');
    this.randomPlaceButton = document.querySelector('[data-random-place]')

    this.humanField = document.querySelector('[data-human-field]');
    this.computerField = document.querySelector('[data-computer-field]');
    this.dragsContainer = document.querySelector('[data-draggable-ships]');

    this.endgameModal = document.querySelector('[data-game-end]');
    this.endgameStatus = this.endgameModal.querySelector('[data-game-status]');
  }

  update(player) {
    const field = (player.name === 'human') ? this.humanField : this.computerField;

    player.board.ships.forEach((ship, shipId) => {
      if (ship.x === undefined) return;

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
          document.querySelector(`[data-${player.name}-ship][data-ship-id="${shipId}"]`).classList.remove('active');
        } else if (ship.hits[i]) {
          shipCell.className = 'hit';
        }
      }
    });

    player.board.missed.forEach((coords) => {
      if (coords[0] > 10 || coords[0] < 0 || coords[1] > 10 || coords[1] < 0) return;
      field.querySelector(`[data-x="${coords[0]}"][data-y="${coords[1]}"]`).className = 'missed';
    });
  }

  populateField(field, func) {
    field.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        let cell = document.createElement('button');
        cell.dataset.y = i;
        cell.dataset.x = j;
        if (func) {
          cell.addEventListener('click', function (e) { func(e.target) })
        };
        field.append(cell);
      }
    }
  }
}

export const display = new Display();