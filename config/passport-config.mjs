import { Strategy } from "passport-local";
import bcrypt from "bcrypt"

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    console.log(user)
    if(user === null) {
      return done(null, false, {message: "No user with that email"})
    }
    try {
      if(await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, {message: "Password incorrect"})
      }
    } catch (error) {
      return done(error) 
    }
  }
  passport.use(new Strategy( {usernameField: "email"}, authenticateUser ))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

export default initialize