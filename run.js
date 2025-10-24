// Основной файл.
// Запускает игру.
const keypress = require('keypress');
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');


// Инициализация игры с настройками.
const game = new Game({
  trackLength: 40,
  enemyLimit: 5
});

runInteractiveConsole(game);
// Запуск игры.
game.play();
