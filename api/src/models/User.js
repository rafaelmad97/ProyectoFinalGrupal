const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  sequelize
    .define(
      "User",
      {
        id: {
          type: DataTypes.FLOAT,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            is: {
              args: ["^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"],
              msg: "Debe ser una palabra",
            },
          },
        },

        lastName: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            is: {
              args: ["^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"],
              msg: "Debe ser una palabra",
            },
          },
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },

        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isStrongPassword(value) {
              const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

              if (!regex.test(value)) {
                throw new Error(
                  "La contraseña debe contener letras y números, y tener una longitud mínima de 8 caracteres."
                );
              }
            },
          },
        },

        phone: {
          type: DataTypes.STRING,
        },

        isactive: {
          type: DataTypes.BOOLEAN,
        },

        isadmin: {
          type: DataTypes.BOOLEAN,
        },
      },
      { freezeTableName: true, timestamps: false }
    )
    .addHook("beforeCreate", (user) => {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(8),
        null
      );
    });
};
