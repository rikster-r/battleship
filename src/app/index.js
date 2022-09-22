import '../style.scss';
import { display } from './display';
import './modules/dragndrop';
import { Game } from './game';

const game = new Game();

display.populateField(display.humanField);
display.populateField(display.computerField, (target) => game.attackComputer(target));
game.computer.board.randomPlace();

display.startGameButton.addEventListener('click', function () {
  game.start();
});

display.randomPlaceButton.addEventListener('click', () => {
  game.human.board.randomPlace();
  
  display.populateField(display.humanField);
  display.update(game.human);
  display.dragsContainer.innerHTML = '';
});