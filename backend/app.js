const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const mysql = require('mysql');

const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/gif', gifRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comment', commentRoutes);

const db = require("./models");

//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//});

db.sequelize.sync();

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;