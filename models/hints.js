const Sequelize = require("sequelize");

module.exports = class Hints extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                hint_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                hint_word: {
                    type: Sequelize.STRING(80),
                }
            },
            {
                sequelize,
                paranoid: false,
                timestamps: true,
                tableName: "hints",
                modelName: "Hints",
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
    }
};

