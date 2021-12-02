const sequelize = require("../config/connection.js");
const postData = require("../seeds/postData.json");
const userData = require("../seeds/userData.json");
const materialData = require("../seeds/materialData.json");
const { Post, User, Material } = require("../model");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Material.bulkCreate(materialData, {
    individualHooks: true,
    returning: true,
  });
  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
