module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    },
    replyAt: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
  })
  return Comment;
};
