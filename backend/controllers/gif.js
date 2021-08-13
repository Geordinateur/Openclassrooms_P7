const db = require('../models');
const Gif = db.gifs;
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require('fs');

exports.create = (req, res, next) => {
	const Gifing = Gif.build({
		title: req.body.title,
		url: req.body.url,
		userId: req.body.userId,
		//		url: `${req.protocol}://${req.get('host')}/images/${req.file.filname}`
		//		url: req.body.url,
		//author: userId,
		createdAt : Date.now(),
		updatedAt : Date.now()
	});
	Gifing.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré!' }))
		.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
};

exports.update = (req, res, next) => {
	Gif.findByPk(req.params.id)
		.then(gif => {
			gif.title = req.body.title;
			//			gif.url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
			//			gif.url = req.body.url;
		gif.author = 'a renseigner';
		//gif.author = userId;
			gif.updatedAt = Date.now();
			gif.save()
				.then(() => res.status(201).json({ message: 'Objet modifié!' }))
				.catch(error => res.status(500).json({ error: error.errors[0]['message'] }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
	console.log(req.params.id);
	Gif.findByPk(req.params.id)
		.then(gif => {
			if(gif !== null) {
				fs.unlink(`images/${filename}`, () => {
					const filename = gif.url.split('/images/')[1];
					Gif.destroy({where: { id: req.params.id}})
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
	Gif.findByPk(req.params.id)
		.then(gif => res.status(200).json(gif))
		.catch(error => res.status(400).json({ error }));
};

exports.getAll = (req, res, next) => {
	Gif.belongsTo(User, { foreignKey: 'userId' });
	Gif.findAll({include: User})
		.then(gifs => {
			if(gifs.length === 0) {
				res.status(404).json({ error: 'Aucun contenu pour le moment.' });
			}
			res.status(200).json(gifs)
		})
		.catch(error => res.status(400).json({ error }));
};
