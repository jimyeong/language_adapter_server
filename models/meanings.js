const Sequelize = require("sequelize");

module.exports = class Meanings extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        meaning_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        explanation_en: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        explanation_mt: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        meaning_image: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        underscored: true,
        tableName: "meanings",
        modelName: "Meanings",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // 외래키가 어디 정의되는지가 기준임,
    // hasMany 1:M 관계 1st param 은 target인데 hasMany는 타겟 테이블에 외래키가 정의됨
    db.Meanings.hasMany(db.Tags, {
      foreignKey: "meaning_id",
      onDelete: "cascade",
      as: "tags",
    });
    db.Meanings.hasMany(db.Usecases, {
      foreignKey: "meaning_id",
      onDelete: "cascade",
      as: "usecases",
    });
    db.Meanings.hasMany(db.Synonyms, {
      foreignKey: "meaning_id",
      onDelete: "cascade",
      as: "synonyms",
    });
    db.Meanings.hasMany(db.MeaningMemos, {
      foreignKey: "meaning_id",
      onDelete: "cascade",
      as: "meanigMemos",
    });
  }
};
