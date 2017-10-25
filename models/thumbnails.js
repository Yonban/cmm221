const Sequelize = require('sequelize')
const sequelize = require('./sequelize')


const Thumbnails = sequelize.define('thumbnails', {
title: Sequelize.STRING,
image: Sequelize.STRING
}, {
timestamps: true
})

module.exports = Thumbnails