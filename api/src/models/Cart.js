const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Cart", {
        UserId: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        ProductId: {
            type: DataTypes.INTEGER(),
            allowNull: false
        }
    })
}