const express = require("express");
const app = express();
const passport = require("passport");
const flash = require('express-flash')
const session = require('express-session')

app.use(express.static("pages"))
const port = 3000;


const LocalStrategy = require('passport-local')

app.use(express.static(__dirname + '/public'));

const initializePassport = require('./passport')

initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
)
const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

app.get('/', checkAccess,(req, res) => {
  res.render('index.ejs', { username: req.user.username })
})

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.get('/signup', checkNoAccess, (req, res) => {
  res.render('signup.ejs')
})

app.get('/vercelpage', (req, res) => {
  res.render('vercelpage.ejs')
})

app.get('/nodepage', (req, res) => {
  res.render('nodepage.ejs')
})

app.get('/gitpage', (req, res) => {
  res.render('gitpage.ejs')
})
app.get('/Serversiderendering',(req, res) => {
  res.render('serversiderendering.ejs')
})

function checkAccess(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNoAccess(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.post('/login', checkNoAccess, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.post('/Signup', checkNoAccess, async (req, res) => {
  try {
   
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      password: req.body.password
    })
    res.redirect('/login')
  } catch {
    res.redirect('/Signup')
  }
})

const server = app.listen(8080, () => {

  console.log('Server is running on', server.address().port);
})
