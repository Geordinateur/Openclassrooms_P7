const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql');
//const mongoose = require('mongoose');
//const path = require('path');

//const Sauce = require('./models/Sauce');
//const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

app.use('/api/user', userRoutes);




const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

//app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use('/api/sauces', saucesRoutes);
//app.use('/api/auth', userRoutes)





module.exports = app;
