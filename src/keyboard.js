// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

// Какая-то функция.

function runInteractiveConsole(game) {
  const keyboard = {
    w: () => console.log('w'),
    s: () => console.log('s'),
    d: () => game.hero.moveRight(),
    a: () => game.hero.moveLeft(),
    space: () => game.hero.attack(game.trackLength),
  };

  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

// Давай попробуем запустить этот скрипт!

// runInteractiveConsole();
module.exports = runInteractiveConsole;
