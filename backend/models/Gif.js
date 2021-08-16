module.exports = (sequelize, Sequelize) => {
  const Gif = sequelize.define("gifs", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dislikes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userLikes: {
      type: Sequelize.TEXT,
      //astuce du web
      allowNull: false,
      defaultValue: '0,',
      get() {
        return this.getDataValue('userLikes').split(',')
      },
      //      set(val) {
      //        this.setDataValue('userLikes', this.userLikes + val.join(';'));
      //      },
    },
    userDislikes: {
      type: Sequelize.TEXT
    }
  })
  return Gif;
};
