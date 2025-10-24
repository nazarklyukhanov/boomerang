// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const runInteractiveConsole = require('./keyboard');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang();
    this.hero = new Hero({ position: 3, boomerang: this.boomerang }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy(this.trackLength);
    this.view = new View();
    this.track = [];
    this.isBoomerangInFlight = false;
    this.regenerateTrack();
  }

  heroAttack() {
    // Проверяем, не летит ли уже бумеранг
    if (this.isBoomerangInFlight) {
      console.log('Бумеранг уже в запустили!');
      return;
    }

    this.isBoomerangInFlight = true; // Устанавливаем флаг
    this.boomerang.position = this.hero.position + 1;
    let direction = 1;

    const interval = setInterval(() => {
      // Меняем направление, если долетели до края
      if (this.boomerang.position >= this.trackLength - 1) direction = -1;
      
      // меняет скин врага и возвращаем его на стартовую позицию, если в него попал бумеранг
      if (this.boomerang.position === this.enemy.position-1) {
        this.enemy.generateSkin();
        this.enemy.position = this.trackLength;
        direction = -1;
      }
      
      // если бумеранг долетел до героя цикл прекращается
      if (this.boomerang.position <= this.hero.position) {
        clearInterval(interval);
        this.boomerang.position = '';
        this.isBoomerangInFlight = false; // ← СБРАСЫВАЕМ ФЛАГ
      };

      this.boomerang.position += direction;
    }, 10);
  }

  enemyAttack() {
    setInterval(() => {
      this.enemy.moveLeft();
      // if (this.enemy) {

      // }
    }, 100);
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
    this.track[this.enemy.position] = this.enemy.skin;
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
    // if (this.boomerang.position === this.enemy.position) {
    //   this.enemy.die();
    // }
    // if (this.boomerang.position === this.hero.position) {
    //   this.track[this.boomerang.position] = ' '
    // }
  }

  play() {
    this.enemyAttack();
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    });
  }
}

module.exports = Game;
