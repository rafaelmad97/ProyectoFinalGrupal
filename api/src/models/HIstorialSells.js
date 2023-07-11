const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "HistorialSells",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            previousCart: {
                type: DataTypes.ARRAY(DataTypes.JSONB),
                allowNull: false,
            },

        },
        { freezeTableName: true, timestamps: false }
    );
};
