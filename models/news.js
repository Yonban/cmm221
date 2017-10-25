const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const News = sequelize.define('news', {
title: Sequelize.STRING,
description: Sequelize.TEXT,
image: Sequelize.STRING
}, {
timestamps: true,
getterMethods: {
	shortDescription:function() {
		let length = 200

		let shortDescription = this.description.substring(0, length)
		let suffix = this.description.length > length ? '...' : ''
		return shortDescription + suffix
	}
  }
})

module.exports = News