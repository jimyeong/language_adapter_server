const Sequelize = require("sequelize");

module.exports = class Synonyms extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        synonym_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        synonym: {
          type: Sequelize.STRING(60),
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        underscored: true,
        tableName: "synonyms",
        modelName: "Synonyms",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
