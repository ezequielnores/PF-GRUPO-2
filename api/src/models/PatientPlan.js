const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("PatientPlan", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    durationMonths: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    availableConsultations: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usedConsultations: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    expires: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};
