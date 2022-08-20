const Sequelize = require("sequelize");

module.exports = class Dictionary extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                origin_expression: {
                    type: Sequelize.STRING(200),
                },
                key_expression: {
                    type: Sequelize.STRING(255)
                },
                converted_expression: {
                    type: Sequelize.TEXT,
                },
                usage: {
                    type: Sequelize.TEXT,
                },
                created_at: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                paranoid: false,
                timestamps: false,
                tableName: "dictionaries",
                modelName: "Dictionary",
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {

        /* db.Dictionary.hasMany(db.Hints, {
            foreignKey: "fk_dictionary_hint_id",
            as: "hints",
            onDelete: "cascade",
        })
         */
        db.Dictionary.hasMany(db.Quizes, {
            foreignKey: "fk_dictionary_quiz_id",
            onDelete: "cascade",
            as: "quizes"
        })
        db.Dictionary.belongsTo(db.User, {
            foreignKey: "userId",
            as: "dictionaries",
            onDelete: "cascade",
        });
    }
};
