const db = require('../models');
const Gif = db.gifs;
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require('fs');

exports.create = (req, res, next) => {
	console.log(req.body.title)
	const Gifing = Gif.build({
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		userId: req.body.userId,
		//		title: 'salut',
		//		imageUrl: 'salut', 
		//		userId: 'salut',
		createdAt : Date.now(),
		updatedAt : Date.now(),
		//		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	})
	Gifing.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré!' }))
		.catch(error => res.status(400).json({ error: error.errors[0]['message'] }))
	//		.catch(error => res.status(400).json({ error: error.errors[0]['message'] }))
};

exports.getAll = (req, res, next) => {
	Gif.belongsTo(User, { foreignKey: 'userId' })
	Gif.findAll({include: User})
		.then(gifs => {
			if(gifs.length === 0) {
				res.status(404).json({ error: 'Aucun contenu pour le moment.' })
			}
			res.status(200).json(gifs)
		})
		.catch(error => res.status(400).json({ 'erreur': error }))
};

exports.delete = (req, res, next) => {
	console.log(req.params.id);
	Gif.findByPk(req.params.id)
		.then(gif => {
			if(gif !== null) {
				//				fs.unlink(`images/${filename}`, () => {
				//					const filename = gif.url.split('/images/')[1];
				Gif.destroy({where: { id: req.params.id}})
					.then(() => res.status(201).json({ message: 'Objet supprimé!' }))
					.catch(error => res.status(500).json({ error }));
				//				});
			}else{
				res.status(404).json({ error: 'Objet non trouvé.' });
			}
		})
		.catch(error => res.status(401).json({ error }));
};

exports.update = (req, res, next) => {
	console.log('??????????????????????????')
	Gif.findByPk(req.params.id)
		.then(gif => {
			gif.title = req.body.title;
			gif.imageUrl = req.body.imageUrl;
			//			gif.updatedAt = Date.now();
			gif.save()
				.then(() => res.status(201).json({ message: 'Objet modifié!' }))
				.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.getOne = (req, res, next) => {
	Gif.findByPk(req.params.id)
		.then(gif => res.status(200).json(gif))
		.catch(error => res.status(400).json({ error }));
};

exports.like = (req, res, next) => {
	const userId = req.headers.authorization.split(' ')[2];
	Gif.findByPk(req.params.id)
		.then(gif => {

			let userDislikes = gif.userDislikes
			let userDislikesNew = userDislikes.join(',')
			console.log(userDislikesNew.search(userId))
			if(parseInt(userDislikesNew.search(userId)) !== -1){
				let userDislikesOld = userDislikesNew.replace(userId + ',', '')
				gif.dislikes--
				gif.userDislikes = userDislikesOld
			}
			gif.likes ++
			gif.userLikes += userId + ','
			gif.save({silent: true})
				.then(() => res.status(201).json({ message: 'Un like de plus pour lui!' }))
				.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.dislike = (req, res, next) => {
	const userId = req.headers.authorization.split(' ')[2];
	Gif.findByPk(req.params.id)
		.then(gif => {
			let userLikes = gif.userLikes
			let userLikesNew = userLikes.join(',')
			console.log(userLikesNew.search(userId))
			if(!parseInt(userLikesNew.search(userId)) !== -1){
				let userLikesOld = userLikesNew.replace(userId + ',', '')
				gif.likes--
				gif.userLikes = userLikesOld
			}
			gif.dislikes ++
			gif.userDislikes += userId + ','
			gif.save({silent: true})
				.then(() => res.status(201).json({ message: 'Un like de moins pour lui!' }))
				.catch(error => res.status(400).json({ error: error.errors[0]['message'] }));
		})
		.catch(error => res.status(500).json({ error }));
};
