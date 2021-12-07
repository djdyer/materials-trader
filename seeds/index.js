const sequelize = require("../config/connection.js");
const listingData = require("../seeds/listingData.json");
const userData = require("../seeds/userData.json");
const materialData = require("../seeds/materialData.json");
const { Listing, User, Material } = require("../models");

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

  await Listing.bulkCreate(listingData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
