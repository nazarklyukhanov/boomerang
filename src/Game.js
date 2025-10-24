const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

class Game {
  constructor({ trackLength, enemyLimit }) {
    this.trackLength = trackLength;
    this.height = 4; // четыре строки
    this.boomerang = new Boomerang();
    this.hero = new Hero({ position: 3 });
    this.enemy = new Enemy(this.trackLength, this.height);
    this.view = new View();
    this.track = [];
    this.isBoomerangInFlight = false;
    this.enemyLimit = enemyLimit;
    this.enemyCounter = 0;
    this.regenerateTrack();
  }

  heroAttack() {
    if (this.isBoomerangInFlight) return;

    this.isBoomerangInFlight = true;
    this.boomerang.position = this.hero.position + 1;
    let direction = 1;

    const interval = setInterval(() => {
      if (this.boomerang.position >= this.trackLength - 1) direction = -1;

      // 💥 Попадание во врага
      if (
        this.boomerang.position === this.enemy.position - 1 &&
        this.hero.y === this.enemy.y
      ) {
        this.enemyCounter++;
        this.enemy.respawn(); // 🆕 теперь появляется на случайной строке
        direction = -1;
      }

      if (this.boomerang.position <= this.hero.position) {
        clearInterval(interval);
        this.boomerang.position = '';
        this.isBoomerangInFlight = false;
      }

      this.boomerang.position += direction;
    }, 10);
  }

  enemyAttack() {
    setInterval(() => {
      this.enemy.moveLeft();
    }, 100);
  }

  regenerateTrack() {
    this.tracks = Array.from({ length: this.height }, () =>
      new Array(this.trackLength).fill(' ')
    );

    this.tracks[this.hero.y][this.hero.position] = this.hero.skin;
    this.tracks[this.enemy.y][this.enemy.position] = this.enemy.skin;

    if (this.boomerang.position)
      this.tracks[this.hero.y][this.boomerang.position] = this.boomerang.skin;
  }

  check() {
    if (
      this.hero.position === this.enemy.position &&
      this.hero.y === this.enemy.y
    ) {
      this.hero.die();
    }

    if (this.enemyCounter === this.enemyLimit) {
      setTimeout(() => {
        this.view.congratulations();
        process.exit();
      }, 100);
    }
    if (this.enemy.position === 0) {
      this.view.defeat(this.enemyCounter, this.enemyLimit);
      process.exit();
    }
  }

  play() {
    this.enemyAttack();
    setInterval(() => {
      this.check();
      this.regenerateTrack();
      this.view.render(this.tracks, this.enemyCounter, this.enemyLimit);
    }, 100);
  }
}

module.exports = Game;


