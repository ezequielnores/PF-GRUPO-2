const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Patient",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATEONLY,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bmi: {
        type: DataTypes.INTEGER,
      },
      allergies: {
        type: DataTypes.STRING,
      },
      chronicDiseases: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
      },
      location: {
        //pendiente revisar tipo de dato
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.INTEGER,
      },
      socialSecurity: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      plan:{
        type:DataTypes.STRING,
      }
    },
    {
      timestamps: false,
    }
  );
};
