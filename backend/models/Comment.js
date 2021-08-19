module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      foreignKey: 'commentId'
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      as: 'leader',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    linkPost: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'blogs',
        key: 'id'
      }
    },
    linkGif: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'gifs',
        key: 'id'
      }
    },
    commentId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'comments',
        key: 'id',
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    updatedBy: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      as: 'updated',
      references: {
        model: 'users',
        key: 'id'
      }
    },
  })
  return Comment;
};
