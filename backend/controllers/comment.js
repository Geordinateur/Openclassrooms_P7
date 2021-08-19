const jwt = require('jsonwebtoken');
const db = require('../models');
const Comment = db.comments;
const Blog = db.blogs;
const Gif = db.gifs;
const User = db.users;
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

exports.getGif = (req, res, next) => {
	//	Comment.belongsTo(User)
	//	Comment.belongsToMany(Comment, {as: 'replyAt', foreignKey: 'id'})
	//Comment.hasMany(Comment, { as: 'reply', foreignKey: 'replyAt', useJunctionTable: false})
	//	Comment.hasOne(Comment, {as: 'reply', foreignKey: 'replyAt', useJunctionTable: false})
	//Comment.hasOne(Comment, {as: 'replyAt'})
	//	Comment.belongsToMany(Comment, {as: 'replyAt', through: 'id' })
	//////////////
	//	Comment.hasOne(Comment, {foreignKey: 'replyAt'})
	///////////////
	Comment.belongsTo(User)
	Comment.findAll({where: {linkGif: req.params.id}, include: User})
		.then(comment => {
			//			const xxx = JSON.stringify(comment)
			//			Comment.findAll({where: {commentId: comment[0].comment.id}})
			//			console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa' + comment[0].comment.id)
			//				.then(res => { 
			//					console.log('res: ' + res)
			//					console.log('comment: ' + comment)
			//					res.status(200).json(res)
			//				})
			//				.catch(err => res.status(400).json({err}))
			res.status(200).json(comment)
		})
		.catch(error => res.status(400).json({ error }));
};

exports.commentGif= (req, res, next) => {
	const Commenting = Comment.build({ ...req.body });
	Commenting.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré!' }))
		.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
};

exports.getBlog = (req, res, next) => {
	Comment.belongsTo(User)
	Comment.findAll({where: {linkPost: req.params.id}, include: User})
		.then(comment => res.status(200).json(comment))
		.catch(error => res.status(400).json({error}))
};

exports.commentBlog = (req, res, next) => {
	const Commenting = Comment.build({ ...req.body });
	Commenting.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré!' }))
		.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
};

exports.getAll = (req, res, next) => {
	Comment.belongsTo(User)
	Comment.findAll({include: User})
		.then(comment => res.status(200).json(comment))
		.catch(error => res.status(400).json({error}))
};

exports.getOne = (req, res, next) => {
	Comment.belongsTo(User)
	Comment.findByPk(req.params.id, {include: User})
		.then(comment => res.status(200).json(comment))
		.catch(error => res.status(400).json({error}))
};

exports.delete = (req, res, next) => {
	Comment.findByPk(req.params.id)
		.then(comment => {
			if(comment !== null) {
				Comment.destroy({where: { id: req.params.id}})
					.then(() => res.status(201).json({ message: 'Commentaire supprimé!' }))
					.catch(error => res.status(500).json({ error }));
				//				});
			}else{
				res.status(404).json({ error: 'Commentaire non trouvé.' })
			}
		})
		.catch(error => res.status(401).json({error}))
};

exports.update = (req, res, next) => {
	console.log(req.params.id + ' ' + req.body.content + ' ' + req.body.updatedBy)
	Comment.findByPk(req.params.id)
		.then(comment => {
			if(comment !== null) {
				comment.content = req.body.content
				comment.updatedBy = req.body.updatedBy
				comment.updatedAt = Date.now()
			comment.save()
				.then(() => res.status(201).json({ message: 'Commentaire modifié!' }))
				.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
			} else {
				res.status(404).json({ error: 'Commentaire non trouvé.' })
			}
		})
		.catch(error => res.status(401).json({error}))
};
