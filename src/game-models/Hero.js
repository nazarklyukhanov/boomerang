// Наш герой.

class Hero {
  constructor({ position }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack(trackLength) {
    // Атакуем.
    // this.boomerang.fly(this.position, trackLength);
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
