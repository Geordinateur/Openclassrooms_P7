module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
//    _id: {
//      primaryKey: true,
//      type: Sequelize.UUID,
//      defaultValue: Sequelize.UUIDV4
//    },
    user: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
  })
  return User;
};
