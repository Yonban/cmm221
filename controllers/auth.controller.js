const Users = require('../models/users')

exports.index = function(req, res) {
res.render('auth/main.twig')
}

exports.register = function(req, res) {
res.render('auth/register.twig')
}

exports.store = function(req, res) {
	const username = req.body.username
	const password = req.body.password
	const firstname = req.body.firstname
	const lastname = req.body.lastname

	Users.create({
		username: username,
		password: password,
		firstname: firstname,
		lastname: lastname
	}).then(function(user){
		req.session.user = user.dateValues
		res.redirect('/dashboard')
	})
}

exports.logout = function(req, res) {
	if(req.session.user) delete req.session.user
		res.redirect('/login')
}

exports.login = function(req, res) {
	const username = req.body.username
	const password = req.body.password

	Users.findOne({
		where: {
			username: username
		}
	}).then(function(user) {
		if(!user || !user.validPassword(password)) {
			res.redirect('/login')
		} else {
			req.session.user = user.dataValues
			res.redirect('/dashboard')
		}
	})
}