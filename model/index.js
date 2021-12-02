const Post = require("../model/posts");
const User = require("../model/users");
const Material = require("../model/material");

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.belongsTo(Material, {
  foreignKey: "material_id",
});

Material.hasMany(Post, {
  foreignKey: "material_id",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Material,
  Post,
};
