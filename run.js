// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 30,
  enemyLimit: 5
});

runInteractiveConsole(game);
// Запуск игры.
game.play();
