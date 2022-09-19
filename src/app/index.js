import '../style.scss';
import { Display } from './display';
import { human } from './player';

function drag(e) {
  e.dataTransfer.setData('id', e.target.dataset.id);
  e.dataTransfer.setData('direction', e.target.dataset.vertical);
}

function drop(e) {
  const shipId = Number(e.dataTransfer.getData('id'));
  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);
  const vertical = e.dataTransfer.getData('direction');

  human.board.changeShipCoords(shipId, x, y, vertical);
  if (human.board.ships.get(shipId).x) { //if coords changed
    document.querySelector(`[draggable="true"][data-id="${shipId}"`).remove();
  };
  display.update(human);
}

function changeDirection(e) {
  const target = e.target.closest('.ship-wrapper');
  target.dataset.vertical = (target.dataset.vertical) ? '' : 'true';
}

const display = new Display();
display.populateField(display.humanField);
display.populateField(display.computerField);

display.startGameButton.addEventListener('click', function () {
  display.startGame();
});

display.dragndrops.forEach(dnd => {
  dnd.addEventListener('dragstart', function (e) {
    drag(e);
  });

  dnd.addEventListener('click', function(e) {
    changeDirection(e);
  })
});

display.humanField.addEventListener('dragover', function (e) {
  e.preventDefault();
});

display.humanField.addEventListener('drop', function(e) {
  drop(e)
})