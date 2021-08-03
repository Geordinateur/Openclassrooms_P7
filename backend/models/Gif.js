module.exports = (sequelize, Sequelize) => {
  const Gif = sequelize.define("gifs", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    author: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
  })
  return Gif;
};
