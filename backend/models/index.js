const dbConfig = require("../config/db.config.js");

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./User.js")(sequelize, Sequelize);
db.gifs = require("./Gif.js")(sequelize, Sequelize);
db.blogs = require("./Blog.js")(sequelize, Sequelize);
db.comments = require("./Comment.js")(sequelize, Sequelize);

module.exports = db;
