const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(30),
        },
        snsId: {
          type: Sequelize.STRING(45),
        },
        avartar: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        paranoid: false,
        timestamps: true,
        underscored: true,
        tableName: "users",
        modelName: "Users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // console.log('user db@@@@@', db)
    db.User.hasMany(db.EnglishWords, {
      foreignKey: "user_id",
      as: "englishWords",
    });
  }
};
