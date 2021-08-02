module.exports = {
  HOST: "localhost",
  USER: "georges",
  PASSWORD: "bonjour",
  DB: "Groupomania",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
