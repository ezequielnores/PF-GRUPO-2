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
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        symptoms: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        tips: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        extraText: {
            type: DataTypes.TEXT
        }

    }, {timestamps: false})
}