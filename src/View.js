// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(track, enemyCounter, enemyLimit) {
    // const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(track.join(''));
    console.log('\n\n');
    // console.log(`Created by "${yourTeamName}" with love`);
    console.log(`Врагов убито: ${enemyCounter} / ${enemyLimit}`);
  }

  congratulations() {
    console.log("Вы победили!");
  }
}

module.exports = View;
