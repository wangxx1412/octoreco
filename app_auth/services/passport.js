const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../../config/keys');

const User = require('../../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
          const existingUser = await User.findOne({ "google.id": profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const user = await new User({
            method:'google',
            google: {
              id:profile.id,
              email: profile.emails[0].value
          },
          username:profile.displayName
        }).save();
          done(null, user);    
      }
    )
  );
  
  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'emails', "name"]
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          method:'facebook',
          facebook: {
            id:profile.id,
            email: profile.emails[0].value
        },
          username: profile.name.givenName
      }).save();
        done(null, user);   
      }
    )
  );