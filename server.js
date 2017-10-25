require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const { twig } = require('twig') 

const app = express() //run function express

require('./models')

app.set('view engine', 'twig')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

const sessionSecret = {
	secret: process.env.SECERT || 'sessionsecret',
	resave: true,
	saveUninitialized: true
}

app.use(session(sessionSecret))

const homeController = require('./controllers/home.controller')
const newsController = require('./controllers/news.controller')
const authController = require('./controllers/auth.controller')
const dashboardController = require('./controllers/dashboard.controller')

const authMiddleware = require('./middlewares/auth.middleware')

app.get('/', homeController.index)
app.get('/news', newsController.index)

app.get('/login', authMiddleware.isNotLogin, authController.index)
app.post('/login', authMiddleware.isNotLogin, authController.login)
app.get('/register', authMiddleware.isNotLogin, authController.register)
app.post('/register', authMiddleware.isNotLogin, authController.store)
app.get('/dashboard', authMiddleware.isLogin, dashboardController.index)

app.get('/logout', authController.logout)

app.use('/assets', express.static(__dirname + '/static/assets', {
	maxAge: 86400000
}))

app.listen(8000, function(err) { 
	console. log('Server is running on port 8000')
})