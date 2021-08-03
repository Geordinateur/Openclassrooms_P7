const db = require('../models');
const Gif = db.gifs;
const Op = db.Sequelize.Op;

exports.create = (req, res, next) => {
	console.log('Object: ' + req.body);
	const Gifing = Gif.build({
		title: req.body.title,
		url: req.body.url,
		author: req.body.author,
		createdAt : Date.now(),
		updatedAt : Date.now()
	});
	Gifing.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré!' }))
		.catch(error => res.status(400).json({ error }));
};

exports.delete = (req, res, next) => {
	console.log('delete');
	Gif.findOne({where: { _id: req.params.id }})
		.then(gif => {
			console.log(gif);
		})
		.catch(error => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
	//go works
	console.log('get all gifs');
};
