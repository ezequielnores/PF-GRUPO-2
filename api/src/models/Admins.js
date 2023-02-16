
const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define('Admins',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },

    },{
        timestamps: false,
      })
}
