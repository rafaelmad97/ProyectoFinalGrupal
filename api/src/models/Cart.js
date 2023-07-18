const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("cart", {
        id:{
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
        },
        Quantity:
        {
            type: DataTypes.INTEGER(),
            allowNull: false
        }
    })
}