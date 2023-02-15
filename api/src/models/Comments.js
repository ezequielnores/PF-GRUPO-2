const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define('comments',
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
