const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Listing extends Model {}

Listing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // photo: {
    //     type: DataTypes.???,
    //     allowNull: true,
    //   },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "material",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      // Could be weight of material, size of load, approximation
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "listing",
  }
);

module.exports = Listing;
