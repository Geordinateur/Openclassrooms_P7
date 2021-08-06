const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
	//recherche si l'email est déjà présente dans la DB
	console.log(req.body.pseudo);
	User.findOne({where: { email: req.body.email }})
		.then(user =>{
			if(user !== null) {
				res.status(500).json({ message: 'error, email already use!' });
			}
				//cryptage du mot de passe, une réponse promise
				bcrypt.genSalt(saltRounds, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						const saving = User.create({
							pseudo: req.body.pseudo,
							email: req.body.email,
							password: hash,
							createdAt: Date.now(),
							updatedAt: Date.now()
						});
					});
				});
				res.status(400).json({ message: 'success, welcome at the new members!' });
		})
		.catch(error => res.status(500).json({ error }));
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
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							'RANDOM_TOKEN_SECRET',
							{ expiresIn: '24h' }
						)
					});
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
}
