const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = getUsername(username)
    if (user == null) {
      return done(null, false)
    }

    try {
      if (password == user.password) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize