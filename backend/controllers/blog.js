const db = require('../models');
const Blog = db.blogs;
const Comment = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require('fs');

function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

exports.create = (req, res, next) => {
	const Bloging = Blog.build({
		title: req.body.title,
		content: htmlEntities(req.body.content),
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
			blog.content = htmlEntities(req.body.content),
			blog.userId = req.body.userId;
			blog.updatedAt = Date.now();
			blog.save()
				.then(() => res.status(201).json({ message: 'Objet modifié!' }))
				.catch(error => res.status(500).json({ error: error.errors[0]['message'] }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
	Blog.findByPk(req.params.id)
		.then(blog => {
			if(blog !== null) {
				Blog.destroy({where: { id: req.params.id}})
					.then(() => res.status(201).json({ message: 'Objet supprimé!' }))
					.catch(error => res.status(500).json({ error }));
			}else{
				res.status(404).json({ error: 'Objet non trouvé.' });
			}
		})
		.catch(error => res.status(401).json({ error }));
};

exports.getOne = (req, res, next) => {
	Blog.belongsTo(User, { foreignKey: 'userId' });
	Blog.findByPk(req.params.id, {include: User})
		.then(blog => {
			res.status(200).json({ blog })
		})
		.catch(error => res.status(400).json({ error }));
};

exports.getAll = (req, res, next) => {
	Blog.belongsTo(User, { foreignKey: 'userId' });
	Blog.findAll({include: User})
		.then(blogs => {
			if(blogs.length === 0) {
				res.status(404).json({ error: 'Aucun contenu pour le moment.' });
			}
			res.status(200).json(blogs)
		})
		.catch(error => res.status(400).json({ error }));
};
