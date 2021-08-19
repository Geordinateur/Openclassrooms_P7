module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blogs", {})
  const Gifs = sequelize.define("gifs", {})
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
  },{
    associate: function(models) {
      User.hasMany(models.Blog, { onDelete: 'cascade' })
      User.hasMany(models.Gifs, { onDelete: 'cascade' })
    }
  })
  return User;
};

