const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.getAll = (req, res, next) => {
	User.findAll()
		.then(user => res.status(201).json({ user }))
		.catch(error => res.status(500).json({ error }))
};

exports.getMe = (req, res, next) => {
	User.findByPk(req.params.userId)
		.then(user => res.status(201).json({ user }))
		.catch(error => res.status(500).json({ error }))
};

exports.delete = (req, res, next) => {
	User.findByPk(req.params.userId)
		.then(user => {
			if(user !== null) {
				user.destroy()
					.then(() => res.status(201).json({ message: 'Utilisateur supprimé!' }))
					.catch(error => res.status(500).json({ error }));
			}
		})
		.catch(error => res.status(401).json({ error }));
};

exports.signup = (req, res, next) => {
	//recherche si l'email est déjà présente dans la DB
	User.findOne({where: { email: req.body.email }})
		.then(user =>{
			if(user !== null) {
				res.status(500).json({ message: 'error, email already use!' });
			}
			//cryptage du mot de passe, une réponse promise
			bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					const saving = User.create({
						username: req.body.username,
						email: req.body.email,
						password: hash,
						isAdmin: 0,
						imageUrl: req.body.imageUrl,
						createdAt: Date.now(),
						updatedAt: Date.now()
					});
				});
			});
			res.status(201).json({ message: 'success, welcome at the new members!' });
		})
		.catch(error => res.status(500).json({ message: error }));
};

exports.login = (req, res, next) => {
	//	console.log('login');
	User.findOne({
		where: {email: req.body.email}
	})
		.then(user => {
			if(!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé' });
			}
			//			console.log(req.body.password);
			//			console.log(user.password);
			bcrypt.compare(req.body.password, user.password)
				.then(valid  => {
					if(!valid) {
						return res.status(401).json({ error: 'Mot de passe incorrect!' });
					}
					console.log(user + 'id: ' + user.id)
					res.status(200).json({
						user: user,
						userId: user.id,
						token: jwt.sign(
							{ userId: user.id },
							'RANDOM_TOKEN_SECRET',
							{ expiresIn: '24h' }
						)
					});
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
}
exports.update = (req, res, next) => {
	console.log(req.body.imageUrl)
	User.findByPk(req.params.userId)
		.then(user => {
			if(req.body.newPassword) { 
				bcrypt.genSalt(saltRounds, function(err, salt) {
					bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
						user.username = req.body.username
						user.password = hash
						user.email = req.body.email
						user.imageUrl = req.body.imageUrl
						user.save()
							.then(() => res.status(201).json({ message: 'Profil modifié!' }))
							.catch(error => res.status(500).json({ error: error.errors[0]['message'] }));
					})
				})
			}else{
				user.username = req.body.username
				user.email = req.body.email
				user.imageUrl = req.body.imageUrl
				user.save()
					.then(() => res.status(201).json({ message: 'Profil modifié!' }))
					.catch(error => res.status(500).json({ error: error.errors[0]['message'] }));
			}
		})
		.catch(error => res.status(500).json({ error }));
};

exports.admin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
	console.log('TOKEN: ' + token)
};
