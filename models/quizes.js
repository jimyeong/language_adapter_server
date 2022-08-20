const Sequelize = require("sequelize");

module.exports = class Quizes extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        quiz_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        lang_english: {
          type: Sequelize.TEXT,
        },
        lang_origin: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        tableName: "quizes",
        modelName: "Quizes",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Quizes.hasMany(db.Hints, {
      foreignKey: "quiz_id",
      onDelete: "cascade",
      as: "hints",
    });
  }
};
