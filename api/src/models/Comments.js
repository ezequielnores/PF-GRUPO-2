const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define('Comments',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        message: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },{
        timestamps: false,
      })
}
