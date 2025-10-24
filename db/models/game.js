'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Game.init(
    {
      enemies_killed: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      seconds: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Game',
    },
  );

  // 🔥 Общая функция для пересчёта статистики
  async function recalcUserStats(game, options) {
    const { User, Game } = sequelize.models;

    // Получаем сумму врагов и секунд по всем играм конкретного юзера
    const stats = await Game.findOne({
      where: { user_id: game.user_id },
      attributes: [
        [
          sequelize.fn(
            'COALESCE',
            sequelize.fn('SUM', sequelize.col('enemies_killed')),
            0,
          ),
          'totalKills',
        ],
        [
          sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('seconds')), 0),
          'totalSeconds',
        ],
      ],
      raw: true,
    });

    // Обновляем запись пользователя
    await User.update(
      {
        rating: stats.totalKills,
        total_seconds: stats.totalSeconds,
      },
      { where: { id: game.user_id } },
    );
  }

  // 📌 Триггеры
  Game.afterCreate(recalcUserStats);
  Game.afterUpdate(recalcUserStats);
  Game.afterDestroy(recalcUserStats);

  return Game;
};
