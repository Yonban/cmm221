const Sequelize = require('sequelize')
const sequelize = require('./sequelize')
const bcrypt = require('bcrypt')

const Users = sequelize.define('users', {
	username: {
		type: Sequelize.STRING,
		unique: true
	},
	password: Sequelize.STRING,
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING
}, 
             {

timestamps: true,
hooks: {
	beforeCreate: function(user) {
		const salt = bcrypt.genSaltSync()
		user.password = bcrypt.hashSync(user.password, salt)
	}
},
getterMethods: {
	name: function() {
		return this.firstname + ' ' + this.lastname
	}
  }
})

Users.prototype.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = Users