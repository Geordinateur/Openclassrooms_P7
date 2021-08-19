const jwt = require('jsonwebtoken');
const db = require('../models');
const Op = db.Sequelize.Op;
const User = db.users;

module.exports = (req, res, next) => {
  try {
    const userId = req.headers.authorization.split(' ')[2];
    User.findByPk(userId)
      .then(resp => {
        if(resp.dataValues.isAdmin === 1) {  next() } else { console.log('t pas admin!!!')}
      })
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée!' });
  }
};