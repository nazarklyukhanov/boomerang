class Enemy {
  constructor(trackLength, height) {
    this.trackLength = trackLength;
    this.height = height;
    this.skin = '👾';
    this.generateSkin();
    this.respawn(); // создаём с рандомной строкой
  }

  generateSkin() {
    const skins = ['👾', '👹', '👻', '👽', '👿', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  // появляется справа на случайной строке
  respawn() {
    this.position = this.trackLength - 1;
    this.y = Math.floor(Math.random() * this.height);
  }

  moveLeft() {
    this.position = Math.max(0, this.position - 1);
  }

  die() {
    this.skin = '💀';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;


