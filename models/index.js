const Listing = require("./listing");
const User = require("./user");
const Material = require("./material");

Listing.belongsTo(User, {
  foreignKey: "user_id",
});

Listing.belongsTo(Material, {
  foreignKey: "material_id",
});

Material.hasMany(Listing, {
  foreignKey: "material_id",
});

User.hasMany(Listing, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Material,
  Listing,
};
