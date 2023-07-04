const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("cart", {
        ProductId: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        Quantity:
        {
            type: DataTypes.INTEGER(),
            allowNull: false
        }
    })
}