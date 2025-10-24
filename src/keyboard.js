// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');

function runInteractiveConsole(game) {
  const keyboard = {
    a: () => game.hero.moveLeft(),
    d: () => game.hero.moveRight(game.trackLength),
    w: () => game.hero.moveUp(),
    s: () => game.hero.moveDown(game.height),
    space: () => game.heroAttack(),
  };

  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key && key.name in keyboard) keyboard[key.name]();
    if (key && key.ctrl && key.name === 'c') process.exit();
  });
  process.stdin.setRawMode(true);
}

module.exports = runInteractiveConsole;

