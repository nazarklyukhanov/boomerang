// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '🌀';
    // this.position = heroPos+1;
    this.position = null;
  }

  fly(heroPos, trackLength) {
    this.position = heroPos + 1;
    let direction = 1; // 1 — летим вправо, -1 — обратно

    const interval = setInterval(() => {
      this.position += direction;

      // Меняем направление, если долетели до края
      if (this.position >= trackLength - 1) direction = -1;
      if (this.position <= heroPos) clearInterval(interval);
    }, 100);
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;
