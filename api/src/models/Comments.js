const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define('Comments',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false,
      })
}
