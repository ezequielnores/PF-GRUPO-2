const { DataTypes } = requiere ("sequelize")

module.export = (sequelize) => {
    sequelize.define("paciente",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,   
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
        birthday:{
            type: DataTypes.DATEONLY
        },
        weight:{
            type: DataTypes.INTEGER,
            allowNull: false

        },
        height:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bmi:{
            type: DataTypes.INTEGER
        },
        allergies:{
            type: DataTypes.STRING
        },
        chronicDiseases:{
            type: DataTypes.STRING
        },
        photo:{
            type: DataTypes.BLOB
        },
        location:{
            //pendiente revisar tipo de dato
            type: DataTypes.STRING,
            allowNull: false
        },
        dni:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type: DataTypes.INTEGER,
        },
        socialSecurity:{
            type: DataTypes.STRING
        },
        plan:{
            type: DataTypes.STRING
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        historyPayment:{
            //este campo es necesario? para que?
            type: DataTypes.STRING
        }
    },{
        timestamps: false,
      })
}