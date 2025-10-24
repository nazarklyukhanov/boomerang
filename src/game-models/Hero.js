class Hero {
  constructor({ position }) {
    this.skin = '🤠';
    this.position = position;
    this.y = 3; // стартуем снизу
  }

  moveLeft() {
    this.position = Math.max(0, this.position - 1);
  }

  moveRight(trackLength) {
    this.position = Math.min(trackLength - 1, this.position + 1);
  }

  moveUp() {
    this.y = Math.max(0, this.y - 1);
  }

  moveDown(height) {
    this.y = Math.min(height - 1, this.y + 1);
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;

