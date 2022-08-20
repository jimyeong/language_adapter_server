const Sequelize = require("sequelize");

// 40자 제한
module.exports = class Tags extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            tag_id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tag_content:{
                type: Sequelize.STRING(40),
                allowNull: true
            }
        },{
            sequelize,
            paranoid: false,
            timestamps: true,
            underscored: true,
            tableName:"tags",
            modelName: "Tags",
            charset:"utf8",
            collate:"utf8_general_ci"
        })
    }
    static associate(db){
    }
}