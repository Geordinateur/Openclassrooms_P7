const jwt = require('jsonwebtoken');
const db = require('../models');
const Comment = db.comments;
const Blog = db.blog;
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');

exports.create = (req, res, next) => {
	const Commenting = Comment.build({
		content: req.body.content,
		link: req.body.link,
		replyAt: req.body.replyAt,
		author: 'a renseigner',
		//author: userId,
		createdAt : Date.now(),
		updatedAt : Date.now()
	});
	Commenting.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré!' }))
		.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
};

exports.get = (req, res, next) => {
	console.log('on affiche le commentaire avec l\'id demandé, rien de compliqué??!');
};
