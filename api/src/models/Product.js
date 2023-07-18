const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('product', {

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: ["(.*)"],
          // args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
          // (.*)
          msg: 'Campo name - Debe ser una palabra'
        }
      }
    },
    //deberia agregar timestamp: false asi no hay registros de tiempo
    description: {
      type: DataTypes.TEXT,
      validate: {
        is: {
          args: ["(.*)"],
          // args: ["^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$"],
          msg: 'Campo description - Debe ser una palabra'
        }
      }
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: {
          args: true,
          msg: "Campo price - No es un decimal"
        }
      }
    },

    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Campo stock - No es un entero"
        }
      }
    },

    urlImage: {
      type: DataTypes.STRING,
      // validate: {
      //   is: {
      //     args: ["(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"],
      //     msg: 'Campo urlImage - Debe ser una url'
      //   }
      // }
    }
,    
   isactive: {
    type: DataTypes.BOOLEAN,
   }, 


  });
};
