const Sequelize = require("sequelize");

module.exports = class EnglishWords extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        english_word_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        english_word: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        underscored: true,
        tableName: "english_words",
        modelName: "EnglishWords",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.EnglishWords.hasMany(db.Meanings, {
      foreignKey: "english_word_id",
      onDelete: "cascade",
      as: "meanings",
    });
  }
};
