const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("cart", {
        UserId: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        ProductId: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        Quantity:
        {
            type: DataTypes.FLOAT(),
            allowNull: false
        }
    })
}