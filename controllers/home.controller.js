const Thumbnais = require('../models/thumbnails')
const News = require('../models/news')

exports.index = function (req, res) {

	let content = {
		highlight: {
			url: '/assets/images/home/banner/highlight.jpg',
			title: 'Welcome'
		}
	}

	const thumbnailsPromise = new Promise(function(resolve, reject) {
		Thumbnails.findAll().then(function(thumbnails) {
			resolve(thumbnails)
		})
	})

	const newsPromise = new Promise(function(resolve, reject) {
		News.findAll().then(function(news) {
			resolve(news)
		})
	})

	Promise.all([
		thumbnailsPromise,
		newsPromise
	]).then(function(values) {
		let thumbnails = values[0]
		let news = values[1]

		content.thumbnails = thumbnails
		content.news = news

		res.render('home.twig', content)
	})

}

//let content = {
		//banner: [
		//{
			//id:1,
			//url:'//image/img-1.jpg'
		//},
		//{
			//id:2,
			//url:'//image/img-1.jpg'
		//}
	  //]
	//}

	//res.json(content)