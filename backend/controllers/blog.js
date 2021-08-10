const db = require('../models');
const Blog = db.blogs;
const Comment = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require('fs');

exports.create = (req, res, next) => {
	const Bloging = Blog.build({
		title: req.body.title,
		content: req.body.content,
		//		url: `${req.protocol}://${req.get('host')}/images/${req.file.filname}`
		//		url: req.body.url,
		userId: req.body.userId,
		createdAt : Date.now(),
		updatedAt : Date.now()
	});
	Bloging.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré!' }))
		.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
};

exports.update = (req, res, next) => {
	Blog.findByPk(req.params.id)
		.then(blog => {
			blog.title = req.body.title;
			//			blog.url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			//			blog.url = req.body.url;
			blog.userId = req.body.userId;
			blog.updatedAt = Date.now();
			blog.save()
				.then(() => res.status(201).json({ message: 'Objet modifié!' }))
				.catch(error => res.status(500).json({ error: error.errors[0]['message'] }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
	console.log(req.params.id);
	Blog.findByPk(req.params.id)
		.then(blog => {
			if(blog !== null) {
				fs.unlink(`images/${filename}`, () => {
					const filename = blog.url.split('/images/')[1];
					Blog.destroy({where: { id: req.params.id}})
						.then(() => res.status(201).json({ message: 'Objet supprimé!' }))
						.catch(error => res.status(500).json({ error }));
				});
			}else{
				res.status(404).json({ error: 'Objet non trouvé.' });
			}
		})
		.catch(error => res.status(401).json({ error }));
};

exports.getOne = (req, res, next) => {
	Blog.findByPk(req.params.id)
		.then(blog => {
			Comment.findAll({where: {link: blog.id}})
				.then(comment => { 
					console.log(blog);
					console.log(comment);
					res.status(200).json()})
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(400).json({ error }));
};

exports.getAll = (req, res, next) => {
	Blog.findAll()
		.then(blogs => {
			if(blogs.length === 0) {
				res.status(404).json({ error: 'Aucun contenu pour le moment.' });
			}
			res.status(200).json(blogs)
		})
		.catch(error => res.status(400).json({ error }));
};
