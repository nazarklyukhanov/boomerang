// Основной файл.
const keypress = require('keypress');
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');

function askUserName(callback) {
  let userName = '';
  
  console.clear();
  process.stdout.write('Please, enter your name: ');
  
  // Временная обработка клавиш для ввода имени
  const stdin = process.stdin;
  keypress(stdin);
  
  const nameHandler = (ch, key) => {
    if (key && key.ctrl && key.name === 'c') {
      process.exit();
    }
    
    if (key && key.name === 'return') {
      // Завершаем ввод имени
      stdin.removeListener('keypress', nameHandler);
      console.log('\n'); // Переход на новую строку
      callback(userName.trim() || 'Player');
      return;
    }
    
    if (key && key.name === 'backspace') {
      if (userName.length > 0) {
        userName = userName.slice(0, -1);
        process.stdout.write('\rPlease, enter your name: ' + userName + ' ');
        process.stdout.write('\rPlease, enter your name: ' + userName);
      }
      return;
    }
    
    if (ch && ch >= ' ' && ch <= '~') { // Печатные символы
      userName += ch;
      process.stdout.write(ch);
    }
  };
  
  stdin.on('keypress', nameHandler);
  stdin.setRawMode(true);
  stdin.resume();
}

function startGame() {
  askUserName((userName) => {
    const game = new Game({
      trackLength: 60,
      enemyLimit: 5,
      name: userName,
    });
    
    // Теперь запускаем основную игру и управление
    game.play();
    runInteractiveConsole(game);
  });
}

startGame();