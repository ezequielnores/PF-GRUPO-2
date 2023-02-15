const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("blog", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ["Health", "Nutrition", "Tech"],
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        symptoms: {
            type: DataTypes.ARRAY
        },
        tips: {
            type: DataTypes.ARRAY,
            allowNull: false
        },
        extraText: {
            type: DataTypes.TEXT
        }

    }, {timestamps: false})
}