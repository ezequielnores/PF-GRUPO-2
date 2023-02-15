const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(doctor, {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false,
            unique: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING,
            allowNull:false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        speciality: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["Cardiology", "Gynecology", "Neurology", "Oncology", "Psychiatry", "Dermatology", "Ophthalmology", "Urology", "Endocrinology", "Gastroenterology", "General", "Deportologist"]    
        },
        lisence: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cv: {
            type: DataTypes.BLOB,
            allowNull: false,
            unique: true
        },
        clinicMail: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    }, {timestamps: true}, {createdAt: true}, {updatedAt: false})
}