const Sequelize = require("sequelize");


module.exports = class MeaningMemos extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            meaningmemo_id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            memo_content: {
                type: Sequelize.STRING,
                allowNull: true,
            }
        },{
            sequelize,
            paranoid: false,
            timestamps: true,
            underscored: true,
            tableName: "meaning_memos",
            modelName: "MeaningMemos",
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
    static associate(db){
        

      

    }
}