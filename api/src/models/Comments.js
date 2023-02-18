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
        message: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: false
        }
    },{
        timestamps: false,
      })
}
