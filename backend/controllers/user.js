const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
	async function validatorUniqueEmail() {
		//recherche si l'email est déjà présente dans la DB
		const project = await User.findOne({where: { email: req.query.email }})
		if(project === null) {
			bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(req.query.password, salt, function(err, hash) {
					const saving = User.create({
						pseudo: req.query.pseudo,
						email: req.query.email,
						password: hash,
						createdAt: Date.now(),
						updatedAt: Date.now()
					});
				});
			});
			return res.status(400).json({ message: 'success, welcome at the new members!' });
		} else {
			return res.status(500).json({ message: 'error, email already in use!' });
		}
	}
	validatorUniqueEmail();
};

exports.login = (req, res, next) => {
	console.log('login');
	User.findOne({
		where: {email: req.query.email}
	})
		.then(user => {
			if(!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé' });
			}
			console.log(req.query.password);
			console.log(user.password);
			bcrypt.compare(req.query.password, user.password)
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
