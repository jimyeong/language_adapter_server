const Sequelize = require("sequelize");

module.exports = class Usecases extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        usecase_id: {
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
        key_phrase: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        underscored: true,
        tableName: "usecases",
        modelName: "Usecases",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
