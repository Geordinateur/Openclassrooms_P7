const db = require('../models');
const Gif = db.gifs;
const Op = db.Sequelize.Op;

exports.create = (req, res, next) => {
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
	console.log(req.params.id);
	//	Gif.findOne({where: { _id: req.params.id }})
	Gif.findByPk(req.params.id)
		.then(gif => {
			if(gif !== null) {
				Gif.destroy({where: { id: req.params.id}})
					.then(() => res.status(201).json({ 'message': 'Objet supprimé!' }))
					.catch(error => res.status(500).json({ error }));
			}else{
				res.status(404).json({'error': 'Objet non trouvé.'});
			}
		})
		.catch(error => res.status(401).json({ error }));
};

exports.getAll = (req, res, next) => {
	//go works
	console.log('get all gifs');
};
