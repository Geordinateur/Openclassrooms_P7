module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blogs", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
  })
  return Blog;
};
