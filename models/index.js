const News = require('./news')
const Thumbnails = require('./thumbnails')
const Users = require('./users')

News.sync().then(function() {
console.log('News is synced.')
})

Thumbnails.sync().then(function() {
	console.log('Thumbnails is synced.')
})

Users.sync().then(function() {
	console.log('Users is synced.')
})