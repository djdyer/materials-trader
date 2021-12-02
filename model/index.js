const Post = require("../model/posts");
const User = require("../model/users");
const Material = require("../model/material");

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasOne(Material, {
  foreignKey: "post_id",
});

Material.hasMany(Post, {
  foreignKey: "post_id",
});

User.hasMany(Post, {
  foreignKey: "post_id",
});

module.exports = {
  User,
  Material,
  Post,
};
