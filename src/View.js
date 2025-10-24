// Сделаем отдельный класс для отображения игры в консоли.
class View {
  render(tracks, counter, limit) {
    console.clear();
    console.log('='.repeat(tracks[0].length + 4));
    tracks.forEach(row => console.log('| ' + row.join('') + ' |'));
    console.log('='.repeat(tracks[0].length + 4));
    console.log(`\nВрагов убито: ${counter} / ${limit}`);
  }

  congratulations(name) {
    console.clear();
    console.log(`${name}, победа! Все враги повержены! 🎉`);
  }

  defeat(counter, limit){
    console.clear();
    console.log('Вы проиграли');
    console.log(`Ваш счет ${counter} / ${limit}`);
    
  }
}

module.exports = View;

